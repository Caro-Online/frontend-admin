import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
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
}));

const UserDetails = () => {
  let { userId } = useParams();
  const classes = useStyles();

  const theme = useTheme();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="https://image.freepik.com/free-vector/watercolor-background_87374-69.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {userId} - User Details Page
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardHeader
              title={
                <Typography
                  variant="h3"
                  component="h5"
                  align="left"
                  style={{ fontWeight: 'bold' }}>
                  Information
                </Typography>
              }
            />
            <CardContent className={classes.cardContent}>
              {/* <Typography gutterBottom variant="h5" component="h2">
                {userId} - User Details Page
              </Typography> */}
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <AccessAlarm color="disabled" />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" component="h5" align="left">
                    Cúp: 200
                  </Typography>
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <AccessAlarm color="disabled" />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" component="h5" align="left">
                    Cúp: 200
                  </Typography>
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <AccessAlarm color="disabled" />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" component="h5" align="left">
                    Cúp: 200
                  </Typography>
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <AccessAlarm color="disabled" />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" component="h5" align="left">
                    Cúp: 200
                  </Typography>
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <AccessAlarm color="disabled" />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" component="h5" align="left">
                    Cúp: 200
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            {Array.from(Array(5), (e, i) => (
              <div key={i}>
                <Typography color="textSecondary" variant="body2" align="left">
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default UserDetails;
