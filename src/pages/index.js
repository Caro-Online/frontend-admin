import React from "react";
import { Button } from "@material-ui/core";
import { useAuth } from "../context/auth";
const Dashboard = () => {
  const { setAuthTokens } = useAuth();

  const logOut = () => {
    console.log("i was logout");
    setAuthTokens();
  };
  return (
    <div>
      <div>Admin Page</div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        color="secondary"
        onClick={logOut}
      >
        Log out
      </Button>
    </div>
  );
};
export default Dashboard;
