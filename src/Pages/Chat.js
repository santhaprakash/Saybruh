import React, { useEffect, useState } from 'react';
import {getDoc, onSnapshot, query,updateDoc,where} from "firebase/firestore"
import {Avatar, Grid, Typography} from "@mui/material"
import { tempcollect,lastmsgs } from '../firebase';
import {  Card, Container } from '@mui/material';
import {db} from "../firebase"
import Moment from "react-moment";
import {  doc,   } from 'firebase/firestore';
import "../Components/Chat.css"
import Chatmessage from '../Components/Chatmessage';
function Chat() {
 
  
  
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
  return (
<>

<Container >
  <Grid container>
    <Grid item xs={5} style={{position:"fixed",top:'0px',left:'100px',
    overflowY:'scroll',width:'350px',height:'100vh',overflowX:'hidden'}}>
    <h2 style={{color:'#00c6ff',display:'flex',alignItems:'center',
    justifyContent: 'center',marginBottom:'30px',fontFamily: 'Lora'}}>Messages</h2>
  

    {
      chat.length>0 ?(
    chat.map((e)=>{
      
      return(
        <>
                {
                  
                    <Card style={{backgroundColor:'black',display: "flex", flexDirection: "row",height:'70px',width:'300px',cursor:"pointer"}} onClick={()=>handleSelected(e)}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent: 'center'}}>
                          <Avatar src={e.userImage} style={{marginRight:'15px',width:'33px',height:'33px'}} fontSize="large"></Avatar>
                        </div>
                          <div style={{display:'flex',flexDirection:'column',justifyContent: 'center'}}>
                   
                        <Typography style={{color: 'white',cursor:"pointer",fontFamily: 'EB Garamond',fontSize:'22px'}}  >{e.userName}</Typography>
              

                        {
                        lastdata && lastdata.map((v)=>{
                          return(
                            <>
                           {
                             v.to===user.uid && v.from ===e.userId?<>
                           <br/>{
                             v.read ?null:  <div style={{display:'flex',flexDirection: 'row',marginTop:'-45px'}}
                             onClick={()=>readHandler(v.id)}
                             >
                             <h6 style={{color:'#EA4C89'}}>New msg :  </h6>
                             <h5 style={{color:'white'}}>{  v.msg}</h5>
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
    }
        </>
      )
    })):(
      <h3 style={{color:'#00c6ff'}} >Follow friends to chat</h3>
    )
}
    
  
    </Grid>

    <Grid item xs={8} style={{position:"fixed",top:'0px',left:'500px',
    overflowY:'scroll',width:'800px',height:'90vh',overflowX:'hidden',marginRight:'50px'}}>
      {
        selected ? <>
       <Chatmessage newid={newid} newname={newname} newphoto={newphoto} selected={selected} />
       </>
        :<h4 style={{color:'#00c6ff',display:'flex',alignItems:'center',justifyContent: 'center'}}>Choose a friend to chat</h4>
      }
     
     </Grid>
  </Grid>
</Container>
</>
  );
}

export default Chat;
