import React, { useState } from 'react';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../services/auth';
import { notify } from '../components/toast';
import { useAuth } from '../context/auth';
import { Navigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.common.white,
  },
  cardTitleHeader: {
    display: 'flex',
    justifyContent: 'center',
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
    color: '#3B5998',
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens, setUserInfo } = useAuth();
  const referer = props.location?.state?.referer || '/';

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
        notify('Logins success!', 'success');
        // Todo: Save cookie in here then do authentication
        const accessToken = res.data.accessToken;
        const admin = res.data.admin;
        setAuthTokens(accessToken);
        setUserInfo(admin);
        setLoggedIn(true);
      })
      .catch((error) => {
        setIsLoading(false);
        notify(error.message, 'error');
        console.error(error);
      });
  };

  if (isLoggedIn) {
    return <Navigate to={referer} />;
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
                variant="h5">
                Log in
              </Typography>
            }></CardHeader>
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
                alignItems="center">
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
                disabled={isLoading}>
                Log in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
