import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardMedia,
  Badge,
  Typography,
  IconButton,
  Divider,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  AccessAlarm,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
} from '@material-ui/icons';
import axiosInstance from 'src/services/api';

const StyledBadge = withStyles((theme) => ({
  badge: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardContent: {
    padding: theme.spacing(0, 2),
  },
  rootActivity: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 193,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    paddingBottom: theme.spacing(0),
  },
  rootAvatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'absolute',
    top: -95,
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
  name: {
    marginTop: theme.spacing(10),
    fontWeight: 900,
  },
  emptyCard: {
    border: '1px solid lightgrey',
    minHeight: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const UserDetails = () => {
  const { userId } = useParams();
  const classes = useStyles();
  const theme = useTheme();

  // State will be changed if URL changes
  const [user, setUser, isLoading] = useUserDetailApi(userId);
  const [matches, setMatches, isLoadingMatches] = useMatchedHistoryApi(userId);
  const [userInfo, isLoadingUpdate] = useUpdateUserInfoApi(user);
  const onBlockUser = (user) => {
    console.log(`onBlockUser`, user);
    const isBlock = !user.isBlock;
    const updatedUser = Object.assign({}, user, { isBlock });
    setUser(updatedUser);
  };
  // Loading indicator
  if (isLoading)
    return (
      <div>
        <Skeleton variant="rect" height={118} />
      </div>
    );
  return (
    <div className={classes.root}>
      {!isLoading && user && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={(classes.card, 'rounded-dynamic')}>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-vector/watercolor-background_87374-69.jpg"
                title="Contemplative Reptile"
              />

              <CardContent className={classes.contentHeader}>
                <div className={classes.rootAvatar}>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant="dot">
                    <Avatar
                      className={classes.large}
                      alt="Remy Sharp"
                      src={
                        user.imageUrl
                          ? user.imageUrl
                          : 'https://64.media.tumblr.com/f6514ff303f6a7e6cc2aea9783c0b676/tumblr_inline_pgpymmeSG41rl9zyi_400.gifv'
                      }
                    />
                  </StyledBadge>
                </div>
                <Typography
                  className={classes.name}
                  gutterBottom
                  variant="h3"
                  component="h3">
                  {/* {userId} */}
                  {user.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card className={(classes.card, 'rounded-dynamic')}>
              <CardHeader
                title={
                  <Typography
                    variant="h3"
                    component="h5"
                    align="left"
                    style={{ fontWeight: 'bold' }}>
                    Intro
                  </Typography>
                }
              />
              <CardContent className={classes.cardContent}>
                {user.phone && (
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <AccessAlarm color="disabled" />
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant="subtitle1"
                        component="h5"
                        align="left">
                        <strong style={{ color: 'lightgray' }}>Phone</strong>:{' '}
                        {user.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <AccessAlarm color="disabled" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" component="h5" align="left">
                      <strong style={{ color: 'lightgray' }}>Email</strong>:{' '}
                      {user.email}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <AccessAlarm color="disabled" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" component="h5" align="left">
                      <strong style={{ color: 'lightgray' }}>Cup</strong>:{' '}
                      {user.cup}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <AccessAlarm color="disabled" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" component="h5" align="left">
                      <strong style={{ color: 'lightgray' }}>Won</strong>:{' '}
                      {user.matchHaveWon}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <AccessAlarm color="disabled" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" component="h5" align="left">
                      <strong style={{ color: 'lightgray' }}>
                        Match have played
                      </strong>
                      : {user.matchHavePlayed}
                    </Typography>
                  </Grid>
                </Grid>
                {user.currentRoom && (
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <AccessAlarm color="disabled" />
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant="subtitle1"
                        component="h5"
                        align="left">
                        <strong style={{ color: 'lightgray' }}>
                          Current Room
                        </strong>
                        : {user.currentRoom}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color={user?.isBlock ? 'primary' : 'secondary'}
                      fullWidth
                      onClick={(e) => onBlockUser(user)}>
                      <strong>
                        {user?.isBlock ? 'Bỏ chặn' : 'Chặn truy cập'}
                      </strong>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Card className={(classes.card, 'rounded-dynamic')}>
              <CardHeader
                title={
                  <Typography
                    variant="h3"
                    component="h5"
                    align="left"
                    style={{ fontWeight: 'bold' }}>
                    Matches
                  </Typography>
                }
              />
              <CardContent className={classes.cardContent}>
                {isLoadingMatches ? (
                  <Skeleton variant="rect" width={210} height={118} />
                ) : matches && matches.length > 0 ? (
                  matches.map((match) => (
                    <div key={match._id}>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                        align="left">
                        Jan 7, 2014
                      </Typography>
                      <Divider />
                      <Card className={classes.rootActivity}>
                        <CardMedia
                          className={classes.cover}
                          image="https://image.freepik.com/free-vector/watercolor-background_87374-69.jpg"
                          title="Live from space album cover"
                        />
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                              Live From Space
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary">
                              Mac Miller
                            </Typography>
                          </CardContent>
                          <div className={classes.controls}>
                            <IconButton aria-label="previous">
                              {theme.direction === 'rtl' ? (
                                <SkipNextIcon />
                              ) : (
                                <SkipPreviousIcon />
                              )}
                            </IconButton>
                            <IconButton aria-label="play/pause">
                              <PlayArrowIcon className={classes.playIcon} />
                            </IconButton>
                            <IconButton aria-label="next">
                              {theme.direction === 'rtl' ? (
                                <SkipPreviousIcon />
                              ) : (
                                <SkipNextIcon />
                              )}
                            </IconButton>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <Card className={classes.emptyCard}>
                    <Typography component="h5" variant="h5">
                      <strong style={{ color: 'lightgray' }}>Trống</strong>
                    </Typography>
                  </Card>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default UserDetails;
// Passing URL as a parameter
export const useUserDetailApi = (userId) => {
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
export const useMatchedHistoryApi = (userId) => {
  const [matches, setMatches] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMatchesByUserId = (userId) => {
      if (!userId) return;
      setIsLoading(true);
      axiosInstance
        .get(`/match/user/${userId}`)
        .then((res) => {
          const data = res.data;
          setMatches(data.matches);
          setIsLoading(false);
          console.log(`getMatchesByUserId`, data);
        })
        .catch((err) => console.error(err));
    };
    getMatchesByUserId(userId);
    // Passing URL as a dependency
  }, [userId]);

  // Return 'isLoading' not the 'setIsLoading' function
  return [matches, setMatches, isLoading];
};

export const useUpdateUserInfoApi = (user) => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const updateUserInfo = (user) => {
      if (!user) return;
      const userId = user._id;
      if (!userId) return;
      setIsLoading(true);
      axiosInstance
        .put(`/user/${userId}`, { user })
        .then((res) => {
          const data = res.data;
          setUserInfo(data.user);
          setIsLoading(false);
          console.log(`updateUserInfo`, data);
        })
        .catch((err) => console.error(err));
    };
    updateUserInfo(user);
    // Passing URL as a dependency
  }, [user]);

  // Return 'isLoading' not the 'setIsLoading' function
  return [userInfo, isLoading];
};
