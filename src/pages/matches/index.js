import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import MatchDetails from './id';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import MatchCard from 'src/components/matches/card';
import data from 'src/components/matches/data';
import axiosInstance from 'src/services/api';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  matchCard: {
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
}));
const AUTH_TOKEN = localStorage.getItem('token');
const Matches = () => {
  const classes = useStyles();
  const [products] = useState(data);
  const [matches, setMatches] = useState([]);
  const getMatchesList = () => {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${AUTH_TOKEN}`;
    axiosInstance
      .get('/room')
      .then((res) => {
        const data = res.data;
        setMatches(data.rooms);
        console.log(`getMatchesList`, data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getMatchesList();
  }, []);
  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Card>
          <CardContent className={classes.content}>
            <Typography
              className={classes.title}
              align="center"
              color="textPrimary"
              variant="h3">
              Danh sách các trận đấu
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={3}>
        <Grid container spacing={3}>
          {matches.map((match) => (
            <Grid item key={match._id} lg={4} md={6} xs={12}>
              <MatchCard className={classes.matchCard} match={match} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination color="primary" count={3} size="small" />
      </Box>
    </Container>
  );
};
export default Matches;
export { MatchDetails };
