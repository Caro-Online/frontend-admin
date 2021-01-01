import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '5rem',
    fontFamily: 'Poppins',
    fontWeight: 700,
    color: 'lightpink',
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>Admin Page</div>
    </div>
  );
};
export default Dashboard;
