import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chat from 'src/components/chat';
import axiosInstance from 'src/services/api';
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
  const [match, setMatch, isLoading] = useMatchDetailApi(matchId);
  return (
    <div className={classes.root}>
      <Grid className={classes.header} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Thông tin người thắng</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Thông tin người thắng</Paper>
        </Grid>
      </Grid>
      <Grid className={classes.content} container spacing={3}>
        <Grid item xs={12} sm={9}>
          <Chat></Chat>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>Thông tin chi tiết trận đấu</Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default MatchDetails;

export const useMatchDetailApi = (userId) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserDetail = () => {
      if (!userId) return;
      setIsLoading(true);
      axiosInstance
        .get(`/user/${userId}`)
        .then((res) => {
          const data = res.data;
          setUser(data.user);
          setIsLoading(false);
          console.log(`getUserDetail`, data);
        })
        .catch((err) => console.error(err));
    };
    getUserDetail();
    // Passing URL as a dependency
  }, [userId]);

  // Return 'isLoading' not the 'setIsLoading' function
  return [user, setUser, isLoading];
};
