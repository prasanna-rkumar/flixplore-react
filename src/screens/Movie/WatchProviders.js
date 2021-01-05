import React from 'react'
import { Grid, Typography } from '@material-ui/core'


export default function WatchProviders(props) {
	var { watchProviders } = props
	const link = watchProviders.link
	delete watchProviders.link
	var list = []
	Object.entries(watchProviders).forEach((value, index) => {
		list.push(...value[1])
	})
	list = [...list.slice(0, 4)]
	return <Grid container direction="column">
		<Grid xs={12} item>
			<Typography variant="h5">
				Available on
			</Typography>
		</Grid>
		<Grid item container direction="row" spacing={2} alignItems="center">
			{list.map((item, index) => {
				return <Grid item key={index}>
					<img src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt={item.provider_name} style={{ maxWidth: 43, maxHeight: 43 }} />
				</Grid>
			})}
			{list.length > 0 ? <a target="_blank" rel="noopener noreferrer" href={link}> click here</a> : ""}
		</Grid>
	</Grid>
}