import { Avatar, Card, Paper,  TextField, Typography } from '@mui/material';
import React,{useEffect, useState} from 'react';

import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import CheckIcon from '@mui/icons-material/Check';
import { storage, tempcollect } from '../firebase';
import {  doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Myprofiletab from './Myprofiletab';

function Myprofile() {
  const[editopen,setEditopen]=useState(false)
  const[bio,setBio]=useState("")
  const[location,setLocation]=useState("")
  const user=JSON.parse(localStorage.getItem("currentuser"))
  const[profile,setProfile]=useState([])
  
  const temp=query(tempcollect,where('userId','==',user.uid))
  const[filedata,setFiledata]=useState("")
   
  const handleFile=(e)=>{
    const file=e.target.files[0]
  
    const storageRef = ref(storage,`profile/${file.name}`);
    const userRef=doc(tempcollect,filedata)
   uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((e)=>{
        updateDoc(userRef,{
           userImage:e
        })
        const myname=localStorage.getItem('username')
        const post={"userImage":e,"userName":myname}
        localStorage.setItem('userimage',JSON.stringify(post))
      })       
    });
}

  useEffect(() => {
      onSnapshot(temp,(e)=>{ 
          const posts=[]    
          e.docs.map((s)=>{                
              posts.push({...s.data(),id:s.id})
              setFiledata(s.id)
              
          })
          setProfile(posts)
      })
  },[])


  const submitHandl=(e)=>{
  e.preventDefault()
  }

  const submitHandler=(e)=>{
const submitRef=doc(tempcollect,e)
updateDoc(submitRef,{
  about:bio,
  place:location,  
})

  setEditopen(!editopen)
  }

  const getValuehandler=(e)=>{

     setEditopen(!editopen)
    const docRef=doc(tempcollect,e)
   getDoc(docRef)
    .then((e)=>{
    setBio(e.data().about)
    setLocation(e.data().place)
  })
  }

  const handlePostsubmit=(e)=>{
    e.preventDefault()
  }
  
  //mui tab
  const [value, setValue] = React.useState('one');

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
  <div style={{display:'flex',flexDirection:"column",backgroundColor:"black"}} > 
  {
    profile.map((e)=>{
      return(
        <>
        <Card style={{display: 'flex', flexDirection: 'row',justifyContent:"center",backgroundColor:"black"}} key={e.id}>
            <Paper style={{marginRight:"20px",marginTop:"14px",color:"white",backgroundColor:"black"}}>
                 <Typography style={{fontSize:"20px"}}>{e.followers.length}</Typography>
                 <Typography style={{fontSize:"12px"}}>followers</Typography>
             </Paper>
              <Avatar sx={{width:"70px",height:"80px"}} src={e.userImage}></Avatar>
              <Paper style={{marginLeft:"20px",marginTop:"14px",color:"white",backgroundColor:"black"}}>
                    <Typography style={{fontSize:"20px"}}>{e.folowing.length}</Typography>
                    <Typography style={{fontSize:"12px"}}>following</Typography>
               </Paper>
        </Card>

        <Card style={{backgroundColor:"black",color:"white",display:"flex",
        flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                   <Typography style={{fontSize:"20px"}}>{e.userName}</Typography>
                   <Typography style={{color:"#CBCCCE",fontSize:"14px",paddingLeft:"120px",paddingRight:"120px",fontWeight:"lighter"}}>{e.about}</Typography>
            <Paper style={{display: 'flex', flexDirection: 'row',backgroundColor:"black",color:"#CBCCCE",marginTop:"6px"}}>
                    <LocationOnIcon />
                    <Typography>{e.place}</Typography>             
            </Paper>

            <Paper style={{backgroundColor:"black",display: 'flex',marginTop:"15px",justifyContent:"flex-end"}}>
              <form onSubmit={handlePostsubmit}>
                    <input sx={{fontSize:"31px"}} type="file" onChange={handleFile} 
                    style={{color:"white",marginLeft:"30px",cursor:"pointer"}} />
                    {/* <Button variant="contained" size="medium" onClick={handlePostsubmit}
                   style={{backgroundColor:"black",color:"white",marginTop:"18px",marginBottom:"18px"}}>UPDATE</Button> */}    
               </form>
               <EditIcon sx={{fontSize:"31px"}} style={{color:"white",cursor:"pointer",marginLeft:"-50px"}} 
          onClick={()=>getValuehandler(e.id)}/>
            </Paper>

            {
              editopen?<Paper 
              style={{width:"300px",height:"180px",backgroundColor:"black",position:"absolute",top:"87px"}}>
                <form onSubmit={submitHandl}>
                    <TextField variant="standard"  multiline fullWidth rows={2} label="Bio"
                    value={bio} onChange={(z)=>setBio(z.target.value)}
          style={{zIndex:"1000",backgroundColor:"white",marginBottom:"10px"}}></TextField>
           <TextField  variant="standard"   fullWidth 
           value={location} onChange={(z)=>setLocation(z.target.value)}
          style={{zIndex:"1000",backgroundColor:"white"}} label="location"></TextField>
          <CheckIcon onClick={()=>submitHandler(e.id)}
          style={{color:"white",zIndex:"1000",marginTop:"10px",marginLeft:"240px",cursor:"pointer",fontSize:"50px",padding:'20px'}}
          >

          </CheckIcon>
          </form>
              </Paper>:null
            }
           
          
            {/* <Paper style={{backgroundColor:"black",display: 'flex',marginTop:"15px"}}>
            <Button size="small" variant="contained" style={{marginRight:"10px"}}>Follow</Button>
            <Button size="small" variant="contained" >Message</Button>
            </Paper>    */}
            <hr style={{border: "1px solid #CBCCCE",width:"250px",marginTop:"18px"}}/>
  
        </Card>
        </>
      )
    })
  }
  <Paper style={{width:"420px",backgroundColor:"black"}}>
  <Myprofiletab />
  </Paper>

      
  </div>
  </>
  )
}

export default Myprofile;
