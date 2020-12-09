import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  SvgIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Facebook } from "../static/facebook.svg";
import { ReactComponent as Google } from "../static/google.svg";
import { useHistory } from "react-router-dom";
import { login, signinWithGoogle, signinWithFacebook } from "../services/auth";
import { notify } from "../components/toast";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useAuth } from "../context/auth";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.common.white,
  },
  cardTitleHeader: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 700,
  },
  cardHeader: {
    padding: theme.spacing(6, 2, 0),
  },
  cardContent: {
    paddingTop: theme.spacing(0),
  },
  googleButton: {},
  facebookButton: {
    color: "#3B5998",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();
  const referer = props.location?.state?.referer || "/";

  const responseGoogle = (response) => {
    console.log(`responseGoogle`, response);
    setIsLoading(true);
    const { tokenId } = response;
    signinWithGoogle(tokenId)
      .then((res) => {
        console.log(res.data);
        notify("Logins success!", "success");
        setAuthTokens(tokenId);
        setLoggedIn(true);
        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);
        notify(error.message, "error");
        console.error(error);
      });
  };

  const responseFacebook = (response) => {
    console.log(`responseFacebook`, response);
    const { userID, accessToken } = response;
    signinWithFacebook(userID, accessToken)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    };
    login(data)
      .then((res) => {
        setIsLoading(false);
        notify("Logins success!", "success");
        // Todo: Save cookie in here then do authentication
        const accessToken = res.data.accessToken;
        setAuthTokens(accessToken);
        setLoggedIn(true);
      })
      .catch((error) => {
        setIsLoading(false);
        notify(error.message, "error");
        console.error(error);
      });
  };

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }
  return (
    <Container maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Card>
          <CardHeader
            className={classes.cardHeader}
            title={
              <Typography
                className={classes.cardTitleHeader}
                component="h1"
                variant="h5"
              >
                Log in
              </Typography>
            }
          ></CardHeader>
          <CardContent className={classes.cardContent}>
            <form className={classes.form} noValidate>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                className={classes.submit}
                onClick={onSignIn}
                disabled={isLoading}
              >
                Log in
              </Button>
            </form>
          </CardContent>
          <CardActions>
            <GoogleLogin
              clientId="990188398227-bb3t5mt068kdj4350d3mvmqhcqeftkl8.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  size="large"
                  color="secondary"
                  className={classes.googleButton}
                  startIcon={
                    <SvgIcon>
                      <Google />
                    </SvgIcon>
                  }
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google
                </Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId="1088597931155576"
              fields="id,name,email"
              callback={responseFacebook}
              icon={
                <SvgIcon>
                  <Facebook />
                </SvgIcon>
              }
              render={(renderProps) => (
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  size="large"
                  className={classes.facebookButton}
                  startIcon={
                    <SvgIcon>
                      <Facebook />
                    </SvgIcon>
                  }
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  facebook
                </Button>
              )}
            />
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}
