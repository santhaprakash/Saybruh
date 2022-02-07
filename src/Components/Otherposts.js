import { onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { temp } from '../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

function Otherposts({id}) {
    const na=query(temp,where('userId','==',id))
    const[mypost,setMypost]=useState([])
    useEffect(()=>{
    onSnapshot(na,(e)=>{
     const posts=[]
     e.docs.map((s)=>{
       posts.push({...s.data(),id:s.id})
     })
  setMypost(posts)
    })
    },[])
  return (
<>
<div style={{display:'grid',gridTemplateColumns:"repeat(3,0.5fr)",marginLeft:'20px'}}>
{mypost.length ?(mypost.map((e)=>{
      return(
      <div className="container">   
            <img src={e.img} style={{width:'180px',height:'180px',borderRadius:'5px'}}></img>
            <div style={{display:'flex',flexDirection:'row'}} className="overlay overlay-left "> 
              <FavoriteIcon style={{color:'white',fontSize:"25px"}} className="overlay-text"/>
              <h2 style={{color:'white',fontSize:"25px",marginTop:'-8px'}} className="overlay-text2">{e.likes.length}</h2>
              <ModeCommentIcon style={{color:'white',fontSize:"25px"}} className="overlay-text3"/>
              <h2 style={{color:'white',fontSize:"25px",marginTop:'-8px'}} className="overlay-text4">{e.comment.length}</h2>
              </div>   
      </div>
      )
    })
 ):(
 <h2 style={{color:"white",marginLeft:"120px"}}>No posts yet..!</h2>
  )
  }
  </div>
</>
  )
}

export default Otherposts;
