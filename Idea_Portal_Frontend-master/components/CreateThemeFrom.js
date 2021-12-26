import { Button, makeStyles, MenuItem } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import DescriptionIcon from '@material-ui/icons/Description'
import PostAddIcon from '@material-ui/icons/PostAdd'
import ls from 'local-storage'
import { useRouter } from 'next/router'
import React from 'react'
import clientpartnerservice from '../services/clientpartnerservice'
import userservice from '../services/userservice'
import ErrorSnackbar from './ErrorSnackbar'
import Input from './InputComponent'
import SuccessSnackbar from './SuccessSnackbar'
import Heading from './TypoComponent'
import CategoryIcon from '@material-ui/icons/Category'
const useStyles = makeStyles((theme) => ({
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
}))
const CreateThemeFrom = ({
	closeMe,
	type,
	newthemename,
	newthemedesc,
	newthemefiles,
	newthemecategory,
	themeid,
}) => {
	const classes = useStyles()
	const router = useRouter()
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const [themename, setThemeName] = React.useState('')
	const [themedesc, setThemeDesc] = React.useState('')
	const [themedoc, setThemeDoc] = React.useState([])
	const [category, setCategory] = React.useState('Insurance')
	const [categories, setCategories] = React.useState([])
	const [updatethemename, setUpdateThemeName] = React.useState(newthemename)
	const [updatethemedesc, setUpdateThemeDesc] = React.useState(newthemedesc)
	const [updatethemedocs, setUpdateThemeDocs] = React.useState(0)
	const [updatecategory, setUpdateCategory] = React.useState(newthemecategory)
	const [close, setClose] = React.useState(false)
	const previousfileslength = newthemefiles?.length
	const closeDialog = () => {
		if (!close) {
			return
		}
	}
	React.useEffect(() => {
		async function fetchData() {
			try {
				const res = await userservice.getThemeCategories()
				setCategories(res.result)
			} catch (error) {
				return
			}
		}
		fetchData()
	}, [])
	const updatetrue = type === 'update'

	const createTheme = async (e) => {
		e.preventDefault()
		const userForm = new FormData()
		userForm.append('userID', ls.get('userid'))
		userForm.append('themeName', themename.trim())
		userForm.append('themeDescription', themedesc.trim())
		userForm.append('themeCategory', setThemeCategoryId())
		if (themedoc.length !== 0) {
			for (let i = 0; i < themedoc.length; i++) {
				userForm.append('files', themedoc[i])
			}
		}
		try {
			const token = ls.get('token')
			clientpartnerservice.setToken(token)
			const res = await clientpartnerservice.createTheme(userForm)
			setThemeName('')
			setThemeDesc('')
			setThemeDoc([])
			setClose(true)
			setShowSuccess(true)
			setMessage(res.statusText)
			setTimeout(() => setShowSuccess(false), 3000)
			if (router.pathname === '/') {
				router.reload()
			} else {
				router.push('/')
			}
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}

	const updateTheme = async (e) => {
		e.preventDefault()
		const userForm = new FormData()
		userForm.append('userID', ls.get('userid'))
		userForm.append('themeName', updatethemename.trim())
		userForm.append('themeDescription', updatethemedesc.trim())
		userForm.append('themeCategory', setThemeCategoryId())
		if (updatethemedocs.length !== 0) {
			for (let i = 0; i < updatethemedocs.length; i++) {
				userForm.append('files', updatethemedocs[i])
			}
		}
		try {
			const token = ls.get('token')
			clientpartnerservice.setToken(token)
			const res = await clientpartnerservice.updateTheme(userForm, themeid)
			setUpdateThemeName('')
			setUpdateThemeDesc('')
			setUpdateThemeDocs([])
			setShowSuccess(true)
			setMessage(res.statusText)
			setClose(true)
			setTimeout(() => setShowSuccess(false), 3000)
			router.reload()
		} catch (error) {
			setShowError(true)
			setMessage(error.response.data.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}

	const addOrUpdateTheme = async (e) => {
		if (updatetrue) {
			updateTheme(e)
		} else {
			createTheme(e)
		}
	}

	const setThemeCategoryId = () => {
		const newcategory = updatetrue ? updatecategory : category
		switch (newcategory) {
			case 'Insurance':
				return 1
			case 'E-Commerce':
				return 2
			case 'Banking':
				return 3
			case 'Booking Portal':
				return 4
			case 'Mobility and Personal Communications Networks':
				return 5
			case 'Healthcare':
				return 6
		}
	}

	return (
		<>
			{showsuccess ? <SuccessSnackbar message={message} /> : <></>}
			{showerror ? <ErrorSnackbar message={message} /> : <></>}
			<Heading variant='h4' position='center'>
				{updatetrue ? 'Update' : 'Create'} Theme
			</Heading>
			<br />

			<form method='post' onSubmit={(e) => addOrUpdateTheme(e)}>
				<Input
					variant='outlined'
					id='name'
					label='Theme Name'
					type='text'
					value={updatetrue ? updatethemename : themename}
					onchangefunc={(e) =>
						updatetrue
							? setUpdateThemeName(e.target.value)
							: setThemeName(e.target.value)
					}
					fullWidth
					InputProps={{
						inputProps: { maxLength: 50 },
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
					value={updatetrue ? updatethemedesc : themedesc}
					onchangefunc={(e) =>
						updatetrue
							? setUpdateThemeDesc(e.target.value)
							: setThemeDesc(e.target.value)
					}
					label='Theme Description'
					multiline
					rows={5}
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
				<Input
					variant='outlined'
					id='outlined-multiline-flexible'
					select
					helperText='Select Category'
					fullWidth
					value={updatetrue ? updatecategory : category}
					onchangefunc={(e) =>
						updatetrue
							? setUpdateCategory(e.target.value)
							: setCategory(e.target.value)
					}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<CategoryIcon />
							</InputAdornment>
						),
					}}>
					{categories.map((option) => (
						<MenuItem
							key={option.themeCategoryName}
							value={option.themeCategoryName}>
							{option.themeCategoryName}
						</MenuItem>
					))}
				</Input>
				<br />
				<br />
				<div className={classes.buttonContainer}>
					<button className={classes.btn}>Upload file(s)</button>
					<input
						type='file'
						multiple
						onChange={(e) =>
							updatetrue
								? setUpdateThemeDocs(e.target.files)
								: setThemeDoc(e.target.files)
						}
						className={classes.file1}
					/>
				</div>

				<br />
				<br />
				<Heading variant='p'>
					Files uploaded :{' '}
					{updatetrue && updatethemedocs.length > 0
						? Object.keys(updatethemedocs).length
						: updatetrue
						? previousfileslength
						: Object.keys(themedoc).length}
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
		</>
	)
}

export default CreateThemeFrom
