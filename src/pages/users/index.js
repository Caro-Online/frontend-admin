import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Results from 'src/components/users/results';
import Toolbar from 'src/components/users/toolbar';
import UserDetails from './id';
import axiosInstance from 'src/services/api';
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
  const [search, setSearch] = useState();
  const [users, setUsers, isLoading] = useUserListApi(search);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [userInfo, isLoadingUpdate] = useUpdateUserInfoApi(updatedUser);
  const onSearch = (search) => {
    setSearch(search);
    console.log(`onSearch`, search);
  };
  const onBlock = (user) => {
    console.log(`onBlockUser`, user);
    const isBlock = !user.isBlock;
    const updatedUser = Object.assign({}, user, { isBlock });
    setUpdatedUser(updatedUser);
    const updatedUsers = users.map((userItem) => {
      if (userItem._id === updatedUser._id) {
        return updatedUser;
      }
      return userItem;
    });
    setUsers(updatedUsers);
  };
  return (
    <Container maxWidth={false}>
      <Toolbar onSearch={(e) => onSearch(e, search)} />
      <Box mt={3}>
        <Results
          users={users}
          isLoading={isLoading}
          onBlock={(user) => onBlock(user)}
        />
      </Box>
    </Container>
  );
};

export default CustomerListView;

export { UserDetails };

export const useUserListApi = (keyword = '') => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserList = (keyword) => {
      setIsLoading(true);
      axiosInstance
        .get(`/user`, {
          params: {
            keyword,
          },
        })
        .then((res) => {
          const data = res.data;
          setUsers(data.users);
          setIsLoading(false);
          console.log(`getUserList`, data);
        })
        .catch((err) => console.error(err));
    };
    getUserList(keyword);
    // Passing URL as a dependency
  }, [keyword]);

  // Return 'isLoading' not the 'setIsLoading' function
  return [users, setUsers, isLoading];
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
