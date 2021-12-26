import { Avatar, Menu, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { AccountCircle } from '@material-ui/icons'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import HomeIcon from '@material-ui/icons/Home'
import ListAltIcon from '@material-ui/icons/ListAlt'
import MenuIcon from '@material-ui/icons/Menu'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import clsx from 'clsx'
import ls from 'local-storage'
import swal from 'sweetalert'
import { useRouter } from 'next/router'
import React from 'react'
import CreateThemeFrom from './CreateThemeFrom'
import Iconbutton from './Iconbutton'
import LoginForm from './LoginForm'
import ResetPassword from './ResetPassword'
import SuccessSnackbar from './SuccessSnackbar'
import SignupForm from './SignupForm'
import DashboardIcon from '@material-ui/icons/Dashboard'

const drawerWidth = 240

const DialogContent = withStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
}))(MuiDialogContent)
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),

		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	title: {
		flexGrow: 1,
		color: '#fff',
	},
	paper: { border: '5px solid #ff9800' },
}))

export default function Navbar({ children }) {
	let arr = ['Home']
	if (ls.get('logged_in')) {
		arr.push('Dashboard')
	}
	if (ls.get('logged_in') && ls.get('client_partner')) {
		arr.push('Create Theme')
		arr.push('My Themes')
	}

	if (ls.get('logged_in') && ls.get('product_manager')) {
		arr.push('My Ideas')
	}

	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen] = React.useState(false)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}
	const router = useRouter()
	const [popupOpen, setPopupOpen] = React.useState(false)
	const [resetpassopen, setResetPassOpen] = React.useState(false)
	const [openSignUp, setOpenSignUp] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [createTheme, setCreateTheme] = React.useState(false)
	const [showsignout, setShowSignOut] = React.useState(false)
	const [message, setMessage] = React.useState('')

	const handleOpenCreateTheme = () => {
		setCreateTheme(true)
		handleDrawerClose()
	}
	const handleCloseCreateTheme = () => {
		setCreateTheme(false)
	}

	const handleCloseCreateThemeonSubmit = () => {
		setTimeout(() => handleCloseCreateTheme(), 1000)
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

	const goToMyProfile = () => {
		handleClose()
		router.push('/userprofile/')
	}
	const signOut = () => {
		ls.clear()
		handleClose()
		setShowSignOut(true)
		setMessage('Sign out successfully')
		setTimeout(() => setShowSignOut(false), 1000)
		router.push('/')
	}

	const handleClickOpen = () => {
		handleClickCloseSignup()
		setPopupOpen(true)
		handleClose()
	}
	const handleClickResetPassOpen = () => {
		handleClickClose()
		setResetPassOpen(true)
		handleClose()
	}
	const handleClickClose = () => {
		setPopupOpen(false)
	}
	const handleClickOpenSignup = () => {
		handleClickClose()
		setOpenSignUp(true)
		handleClose()
	}
	const handleClickCloseSignup = () => {
		setOpenSignUp(false)
	}
	const handleClickCloseResetPassword = () => {
		setResetPassOpen(false)
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const goToHome = () => {
		handleDrawerClose()
		router.push('/')
	}
	const goToMyThemes = () => {
		handleDrawerClose()
		router.push('/clientpartner/mythemes')
	}

	const goToMyIdeas = () => {
		handleDrawerClose()
		router.push('/productmanager/myideas')
	}

	const goBack = () => {
		router.back()
	}
	const confirmSignOut = () => {
		handleClose()
		swal({
			title: 'Are you sure?',
			text: 'Do you want to signout?',
			icon: 'warning',
			buttons: {
				cancel: {
					text: 'No',
					value: false,
					visible: true,
					closeModal: true,
				},
				confirm: {
					text: 'Yes',
					value: true,
					visible: true,
					closeModal: true,
				},
			},
		}).then((value) => {
			if (value) {
				signOut()
			}
		})
	}
	const goToDashboard = () => {
		handleDrawerClose()

		router.push('/dashboard')
	}
	const showBackIcon = router?.pathname !== '/'

	return (
		<div className={classes.root}>
			{showsignout ? <SuccessSnackbar message={message} /> : <></>}
			<CssBaseline />

			<AppBar
				position='static'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					{showBackIcon ? (
						<Iconbutton
							color='inherit'
							style={{ color: 'white' }}
							clickfunc={goBack}
							edge='start'>
							<ArrowBackIcon />
						</Iconbutton>
					) : (
						<></>
					)}

					<Iconbutton
						color='inherit'
						style={{ color: 'white' }}
						aria-label='open drawer'
						clickfunc={handleDrawerOpen}
						className={clsx(classes.menuButton, open && classes.hide)}>
						<MenuIcon />
					</Iconbutton>
					<Iconbutton
						edge='start'
						disabled
						className={classes.menuButton}
						color='inherit'>
						<Avatar alt='P' src='/images/persistentLogo.jpg' />
					</Iconbutton>
					<Typography variant='h6' className={classes.title}>
						Persistent Idea Portal
					</Typography>
					{children}

					<IconButton
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						style={{ color: 'white' }}
						onClick={handleMenu}>
						<AccountCircle />
					</IconButton>
					<Menu
						id='menu-appbar'
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						{!ls.get('logged_in') ? (
							<>
								<MenuItem onClick={handleClickOpen}>Login</MenuItem>
								<MenuItem onClick={handleClickOpenSignup}>Register</MenuItem>
							</>
						) : (
							<>
								<MenuItem onClick={() => goToMyProfile()}>My Profile</MenuItem>

								<MenuItem onClick={() => confirmSignOut()}> Sign Out</MenuItem>
							</>
						)}
					</Menu>
				</Toolbar>
			</AppBar>
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
					<SignupForm closeMe={handleCloseOnsubmitSignup} />
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

			<Dialog
				classes={{ paper: classes.paper }}
				fullWidth
				open={createTheme}
				aria-labelledby='form-dialog-title'
				onClose={handleCloseCreateTheme}>
				<DialogContent>
					<CreateThemeFrom closeMe={handleCloseCreateThemeonSubmit} />
				</DialogContent>
			</Dialog>

			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{arr.map((text, index) => (
						<ListItem
							button
							key={text}
							onClick={
								text === 'Home'
									? goToHome
									: text === 'Create Theme'
									? handleOpenCreateTheme
									: text === 'My Themes'
									? goToMyThemes
									: text == 'My Ideas'
									? goToMyIdeas
									: goToDashboard
							}>
							<ListItemIcon>
								{text === 'Home' ? (
									<HomeIcon />
								) : text === 'Create Theme' ? (
									<NoteAddIcon />
								) : text === 'My Themes' || text === 'My Ideas' ? (
									<ListAltIcon />
								) : text === 'Dashboard' ? (
									<DashboardIcon />
								) : (
									<></>
								)}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</div>
	)
}
