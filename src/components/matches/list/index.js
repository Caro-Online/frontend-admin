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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

function renderRow(props) {
  const { index, style, data } = props;
  const item = data[index];
  console.log(`renderRow`, item);
  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Ván đấu ${index + 1}`}
        secondary={dayjs(item?.createdAt).format('MMM d, YYYY')}
      />
      <Avatar
        style={{ height: 30, backgroundColor: 'lightblue' }}
        variant="rounded">
        <span style={{ fontSize: 15, fontFamily: 'Poppins', fontWeight: 800 }}>
          {item?.history?.length || 0}
        </span>
      </Avatar>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const MatchesHistoryList = ({ matches, isLoading }) => {
  const classes = useStyles();
  console.log(`MatchesHistoryList`, matches);
  return (
    <div className={classes.root}>
      {isLoading ? (
        <Skeleton variant="rect" height={78} />
      ) : (
        <FixedSizeList
          height={630}
          itemSize={80}
          itemCount={matches?.length || 1}
          itemData={matches}
          isLoading={isLoading}>
          {renderRow}
        </FixedSizeList>
      )}
    </div>
  );
};

export default MatchesHistoryList;
