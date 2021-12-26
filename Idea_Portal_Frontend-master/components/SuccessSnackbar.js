import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))

export default function SuccessSnackbar({ message }) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(true)
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<div className={classes.root}>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={open}
				onClose={handleClose}
				autoHideDuration={5000}>
				<Alert severity='success' onClose={handleClose}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}
