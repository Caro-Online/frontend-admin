import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Chat from 'src/components/chat';
import AttendCard from 'src/components/matches/card/attend';
import MatchesHistoryList from 'src/components/matches/list';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import axiosInstance from 'src/services/api';
import Skeleton from '@material-ui/lab/Skeleton';
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
  const [room, setRoom, isLoading] = useRoomDetailApi(matchId);
  const [matches, setMatch, isLoadingMatches] = useMatchListApi(matchId);
  const [curMatch, setCurMatch] = useState(null);
  const playerInfo = (index, match) => {
    if (match) {
      console.log(`playerInfo`, match);
      const iPlayer = match?.players?.length > index && match?.players[index];
      const player = {
        ...iPlayer,
      };
      return player;
    }
    const iPlayer = room?.players?.length > index && room?.players[index];
    const player = {
      ...iPlayer,
    };
    return player;
  };
  const onUpdateMatch = (match) => {
    setCurMatch(match);
    console.log('onUpdateMatch', match);
  };
  const audiences = (room) => {
    const audiences = room?.audiences ?? [];
    const users = room?.players?.map((player) => player?.user) ?? [];
    return [...users, ...audiences];
  };
  useEffect(() => {
    const match = matches?.length && matches[0];
    onUpdateMatch(match);
  }, [matches]);
  return (
    <div className={classes.root}>
      <Grid className={classes.header} container spacing={3}>
        <Grid className={classes.userHeader} item xs={12} sm={5}>
          {isLoading ? (
            <Skeleton variant="rect" width={210} height={118} />
          ) : (
            <AttendCard
              player={playerInfo(0, curMatch)}
              winner={curMatch?.winner}></AttendCard>
          )}
        </Grid>
        <Grid className={classes.userHeader} item xs={12} sm={2}>
          <div className={classes.summary}>
            <AccessTimeIcon />
            <span style={{ marginTop: 8 }}>{room?.status ?? '_'}</span>
          </div>
        </Grid>
        <Grid className={classes.userHeader} item xs={12} sm={5}>
          {isLoading ? (
            <Skeleton variant="rect" width={210} height={118} />
          ) : (
            <AttendCard
              player={playerInfo(1, curMatch)}
              winner={curMatch?.winner}></AttendCard>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.content} container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Chat users={audiences(room)}></Chat>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} variant="outlined" elevation={0}>
            Danh sách các ván đấu
          </Paper>
          <MatchesHistoryList
            matches={matches}
            isLoading={isLoadingMatches}
            onSelect={onUpdateMatch}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default MatchDetails;

export const useRoomDetailApi = (id) => {
  const [match, setMatch] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRoomDetail = (id) => {
      if (!id) return;
      setIsLoading(true);
      axiosInstance
        .get(`/room/${id}/detail`)
        .then((res) => {
          const data = res.data;
          setMatch(data.room);
          setIsLoading(false);
          console.log(`getRoomDetail`, data);
        })
        .catch((err) => console.error(err));
    };
    getRoomDetail(id);
    // Passing URL as a dependency
  }, [id]);

  // Return 'isLoading' not the 'setIsLoading' function
  return [match, setMatch, isLoading];
};

export const useMatchListApi = (roomId) => {
  const [matches, setMatches] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMatchesList = (roomId) => {
      setIsLoading(true);
      axiosInstance
        .get(`/match`, {
          params: {
            roomId,
          },
        })
        .then((res) => {
          const data = res.data;
          setMatches(data.matches);
          setIsLoading(false);
          console.log(`getMatchesList`, data);
        })
        .catch((err) => console.error(err));
    };
    getMatchesList(roomId);
    // Passing URL as a dependency
  }, [roomId]);

  // Return 'isLoading' not the 'setIsLoading' function
  return [matches, setMatches, isLoading];
};
