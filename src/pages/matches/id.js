import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chat from 'src/components/chat';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    height: '90vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    height: '16vh',
  },
  content: {
    height: '78vh',
  },
}));

const MatchDetails = () => {
  let { matchId } = useParams();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid className={classes.header} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
      <Grid className={classes.content} container spacing={3}>
        <Grid item xs={12} sm={9}>
          {/* <Paper className={classes.paper}>xs=12</Paper> */}
          <Chat></Chat>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default MatchDetails;
