import React from 'react'
import {collect,db,tempcollect} from "../firebase"
import {onSnapshot,addDoc,doc,deleteDoc,query,Timestamp,orderBy, updateDoc, getDoc} from "firebase/firestore"
import { useState,useEffect} from 'react';
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import moment from 'moment'


function Posts() {
    const[name,setName]=useState();
    const[desc,setDesc]=useState();
    const[img,setImg]=useState()
    const[res,setRes]=useState([])
    const[isediting,setIsEditing]=useState(false)
    const[editId,setEditId]=useState(null)
    const[search,setSearch]=useState('')
    const[type,setType]=useState("")
    const[cat,setCat]=useState('')
    const[page,setPage]=useState('')
    const[like,setLike]=useState(false)
    const[count,setCount]=useState(0)
    //fetching data from firebase
    const na=query(collect,orderBy('createdAt','desc'))
    const history=useHistory()

    useEffect(()=>{
        onSnapshot(na,collect,(e)=>{
            const posts=[]
            e.docs.map((s)=>{
              posts.push({...s.data(),id:s.id})
            })
            setRes(posts)
           
        })
    },[name,desc,img,page,type,na])    

    const user=JSON.parse(localStorage.getItem("currentuser"))
    // console.log(user.uid)
    if(user==null) {
      history.push("/login")
    }
    
   const logoutFun=()=>{
   localStorage.removeItem("currentuser")
   history.push("/login")
   }
 
    //delete handlers 
    const deleteHandler=((e)=>{
        console.log(e)
        const temp=doc(db,'posts',e)
        deleteDoc(temp)
        .then(()=>{
            setName(" ")
            setDesc(" ")
            setImg(" ")
            setCat(" ")
            setPage(" ")
        })
    })
    //edit handler
    const editHandler =((id)=>{
       const docRef=doc(collect,id)
        getDoc(docRef).then((e)=>{
          setName(e.data().title)
          setDesc(e.data().description)
          setImg(e.data().pic)
          setPage(e.data().pgcount)
          setCat(e.data().category)
        })
        // updateDoc(docRef,{
        //     title:"santha",
        //     description:"mm"
        // })
        setIsEditing(true)
        setEditId(id)    
    })
    //submit Handler
    const submitHandler=async(e)=>{
        e.preventDefault()
        if(name && desc && img && editId && isediting && cat && page){
           const docRef=doc(collect,editId)
              updateDoc(docRef,{
              title:name,
              description:desc,
              pic:img,
              pgcount:page,
              category:cat,
              likes:like,
              ref:user.uid
        })
        setName(" ")
        setDesc(" ")
        setImg(" ")
        setCat(" ")
        setPage(" ")
        }else{
  
        try {
            await addDoc(collect,{
              title: name,
              description: desc,
              pic: img,
              category:cat,
              pgcount:page,
              createdAt: Timestamp.now()
            });
            setName(" ")
            setDesc(" ")
            setImg(" ")
            setCat(" ")
            setPage(" ")
          } catch (e) {
            console.error("Error adding document: ", e);
          }
                    
        }
    
    }
    //const likehandler 
    
    const likeHandler=(e)=>{
      setLike(!like)
      
    
      console.log("matches")
      setCount(count+1)
      console.log(count)
      const docRef=doc(collect,e.id)
      updateDoc(docRef,{
        likes:like
  })
    

    if(like){
      const temp=doc(tempcollect,"likecount")
      getDoc(temp,{

      })
      updateDoc(temp,{
total:count
      })
    }
    setLike(!like)
    setCount(0)
    }
  
    return (
        <div>
          {
            user &&
            <h3>{user.email.substring(0,user.email.length-10)}</h3>
          }
          
         <button onClick={logoutFun}>Log out</button>
       
           {/* <button onClick={addData}>click here</button> */}
           <form onSubmit={submitHandler}>
           <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"></input>
           <select value={cat} onChange={(e)=>setCat(e.target.value)}>
               <option value="love">Love</option>
              <option value="sports">Sports</option>
              <option value="victory">Victory</option>
              <option value="business">Business</option>
            </select>
           <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description"></input>
           <input type="text" value={page} onChange={(e)=>setPage(e.target.value)} placeholder="Page count"></input>
           <input type="text" value={img} onChange={(e)=>setImg(e.target.value)} placeholder="url"></input>
           <button onSubmit={submitHandler}>submit</button>
           </form>
        
           <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search-here"></input>
           <select value={type} onChange={(e)=>setType(e.target.value)}>
               <option value="">All</option>
               <option value="love">Love</option>
              <option value="sports">Sports</option>
              <option value="victory">Victory</option>
              <option value="business">Business</option>
            </select>
           {
                   res.filter(e=>e.title.toLowerCase().includes(search))
                   .filter(e=>e.category.toLowerCase().includes(type))
                   .map((e)=>{
                       return(
                           <div key={e.id}> 
                            <h3>{e.description}</h3>
                               <h5>{e.title}</h5>
                               <Link to={`/posts/${e.id}`}>
                               <img src={e.pic} style={{width:"30%",height:"20%"}} alt=""></img>
                               </Link>
                              
                              <br></br>
                              <h5>{moment(e.createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</h5>
                               <button onClick={()=>deleteHandler(e.id)}>Delete</button>
                               <button onClick={()=>editHandler(e.id)}>edit</button>
                               <button onClick={()=>likeHandler(e)}>like</button>
                            </div>
                       )
                   })
               } 
               
           </div>

    )
}

export default Posts
