import { addDoc,Timestamp} from 'firebase/firestore'
import React,{useState} from 'react'
import {temp} from "../firebase"
import {storage} from "../firebase"
import { getDownloadURL, ref, uploadBytes} from "firebase/storage"

import "./Addpost.css"
import { Button, TextField,  } from '@mui/material'
function Addpost() {
  const[desc,setDesc]=useState(" ");
  const user=JSON.parse(localStorage.getItem("currentuser"))
  const username=localStorage.getItem("username")
  const userimage=JSON.parse(localStorage.getItem('userimage'))
//posts
const handlePostsubmit=(e)=>{
  e.preventDefault()
   console.log("done")
   setDesc(" ")
}

  //myprofile
  // const tempdata=query(tempcollect,where('userId','==',user.uid))
  // const[filedata,setFiledata]=useState("")

  // useEffect(() => {
  //     onSnapshot(tempdata,(e)=>{ 
  //         e.docs.map((s)=>{                             
  //             setFiledata(s.data().userImage)
  //         })
  //     })
  // },[])
///my profile
// console.log(filedata)/ 


const handleFile=(e)=>{
    const file=e.target.files[0]
  //   console.log(file.name)
  
  const storageRef = ref(storage,`images/${file.name}`);
  
   uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((e)=>{
        addDoc(temp,{
            img:e,
            userId:user.uid,
            description:desc,
            comment:[],
            likes:[],
            createdAt:Timestamp.now(), 
            userName:username,
            userImage:userimage.userImage ,
        })
        console.log("added")
      })
    });
  

}


  return (
      <div className="addpost-main">
      <form onSubmit={handlePostsubmit} className="addpost-form" >
        <h3 style={{paddingBottom:"10px",color:"#010101"}}>Let's Post something..</h3>
        <TextField
          size="small"
          label="Caption"
          style={{marginBottom:"18px"}}
          type="text" value={desc} onChange={(e)=>setDesc(e.target.value)}
        />
         <input type="file" onChange={handleFile} style={{color: "black"}}></input>
        <Button variant="contained" size="medium" onClick={handlePostsubmit}
        style={{backgroundColor:"black",color:"white",marginTop:"18px",marginBottom:"18px"}}>ADD POST</Button>
      </form>

    </div>
    );
}

export default Addpost;
