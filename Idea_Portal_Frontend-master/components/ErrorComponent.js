import { makeStyles } from '@material-ui/core/styles'
import TypoComponent from './TypoComponent'
import React from 'react'
const useStyles = makeStyles({
	heading: {
		padding: '3%',
		textAlign: 'center',
	},
})
export default function ErrorComponent() {
	const classes = useStyles()
	return (
		<TypoComponent align='center' variant='h5' classname={classes.heading}>
			Some error occurred while loading
		</TypoComponent>
	)
}
