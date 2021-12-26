import Button from '@material-ui/core/Button'
import TypoComponent from './TypoComponent'
import React from 'react'
import Input from './InputComponent'
import userservice from '../services/userservice'
import SuccessSnackbar from './SuccessSnackbar'
import ErrorSnackbar from './ErrorSnackbar'
import ls from 'local-storage'
import InputAdornment from '@material-ui/core/InputAdornment'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import ButtonComponent from './ButtonComponent'
import { useRouter } from 'next/router'
export default function LoginForm({ clickMe, closeMe }) {
	const [username, setUserName] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const [close, setClose] = React.useState(false)

	const closeDialog = () => {
		if (!close) {
			return
		}
	}

	const router = useRouter()
	const loginUser = async (e) => {
		e.preventDefault()
		const userForm = {
			userName: username,
			userPassword: password,
		}
		try {
			const res = await userservice.login(userForm)
			ls.set('logged_in', true)
			setUserName('')
			setPassword('')
			setShowSuccess(true)
			setMessage(res.statusText)
			if (res.result.role.roleName === 'Client Partner') {
				ls.set('client_partner', true)
			} else if (res.result.role.roleName === 'Product Manager') {
				ls.set('product_manager', true)
			} else if (res.result.role.roleName === 'Participant') {
				ls.set('employee', true)
			}
			setClose(true)
			ls.set('userid', res.result.userID)
			ls.set('username', res.result.userName)
			ls.set('company', res.result.userCompany)
			ls.set('role', res.result.role.roleName)
			ls.set('email', res.result.userEmail)
			ls.set('token', res.token)
			router.reload()
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}
	return (
		<>
			{showsuccess ? <SuccessSnackbar message={message} /> : <></>}
			{showerror ? <ErrorSnackbar message={message} /> : <></>}
			<TypoComponent variant='h4' position='center'>
				Login
			</TypoComponent>
			<br />
			<form autoComplete='on' align='center' onSubmit={(e) => loginUser(e)}>
				<Input
					id='outlined-basic'
					label='Username'
					fullWidth
					value={username}
					type='text'
					onchangefunc={(e) => setUserName(e.target.value)}
					variant='outlined'
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
					type='password'
					fullWidth
					value={password}
					onchangefunc={(e) => setPassword(e.target.value)}
					variant='outlined'
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
				<ButtonComponent
					color='inherit'
					clickfunc={clickMe}
					style={{ float: 'right', marginTop: '-2%' }}>
					Forgot Password?
				</ButtonComponent>
				<br />
				<br />
				<Button
					variant='contained'
					color='primary'
					size='medium'
					onClick={close ? closeMe() : closeDialog()}
					style={{ width: '30%', marginTop: '-2%' }}
					type='submit'
					align='center'>
					Login
				</Button>
			</form>
		</>
	)
}
