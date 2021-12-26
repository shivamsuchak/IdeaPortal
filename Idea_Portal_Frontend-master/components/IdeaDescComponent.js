import { Grid } from '@material-ui/core'
import Heading from './TypoComponent'
import React from 'react'

export default function IdeaDesc({ heading, description }) {
	return (
		<>
			<Grid item sm={3} xs={12} style={{ padding: '20px 20px 05px 20px' }}>
				<Heading variant='h6'>{heading}</Heading>
			</Grid>
			<Grid item sm={9} xs={12} style={{ padding: '20px 20px 05px 20px' }}>
				<Heading>{description}</Heading>
			</Grid>
		</>
	)
}
