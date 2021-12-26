import { Grid } from '@material-ui/core'
import Headtag from '../../components/Headtag'
import UpdateProfile from '../../components/UpdateProCompo'
import React from 'react'

export default function UserProfile() {
	return (
		<div>
			<br />
			<br />
			<Headtag title='My Profile' />
			<Grid container direction='column'>
				<Grid item container>
					<Grid item xs={false} sm={2} />
					<Grid item xs={12} sm={8}>
						<br />
						<UpdateProfile></UpdateProfile>
					</Grid>
					<Grid item xs={false} sm={2} />
				</Grid>
			</Grid>
			<br />
			<br />
		</div>
	)
}
