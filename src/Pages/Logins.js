import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import "../Styles/Login.css"


function Logins() {
  
  const auth=getAuth()
 const[email,setEmail]=useState("")
 const[password,setPassword]=useState("")
 
 const history=useHistory()
 // login functionality
 


 const submitHandler=async(e)=>{
  e.preventDefault();
await signInWithEmailAndPassword(auth, email, password)
  .then((e)=>{
      localStorage.setItem('currentuser',JSON.stringify(e.user))
      history.push("/")
      alert("Loged in successfully")
  })
  .catch((e)=>{
      alert(e)
  })
  setEmail("")
  setPassword("")
 
}
const user = JSON.parse(localStorage.getItem("currentuser"))
  return (
  <>
  {
    user?history.push('/'):  <div className="main">
    <div className="submain">
    <form className="form" onSubmit={submitHandler}>
    <h2 style={{paddingBottom:"10px",color:"#010101"}}>Login Here</h2>
      <TextField
        InputProps={{
          endAdornment: <MailIcon />,
        }}
        size="small"
        label="Mail-id"
        sx={{color:"white"}}
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
      style={{backgroundColor:"black",color:"white",marginBottom:"18px"}}>Login</Button>

      <Button  variant="contained" size="medium" 
      style={{backgroundColor:"black",color:"white",marginBottom:"18px"}}>
        <Link to="/signuppage" style={{color:"white",textDecoration: "none"}}>
          Don't have an account Signup</Link></Button>
    </form>
    </div>
  </div>
  }
  
    </>
  );
}

export default Logins;
