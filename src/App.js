import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { AuthContext } from 'src/context/auth';
import { ToastContainer } from 'src/components/toast';
const App = () => {
  const routing = useRoutes(routes);
  const [authTokens, setAuthTokens] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const setTokens = (data) => {
    console.log(`setTokens`, data);
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };
  const setUser = (data) => {
    console.log('setUserInfor', data);
    localStorage.setItem('__user', JSON.stringify(data));
    setUserInfo(data);
  };

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
