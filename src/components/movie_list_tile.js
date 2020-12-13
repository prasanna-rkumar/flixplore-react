import React, { useState, useEffect } from "react";
import {
	Typography,
	Grid,
	Divider,
	Box,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


import genres from '../constants/genres.json'
import poster from "../assets/movie-poster.png";


const useStyles = makeStyles({
	poster: {
		objectFit: "cover",
		objectPosition: "center center",
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 16,
		fontWeight: "800",
		letterSpacing: -1,
		paddingTop: 8
	},
	releaseDate: {
		color: "#6b6f73",
		fontSize: 14,
	},
	language: {
		padding: "0 8px 0 0 ",
		color: "#6b6f73",
		fontSize: 14,
	},
	label: {
		background: "#F03A47",
		color: "#fff",
		padding: "4px 4px",
		borderRadius: 24,
		fontWeight: "500",
		fontSize: 10,
	},
	overview: {
		overflow: "hidden",
		textOverflow: "ellipses", 
		display: "-webkit-box", 
		WebkitLineClamp: 5, 
		WebkitBoxOrient: "vertical"
	}, 
	divider: { margin: "0 4px 0 4px", height: 16, width: 2, color: "#f0f0f0" }
});

export default function MovieListTile(props) {
	var movie = props.movie
	const classes = useStyles();
	const [posterSrc, setPosterSrc] = useState("https://image.tmdb.org/t/p/original" + movie.poster_path)
	useEffect(() => {
		setPosterSrc("https://image.tmdb.org/t/p/original" + movie.poster_path)
	}, [movie.poster_path]);

	return (
		<div>
			<Grid
				item
				key={movie.poster_path}
				direction="row"
				alignItems="flex-start"
				container
				xs={12}
				spacing={2}
			>
				<Grid item
					lg={2}
					md={3}
					sm={4} xs={5}>
					<img
						onError={() => setPosterSrc(poster)}
						alt="movie-pic"
						src={posterSrc}
						className={classes.poster}
					/>
				</Grid>
				<Grid
					item
					container
					direction="column"
					justify="flex-start"
					alignItems="baseline"
					spacing={1}
					lg={10}
					md={9}
					sm={8} xs={7}
				>
					<Grid item container direction="row" justify="flex-start">
						<Typography
							className={classes.title}
						>
							{movie.title}
						</Typography>
					</Grid>
					<Grid
						item
						container
						direction="row"
						justify="flex-start"
						alignItems="center"
					>
						<Typography
							className={classes.releaseDate}
						>
							{movie.release_date}
						</Typography>
						<Divider orientation="vertical" className={classes.divider} />
						<Typography
							className={classes.language}
						>
							{movie.original_language.toUpperCase()}
						</Typography>
					</Grid>
					<Grid item container direction="row" justify="flex-start">
						{movie.genre_ids.map((genreID, index) => {
							var genre;
							for (var i = 0; i < genres.length; i++) {
								if (genreID === genres[i].id) {
									genre = genres[i]
									break
								}
							}
							console.log(genre)
							return (
								<div key={index} style={{ padding: "0px 4px 3px 0" }}>
									<Typography
										className={classes.label}
									>
										{genre.label}
									</Typography>
								</div>
							);
						})}
					</Grid>
					<Box display={{ xs: "none", sm: "block" }}>
						<Typography className={classes.overview} >{movie.overview}</Typography>
					</Box>
				</Grid>

			</Grid>
			<Grid xs={12} item style={{ padding: 4 }}>
				<Divider orientation="horizontal" />
			</Grid>
		</div>
	)
}