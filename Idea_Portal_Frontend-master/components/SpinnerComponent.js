import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import TypoComponent from './TypoComponent'
import React from 'react'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}))

export default function SpinnerComponent() {
	const classes = useStyles()

	return (
		<>
			<div className={classes.root}>
				<CircularProgress size={40} thickness={4} />
			</div>
			<div>
				<TypoComponent variant='h6' align='center'>
					Loading...
				</TypoComponent>
			</div>
		</>
	)
}
