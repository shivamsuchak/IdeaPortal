import {
	Grid,
	List,
	ListItem,
	ListItemText,
	Button,
	MenuItem,
} from '@material-ui/core'
import TypoComponent from '../components/TypoComponent'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import Input from '../components/InputComponent'
import ButtonComponent from './ButtonComponent'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import CommentIcon from '@material-ui/icons/Comment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import GroupIcon from '@material-ui/icons/Group'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ls from 'local-storage'
import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ResetPassword from './ResetPassword'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import swal from 'sweetalert'
import clientpartnerservice from '../services/clientpartnerservice'
import employeeservice from '../services/employeeservice'
import userservice from '../services/userservice'
import ErrorSnackbar from './ErrorSnackbar'
import Iconbutton from './Iconbutton'
import SuccessSnackbar from './SuccessSnackbar'
import Heading from './TypoComponent'

const DialogContent = withStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
}))(MuiDialogContent)

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 100,
	},
	listSection: {
		backgroundColor: 'inherit',
	},
	ul: {
		backgroundColor: 'inherit',
		padding: 0,
	},
	commentSection: {
		backgoundColor: '#ff9800',
	},
	giveComment: {
		margin: theme.spacing(2),
	},
	comment: {
		marginLeft: theme.spacing(2),
	},
	acccordion: {
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(2),
	},
	paper: { border: '5px solid #ff9800' },
}))
export default function LikeComment({ themeid, ideaid }) {
	const classes = useStyles()
	const [popupOpen, setPopupOpen] = React.useState(false)
	const [resetpassopen, setResetPassOpen] = React.useState(false)
	const [openSignUp, setOpenSignUp] = React.useState(false)
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const [comment, setComment] = React.useState('')
	const [data, setData] = React.useState([])
	const [role, setRole] = React.useState('Front-End Engineer')
	const [roles, setRoles] = React.useState([])
	const [show, setShow] = React.useState('likes')
	const [ConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false)
	React.useEffect(() => {
		async function fetchData() {
			try {
				let likes = await userservice.getLikesbyIdeaId(ideaid)
				setData(likes)
				const res = await userservice.getParticipantRoles()
				setRoles(res.result)
			} catch (error) {
				return
			}
		}
		fetchData()
	}, [])

	const setConfirmPopupCloseOnsubmit = () => {
		setTimeout(() => handleConfirmPopupClose(), 1000)
	}
	const handleshow = (event, showing) => {
		setShow(showing)
		showDatabyToggle(showing)
	}
	const showDatabyToggle = async (newshow) => {
		if (newshow === 'likes') {
			setShow('likes')
			const likes = await userservice.getLikesbyIdeaId(ideaid)
			setData(likes)
		} else if (newshow === 'dislikes') {
			setShow('dislikes')
			const dislikes = await userservice.getDislikesbyIdeaId(ideaid)
			setData(dislikes)
		} else if (newshow === 'comments') {
			setShow('comments')
			const comments = await userservice.getCommentsbyIdeaId(ideaid)
			setData(comments)
		} else if (newshow === 'participants') {
			setShow('participants')
			const participants = await userservice.getParticipantsForIdea(ideaid)
			setData(participants)
		}
	}

	const setNewData = async () => {
		if (show === 'likes') {
			const likes = await userservice.getLikesbyIdeaId(ideaid)
			setData(likes)
		} else if (show === 'dislikes') {
			const dislikes = await userservice.getDislikesbyIdeaId(ideaid)
			setData(dislikes)
		} else if (show === 'comments') {
			const comments = await userservice.getCommentsbyIdeaId(ideaid)
			setData(comments)
		} else if (show === 'participants') {
			const participants = await userservice.getParticipantsForIdea(ideaid)
			setData(participants)
		}
	}

	const showLoginAndRegister = () => {
		swal({
			title: 'Please Login or Register to continue',
			text: 'Please login if you are already registered or else register',
			icon: 'info',
			buttons: {
				login: {
					text: 'Login',
					value: 'login',
					visible: true,
					closeModal: true,
				},
				register: {
					text: 'Register',
					value: 'register',
					visible: true,
					closeModal: true,
				},
			},
		}).then((value) => {
			if (value === 'register') {
				handleClickOpenSignup()
			} else if (value === 'login') {
				handleClickOpen()
			}
		})
	}

	const addParticipant = async (e) => {
		e.preventDefault()
		const userForm = {
			user: {
				userID: ls.get('userid'),
			},
			idea: {
				ideaID: ideaid,
			},
			theme: {
				themeID: themeid,
			},
			participantRoles: {
				participantRoleID: setRoleId(),
			},
		}
		try {
			const token = ls.get('token')
			employeeservice.setToken(token)

			const res = await employeeservice.addParticipant(userForm)
			setShowSuccess(true)
			setMessage(res.statusText)
			setConfirmPopupCloseOnsubmit()
			setNewData()
			setTimeout(() => setShowSuccess(false), 1000)
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 1000)
		}
	}

	const likeIdea = async () => {
		const userForm = {
			likeValue: 1,
			idea: { ideaID: ideaid },
			user: {
				userID: ls.get('userid'),
			},
		}
		try {
			const token = ls.get('token')
			userservice.setToken(token)
			const res = await userservice.addLike(userForm)
			setShowSuccess(true)
			setMessage(res.statusText)
			setNewData()
			setTimeout(() => setShowSuccess(false), 1000)
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 1000)
		}
	}

	const dislikeIdea = async () => {
		const userForm = {
			likeValue: 0,
			idea: { ideaID: ideaid },
			user: {
				userID: ls.get('userid'),
			},
		}
		try {
			const token = ls.get('token')
			userservice.setToken(token)
			const res = await userservice.addLike(userForm)
			setShowSuccess(true)
			setMessage(res.statusText)
			setNewData()
			setTimeout(() => setShowSuccess(false), 1000)
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 1000)
		}
	}
	const addComment = async () => {
		const userForm = {
			commentValue: comment,
			idea: { ideaID: ideaid },
			user: {
				userID: ls.get('userid'),
			},
		}
		try {
			if (comment === '') {
				setShowError(true)
				setMessage('Enter a comment')
				setTimeout(() => setShowError(false), 1000)
			} else {
				const token = ls.get('token')
				userservice.setToken(token)
				const res = await userservice.addComment(userForm)
				setComment('')
				setShowSuccess(true)
				setMessage(res.statusText)
				setNewData()
				setTimeout(() => setShowSuccess(false), 1000)
			}
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 1000)
		}
	}
	const handleConfirmPopupOpen = () => {
		setConfirmPopupOpen(true)
	}
	const handleConfirmPopupClose = () => {
		setConfirmPopupOpen(false)
	}
	const handleClickClose = () => {
		setPopupOpen(false)
	}
	const handleClickResetPassOpen = () => {
		handleClickClose()
		setResetPassOpen(true)
	}

	const handleClickOpenSignup = () => {
		handleClickClose()
		setOpenSignUp(true)
	}
	const handleClickCloseSignup = () => {
		setOpenSignUp(false)
	}

	const handleClickOpen = () => {
		handleClickCloseSignup()
		setPopupOpen(true)
	}
	const handleCloseOnsubmitLogin = () => {
		setTimeout(() => handleClickClose(), 1000)
	}
	const handleCloseOnsubmitSignup = () => {
		setTimeout(() => handleClickCloseSignup(), 1000)
	}
	const handleCloseOnsubmitResetPass = () => {
		setTimeout(() => handleClickCloseResetPassword(), 1000)
	}
	const handleClickCloseResetPassword = () => {
		setResetPassOpen(false)
	}

	const handleChange = (event) => {
		setRole(event.target.value)
	}

	const setRoleId = () => {
		switch (role) {
			case 'Front-End Engineer':
				return 1
			case 'Back-End Engineer':
				return 2

			case 'Full Stack Engineer':
				return 3

			case 'Software Engineer in Test (QA Engineer)':
				return 4

			case 'DevOps Engineer':
				return 5

			case 'Security Engineer':
				return 6

			case 'Engineering Manager':
				return 7

			case 'Product Manager':
				return 8

			case 'Business Account Manager':
				return 9

			case 'Procurement Manager':
				return 10
		}
	}
	return (
		<>
			{showsuccess ? <SuccessSnackbar message={message} /> : <></>}
			{showerror ? <ErrorSnackbar message={message} /> : <></>}
			<Grid item sm={12} xs={0}></Grid>
			<Grid item sm={12} xs={0}></Grid>
			<Grid item sm={12} xs={12} align='center'>
				<Iconbutton
					clickfunc={() =>
						!ls.get('logged_in') ? showLoginAndRegister() : likeIdea()
					}>
					<ThumbUpIcon style={{ color: 'green' }} fontSize='large' />
				</Iconbutton>
				<span> </span>
				<Iconbutton
					clickfunc={() =>
						!ls.get('logged_in') ? showLoginAndRegister() : dislikeIdea()
					}>
					<ThumbDownIcon style={{ color: 'red' }} fontSize='large' />
				</Iconbutton>
			</Grid>
			<Grid item container className={classes.commentSection}>
				<Grid item sm={12} xs={12} align='center'>
					<ToggleButtonGroup
						value={show}
						exclusive
						onChange={handleshow}
						aria-label='text alignment'>
						<ToggleButton value='likes' aria-label='left aligned'>
							<ThumbUpIcon />
						</ToggleButton>
						<ToggleButton value='dislikes' aria-label='centered'>
							<ThumbDownIcon />
						</ToggleButton>
						<ToggleButton value='comments' aria-label='right aligned'>
							<CommentIcon />
						</ToggleButton>

						<ToggleButton value='participants' aria-label='right aligned'>
							<GroupIcon />
						</ToggleButton>
					</ToggleButtonGroup>

					<Accordion className={classes.acccordion}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel1a-content'
							id='panel1a-header'>
							{show === 'likes' ? (
								<Heading>Likes ({data.totalElements})</Heading>
							) : show === 'dislikes' ? (
								<Heading classname={classes.heading}>
									Dislikes ({data.totalElements})
								</Heading>
							) : show === 'comments' ? (
								<Heading classname={classes.heading}>
									Comments ({data.totalElements})
								</Heading>
							) : show === 'participants' ? (
								<Heading classname={classes.heading}>
									Participants ({data.totalElements})
								</Heading>
							) : (
								<></>
							)}
						</AccordionSummary>
						<AccordionDetails>
							<List className={classes.root}>
								{data.result?.map((item) => (
									<ListItem>
										<ListItemText>
											{show === 'likes' ||
											show === 'dislikes' ||
											show === 'participants' ? (
												item.userName
											) : (
												<></>
											)}
											{show === 'comments' ? (
												`${item.user?.userName}: ${item.commentValue}`
											) : (
												<></>
											)}
										</ListItemText>
									</ListItem>
								))}
							</List>
						</AccordionDetails>
					</Accordion>
				</Grid>
			</Grid>
			<br />
			<Grid item sm={12} xs={12} className={classes.comment}>
				<Input
					id='outlined-multiline-static'
					label='Add a Comment'
					style={{ width: '100%' }}
					multiline
					value={comment}
					onchangefunc={(e) => setComment(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<CommentIcon />
							</InputAdornment>
						),
					}}
					variant='outlined'
				/>
			</Grid>

			<Grid item sm={12} xs={7} align='right'>
				{ls.get('logged_in') &&
				(ls.get('employee') || ls.get('product_manager')) ? (
					<ButtonComponent
						variant='contained'
						color='primary'
						style={{ marginTop: '10px' }}
						size='medium'
						clickfunc={handleConfirmPopupOpen}>
						Participate
					</ButtonComponent>
				) : (
					<></>
				)}
				<span> </span>

				<ButtonComponent
					variant='contained'
					style={{ marginTop: '10px' }}
					color='primary'
					size='medium'
					clickfunc={() =>
						!ls.get('logged_in') ? showLoginAndRegister() : addComment()
					}>
					Post
				</ButtonComponent>
			</Grid>
			<Dialog
				fullWidth
				classes={{ paper: classes.paper }}
				onClose={handleConfirmPopupClose}
				aria-labelledby='form-dialog-title'
				open={ConfirmPopupOpen}>
				<DialogContent dividers>
					<TypoComponent variant='h4' position='center'>
						Confirm Participation
					</TypoComponent>
					<br />
					<form
						autoComplete='on'
						align='center'
						method='post'
						onSubmit={(e) => addParticipant(e)}>
						<Input
							id='outlined-select-currency-native'
							select
							helperText='Select your role'
							fullWidth
							value={role}
							variant='outlined'
							onchangefunc={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<PersonPinIcon />
									</InputAdornment>
								),
							}}>
							{roles.map((option) => (
								<MenuItem
									key={option.participantRoleName}
									value={option.participantRoleName}>
									{option.participantRoleName}
								</MenuItem>
							))}
						</Input>
						<br />
						<br />
						<Button
							display='flex'
							variant='contained'
							color='primary'
							type='submit'
							size='medium'>
							Confirm Participation
						</Button>
					</form>
				</DialogContent>
			</Dialog>
			<Dialog
				fullWidth
				classes={{ paper: classes.paper }}
				onClose={handleClickClose}
				aria-labelledby='form-dialog-title'
				open={popupOpen}>
				<DialogContent dividers>
					<LoginForm
						clickMe={handleClickResetPassOpen}
						closeMe={handleCloseOnsubmitLogin}
						type='likeComment'
					/>
				</DialogContent>
			</Dialog>

			<Dialog
				classes={{ paper: classes.paper }}
				fullWidth
				onClose={handleClickCloseSignup}
				aria-labelledby='form-dialog-title'
				open={openSignUp}>
				<DialogContent style={{ overflow: 'hidden' }} dividers>
					<SignupForm closeMe={handleCloseOnsubmitSignup} type='likeComment' />
				</DialogContent>
			</Dialog>
			<Dialog
				classes={{ paper: classes.paper }}
				fullWidth
				onClose={handleClickCloseResetPassword}
				aria-labelledby='form-dialog-title'
				open={resetpassopen}>
				<DialogContent dividers>
					<ResetPassword closeMe={handleCloseOnsubmitResetPass} />
				</DialogContent>
			</Dialog>
		</>
	)
}
