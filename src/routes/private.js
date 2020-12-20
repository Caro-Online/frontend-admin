import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

function PrivateRoute({ element: Element, ...rest }) {
  const { authTokens } = useAuth();
  console.log(`PrivateRoute`, authTokens, Element, rest);
  return (
    // <Route
    //   {...rest}
    // render={(props) =>
    //   authTokens ? <Element {...props} /> : <Navigate to="/login" />
    // }
    // />
    <Route
      {...rest}
      children={(props) =>
        authTokens ? <Element {...props} /> : <Navigate to="/login" />
      }
    />
  );
}

export default PrivateRoute;
