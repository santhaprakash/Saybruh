import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Header.css"
function Header() {
  const history= useHistory()
  const username = localStorage.getItem("username")
  const userimage = JSON.parse(localStorage.getItem("userimage"))
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
