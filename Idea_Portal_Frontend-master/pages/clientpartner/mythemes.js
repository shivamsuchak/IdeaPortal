import { Grid } from '@material-ui/core'
import Headtag from '../../components/Headtag'
import UploadedTheme from '../../components/UploadedTheme'
import React from 'react'
export default function ClientPartnerTheme() {
	return (
		<>
			<br />
			<Headtag title='My Themes' />

			<Grid container direction='column'>
				<Grid item container>
					<Grid item xs={false} sm={1} />
					<Grid item xs={12} sm={10}>
						<UploadedTheme />
					</Grid>
					<Grid item xs={false} sm={1} />
				</Grid>
			</Grid>
		</>
	)
}
