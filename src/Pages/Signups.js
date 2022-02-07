import { Button, TextField } from '@mui/material';
import React,{useState} from 'react';
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import {useHistory,Link} from "react-router-dom"
import {tempcollect} from "../firebase"
import {addDoc,Timestamp} from "firebase/firestore"
import MailIcon from "@mui/icons-material/Mail";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';

export default function Signups() {
  
      //signup functionality
      const auth=getAuth()
      const[username,setUsername]=useState("")
      const[email,setEmail]=useState("") 
      const[password,setPassword]=useState("")
      const history=useHistory()
    
      const submitHandler=async(e)=>{
          e.preventDefault()
          try{
          const res=await createUserWithEmailAndPassword(auth,email,password)
          localStorage.setItem('currentuser',JSON.stringify(res.user))
          await addDoc(tempcollect,{
              userId:res.user.uid,
              userName:username,
              email:email,
              date:Timestamp.now(),
              followers:[],
              folowing:[],
              stories:"",
              about:"",
              place:"India",
              userImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sf-YpPF_UUVW8Mf6c4EZQTozu8jxLVTIPA&usqp=CAU"
          })
           .then((e)=>{         
            const post={"userImage":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_sf-YpPF_UUVW8Mf6c4EZQTozu8jxLVTIPA&usqp=CAU"}
            localStorage.setItem('userimage',JSON.stringify(post))          
              history.push("/loginpage")
              alert("registered sucessfuuly")
           })              
          }
        catch (error){
            console.log(error)
        }
        setEmail(" ")
        setPassword(" ")
        setUsername("")
      }
      
  return (
            <div>
             <div className="main">
      <div className="submain">
      <form className="form" onSubmit={submitHandler}>
      <h2 style={{paddingBottom:"10px",color:"black"}}>Signup here</h2>
      <TextField
          InputProps={{
            endAdornment: <PersonIcon />,
          }}
          size="small"
          label="give any userName"
          style={{marginBottom:"18px"}}
          type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
        />
        <TextField
          InputProps={{
            endAdornment: <MailIcon />,
          }}
          size="small"
          label="Mail-id"
          style={{marginBottom:"18px"}}
          type="text" value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
        
          InputProps={{
            endAdornment: <VpnKeyIcon >
          </VpnKeyIcon>,
          }}
         
          label="Password"
          size="small"
          style={{marginBottom:"18px"}}
          type="text" value={password} onChange={(e)=>setPassword(e.target.value)}
        />
        <Button variant="contained" size="medium" onClick={submitHandler}
        style={{backgroundColor:"black",color:"white",marginBottom:"18px"}}>Sign up</Button>

        <Button  variant="contained" size="medium" 
        style={{backgroundColor:"black",color:"white",marginBottom:"18px"}}>
          <Link to="/loginpage" style={{color:"white",textDecoration: "none"}}>
            Already have an account Login</Link></Button>
      </form>
      </div>
    </div>

            </div>
  )

}
