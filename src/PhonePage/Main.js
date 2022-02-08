import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    tabroot: {
      backgroundColor: "black",
      width: "100%",
    },
  
      "@media (min-width:390px) and (max-width:430px)": {
       tab:{
         margin:'0 -4px 0 -4px !important'
       }
      },
      "@media (min-width:370px) and (max-width:390px)": {
        tab:{
          margin:'0 -6px 0 -6px !important'
        }
       },
       "@media (min-width:355px) and (max-width:370px)": {
        tab:{
          margin:'0 -8px 0 -8px !important'
        }
       },
       "@media (max-width:355px)": {
        tab:{
          margin:'0 -12px 0 -12px !important'
        }
       },
  }));

  const classes = useStyles();

  return (
    <>
      {user ? (
        <Box style={{ overflow: "hidden" }}>
          <TabPanel value={value} index={0}>
            <Feed />
          </TabPanel>
         
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            className={classes.tabroot}
            indicatorColor="secondary"
            style={{ position: "fixed", bottom: "0", left: "0", right: "0" }}
          >
            <Tab
              icon={<HomeIcon style={{ color: "#f1cf41", fontSize: "28px" }} />}
              {...a11yProps(0)}
              className={classes.tab}
            />
           
          </Tabs>
        </Box>
      ) : (
        history.push("loginpage")
      )}
    </>
  );
}

export default Main;
