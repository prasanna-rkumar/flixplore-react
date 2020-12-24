import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
				position: "absolute"
			},
		},
		contentRoot: {
			padding: 8, 
			margin: "auto", 
			[theme.breakpoints.up('md')]: {
				background: "white",
				position: "relative",
				top: "30vh",
				maxWidth: 700,
				padding: 24, 
			}
		},
		posterSide: {
			fontSize: 14,
			fontWeight: 400
		},
		primaryDetailsContainer: {
			[theme.breakpoints.down("sm")]: {
				marginTop: "-20%"
			},
			[theme.breakpoints.between("sm", "md")]: {
				marginTop: "-100px"
			},
			[theme.breakpoints.up('md')]: {
				marginTop: "-100px"
			},
		}
	})
});
export default function MovieDetail() {
	var classes = useStyles()
	return <Grid container direction="column">
		<Grid item className={classes.backdrop} style={{
			backgroundImage: "url(https://image.tmdb.org/t/p/original/aSpRZfrnDezoD1bKKc7PC29g9DI.jpg)",
			backgroundPosition: "top",
			backgroundSize: "cover",

		}}>

		</Grid>
		<Grid className={classes.contentRoot} container item>
			<Grid container item direction="row" justify="space-between" style={{ textAlign: "center", zIndex: 2, margin: "auto" }}>
				<Grid item xs={3} className={classes.posterSide}>
					RATING
				</Grid>
				<Grid item xs={6} >
					<img style={{
						maxWidth: "80%",
						position: "relative",
						top: "-35%",
						borderRadius: 8,
						boxShadow: "0px 0px 12px #4f4f4f"
					}} src="https://image.tmdb.org/t/p/w220_and_h330_face/7GsM4mtM0worCtIVeiQt28HieeN.jpg" />
				</Grid>
				<Grid item xs={3} className={classes.posterSide}>
					RUNTIME
				</Grid>
			</Grid>
			<Grid className={classes.primaryDetailsContainer} item container direction="column" alignItems="center">
				<Grid item>
					<Typography variant="h4">Jojo Rabbit</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body1">(2019)</Typography>
				</Grid>
				<Grid item>Drama, War</Grid>
				<Grid item>Hotstar</Grid>
			</Grid>
			<Grid item>
				<Typography variant="h6">Overview</Typography>
				<Typography variant="body1" >Jojo is a lonely German boy who discovers that his single mother is hiding a Jewish girl in their attic. Aided only by his imaginary friend -- Adolf Hitler -- Jojo must confront his blind nationalism as World War II continues to rage on.</Typography>
			</Grid>
		</Grid>

	</Grid>
}