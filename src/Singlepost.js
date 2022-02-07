import React,{ useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
// import moment from 'moment'
import { doc, getDoc} from "firebase/firestore";
import {collect} from "./firebase"
import {useHistory} from "react-router-dom"

function Singlepost() {
  const history=useHistory()
    const {id}=useParams();
    const[task,setTask]=useState([{"createdAt":"ss"}])

    const docRef = doc(collect, id);
    useEffect(()=>{
     getDoc(docRef)
     .then((e)=>{
       const newData=e.data();
       setTask(newData);
     })
    },[id,docRef])
//    console.log(task.createdAt)
const user=JSON.parse(localStorage.getItem("currentuser"))
    if(user==null) {
      history.push("/login")
    }
   return(
       <div>
          <span>Book Name:</span>
           <h2>{task.title}</h2>
           <span>Cover page:</span>
           <br></br>
           <img src={task.pic} alt="" style={{width:"30%",height:"20%"}}></img>
           <br></br>
           <span>Category:</span>
           <h2>{task.category}</h2>
           <br></br>
           <span>Description:</span>
           <h3>{task.description}</h3>
           <br></br>
           <span>Page Count</span>
           <h5>{task.pgcount}</h5>
         {/* <h5>{moment(task.createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</h5> */}
         
       </div>
   )
}

export default Singlepost
