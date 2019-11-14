import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { RouterLink } from "../../helpers";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
}));

export default function SignUp(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoggedIn: false
  });
  const { handleAction } = props;
  const classes = useStyles();

  const handleChange = ({ target }) => {
    const key = target["name"];
    setState(state => {
      return { ...state, [key]: target.value };
    });
  };

  const handleSumbit = e => {
    e.preventDefault();
    const data = {
      email,
      password
    };
    axios
      .post("/login", data)
      .then(({ data }) => {
        handleAction(data);
        setState({
          email: "",
          password: "",
          ...data
        });
      })
      .catch(err => console.log(err));
  };

  const { email, password, isLoggedIn } = state;

  if (isLoggedIn) {
    return <Redirect to="table" />;
  } else {
    return (
      <Container className={classes.container} component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSumbit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <Grid container justify="center">
            <Grid item>
              <Link
                variant="body1"
                color="textSecondary"
                to="/register"
                component={RouterLink}
              >
                Not registered yet? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}
