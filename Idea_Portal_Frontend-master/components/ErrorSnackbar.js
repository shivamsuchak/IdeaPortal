import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
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

export default function ErrorSnackbar({ message }) {
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
				autoHideDuration={3000}>
				<Alert severity='error' onClose={handleClose}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}
