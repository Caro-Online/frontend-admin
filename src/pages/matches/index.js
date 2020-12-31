import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import MatchDetails from './id';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import MatchCard from 'src/components/matches/card';
import axiosInstance from 'src/services/api';
import Skeleton from '@material-ui/lab/Skeleton';
const AUTH_TOKEN = localStorage.getItem('token');
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
  emptyCard: {
    border: '1px solid lightgrey',
    minHeight: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const Matches = () => {
  const classes = useStyles();
  const [matches, setMatches, isLoading] = useMatchesListApi('');
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
          {isLoading ? (
            <Grid item lg={4} md={6} xs={12}>
              <Skeleton variant="rect" width={210} height={118} />
            </Grid>
          ) : matches && matches.length > 0 ? (
            matches.map((match) => (
              <Grid item key={match._id} lg={4} md={6} xs={12}>
                <MatchCard className={classes.matchCard} match={match} />
              </Grid>
            ))
          ) : (
            <Card className={classes.emptyCard}>
              <Typography component="h5" variant="h5">
                <strong style={{ color: 'lightgray' }}>Trống</strong>
              </Typography>
            </Card>
          )}
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
export const useMatchesListApi = (keyword = '') => {
  const [matches, setMatches] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const getMatchesList = () => {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${AUTH_TOKEN}`;
      axiosInstance
        .get('/room')
        .then((res) => {
          const data = res.data;
          setMatches(data.rooms);
          setIsLoading(false);
          console.log(`getMatchesList`, data);
        })
        .catch((err) => console.error(err));
    };
    getMatchesList(keyword);
    // Passing URL as a dependency
  }, [keyword]);

  // Return 'isLoading' not the 'setIsLoading' function
  return [matches, setMatches, isLoading];
};
