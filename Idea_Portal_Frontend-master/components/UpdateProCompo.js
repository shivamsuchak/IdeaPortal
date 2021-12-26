import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import BoxComponent from './BoxComponent'
import UpdatePassword from './UpdatePassword'
import UserInfo from './UserInfo'
import React from 'react'

const UpdateProfile = () => {
	return (
		<BoxComponent boxshadow={2} bgcolor='primary.main' m={0.5} p={0.5}>
			<Card>
				<CardContent>
					<UserInfo />
					<br />
					<hr />
					<br />
					<UpdatePassword />
				</CardContent>
			</Card>
		</BoxComponent>
	)
}

export default UpdateProfile
