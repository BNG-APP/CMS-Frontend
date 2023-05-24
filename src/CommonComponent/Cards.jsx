import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "35vh",
  },
  paper: {
    width: "200px",
    height: "100px",
    // padding: theme.spacing(12),
    margin: theme.spacing(4, 1),
    textAlign: "center",
  },
}));

export default function Card(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        style={props.style}
        onClick={props.handleClick}
      >
        <h1 className="text-xl font-semibold pt-8">{props.item}</h1>
      </Paper>
    </div>
  );
}
