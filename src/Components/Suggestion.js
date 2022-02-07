import React,{useState,useEffect} from 'react';
import {getDoc,doc, query, where, onSnapshot, updateDoc, arrayUnion} from "firebase/firestore"
import {tempcollect} from "../firebase"
import { Button, Grid, Paper, Typography,Card, Avatar} from '@mui/material';
import "./Suggestion.css"

function Suggestion() {
  const[suggested,setSuggested]=useState([])
  const user=JSON.parse(localStorage.getItem("currentuser"))

    const res=query(tempcollect,where('fruits','array-contains','apple'))
    const na=query(tempcollect,where('userId','!=',user.uid))
    const temp=query(tempcollect,where('userId','==',user.uid))
    const[editid,setEditid]=useState(0)

    // getting data 

    useEffect(()=>{
      onSnapshot(na,tempcollect,(e)=>{
          const data=[]
          e.docs.map((s)=>{
            data.push({...s.data(),id:s.id})
          })
          setSuggested(data)          
      })
  },[])   

  // follow handler 
  onSnapshot(temp,tempcollect,(e)=>{     
    e.docs.map((s)=>{
      setEditid(s.id)
    })
})
  const followHandler=(e)=>{
    console.log(editid)
  const docRef=doc(tempcollect,e.id)
  updateDoc(docRef,{
      followers:arrayUnion(user.uid),
  })
  const docRef2=doc(tempcollect,editid)
  updateDoc(docRef2,{
      folowing:arrayUnion(e.userId),
  })

}


  return (
 <>
 <Typography 
 style={{color: "#EA4C89",fontFamily: 'Lora',fontSize:"23px",marginBottom:"40px"}}
    >Let's Connect to the world...</Typography> 
    
    { 
                suggested
                .map((e,i)=>
                {   
                    var flag=0
                    return(                        
                        <Grid key={i} style={{marginBottom:"10px"}}>                       
                            {
                                e.followers.length ?     
                                e.followers.map((follow)=>{
                                if(follow===user.uid){
                                    flag=1
                                    
                                }
                                })                              
                                : null
                                }
  
                               {
                                   !flag?
                                        <Card  style={{padding:"10px",display:"flex",flexDirection:"row",justifyContent:"space-evenly",backgroundColor:"black"}} 
                                        spacing={3}>
                                           
                                           <Avatar style={{width:'37px',height:'37px'}} src={e.userImage}></Avatar>
                                          
                                          
                                       
                                          <Typography 
                                            style={{color:"#CBCCCE",fontFamily: 'Lora',fontSize:'20px'}}>{e.email.substring(0,e.email.length-10)}</Typography>
                                           
                                         
                                           
                                    <Button size="small" variant="outlined" 
                                    onClick={()=>followHandler(e)} style={{backgroundColor:"#EA4C89",color:'#CBCCCE',fontFamily:"'Lora', serif",width:'30px',height:'30px',padding:'7px'}}>follow</Button>
                                         
                                          
                                  </Card>    
                                      :null
                               }
                         </Grid>               
                    )
                })

            }
  </>
    )
}

export default Suggestion;
