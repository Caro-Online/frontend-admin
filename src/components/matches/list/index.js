import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  Typography,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import dayjs from 'dayjs';
import Infinite from 'react-infinite';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '70vh',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const MatchesHistoryList = ({ matches, isLoading, onSelect }) => {
  const classes = useStyles();
  console.log(`MatchesHistoryList`, matches);

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Skeleton variant="rect" height={78} />
      ) : (
        <Infinite containerHeight={630} elementHeight={40}>
          {matches?.length &&
            matches.map((match, index) => (
              <ListItem button key={index} onClick={(e) => onSelect(match)}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Ván đấu ${index + 1}`}
                  secondary={dayjs(match?.createdAt).format('MMM d, YYYY')}
                />
                <Avatar
                  style={{ height: 30, backgroundColor: 'lightblue' }}
                  variant="rounded">
                  <span
                    style={{
                      fontSize: 15,
                      fontFamily: 'Poppins',
                      fontWeight: 800,
                    }}>
                    {match?.history?.length || 0}
                  </span>
                </Avatar>
              </ListItem>
            ))}
        </Infinite>
      )}
    </div>
  );
};

export default MatchesHistoryList;
