import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import Posts from './page/Posts';
import Logins from './Pages/Logins';
import Signups from './Pages/Signups';
import Home from './Pages/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Friendprofile from './Pages/Friendprofile';
import Chat from './Pages/Chat';
import Main from './PhonePage/Main';
import Phonelogin from './PhonePage/Phonelogin';
import Phonesignup from './PhonePage/Phonesignup';
import Friend from './PhonePage/Friend';
import Message from './Phonecomponents/Message';
const theme = createTheme({
   palette: {
     primary: {
       main: '#EA4C89',
     },
     secondary: {
      main: '#EEC312',
    },

   },
   typography:{
      fontFamily:'Lora'
   },
   
 });

 function getWindowDimensions() {
   const { innerWidth: width, innerHeight: height } = window;
   return {
     width,
     height
   };
 }

function useWindowDimensions() {
   const [windowDimensions, setWindowDimensions] = useState(
     getWindowDimensions()
   );
 
   useEffect(() => {
     function handleResize() {
       setWindowDimensions(getWindowDimensions());
     }
 
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   },[]);
 
   return windowDimensions;
 }

  
function App() {

  const {width}=useWindowDimensions()
  {
     if(width>480){
      return(
         <>
       <ThemeProvider theme={theme}>
       <Router>
          <Switch>
               <Route exact path='/chat'>
                   <Chat />
                </Route>
                {/* <Route exact path="/posts">      
                  <Posts />        
                </Route> */}
                <Route exact path="/loginpage">
                   <Logins />
                </Route>
                <Route exact path="/signuppage">
                   <Signups />
                </Route>
                <Route exact path="/">
                   <Home />
                </Route>
                <Route exact path="/:id">
                   <Friendprofile />
                </Route>
               
          </Switch>
          </Router>
          </ThemeProvider>
          </>
      )
   }else{
   
      return(
        <>
        <ThemeProvider theme={theme}>
        <Router>
           <Switch>       
               <Route exact path="/loginpage">
                 <Phonelogin />
               </Route>
               <Route exact path="/signuppage">
                 <Phonesignup />
               </Route>
               <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/:id">
                <Friend />
              </Route>
              <Route exact path="/chat/:id">
               <Message />
              </Route>
           </Switch>
           </Router>
           </ThemeProvider>
           </>
      )
   }
}

}

export default App;