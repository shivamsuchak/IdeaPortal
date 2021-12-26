import { Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockIcon from '@material-ui/icons/Lock'
import ls from 'local-storage'
import React from 'react'
import userservice from '../services/userservice'
import ErrorSnackbar from './ErrorSnackbar'
import Input from './InputComponent'
import SuccessSnackbar from './SuccessSnackbar'
import TypoComponent from './TypoComponent'

export default function UpdatePassword() {
	const [newpassword, setNewPassword] = React.useState('')
	const [confirmpassword, setConfirmPassword] = React.useState('')
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')

	const changePassword = async (e) => {
		e.preventDefault()
		const userForm = {
			userID: ls.get('userid'),
			userPassword: newpassword,
		}
		try {
			if (newpassword === confirmpassword) {
				const token = ls.get('token')
				userservice.setToken(token)
				const res = await userservice.updatePassword(userForm)
				setNewPassword('')
				setConfirmPassword('')
				setShowSuccess(true)
				setMessage(res.statusText)
				setTimeout(() => setShowSuccess(false), 3000)
			} else {
				setShowError(true)
				setMessage('New Password and Confirm Password do not match!!')
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
				Change Password
			</TypoComponent>
			<br />

			<form
				autoComplete='on'
				align='center'
				onSubmit={(e) => changePassword(e)}>
				<Input
					id='outlined-basic'
					label='New Password'
					type='password'
					style={{ width: '50%' }}
					value={newpassword}
					onchangefunc={(e) => setNewPassword(e.target.value)}
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
					style={{ width: '50%' }}
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
					type='submit'
					align='center'>
					Update Password
				</Button>
			</form>
		</>
	)
}
