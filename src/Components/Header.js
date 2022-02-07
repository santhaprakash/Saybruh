import { Button, Typography } from '@mui/material';
import { onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { tempcollect } from '../firebase';
import "./Header.css"
function Header() {
  const history= useHistory()
  const username = localStorage.getItem("username")
  const userimage = JSON.parse(localStorage.getItem("userimage"))
  const handleLogout = () => {
    localStorage.removeItem("currentuser");
    history.push("/loginpage");
  };
const user=JSON.parse(localStorage.getItem("currentuser"))
  let temp1=query(tempcollect,where('userId','==',user.uid))
  const[filedata,setFiledata]=useState("")
  const[filephoto,setFilephoto]=useState("")
  useEffect(() => {
        onSnapshot(temp1,(e)=>{ 
        e.docs.map((s)=>{ 
              setFiledata(s.data().userName)
              setFilephoto(s.data().userImage)
        })
        })
  },[])
if(filedata){
localStorage.setItem('username',filedata) 
}
if(filephoto){
  
  const post={"userImage":filephoto}
  localStorage.setItem('userimage',JSON.stringify(post)) 

}
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
           <Typography>Welcome {username}</Typography>
           </div>
           <div >
          <img src={userimage.userImage} alt="" className="header-avatar div1"></img>
          <button style={{color:'white',backgroundColor:'#EEC312',padding:'7px'}} onClick={handleLogout}
          className="div2">Logout</button>
          </div>
      </div>
  )
}

export default Header;
