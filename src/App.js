import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { AuthContext } from 'src/context/auth';
import { ToastContainer } from 'src/components/toast';
const App = () => {
  const [authTokens, setAuthTokens] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const setTokens = (data) => {
    console.log(`setTokens`, data);
    localStorage.setItem('token', data);
    setAuthTokens(data);
    // if (!authTokens) navigate('/login');
  };
  const setUser = (data) => {
    console.log('setUserInfor', data);
    localStorage.setItem('__user', JSON.stringify(data));
    setUserInfo(data);
  };

  // const currentTokens = localStorage.getItem('token');
  // const routing = useRoutes(routes(currentTokens));
  const routing = useRoutes(routes(authTokens));
  const navigate = useNavigate();

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
