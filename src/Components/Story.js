import { Avatar, Modal, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { storage, tempcollect } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./Chat.css";
import LinearProgress from '@mui/material/LinearProgress';
import {
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

function Story() {
  const user = JSON.parse(localStorage.getItem("currentuser"));

  const temp1 = query(tempcollect, where("userId", "==", user.uid));
  const [filedata, setFiledata] = useState("");
  const [mydata, setMydata] = useState({});
  const temp3=query(tempcollect,where('userId','!=',user.uid))

  const [fileimage, setFileimage] = useState("");
  const [value, setValue] = useState("");
  const[filename,setFilename]=useState("")

  useEffect(() => {
    onSnapshot(temp1, (e) => {
      e.docs.map((s) => {
        setMydata(s.data());
        setFiledata(s.id)
      setFileimage(s.data().userImage)
      });
    });
  }, []);
 const[otherdata,setOtherdata]=useState([])

  useEffect(() => {
    onSnapshot(temp3, (e) => {
      const post=[]
      e.docs.map((s) => {
        post.push({...s.data(),id:s.id})
      });
      setOtherdata(post)
    });
  }, []);

  
  const handleFile = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `stories/${file.name}`);
    const userRef = doc(tempcollect, filedata);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((e) => {
        updateDoc(userRef, {
          stories: e,
        });
      });
    });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      var intreval = setInterval(() => {
        setValue((prev) => prev + 10);
      }, 1000);

      var tm = setTimeout(() => {
        setOpen(false);
      }, 11000);
    }

    return () => {
      clearTimeout(tm);
      clearInterval(intreval);
      setValue(0);
    };
  }, [open]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: 322,
    height:518,
p:2
  };
  const[story,setStory]=useState({
    url : "",
    username : "",
    avatar : "",
  })
  
  return (
    <>
      <div
        style={{ marginLeft: "160px", marginTop: "70px", marginBottom: "10px" }}
      >
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleFile}
          />
          <img
          alt=""
            className="avatar"
            src={fileimage}
          ></img>
        </label>
      </div>
      <div  className="root">
        <div style={{display:'flex',flexDirection: 'column'}}>
        {mydata.stories !== "" ? (
            <>
              <div className="border" onClick={()=>{
                         setStory({
                            url : mydata.stories,
                            username : mydata.userName,
                            avatar : mydata.userImage
                         })
                         setOpen(true)
                        }} >
                <img alt="" className="avatar" src={fileimage}></img>
              </div> 
              <h3>My Story</h3>
            </>
          ) : null}
        </div>
        <div>
        <div style={{display:'flex',flexDirection:'row'}}>
         {
           otherdata.map((p,index)=>{
             return(
               <div >
               {
                 p.stories!==""?(
                  <>
                    <div className="border"  onClick={()=>{
                         setStory({
                            url : p.stories,
                            username : p.userName,
                            avatar : p.userImage,
                         })
                         setOpen(true)
                        }} key={index}>
                      <img className="avatar" alt="" src={p.userImage} ></img>
                    </div> 
                    
                  </>
                ) : null
               }
               </div>
             )
           })
         }
         </div>
         {open ?(
<>
<Modal 
    keepMounted
    open={open}
    onClose={handleClose}
    >
   <Paper sx={style}>
    <LinearProgress variant="determinate" value={value} style={{backgroundColor:'black'}}/>
    <div style={{display:'flex',flexDirection: 'row',marginTop:'10px'}}>
      
      <Avatar src={story.avatar} style={{marginRight:'11px',width:'40px',height:'40px',marginTop:'11px'}}></Avatar>
      <h3 style={{color:'black'}}>{story.username}</h3>
    </div>
    <img src={story.url} alt=""  style={{width:'100%',height:'85%'}}></img>
    </Paper>
    </Modal>
</>
         ):null}
        </div>
      </div>
    </>
  );
}

export default Story;
