import { Button, Container } from '@mui/material';
import React, { useEffect, useState ,useRef} from 'react';
import {db} from "../firebase"
import {Avatar} from "@mui/material"
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import "./Chat.css"
function Chatmessage({selected,newid,newname,newphoto}) {

  const scrollRef=useRef()
  const[text,setText]=useState("")
  //userName
  const user1=JSON.parse(localStorage.getItem("currentuser"))
  const user2=newid
  //userImage
  const photo1=JSON.parse(localStorage.getItem("userimage"))
  const photo2=newphoto

  const handleSubmit=(e)=>{
    e.preventDefault();

  }
  const submitHandler=async()=>{
    if(text==="" || text===" "){
      return 
    }else{
    const id=user1.uid>user2 ?`${user1.uid+user2}`:`${user2+user1.uid}`
    const docRef=collection(db,'messages',id,'chat')
    await addDoc(docRef,{
      from:user1.uid,
      to:user2,
      msg:text,
      createdAt:Timestamp.fromDate(new Date())
    })
    const addRef=doc(db,'lastmessage',id)
    await setDoc(addRef,{
      from:user1.uid,
      to:user2,
      msg:text,
      createdAt:Timestamp.fromDate(new Date()),
      read:false
    })
    console.log('added')
    setText("")
    }
    }

    const[msgdata,setMsgdata]=useState([])
  
    const id=user1.uid>user2 ?`${user1.uid+user2}`:`${user2+user1.uid}`
    const msgRef=collection(db,'messages',id,'chat')
    const na2=query(msgRef,orderBy('createdAt','asc'))
 
    useEffect(() => {
      onSnapshot(na2,(e)=>{
        const post=[]
        e.docs.map((z)=>{
          post.push({...z.data()})
        })
      setMsgdata(post)
      })
     
    },[id])

    
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[msgdata])
  return (
  <>
   <h2 style={{color:'#00c6ff',position:'fixed',top:'10px',left:'850px'}} >{selected.userName}</h2>

<>
   <div style={{display:'flex',flexDirection: 'column',marginTop:'70px'}}>
     <Container >
      
            { 
              msgdata.map((h)=>{
                return(
                  <>
                  {
                    <div >
                      {h.from===user1.uid?(<>
                      <div style={{display:'flex',justifyContent:'flex-end'}} ref={scrollRef}>
                        <div style={{marginRight:'8px',marginTop:'-19px'}} >
                       <h3 style={{color:'white',fontFamily: 'EB Garamond'}} >{h.msg}</h3>
                       {/* <h6 style={{fontSize:'8px',marginTop:'-9px'}}><Moment fromNow>{h.createdAt.toDate()}</Moment></h6> */}
                       </div>
                       <Avatar style={{width:'27px',height:'27px'}} src={photo1.userImage}></Avatar>
                       </div>
                       </>) :(
                         <>
                         <div style={{display:'flex',justifyContent:'flex-start'}}>
                         <Avatar style={{width:'27px',height:'27px'}}src={photo2}></Avatar>
                         <div style={{marginLeft:'10px'}}>
                        <h3 style={{color:'white',fontFamily: 'EB Garamond',marginTop:'-1px'}}>{h.msg}</h3>           
                       {/* <h6 style={{fontSize:'8px',marginTop:'-9px'}}><Moment fromNow>{h.createdAt.toDate()}</Moment></h6> */}
                       </div>
                       </div>
                       </>)
                      }
                      
                    </div>
                  }
                  </>
                )
              })
            }
          
  </Container>
     <div style={{position:'fixed',bottom:'7px',left:'500px'}}>
       <form onSubmit={handleSubmit}>
       <input value={text} onChange={(z)=>setText(z.target.value)}
       className="chat-input"></input>
      <Button variant="contained" onClick={submitHandler} 
      style={{marginLeft:'5px',borderRadius:'18px',marginTop:'-5px',backgroundColor:"#00c6ff",color:'black'}} disabled={!text}>
        Send</Button>

       </form>        
     </div> 
   </div>
</>

  </>
    );
}

export default Chatmessage;
