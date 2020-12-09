import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "../components/toast";
import Dashboard from "../pages/index";
import SignIn from "../pages/login.js";
import PrivateRoute from "../routes/private";
import { AuthContext } from "../context/auth";
const Layout = () => {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    console.log(`setTokens`, data);
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <main>
        <ToastContainer />
        <Router>
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </Router>
      </main>
    </AuthContext.Provider>
  );
};
export default Layout;
