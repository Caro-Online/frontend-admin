import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chat from 'src/components/chat';
import AttendCard from 'src/components/matches/card/attend';
import MatchesHistoryList from 'src/components/matches/list';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
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
    color: 'white',
    fontSize: 16,
    fontWeight: 900,
    backgroundColor: 'gold',
  },
  header: {
    height: '16vh',
  },
  userHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    height: '78vh',
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const MatchDetails = () => {
  let { matchId } = useParams();
  const classes = useStyles();
  const [match, setMatch, isLoading] = useMatchDetailApi(matchId);
  return (
    <div className={classes.root}>
      <Grid className={classes.header} container spacing={3}>
        <Grid className={classes.userHeader} item xs={12} sm={5}>
          <AttendCard></AttendCard>
        </Grid>
        <Grid className={classes.userHeader} item xs={12} sm={2}>
          <div className={classes.summary}>
            <AccessTimeIcon />
            <span style={{ marginTop: 8 }}>Đang diễn ra</span>
          </div>
        </Grid>
        <Grid className={classes.userHeader} item xs={12} sm={5}>
          <AttendCard></AttendCard>
        </Grid>
      </Grid>
      <Grid className={classes.content} container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Chat></Chat>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} variant="outlined" elevation={0}>
            Danh sách các ván đấu
          </Paper>
          <MatchesHistoryList />
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
