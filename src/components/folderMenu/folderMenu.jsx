import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './folderMenu.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography 
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='{classes.root} offersMenu'>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs} 
      >
        <Tab label="Pendientes" {...a11yProps(0)} />
        <Tab label="En revisión" {...a11yProps(1)} />
        <Tab label="Rechazados" {...a11yProps(2)} />
        
      </Tabs>
      <TabPanel value={value} index={0} className="candidatesContainer">
        Pendientessñkjahgsklñadghasñlkdghñsalkdghñsagd
        Pendientessñkjahgsklñadghasñlkdghñsalkdghñsagd
        Pendientessñkjahgsklñadghasñlkdghñsalkdghñsagd
        Pendientessñkjahgsklñadghasñlkdghñsalkdghñsagd
        
        
      </TabPanel>
      <TabPanel value={value} index={1} className="candidatesContainer">
        En revisión
      </TabPanel>
      <TabPanel value={value} index={2} className="candidatesContainer">
        Rechazados
      </TabPanel>
      
    </div>
  );
}