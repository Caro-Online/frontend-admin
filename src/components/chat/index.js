import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  InputBase,
  Typography,
  Box,
  TextField,
  Paper,
  Badge,
  Avatar,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
} from '@material-ui/core';

// import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '76vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    backgroundColor: '#efefef',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    backgroundColor: '#ecf3f5',
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  rootInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ecf0f1',
    height: '40px',
    borderRadius: '20px',
    margin: theme.spacing(1),
  },
  content: {
    position: 'relative',
  },
}));

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

const Chat = ({ users }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            {users?.length &&
              users.map((user, i) => (
                <ListItem key={i} button>
                  <ListItemIcon>
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot">
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          user?.imageUrl ??
                          'https://64.media.tumblr.com/f6514ff303f6a7e6cc2aea9783c0b676/tumblr_inline_pgpymmeSG41rl9zyi_400.gifv'
                        }
                      />
                    </StyledBadge>
                  </ListItemIcon>
                  <ListItemText primary={user?.name}>{user?.name}</ListItemText>
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item xs={9} className={classes.content}>
          <List className={classes.messageArea}>
            <ListItem key="1" className={classes.message}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
