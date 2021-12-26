import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import React from 'react'
import ConfirmPasswordComponent from '../../components/ConfirmPasswordComponent'
import Headtag from '../../components/Headtag'
const useStyles = makeStyles({
	paper: { border: '5px solid #ff9800' },
})

const DialogContent = withStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
}))(MuiDialogContent)

export default function ConfirmPassword() {
	const classes = useStyles()
	const router = useRouter()
	const [confirmpassopen, setConfirmPassOpen] = React.useState(true)
	const closeConfirmPassword = () => {
		setTimeout(() => setConfirmPassOpen(false), 1000)
	}
	return (
		<>
			<Headtag title='Confirm Password' />
			<Dialog
				classes={{ paper: classes.paper }}
				fullWidth
				aria-labelledby='form-dialog-title'
				open={confirmpassopen}>
				<DialogContent dividers>
					<ConfirmPasswordComponent
						closeMe={closeConfirmPassword}
						userid={router.query.userid}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}
