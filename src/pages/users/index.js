import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Results from 'src/components/users/results';
import Toolbar from 'src/components/users/toolbar';
import data from 'src/components/users/data';
import UserDetails from './id';
import { axiosInstance } from 'src/services/api';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AUTH_TOKEN = localStorage.getItem('token');
const CustomerListView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const getUsersList = () => {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${AUTH_TOKEN}`;
    axiosInstance
      .get('/user')
      .then((res) => {
        const data = res.data;
        setUsers(data.users);
        console.log(`getUsersList`, users);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <Container maxWidth={false}>
      <Toolbar />
      <Box mt={3}>
        <Results users={users} />
      </Box>
    </Container>
  );
};

export default CustomerListView;

export { UserDetails };
