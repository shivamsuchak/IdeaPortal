import { Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import DescriptionIcon from '@material-ui/icons/Description'
import PostAddIcon from '@material-ui/icons/PostAdd'
import ls from 'local-storage'
import { useRouter } from 'next/router'
import React from 'react'
import productmanagerservice from '../services/productmanagerservice'
import ErrorSnackbar from './ErrorSnackbar'
import Input from './InputComponent'
import SuccessSnackbar from './SuccessSnackbar'
import Heading from './TypoComponent'
const useStyles = makeStyles({
	title: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	title2: {
		fontWeight: 'bold',
	},
	pos: {
		marginBottom: 12,
	},
	paper: {
		border: '5px solid #ff9800',
	},
	btn: {
		border: '0',
		padding: '15px 30px',
		backgroundColor: 'transparent',
		borderRadius: '10px',
		color: 'black',
		fontSize: '15px',
		fontWeight: '300',
	},
	buttonContainer: {
		position: 'relative',
		display: 'inline-block',
		backgroundColor: 'orange',
		borderRadius: '3px',
	},
	file1: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		cursor: 'pointer',
		opacity: '0',
		top: '0',
		right: '0',
	},
	list: {
		border: '1px solid grey',
		padding: '10px',
		borderRadius: '3px',
		width: 'fit-content',
	},
})

const CreateIdeaFrom = ({
	closeMe,
	type,
	ideaid,
	themeid,
	newideaname,
	newideadesc,
	newideafiles,
}) => {
	const classes = useStyles()
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const [close, setClose] = React.useState(false)
	const [ideaname, setIdeaName] = React.useState('')
	const [ideadesc, setIdeaDesc] = React.useState('')
	const [ideadoc, setIdeaDoc] = React.useState([])
	const [updateideaname, setUpdateIdeaName] = React.useState(newideaname)
	const [updateideadesc, setUpdateIdeaDesc] = React.useState(newideadesc)
	const [updateideadocs, setUpdateIdeaDocs] = React.useState(0)
	const previousfileslength = newideafiles?.length
	const router = useRouter()

	const closeDialog = () => {
		if (!close) {
			return
		}
	}
	const updatetrue = type === 'update'

	const createIdea = async (e) => {
		e.preventDefault()
		const userForm = new FormData()
		userForm.append('userID', ls.get('userid'))
		userForm.append('themeID', themeid)
		userForm.append('ideaName', ideaname.trim())
		userForm.append('ideaDescription', ideadesc.trim())

		if (ideadoc.length !== 0) {
			for (let i = 0; i < ideadoc.length; i++) {
				userForm.append('files', ideadoc[i])
			}
		}
		try {
			const token = ls.get('token')
			productmanagerservice.setToken(token)
			const res = await productmanagerservice.createIdea(userForm)
			setIdeaName('')
			setIdeaDesc('')
			setIdeaDoc([])
			setClose(true)
			setShowSuccess(true)
			setMessage(res.statusText)
			setTimeout(() => setShowSuccess(false), 3000)
			setTimeout(
				() => router.push('/theme/' + router.query.themeid + '/ideas'),
				1000
			)
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}
	const updateIdea = async (e) => {
		e.preventDefault()
		const userForm = new FormData()
		userForm.append('userID', ls.get('userid'))
		userForm.append('ideaName', updateideaname.trim())
		userForm.append('themeID', themeid)
		userForm.append('ideaDescription', updateideadesc.trim())
		if (updateideadocs.length !== 0) {
			for (let i = 0; i < updateideadocs.length; i++) {
				userForm.append('files', updateideadocs[i])
			}
		}

		try {
			const token = ls.get('token')
			productmanagerservice.setToken(token)
			const res = await productmanagerservice.updateIdea(userForm, ideaid)
			setUpdateIdeaName('')
			setUpdateIdeaDesc('')
			setUpdateIdeaDocs([])
			setClose(true)
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

	const addOrUpdateIdea = (e) => {
		if (updatetrue) {
			updateIdea(e)
		} else {
			createIdea(e)
		}
	}
	return (
		<div>
			{showsuccess ? <SuccessSnackbar message={message} /> : <></>}
			{showerror ? <ErrorSnackbar message={message} /> : <></>}
			<Heading variant='h4' position='center'>
				{updatetrue ? 'Update' : 'Create'} Idea
			</Heading>
			<br />

			<form method='post' onSubmit={(e) => addOrUpdateIdea(e)}>
				<Input
					variant='outlined'
					id='name'
					label='Idea Name'
					type='text'
					value={updatetrue ? updateideaname : ideaname}
					onchangefunc={(e) =>
						updatetrue
							? setUpdateIdeaName(e.target.value)
							: setIdeaName(e.target.value)
					}
					fullWidth
					InputProps={{
						inputProps: { maxLength: 150 },
						startAdornment: (
							<InputAdornment position='start'>
								<PostAddIcon />
							</InputAdornment>
						),
					}}
				/>
				<br />
				<br />
				<Input
					fullWidth
					variant='outlined'
					id='outlined-multiline-flexible'
					value={updatetrue ? updateideadesc : ideadesc}
					rows={5}
					onchangefunc={(e) =>
						updatetrue
							? setUpdateIdeaDesc(e.target.value)
							: setIdeaDesc(e.target.value)
					}
					label='Idea Description'
					multiline
					InputProps={{
						inputProps: { maxLength: 1200 },
						startAdornment: (
							<InputAdornment position='start'>
								<DescriptionIcon />{' '}
							</InputAdornment>
						),
					}}
				/>
				<br />
				<br />
				<div className={classes.buttonContainer}>
					<button className={classes.btn}>Upload file(s)</button>
					<input
						type='file'
						multiple
						onChange={(e) =>
							updatetrue
								? setUpdateIdeaDocs(e.target.files)
								: setIdeaDoc(e.target.files)
						}
						className={classes.file1}
					/>
				</div>
				<br />
				<br />
				<Heading variant='p'>
					Files uploaded :{' '}
					{updatetrue && updateideadocs.length > 0
						? Object.keys(updateideadocs).length
						: updatetrue
						? previousfileslength
						: Object.keys(ideadoc).length}
				</Heading>
				<br />
				{updatetrue ? (
					<Heading variant='p'>
						<b>Note : Previous files will be overriden with new files.</b>
					</Heading>
				) : (
					<></>
				)}

				<br />
				<br />
				<div style={{ textAlign: 'center' }}>
					<Button
						type='submit'
						size='medium'
						onClick={close ? closeMe() : closeDialog()}
						style={{ width: '30%' }}
						variant='contained'
						color='primary'>
						Submit
					</Button>
				</div>
				<br />
			</form>
		</div>
	)
}

export default CreateIdeaFrom
