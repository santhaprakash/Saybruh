import { Grid, Paper } from '@mui/material';
import { onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Myprofile from '../Components/Myprofile';
import Photos from '../Components/Photos';
import Sidebar from '../Components/Sidebar';
import Story from '../Components/Story';
import { tempcollect } from '../firebase';
import "../Styles/Home.css"
function Home() {
      const user=JSON.parse(localStorage.getItem("currentuser"))
      const history =useHistory()
   
  
  return (
        <>
        {
              user?<>
              
              <div>
              <div className="home-header">
                   <Header />
              </div>

      <Grid container  >
            <Grid item xs={4.3} >
                  <Sidebar />                
            </Grid>
           <Grid item xs={4} >
                 <Story  />
                 <Paper 
                  style={{backgroundColor:"#010101"}} >
                    <Photos />
                 </Paper>
           </Grid>
           <Grid item xs={3.7} style={{position:"fixed",top:'100px',right:'0px',overflowY:'scroll',width:'420px',height:'100vh',overflowX:'hidden'}} >
                  <Paper >
                     <Myprofile />
                  </Paper>
           </Grid>
      </Grid>
              
      </div></>:history.push('/loginpage')
        }
      </>
  );
}

export default Home;
