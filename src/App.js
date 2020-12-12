import React, { Component } from "react";
import "./App.css";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Grid,
  Backdrop,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import logo from "./assets/popcorn.png";

import genres from "./constants/genres.json";
import languages from "./constants/languages.json";
import { ViewState } from "./ViewState";
import MovieListTile from './components/movie_list_tile'
import SelectComponent from './components/select_component'

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

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    paddingLeft: 8,
    fontWeight: "bold",
    fontSize: 28,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
    marginLeft: 16,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  actionButton: {
    width: "100%",
    padding: "0px 9px 0px 16px",
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.fetchRandomMovie = this.fetchRandomMovie.bind(this);
    var currentYear = new Date().getFullYear()
    this.years = [...Array(51).keys()].map(i => {
      var year = currentYear - i
      return ({
        id: year,
        label: `${year}`
      })
    })
  }

  state = {
    genre: "",
    language: "",
    year: "",
    viewState: ViewState.done,
    movieList: [],
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  fetchRandomMovie() {
    this.setState({
      viewState: ViewState.active,
    });
    fetch(
      `${process.env.REACT_APP_API_ROUTE}/random/list?language=${this.state.language}&year=${this.state.year}&genre=${this.state.genre}`
    )
      .then((resp) => {
        resp.json().then((message) => {
          if (message.status === 200) {
            console.log(message.data.results)
            this.setState({
              movieList: message.data.results,
              viewState: ViewState.done,
            });
          } else {
            this.setState({
              movieList: [],
              viewState: ViewState.done,
            });
          }
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
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
        </div>
        <Backdrop
          onClick={() => {
            this.setState({
              viewState: ViewState.idle,
            });
          }}
          style={{ zIndex: 5, color: "white" }}
          open={this.state.viewState === ViewState.active}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          style={{ padding: "0 8px 0 8px", marginTop: 32 }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            xl={6}
            lg={8}
            md={10}
            sm={10}
            xs={12}
            item
          >
            <Grid
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={1}
              xl={6}
              lg={8}
              md={10}
              xs={12}
              style={{ background: "rgba(20, 105, 195, 0.09)" }}
            >
              <SelectComponent
                className={classes.formControl}
                label="Genre"
                name="genre"
                value={this.state.genre}
                options={genres}
                handleChange={this.handleChange}
              />
              <SelectComponent
                className={classes.formControl}
                label="Language"
                name="language"
                value={this.state.language}
                options={languages}
                handleChange={this.handleChange}
              />
              <SelectComponent
                className={classes.formControl}
                label="Year"
                name="year"
                value={this.state.year}
                options={this.years}
                handleChange={this.handleChange}
              />

              <Grid item className="App-action-button">
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  onClick={this.fetchRandomMovie}
                >
                  Pick from Selection
                </Button>
              </Grid>
            </Grid>
            <Divider style={{ marginTop: 16, paddingTop: 2 }} orientation="horizontal" flexItem />
            <Grid
              item
              container
              xs={12}
              direction="column"
              justify={
                this.state.viewState === ViewState.idle
                  ? "center"
                  : "flex-start"
              }
              alignItems="stretch"
              style={{
                marginTop: 8,
                padding: 0
              }}
            >
              {this._renderMoviesList()}
            </Grid>
          </Grid>

        </Grid>
      </ThemeProvider>
    );
  }

  _renderMoviesList() {
    if (this.state.movieList.length === 0 || this.state.movieList.total_results === 0) {
      return <div>Let's explore Movies that you would love to watch</div>;
    } else {
      return ([...this.state.movieList.map((item, index) => <MovieListTile movie={item} />)])
    }
  }
}

export default withStyles(styles)(App);
