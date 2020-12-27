import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Card,
  CardHeader,
  CardActionArea,
  Avatar,
  CardContent,
  CardMedia,
  Badge,
  Typography,
  IconButton,
  Divider,
} from '@material-ui/core';
import {
  AccessAlarm,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
} from '@material-ui/icons';

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
    fontFamily: 'Poppins',
  },
}));

const UserDetails = () => {
  let { userId } = useParams();
  const classes = useStyles();

  const theme = useTheme();
  return (
    <div className={classes.root}>
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
                    src="https://64.media.tumblr.com/f6514ff303f6a7e6cc2aea9783c0b676/tumblr_inline_pgpymmeSG41rl9zyi_400.gifv"
                  />
                </StyledBadge>
              </div>
              <Typography
                className={classes.name}
                gutterBottom
                variant="h3"
                component="h3">
                {userId}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
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
              {/* <Typography gutterBottom variant="h5" component="h2">
                {userId} - User Details Page
              </Typography> */}

              {Array.from(Array(5), (e, i) => (
                <Grid key={i} container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <AccessAlarm color="disabled" />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1" component="h5" align="left">
                      Cúp: 200
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
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
              {Array.from(Array(5), (e, i) => (
                <div key={i}>
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
                        <Typography variant="subtitle1" color="textSecondary">
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
              ))}
            </CardContent>
          </Card>

          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default UserDetails;
