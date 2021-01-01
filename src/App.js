import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { AuthContext } from 'src/context/auth';
import { ToastContainer } from 'src/components/toast';
import axiosInstance from 'src/services/api';
const App = () => {
  const [authTokens, setAuthTokens] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const setTokens = (data) => {
    console.log(`setTokens`, data);
    if (data) {
      localStorage.setItem('token', data);
      setAuthTokens(data);
      return;
    }
    // setToken(data);
    // if (!authTokens) navigate('/login');
  };
  const setUser = (data) => {
    console.log('setUserInfor', data);
    if (data) {
      localStorage.setItem('__user', JSON.stringify(data));
      setUserInfo(data);
    }
  };
  // ! ALERT: Do so bad - cant logout
  const currentTokens = localStorage.getItem('token');
  console.log('currentToken');
  if (!authTokens) setTokens(currentTokens);
  // const routing = useRoutes(routes(currentTokens));
  const routing = useRoutes(routes(authTokens));

  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${authTokens}`;
  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens: setTokens,
        userInfo,
        setUserInfo: setUser,
      }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastContainer />
        {routing}
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
