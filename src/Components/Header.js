import { Button, Typography } from '@mui/material';
import { onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { tempcollect } from '../firebase';
import "./Header.css"
function Header() {
  const history= useHistory()
  const user = JSON.parse(localStorage.getItem("currentuser"));
  const na=query(tempcollect,where("userId", "==", user.uid))
  const[image,setImage]=useState("")
  const[name,setName]=useState()
  useEffect(() => {
    onSnapshot(na,(e)=>{
      e.docs.map((s)=>{
        setImage(s.data().userImage)
        setName(s.data().userName)
      })
    })
  })
  const post = {
    userImage:
      image
  };
  localStorage.setItem("userimage", JSON.stringify(post));
  localStorage.setItem("username",name)
  
  const handleLogout = () => {
    localStorage.removeItem("currentuser");
    history.push("/loginpage");
  };
  return (
      <div className="header-main" 
      style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent: 'Space-around',width:'100vw'}}>
         <div >
           <Link to={'/'} style={{textDecoration: "none" }}>
           <Button  style={{textDecoration: "none" ,fontSize:'19px'}}>Home</Button>
           </Link>
           </div>
           <div>
             <Link to={'/chat'} style={{textDecoration: "none"}}>
           <Button style={{fontSize:'19px' }}>chat</Button>
           </Link>
           </div>
           <div>
           <Typography>Welcome {name}</Typography>
           </div>
           <div >
          <img src={image} alt="" className="header-avatar div1"></img>
          <button style={{color:'white',backgroundColor:'#EEC312',padding:'7px'}} onClick={handleLogout}
          className="div2">Logout</button>
          </div>
      </div>
  )
}

export default Header;
