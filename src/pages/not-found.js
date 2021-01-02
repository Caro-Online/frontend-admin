import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1rem',
    fontFamily: 'Poppins',
    fontWeight: 300,
    color: 'lightpink',
  },
  code: {
    fontSize: '5rem',
    fontFamily: 'Poppins',
    fontWeight: 700,
    color: 'lightpink',
  },
}));
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.code}>404</div>
      <div className={classes.title}>Page not found</div>

      <Button link variant="contained" color="primary" href="/">
        Home
      </Button>
    </div>
  );
};
export default NotFound;
