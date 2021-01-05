import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { API } from '../../api'
import Backdrop from "@material-ui/core/Backdrop";

import { ViewState } from '../../ViewState'

import CastMembers from './CastMembers'
import WatchProviders from './WatchProviders'

import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => {
	return ({
		backdrop: {
			[theme.breakpoints.down("sm")]: {
				height: "50vw"
			},
			[theme.breakpoints.only("sm", "md")]: {
				height: "37vw"
			},
			[theme.breakpoints.up('md')]: {
				height: "100%",
				width: "100%",
				position: "fixed"
			},
		},
		contentRoot: {
			padding: 8,
			margin: "auto",
			[theme.breakpoints.up('md')]: {
				background: "white",
				position: "relative",
				top: "35vh",
				maxWidth: 700,
				padding: 24,
			}
		},
		posterSide: {
			marginTop: 32
		},
		posterSideLabel: {
			fontSize: 14,
			fontWeight: 400,
			color: "#384857",
		},
		posterSideValue: {
			fontSize: 18,
			fontWeight: 600,
			color: "black"
		},
		primaryDetailsContainer: {
			textAlign: "center",
			[theme.breakpoints.down("sm")]: {
				marginTop: "-20%"
			},
			[theme.breakpoints.up('sm')]: {
				marginTop: "-120px"
			},
		}
	})
});

function minutesToHrs(runtime) {
	const hrs = parseInt(runtime / 60)
	const mins = runtime % 60
	var timeString = `${mins}m`
	if (hrs > 0) timeString = `${hrs}h ` + timeString
	return timeString
}

function getCertification(releaseDates) {
	if (releaseDates && releaseDates.length > 0) {
		var certification = "";
		for (var i = 0; i < releaseDates.length; ++i) {
			var item = releaseDates[i]
			if (item.release_dates[0].certification !== "") {
				certification = item.release_dates[0].certification
				return certification
			}
		}
		return certification
	}
	return ""
}

function getWatchProviders(movieDetails) {
	if (movieDetails.hasOwnProperty("watch/providers")) {
		var watchProviders = movieDetails["watch/providers"]
		if (watchProviders.hasOwnProperty("results") && Object.keys(watchProviders.results).length > 0) {
			if (watchProviders.results.hasOwnProperty("IN")) return watchProviders.results.IN
			if (watchProviders.results.hasOwnProperty("US")) return watchProviders.results.US
		}
	}
	return {}
}

export default function MovieDetail() {
	var classes = useStyles()
	var location = useLocation()
	const { movieID } = location.state
	console.log(movieID)
	const [viewState, setViewState] = useState(ViewState.idle)
	const [movieDetails, setMovieDetails] = useState({})

	useEffect(() => {
		setViewState(ViewState.active)
		API.movie(movieID).then((resp) => {
			setViewState(ViewState.done)
			setMovieDetails(resp)
		}).catch(e => {
			setViewState(ViewState.done)
			setMovieDetails({})
		})
	}, [movieID])

	if (Object.keys(movieDetails).length === 0)
		return <div> Loading </div>

	return <Grid container direction="column">
		<Backdrop onClick={() => {
			setViewState(ViewState.idle)
		}}
			style={{ zIndex: 5, color: "white" }}
			open={viewState === ViewState.active}>
			<CircularProgress></CircularProgress>
		</Backdrop>
		{(Object.keys(movieDetails).length === 0) ? <div>Loading</div> : <>
			<Grid item className={classes.backdrop} style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
				backgroundPosition: "top",
				backgroundSize: "cover",

			}}>

			</Grid>
			<Grid className={classes.contentRoot} container item spacing={1}>
				<Grid container item direction="row" justify="space-between" style={{ textAlign: "center", zIndex: 2, margin: "auto" }}>
					<Grid item xs={3} className={classes.posterSide}>
						<Typography className={classes.posterSideLabel}>
							RATING
							</Typography>
						<span className={classes.posterSideValue} style={{ border: "1px solid grey", padding: "2px 3px" }}>
							{getCertification(movieDetails.release_dates.results)}
						</span>
					</Grid>
					<Grid item xs={6} >
						<img style={{
							maxWidth: "80%",
							position: "relative",
							top: "-35%",
							borderRadius: 8,
							boxShadow: "0px 0px 12px #4f4f4f"
						}} src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movieDetails.poster_path}`} alt="poster" />
					</Grid>
					<Grid item xs={3} className={classes.posterSide}>
						<Typography className={classes.posterSideLabel}>
							RUNTIME
							</Typography>
						<Typography className={classes.posterSideValue}>
							{minutesToHrs(movieDetails.runtime)}
						</Typography>
					</Grid>
				</Grid>
				<Grid className={classes.primaryDetailsContainer} item container direction="column" alignItems="center" spacing={1}>
					<Grid item container direction="row" justify="center" style={{ alignItems: "baseline" }}>
						<Typography variant="h5">
							{movieDetails.title}
							<span style={{ fontWeight: 400, fontSize: 16 }}>
								({movieDetails.release_date != null ? movieDetails.release_date.split("-")[0] : ""})
								</span>
						</Typography>
					</Grid>
					<Grid item container direction="row" justify="center">{movieDetails.genres.map((item, index) => {
						return <div key={index} style={{ padding: "0px 4px 3px 0" }}>
							<Typography style={{
								background: "#C3D4E6",
								color: "#152434",
								padding: "4px 8px",
								borderRadius: 24,
								fontWeight: 600,
								fontSize: 14,
							}}>
								{item.name}
							</Typography>
						</div>
					})}</Grid>
					<Grid item>
						<WatchProviders watchProviders={getWatchProviders(movieDetails)} />
					</Grid>
				</Grid>
				<Grid item>
					<Typography variant="h5" style={{ paddingBottom: 8 }}>Overview</Typography>
					<Typography variant="body1" > {movieDetails.overview}</Typography>
				</Grid>
				<CastMembers cast={movieDetails.credits.cast} />
			</Grid>
		</>}

	</Grid>
}