import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Results from './results';
import Toolbar from './toolbar';
import data from './data';
import UserDetails from './id';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  return (
    <Container maxWidth={false}>
      <Toolbar />
      <Box mt={3}>
        <Results customers={customers} />
      </Box>
    </Container>
  );
};

export default CustomerListView;

export { UserDetails };
