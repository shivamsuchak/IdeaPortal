import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import EmailIcon from '@material-ui/icons/Email'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import LockIcon from '@material-ui/icons/Lock'
import PersonIcon from '@material-ui/icons/Person'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import ls from 'local-storage'
import { useRouter } from 'next/router'
import React from 'react'
import ErrorSnackbar from '../components/ErrorSnackbar'
import Input from '../components/InputComponent'
import SuccessSnackbar from '../components/SuccessSnackbar'
import userservice from '../services/userservice'
import Heading from './TypoComponent'
const roles = [
	{
		label: 'Select Designation',
		value: 'Select Designation',
	},
	{
		value: 'Client Partner',
		label: 'Client Partner',
	},
	{
		value: 'Product Manager',
		label: 'Product Manager',
	},
	{
		value: 'Employee',
		label: 'Employee',
	},
]

export default function SignupForm({ closeMe, type }) {
	const [role, setRole] = React.useState('Select Designation')
	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [company, setCompany] = React.useState('')
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const [close, setClose] = React.useState(false)
	const router = useRouter()
	const closeDialog = () => {
		if (!close) {
			return
		}
	}

	const saveDetails = (
		user_userid,
		user_username,
		user_company,
		user_role,
		user_email,
		user_token
	) => {
		ls.set('userid', user_userid)
		ls.set('username', user_username)
		ls.set('company', user_company)
		ls.set('role', user_role)
		ls.set('email', user_email)
		ls.set('token', user_token)
	}

	const removeInputValues = () => {
		setRole('Select Designation')
		setUsername('')
		setPassword('')
		setEmail('')
		setCompany('')
	}

	const cpSignup = async () => {
		const cpForm = {
			userName: username,
			userPassword: password,
			userEmail: email,
			userCompany: company,
			role: { roleID: 1 },
		}
		try {
			const res = await userservice.signup(cpForm)
			ls.set('logged_in', true)
			removeInputValues()
			setShowSuccess(true)
			setMessage(res.statusText)
			setClose(true)
			saveDetails(
				res.result.userID,
				res.result.userName,
				res.result.userCompany,
				res.result.role.roleName,
				res.result.userEmail,
				res.token
			)
			// router.push('/')
			// if (router.pathname === '/dashboard') {
			// 	router.reload()
			// }
			router.reload()
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}

	const pmSignup = async () => {
		const pmForm = {
			userName: username,
			userPassword: password,
			userEmail: email,
			userCompany: company,
			role: { roleID: 2 },
		}
		try {
			const res = await userservice.signup(pmForm)
			ls.set('logged_in', true)
			removeInputValues()
			setShowSuccess(true)
			setMessage(res.statusText)
			setClose(true)
			saveDetails(
				res.result.userID,
				res.result.userName,
				res.result.userCompany,
				res.result.role.roleName,
				res.result.userEmail,
				res.token
			)
			// if (
			// 	router.pathname === '/theme/[themeid]' ||
			// 	router.pathname === '/dashboard'
			// ) {
			// 	router.reload()
			// }
			router.reload()
			// router.push('/')
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}

	const empSignup = async () => {
		const empForm = {
			userName: username,
			userPassword: password,
			userEmail: email,
			userCompany: company,
			role: { roleID: 3 },
		}
		try {
			const res = await userservice.signup(empForm)
			ls.set('logged_in', true)
			removeInputValues()
			setShowSuccess(true)
			setMessage(res.statusText)
			setClose(true)
			saveDetails(
				res.result.userID,
				res.result.userName,
				res.result.userCompany,
				res.result.role.roleName,
				res.result.userEmail,
				res.token
			)
			// router.push('/')
			// if (router.pathname === '/dashboard') {
			// 	router.reload()
			// }
			router.reload()
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}
	const signup = (e) => {
		e.preventDefault()
		switch (role) {
			case 'Client Partner':
				cpSignup()
				ls.set('client_partner', true)
				break
			case 'Product Manager':
				pmSignup()
				ls.set('product_manager', true)
				break
			case 'Employee':
				empSignup()
				ls.set('employee', true)
				break
			default:
				setShowError(true)
				setMessage('Please select your designation')
				setTimeout(() => setShowError(false), 3000)
				break
		}
	}

	const handleChange = (event) => {
		setRole(event.target.value)
	}
	return (
		<>
			{showsuccess ? <SuccessSnackbar message={message} /> : <></>}
			{showerror ? <ErrorSnackbar message={message} /> : <></>}
			<Heading variant='h4' position='center'>
				Register
			</Heading>
			<br />
			<form
				autoComplete='on'
				align='center'
				method='post'
				onSubmit={(e) => signup(e)}>
				<Input
					id='input-with-icon-textfield'
					label='Username '
					variant='outlined'
					value={username}
					type='text'
					onchangefunc={(e) => setUsername(e.target.value)}
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<PersonIcon />
							</InputAdornment>
						),
					}}
				/>

				<br />
				<br />
				<Input
					id='outlined-basic'
					label='Password'
					fullWidth
					type='password'
					variant='outlined'
					value={password}
					onchangefunc={(e) => setPassword(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<LockIcon />
							</InputAdornment>
						),
					}}
				/>
				<br />
				<br />
				<Input
					id='outlined-basic'
					label='Email '
					fullWidth
					variant='outlined'
					type='email'
					value={email}
					onchangefunc={(e) => setEmail(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<EmailIcon />
							</InputAdornment>
						),
					}}
				/>
				<br />
				<br />
				<Input
					id='outlined-basic'
					label='Company'
					fullWidth
					variant='outlined'
					type='text'
					value={company}
					onchangefunc={(e) => setCompany(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<LocationCityIcon />
							</InputAdornment>
						),
					}}
				/>
				<br />
				<br />
				<Input
					id='outlined-select-currency-native'
					select
					fullWidth
					label='Select designation'
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
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Input>
				<br />
				<br />

				<Button
					type='submit'
					variant='contained'
					color='primary'
					size='medium'
					onClick={close ? closeMe() : closeDialog()}
					align='center'>
					Register
				</Button>
			</form>
		</>
	)
}
