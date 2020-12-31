import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
  CardActionArea,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      backgroundColor: '#E8FCF6',
    },
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(1, 2),
  },
  actions: {
    padding: theme.spacing(1, 2),
  },
}));

const MatchCard = ({ className, match, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const onClickDetail = (matchId) => {
    navigate(`/matches/${matchId}`);
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardActionArea onClick={(e) => onClickDetail(match._id)}>
        <CardContent className={classes.content}>
          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="caption">
            {match.roomId}
          </Typography>
          <Typography align="left" color="textPrimary" variant="h4">
            {match.name}
          </Typography>
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
        <Box p={1}>
          <Grid container justify="space-between" spacing={2}>
            <Grid className={classes.statsItem} item>
              <AccessTimeIcon
                fontSize="small"
                className={classes.statsIcon}
                color="action"
              />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2">
                {match.status}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <Button variant="outlined" color="secondary">
                Detail
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  );
};

MatchCard.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired,
};

export default MatchCard;
