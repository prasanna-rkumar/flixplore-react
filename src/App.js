import React, { Component } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import logo from "./assets/popcorn.png";

import Home from './screens/Home'
import Movie from './screens/Movie'

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#152434",
    },
  },
});

export default class App extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="sticky">
          <Toolbar>
            <img
              src={logo}
              alt="logo"
              width={43}
              height={43}
              className="App-logo"
            />
            <Typography className="App-title">
              Flixplore
            </Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <Switch>
            <Route path="/movie/:movieID">
              <Movie />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}