import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  InputBase,
  Typography,
  Box,
  Paper,
  Badge,
  Avatar,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: 'black',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
}))((props) => <Tab disableRipple {...props} />);
const StyledBadge = withStyles((theme) => ({
  badge: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    position: 'relative',
  },
  rootInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '47vw',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ecf0f1',
    height: '40px',
    borderRadius: '20px',
    margin: theme.spacing(0, 1, 1),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
  },
  typingChat: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  contentChat: {
    position: 'relative',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}>
        <StyledTab
          classes={{ wrapper: classes.wrapper }}
          icon={
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot">
              <Avatar
                alt="Remy Sharp"
                src="https://64.media.tumblr.com/f6514ff303f6a7e6cc2aea9783c0b676/tumblr_inline_pgpymmeSG41rl9zyi_400.gifv"
              />
            </StyledBadge>
          }
          label={<span style={{ marginLeft: 8 }}>Van Hiep</span>}
          {...a11yProps(0)}
        />
        <StyledTab
          classes={{ wrapper: classes.wrapper }}
          icon={
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot">
              <Avatar
                alt="Remy Sharp"
                src="https://64.media.tumblr.com/f6514ff303f6a7e6cc2aea9783c0b676/tumblr_inline_pgpymmeSG41rl9zyi_400.gifv"
              />
            </StyledBadge>
          }
          label={<span style={{ marginLeft: 8 }}>Van Hiep</span>}
          {...a11yProps(1)}
        />
        <StyledTab
          classes={{ wrapper: classes.wrapper }}
          icon={
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot">
              <Avatar
                alt="Remy Sharp"
                src="https://64.media.tumblr.com/f6514ff303f6a7e6cc2aea9783c0b676/tumblr_inline_pgpymmeSG41rl9zyi_400.gifv"
              />
            </StyledBadge>
          }
          label={<span style={{ marginLeft: 8 }}>Van Hiep</span>}
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>

      <div className={classes.rootInput}>
        <InputBase
          className={classes.input}
          placeholder="Aa"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search">
          <SendIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
};
export default Chat;
