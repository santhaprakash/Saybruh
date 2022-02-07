import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import { makeStyles } from "@mui/styles";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Mypost from "./Mypost";
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

function Mytab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const useStyles = makeStyles((theme) => ({
    tabname: {
      "@media (min-width:300px) and (max-width:320px)": {
        marginLeft: "80px !important",
      },
      "@media (min-width:321px) and (max-width:340px)": {
        marginLeft: "90px !important",
      },
      "@media (min-width:341px) and (max-width:370px)": {
        marginLeft: "100px !important",
      },
      "@media (min-width:371px) and (max-width:420px)": {
        marginLeft: "130px !important",
      },
      "@media (min-width:421px) and (max-width:460px)": {
        marginLeft: "150px !important",
      },
      "@media (min-width:461px) and (max-width:480px)": {
        marginLeft: "170px !important",
      },
    },
  }));

  const classes = useStyles();
  return (
    <>
      <Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="My posts"
              {...a11yProps(0)}
              style={{ color: "white",display: "flex"}}
              className={classes.tabname}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Mypost />
        </TabPanel>
      </Box>
    </>
  );
}

export default Mytab;
