import React from 'react'
import { Grid, ListItem, Card } from '@material-ui/core'


export default function CastPerson(props) {
	var { person } = props
	return <ListItem key={person.id}>
		<Card style={{ height: 230, width: 120, borderRadius: 16 }} elevation={1}>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="stretch"
			>
				<Grid xs={6} item style={{ maxWidth: "100%" }}>
					<img src={`https://image.tmdb.org/t/p/w120_and_h133_face/${person.profile_path}`} alt="cast member" style={{ width: "100%", height: "100%" }} />
				</Grid>
				<Grid xs={6} item style={{ maxWidth: "100%", paddingLeft: 8 }} container direction="column" spacing={1}>
					<Grid item style={{ fontWeight: 600 }}>{person.original_name}</Grid>
					<Grid item >{person.character}</Grid>
				</Grid>
			</Grid>
		</Card>
	</ListItem>
}