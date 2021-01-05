import React from 'react'
import { Grid, Typography, List, } from '@material-ui/core'
import CastPerson from './CastPerson'


export default function CastMembers(props) {
	var { cast } = props
	cast = [...cast.slice(0, 6)]
	return <Grid item style={{ width: "100%" }}>
		<Typography variant="h5" style={{ paddingBottom: 8 }}>Cast</Typography>
		<List style={{
			display: "flex",
			flexDirection: "row",
			padding: 0,
			overflowX: "scroll"
		}}>
			{cast.map((item, index) => <CastPerson key={index} person={item} />)}
			{/* <ListItem>
				<div style={{ padding: 16, width: 100 }}>
					<a target="_blank" rel="noopener noreferrer" href="https://thehooman.app">click here</a>
				</div>
			</ListItem> */}
		</List>
	</Grid>
}