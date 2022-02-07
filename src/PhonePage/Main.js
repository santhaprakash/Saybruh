import { makeStyles } from "@mui/styles";
import React from "react";
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
function Main() {
  const history = useHistory();
  const user = localStorage.getItem("currentuser");

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
    tab: {
      "@media (min-width:321px)": {
        margin: "0 -12px 0 -12px !important",
      },
      "@media (max-width:320px)": {
        margin: "0 -14px 0 -14px !important",
      },
      "@media (min-width:350px)": {
        margin: "0 -10px 0 -10px !important",
      },
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
          <TabPanel value={value} index={1}>
            <Gallery />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Chat />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Addpost />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Myprofile />
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
            <Tab
              icon={
                <CollectionsIcon
                  style={{ color: "#f1cf41", fontSize: "28px" }}
                />
              }
              aria-label="phone"
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              icon={<DuoIcon style={{ color: "#f1cf41", fontSize: "28px" }} />}
              aria-label="favorite"
              {...a11yProps(2)}
              className={classes.tab}
            />
            <Tab
              icon={
                <PostAddIcon style={{ color: "#f1cf41", fontSize: "28px" }} />
              }
              aria-label="person"
              {...a11yProps(3)}
              className={classes.tab}
            />
            <Tab
              icon={
                <AccountBoxIcon
                  style={{ color: "#f1cf41", fontSize: "28px" }}
                />
              }
              aria-label="person"
              {...a11yProps(4)}
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
