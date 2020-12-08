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
// import { ToastContainer, toast } from "react-toastify";
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

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signIn = async (provider) => {
    setIsLoading(true);

    history.push("/dashboard");
  };

  const onFacebookSignIn = () => {
    signIn();
  };

  const onGoogleSignIn = () => {
    signIn();
  };

  const responseSuccessGoogle = (response) => {
    const { tokenId } = response;

    signinWithGoogle(tokenId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const responseFacebook = (response) => {
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
    // notify("hahaahah", "success");
    setIsLoading(true);
    const data = {
      email,
      password,
    };
    login(data)
      .then((res) => {
        setIsLoading(false);
        notify("Logins success!", "success");
        console.log(res);
        if (res.data) {
          history.push("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        notify(error.message, "error");
        console.error(error);
      });
  };

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
              onClick={onGoogleSignIn}
              disabled={isLoading}
            >
              Google
            </Button>
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
              onClick={onFacebookSignIn}
              disabled={isLoading}
            >
              facebook
            </Button>
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}
