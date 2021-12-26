import { Grid } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'
import EmailIcon from '@material-ui/icons/Email'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import ls from 'local-storage'
import React from 'react'
import userservice from '../services/userservice'
import ButtonComponent from './ButtonComponent'
import ErrorSnackbar from './ErrorSnackbar'
import Iconbutton from './Iconbutton'
import Input from './InputComponent'
import { useRouter } from 'next/router'
import SuccessSnackbar from './SuccessSnackbar'
import Heading from './TypoComponent'
const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	border: {
		borderRadius: '25px',
		border: '2px solid orange',
		padding: '20px',
		width: '100%',
		height: '10%',
	},
	border1: {
		borderRadius: '25px',
		border: '1px solid grey',
		padding: '20px',
		width: '100%',
		height: '10%',
	},
})

export default function UserInfo() {
	const router = useRouter()
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const [hideEmail, setHideEmail] = React.useState(false)
	const [hideCompany, setHideCompany] = React.useState(false)
	const [newemail, setNewEmail] = React.useState(ls.get('email'))
	const [newcompany, setNewCompany] = React.useState(ls.get('company'))
	const [email, setEmail] = React.useState(ls.get('email'))
	const [company, setCompany] = React.useState(ls.get('company'))

	const toggleHideEmail = () => {
		setHideEmail((oldState) => !oldState)
	}

	const toggleHideCompany = () => {
		setHideCompany((oldState) => !oldState)
	}

	const updateProfile = async () => {
		const userForm = {
			userID: ls.get('userid'),
			userEmail: newemail,
			userCompany: newcompany,
		}
		try {
			const token = ls.get('token')
			userservice.setToken(token)
			const res = await userservice.updateProfile(userForm)
			ls.set('email', res.result.userEmail)
			ls.set('company', res.result.userCompany)
			setNewEmail(res.result.userEmail)
			setNewCompany(res.result.userCompany)
			setEmail(res.result.userEmail)
			setCompany(res.result.userCompany)
			setShowSuccess(true)
			setMessage(res.statusText)
			setTimeout(() => setShowSuccess(false), 3000)
			router.reload()
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}
	return (
		<div>
			{showsuccess ? <SuccessSnackbar message={message} /> : <></>}
			{showerror ? <ErrorSnackbar message={message} /> : <></>}
			<Heading variant='h4' position='center'>
				My Profile
			</Heading>
			<br />
			<Grid container spacing={5} justify='flex-end'>
				<Grid item xs={3}>
					<Heading variant='h6'>Username : </Heading>
				</Grid>
				<Grid item xs={5}>
					<Heading position='center' variant='h6'>
						{ls.get('username')}
					</Heading>
				</Grid>
				<Grid item xs={2}></Grid>
			</Grid>
			<br />

			<Grid container spacing={5} justify='flex-end'>
				<Grid item xs={3}>
					<Heading variant='h6'>Email : </Heading>
				</Grid>
				<Grid item xs={5}>
					{!hideEmail && (
						<div>
							<Heading position='center' variant='h6'>
								{' '}
								{email}{' '}
							</Heading>
						</div>
					)}
					{hideEmail && (
						<div>
							<Input
								variant='outlined'
								id='outlined-basic'
								label=''
								type='email'
								style={{ width: '100%' }}
								value={newemail}
								onchangefunc={(e) => setNewEmail(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<EmailIcon />
										</InputAdornment>
									),
								}}
							/>
						</div>
					)}
				</Grid>
				<Grid item xs={2}>
					{!hideEmail && (
						<div>
							<Iconbutton clickfunc={toggleHideEmail}>
								{' '}
								<EditIcon />
								{'     '}
							</Iconbutton>
						</div>
					)}
					{hideEmail && (
						<div>
							<Iconbutton
								component='div'
								display='inline'
								clickfunc={toggleHideEmail}>
								{' '}
								<CancelIcon />{' '}
							</Iconbutton>
						</div>
					)}
				</Grid>
			</Grid>
			<br />
			<Grid container spacing={5} justify='flex-end'>
				<Grid item xs={3}>
					<Heading variant='h6'>Company : </Heading>
				</Grid>
				<Grid item xs={5}>
					{!hideCompany && (
						<div>
							<Heading position='center' variant='h6'>
								{' '}
								{company}{' '}
							</Heading>
						</div>
					)}
					{hideCompany && (
						<div>
							<Input
								variant='outlined'
								id='outlined-basic'
								label=''
								style={{ width: '100%' }}
								type='text'
								value={newcompany}
								onchangefunc={(e) => setNewCompany(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LocationCityIcon />
										</InputAdornment>
									),
								}}
							/>
						</div>
					)}
				</Grid>
				<Grid item xs={2}>
					{!hideCompany && (
						<div>
							<Iconbutton clickfunc={toggleHideCompany}>
								{' '}
								<EditIcon />
								{'     '}
							</Iconbutton>
						</div>
					)}
					{hideCompany && (
						<div>
							<Iconbutton
								component='div'
								display='inline'
								clickfunc={toggleHideCompany}>
								{' '}
								<CancelIcon />{' '}
							</Iconbutton>
						</div>
					)}
				</Grid>
			</Grid>
			<br />

			<Grid container spacing={5} justify='flex-end'>
				<Grid item xs={3}>
					<Heading variant='h6'>Designation : </Heading>
				</Grid>

				<Grid item xs={5}>
					<Heading position='center' variant='h6'>
						{ls.get('role')}
					</Heading>
				</Grid>

				<Grid item xs={2}></Grid>
			</Grid>
			<div style={{ textAlign: 'center' }}>
				<br />
				<ButtonComponent
					variant='contained'
					color='primary'
					size='medium'
					clickfunc={() => updateProfile()}>
					Update Profile
				</ButtonComponent>
				<br />
			</div>
		</div>
	)
}
