import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "../components/toast";
import Dashboard from "../pages/index";
import SignIn from "../pages/login.js";
const Layout = () => {
  return (
    <main>
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
      </Switch>
    </main>
  );
};
export default Layout;
