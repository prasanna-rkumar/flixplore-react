import React, { useState } from "react";
import {
  Button,
  Grid,
  Backdrop,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import {
  useHistory
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import genres from "../../constants/genres.json";
import languages from "../../constants/languages.json";
import { ViewState } from "../../ViewState";
import MovieListTile from './MovieListTile'
import SelectComponent from '../../components/SelectComponent'

import { API } from '../../api'

const useStyles = makeStyles({
  formControl: {
    margin: 8,
    minWidth: 60,
    marginLeft: 16,
  },
})

const currentYear = new Date().getFullYear()
const years = [...Array(51).keys()].map(i => {
  var year = currentYear - i
  return ({
    id: year,
    label: `${year}`
  })
})

var movieListG = []

export default function Home() {
  const classes = useStyles();
  let history = useHistory();

  const [genre, setGenre] = useState("")
  const [language, setLanguage] = useState("")
  const [year, setYear] = useState("")
  const [viewState, setViewState] = useState(ViewState.done)
  const [movieList, setMovieList] = useState(movieListG)

  function fetchRandomMovies() {
    setViewState(ViewState.active)
    API.movies(language, year, genre).then(movies => {
      setViewState(ViewState.done)
      movieListG = [...movies]
      setMovieList([...movieListG])
    }).catch(e => {
      setViewState(ViewState.done)
      setMovieList([])
    })
  }

  return (
    <div>
      <Backdrop
        onClick={() => {
          setViewState(ViewState.idle)
        }}
        style={{ zIndex: 5, color: "white" }}
        open={viewState === ViewState.active}
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
              value={genre}
              options={genres}
              handleChange={value => setGenre(value)}
            />
            <SelectComponent
              className={classes.formControl}
              label="Language"
              name="language"
              value={language}
              options={languages}
              handleChange={value => setLanguage(value)}
            />
            <SelectComponent
              className={classes.formControl}
              label="Year"
              name="year"
              value={year}
              options={years}
              handleChange={value => setYear(value)}
            />

            <Grid item className="App-action-button">
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                onClick={fetchRandomMovies}
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
              viewState === ViewState.idle
                ? "center"
                : "flex-start"
            }
            alignItems="stretch"
            style={{
              marginTop: 8,
              padding: 0
            }}
          >
            {movieList === undefined || movieList.length === 0
              ? <div>Let's explore Movies that you would love to watch</div>
              : ([...movieList.map((item, index) => <div key={item.id} onClick={() => history.push({
                pathname: "/movie/",
                state: {
                  movieID: item.id
                }
              })}>
                <MovieListTile movie={item} /></div>)])}
          </Grid>
        </Grid>
      </Grid>
      <footer style={{
        position: "absolute",
        bottom: 0,
        height: "2.5rem",
        paddingBottom: 72,
        left: "50%"
      }}>
        <Grid style={{ position: "relative" , left: "-50%"}} container direction="row" justify="center" alignItems="center" spacing={2} >
          <Grid item>
            Movie data provided by
            </Grid>
          <Grid item>
            <img style={{ width: 72 }} alt="The Movie DataBase" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}