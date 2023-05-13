import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Paper, Typography } from "@material-ui/core";
import backgroundImage from "../../assets/background-Image.svg";
import { useNavigate } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(16, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    backgroundColor: "white",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(0.5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
  }
  const handleSubmit=()=>{
    if(email=="Sonali.jain@blackngreen.com"&&password=="1234"){
      navigate("/home")
      localStorage.setItem("login",true)
    }
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10} sm={6} md={5}>
          <Paper className={classes.paper} elevation={10}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <form className={classes.form} noValidate onClick={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                label="Email Address"
                onChange={handleEmailChange}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                value={password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
               
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
