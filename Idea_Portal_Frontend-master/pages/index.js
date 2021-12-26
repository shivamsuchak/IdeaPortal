import { Grid } from '@material-ui/core'
import GridCard from '../components/GridCard'
import Headtag from '../components/Headtag'
import React from 'react'

export default function Home() {
	return (
		<>
			<br />
			<Headtag title='Home' />

			<Grid container direction='column'>
				<Grid item container>
					<Grid item xs={false} sm={1} />
					<Grid item xs={12} sm={10}>
						<GridCard />
					</Grid>
					<Grid item xs={false} sm={1} />
				</Grid>
			</Grid>
		</>
	)
}
