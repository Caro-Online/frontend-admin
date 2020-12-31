import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  Typography,
  ListSubheader,
  ListItemAvatar,
} from '@material-ui/core';
import { FixedSizeList } from 'react-window';

import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

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
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`Ván đấu ${index}`} secondary="Jan 9, 2014" />
      <ListSubheader color="primary" />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const MatchesHistoryList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={630} itemSize={80} itemCount={10}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default MatchesHistoryList;
