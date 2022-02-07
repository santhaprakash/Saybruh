import React, { useEffect, useState } from 'react';
import {getDoc, onSnapshot, query,updateDoc,where} from "firebase/firestore"
import {Avatar,  Typography} from "@mui/material"
import { tempcollect,lastmsgs } from '../firebase';
import {  Card,Container } from '@mui/material';
import {db, } from "../firebase"

import {  doc, } from 'firebase/firestore';

import {Link} from 'react-router-dom'
import "../Phonestyles/Addpoststyles.css"

function Chats() {
  
    //getting friends list
    const user=JSON.parse(localStorage.getItem('currentuser'));
    const na=query(tempcollect,where('userId','!=',user.uid))
    const [chat,setChat]=useState([])
    const[selected,setSelected]=useState("")
    useEffect(()=>{
      onSnapshot(na,tempcollect,(e)=>{
        const post=[]
        e.docs.map((s)=>{
  post.push({...s.data(),id:s.id})
        })
        setChat(post)
      })
    },[])
  const[lastdata,setLastdata]=useState([])
    useEffect(()=>{
      onSnapshot(lastmsgs,(e)=>{
        const post=[]
        e.docs.map((s)=>{
       post.push({...s.data(),id:s.id})
        })
       setLastdata(post)
      })
    },[])
  
    const[newid,setNewid]=useState("")
    const[newname,setNewname]=useState("")
    const[newphoto,setNewphoto]=useState(" ")
  
    const handleSelected=(e)=>{
      setSelected(e);
      setNewid(e.userId)
      setNewname(e.userName)
      setNewphoto(e.userImage)
    }
    const[lastmsg,setLastmsg]=useState({})
  
      const id=user.uid>newid ?`${user.uid+newid}`:`${newid+user.uid}`
    const getRef=doc(db,'lastmessage',id)
    
    useEffect(()=>{
      getDoc(getRef)
      .then((z)=>{
        setLastmsg(z.data())
      })
    })
  const readHandler=(e)=>{
    const readRef=doc(lastmsgs,e)
    updateDoc(readRef,{
      read:true
    })
  }
  
// console.log(selected)
const[search,setSearch]=useState('')

  return (
  <>
   <Container >

     <input className="chat-search" type="text" value={search} style={{fontSize:'13px'}}
     onChange={(e)=>setSearch(e.target.value)} placeholder="Search by username"/>
     <h3>Chats</h3>
     {
      chat.length>0 ?(
    chat.filter(z=>z.userName.toLowerCase().includes(search))
    .map((e)=>{
      
      return(
        <>
                {<>
                  <Link to={`/chat/${e.id}`} style={{textDecoration:'none'}}>
                    <Card style={{backgroundColor:'black',display: "flex", flexDirection: "row",height:'70px',cursor:"pointer"}}
                     onClick={()=>handleSelected(e)}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent: 'center'}} >
                          <Avatar src={e.userImage} style={{marginRight:'15px',width:'40px',height:'40px',marginTop:'-30px'}} ></Avatar>
                        </div>
                          <div style={{display:'flex',flexDirection:'column'}} >
                   
                        <Typography style={{color: 'white',cursor:"pointer",fontFamily: 'EB Garamond',fontSize:'20px'}}  >{e.userName}</Typography>
                    

                        {
                        lastdata && lastdata.map((v)=>{
                          return(
                            <>
                           {
                             v.to===user.uid && v.from ===e.userId?<>
                        {
                             v.read ?<>
                             
                             </>
                             :  <div style={{display:'flex',flexDirection: 'row',marginTop:'-27px'}}
                             onClick={()=>readHandler(v.id)}
                             >
                             <h6 style={{color:'#EA4C89'}}>New msg :  </h6>
                             <h6 style={{color:'white'}}>{  v.msg}</h6>
                      </div>
                           }
                             </>:null
                           }
                            </>
                          )
                        })
                      }
                      </div>
                </Card>
                </Link>
                </>
    }
        </>
      )
    })):(
      <h3 style={{color:'#00c6ff'}} >Follow friends to chat</h3>
    )
}

   </Container>
  </>
  );
}

export default Chats;
