import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Chat from "./Chats";
import Gallery from "./Gallery";
import Myprofile from "../PhonePage/Myprofile";
import DuoIcon from "@mui/icons-material/Duo";
import { useHistory } from "react-router-dom";
import Addpost from "../PhonePage/Addpost.js";
import { onSnapshot, query, where } from "firebase/firestore";
import { tempcollect } from "../firebase";
function Main() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("currentuser"));

const homeRouter=()=>{
  history.push('/')
}
const galleryRouter=()=>{
  history.push('/gallery')
}
const postRouter=()=>{
  history.push('/addpost')
}
const chatRouter=()=>{
  history.push('/chat')
}
const profileRouter=()=>{
  history.push('/profile')
}
  return (
    <>
      {user ? (
        <> 
          <div style={{display: 'flex',flexDirection:'row',
          alignItems:'center',justifyContent: 'space-between',position:'fixed',bottom:'0',left:'0',right:'0',zIndex:'10000'}}T>
         <HomeIcon style={{fontSize:'35px'}} onClick={homeRouter}/>
         <CollectionsIcon style={{fontSize:'35px'}} onClick={galleryRouter}/>
         <PostAddIcon style={{fontSize:'35px'}} onClick={postRouter}/>
         <DuoIcon style={{fontSize:'35px'}} onClick={chatRouter}/>
         <AccountBoxIcon style={{fontSize:'35px'}} onClick={profileRouter}/>      
          </div>    
       </>
      ) : (
        history.push("loginpage")
      )}
    </>
  );
}

export default Main;
