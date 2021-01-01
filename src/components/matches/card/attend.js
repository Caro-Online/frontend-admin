import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  Badge,
  Avatar,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Divider,
} from '@material-ui/core';
const StyledBadge = withStyles((theme) => ({
  badge: {
    width: 8,
    height: 8,
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
    minWidth: 400,
    maxWidth: 450,
  },
  contentHeader: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: 8,
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rootList: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    paddingBottom: theme.spacing(1),
  },
  inline: {
    display: 'inline',
  },
  name: {
    fontWeight: 900,
    margin: 0,
  },
  paper: {
    height: 29,
  },
  status: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  information: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  informationMiddle: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    borderLeft: '2px solid lightgrey',
    borderRight: '2px solid lightgrey',
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyCard: {
    border: '1px solid lightgrey',
    minHeight: theme.spacing(10),
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const AttendCard = ({ player, isWinner }) => {
  const classes = useStyles();
  const user = player?.user;

  return (
    <>
      {user ? (
        <Card className={classes.root}>
          <CardContent className={classes.contentHeader}>
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <List className={classes.rootList}>
                  <ListItem alignItems="flex-start" dense>
                    <ListItemAvatar>
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
                            user?.imageUrl ||
                            'https://64.media.tumblr.com/f6514ff303f6a7e6cc2aea9783c0b676/tumblr_inline_pgpymmeSG41rl9zyi_400.gifv'
                          }
                        />
                      </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            className={classes.name}
                            gutterBottom
                            variant="h5"
                            component="h5">
                            {user?.name ?? '_'}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            Tập sự
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid className={classes.status} item xs={4}>
                {isWinner ? (
                  <Chip
                    color="primary"
                    label={
                      <span style={{ fontWeight: 700, color: 'white' }}>
                        Thắng
                      </span>
                    }
                  />
                ) : (
                  <Chip
                    color="secondary"
                    variant="outlined"
                    label={<span className={classes.name}>Thua</span>}
                  />
                )}
              </Grid>
              <Grid className={classes.information} item xs={4}>
                <div className={classes.summary}>
                  <span
                    style={{ color: 'grey', fontSize: 13, paddingBottom: 3 }}>
                    Số trận đã chơi
                  </span>
                  <strong>{user?.matchHavePlayed ?? '_'}</strong>
                </div>
              </Grid>
              <Grid className={classes.informationMiddle} item xs={4}>
                <div className={classes.summary}>
                  <span
                    style={{ color: 'grey', fontSize: 13, paddingBottom: 3 }}>
                    Số trận thắng
                  </span>
                  <strong>{user?.matchHaveWon ?? '_'}</strong>
                </div>
              </Grid>

              <Grid className={classes.information} item xs={4}>
                <div className={classes.summary}>
                  <span
                    style={{ color: 'grey', fontSize: 13, paddingBottom: 3 }}>
                    Số cup
                  </span>
                  <strong>{user?.cup ?? '_'}</strong>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.emptyCard}>
          <Typography component="h5" variant="h5">
            <strong style={{ color: 'lightgray' }}>Trống</strong>
          </Typography>
        </Card>
      )}
    </>
  );
};
export default AttendCard;
