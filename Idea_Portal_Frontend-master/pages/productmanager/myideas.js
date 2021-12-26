import { Grid } from '@material-ui/core'
import Headtag from '../../components/Headtag'
import UploadedIdea from '../../components/UploadedIdea'
import React from 'react'
export default function ProductManagerIdeas() {
	return (
		<>
			<Headtag title='My Ideas' />
			<br />

			<Grid container direction='column'>
				<Grid item container>
					<Grid item xs={false} sm={1} />
					<Grid item xs={12} sm={10}>
						<UploadedIdea />
					</Grid>
					<Grid item xs={false} sm={1} />
				</Grid>
			</Grid>
		</>
	)
}
