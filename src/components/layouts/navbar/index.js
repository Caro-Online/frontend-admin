import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  ListItem,
  Button,
  Icon,
} from '@material-ui/core';
import {
  Target as TargetIcon,
  BarChart as BarChartIcon,
  User as UserIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon,
} from 'react-feather';
import NavItem from './nav-item';
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from 'src/context/auth';
const items = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/matches',
    icon: TargetIcon,
    title: 'Matches',
  },
  // {
  //   href: '/matches/123',
  //   icon: TargetIcon,
  //   title: 'Match Details',
  // },
  {
    href: '/users',
    icon: UsersIcon,
    title: 'Users',
  },
  // {
  //   href: '/users/123',
  //   icon: UsersIcon,
  //   title: 'User Details',
  // },
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: 'auto',
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { setAuthTokens } = useAuth();
  const logOut = () => {
    console.log('i was logout');
    setAuthTokens();
    localStorage.clear('token');
    window.location.reload();
  };
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const user = JSON.parse(localStorage.getItem('__user'));
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user?.avatar}
          to="/profile"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user?.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user?.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <ListItem disableGutters onClick={logOut}>
            <Button activeClassName={classes.active} className={classes.button}>
              <LogOutIcon className={classes.icon} size="20" />
              <span className={classes.title}>Logout</span>
            </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary">
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
