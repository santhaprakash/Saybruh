import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Suggestion from "./Suggestion"
import Addpost from "./Addpost"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div>
   
    <Box
      sx={{ flexGrow: 1, display: 'flex' ,backgroundColor:"#010101"}}
      style={{position:"fixed",left:"0",height:'100vh'}}
    >
       
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider',marginTop:30,height:220 }}
      >
        <Tab icon={<PostAddIcon />} style={{ marginBottom:"60px"}} label="POST" {...a11yProps(0)} 
         sx={{
          color: "white",
        }}/>
        <Tab icon={<PersonAddIcon/>} label="ADD" {...a11yProps(1)}
         sx={{
          color: "white",
        }}/> 
      </Tabs>
      <TabPanel value={value} index={0}>
      <Addpost />
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Suggestion />
      </TabPanel>
    </Box>
       
    </div>
    </>
  );
}
