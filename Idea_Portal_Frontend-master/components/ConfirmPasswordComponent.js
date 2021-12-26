import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import { useRouter } from 'next/router'
import React from 'react'
import userservice from '../services/userservice'
import ErrorSnackbar from './ErrorSnackbar'
import Input from './InputComponent'
import SuccessSnackbar from './SuccessSnackbar'
import TypoComponent from './TypoComponent'

const ConfirmPasswordComponent = ({ closeMe, userid }) => {
	const [password, setPassword] = React.useState('')
	const [confirmpassword, setConfirmPassword] = React.useState('')
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

	const changePassword = async (e) => {
		e.preventDefault()
		const userForm = { userID: userid, userPassword: password }
		try {
			if (password === confirmpassword) {
				const res = await userservice.confirmPassword(userForm)
				setPassword('')
				setConfirmPassword('')
				setShowSuccess(true)
				setMessage(res.statusText)
				setClose(true)
				router.push('/')
			} else {
				setShowError(true)
				setMessage('Password and Confirm Password do not match!!')
				setTimeout(() => setShowError(false), 3000)
			}
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
				New Password
			</TypoComponent>
			<br />
			<form
				autoComplete='on'
				align='center'
				onSubmit={(e) => changePassword(e)}>
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
				<Input
					id='outlined-basic'
					label='Confirm Password'
					type='password'
					fullWidth
					value={confirmpassword}
					onchangefunc={(e) => setConfirmPassword(e.target.value)}
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
				<Button
					variant='contained'
					color='primary'
					size='medium'
					onClick={close ? closeMe() : closeDialog()}
					type='submit'
					align='center'>
					Change Password
				</Button>
			</form>
		</>
	)
}

export default ConfirmPasswordComponent
