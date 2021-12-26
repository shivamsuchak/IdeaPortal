import { Avatar, Dialog } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import BoxComponent from '../components/BoxComponent'
import CreateThemeFrom from './CreateThemeFrom'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import productmanagerservice from '../services/productmanagerservice'
import Link from 'next/link'
import SuccessSnackbar from './SuccessSnackbar'
import ErrorSnackbar from './ErrorSnackbar'
import ls from 'local-storage'
import { useRouter } from 'next/router'
import CreateIdeaFrom from './CreateIdeaFrom'
import swal from 'sweetalert'
import clientpartnerservice from '../services/clientpartnerservice'

const useStyles = makeStyles({
	root: {
		minWidth: 250,
	},

	title: {
		fontWeight: 'bold',
	},
	title2: {
		fontWeight: 'bold',
	},
	pos: {
		marginBottom: 12,
	},
})

export default function Cards({
	client,
	theme,
	id,
	themeid,
	description,
	files,
	dateofposting,
	editoption,
	category,
	href,
}) {
	const classes = useStyles()
	const [EditTheme, setEditTheme] = React.useState(false)
	const [EditIdea, setEditIdea] = React.useState(false)
	const [themename, setThemename] = React.useState('')
	const [themedesc, setThemeDesc] = React.useState('')
	const [themedocs, setThemeDocs] = React.useState([])
	const [themecategory, setThemeCategory] = React.useState('')
	const [ideaname, setIdeaName] = React.useState('')
	const [ideadesc, setIdeaDesc] = React.useState('')
	const [ideadocs, setIdeaDocs] = React.useState([])
	const [Id, setID] = React.useState(0)
	const router = useRouter()
	const [themeId, setThemeId] = React.useState(0)
	const [showsuccess, setShowSuccess] = React.useState(false)
	const [showerror, setShowError] = React.useState(false)
	const [message, setMessage] = React.useState('')
	const deleteTheme = async (themeID) => {
		try {
			const token = ls.get('token')
			clientpartnerservice.setToken(token)
			const res = await clientpartnerservice.deleteTheme(themeID)
			setShowSuccess(true)
			setMessage(res.statusText)
			setTimeout(() => setShowSuccess(false), 3000)
			router.reload()
		} catch (error) {
			setShowError(true)
			setMessage(error.response?.data?.message)
			setTimeout(() => setShowError(false), 3000)
		}
	}

	const deleteIdea = async (ideaID) => {
		try {
			const token = ls.get('token')
			productmanagerservice.setToken(token)
			const res = await productmanagerservice.deleteIdea(ideaID)
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
	const themeoridea = editoption === 'theme' ? 'theme' : 'idea'
	const deleteThemeOrIdea = (id) => {
		swal({
			title: 'Are you sure?',
			text: 'Do you want to delete this ' + themeoridea,
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
			if (value && themeoridea === 'theme') {
				deleteTheme(id)
			} else if (value && themeoridea === 'idea') {
				deleteIdea(id)
			}
		})
	}
	const handleOpenEditTheme = (
		uthemename,
		uthemedesc,
		uthemedocs,
		themeID,
		uthemecategory
	) => {
		// e.preventDefault()
		setThemename(uthemename)
		setThemeDesc(uthemedesc)
		setThemeDocs(uthemedocs)
		setID(themeID)
		setThemeCategory(uthemecategory)
		setEditTheme(true)
	}

	const handleCloseEditThemeLate = () => {
		setTimeout(() => setEditTheme(false), 1000)
	}
	const handleCloseEditTheme = () => {
		setEditTheme(false)
	}
	const handleOpenEditIdea = (
		uideaname,
		uideadesc,
		uideadocs,
		ideaid,
		themeID
	) => {
		// e.preventDefault()
		setIdeaName(uideaname)
		setIdeaDesc(uideadesc)
		setIdeaDocs(uideadocs)
		setID(ideaid)
		setThemeId(themeID)
		setEditIdea(true)
	}
	const handleCloseEditIdea = () => {
		setEditIdea(false)
	}
	const handleCloseEditIdeaLate = () => {
		setTimeout(() => setEditIdea(false), 1000)
	}
	return (
		<>
			{showsuccess ? <SuccessSnackbar message={message} /> : <></>}
			{showerror ? <ErrorSnackbar message={message} /> : <></>}
			<BoxComponent boxshadow={2} m={0.5} p={0.5} bgcolor='primary.main'>
				<Card variant='outlined' className={classes.root}>
					<CardHeader
						className={classes.title2}
						avatar={
							<Avatar
								aria-label='recipe'
								style={{ background: '#ff9800', color: '#1F1C22' }}>
								{client[0]}
							</Avatar>
						}
						title={client}
						subheader={dateofposting}
						action={
							<>
								{editoption === 'theme' ? (
									<>
										<IconButton
											onClick={() =>
												handleOpenEditTheme(
													theme,
													description,
													files,
													id,
													category
												)
											}
											aria-label='editidea'>
											<EditIcon />
										</IconButton>
										<IconButton onClick={() => deleteThemeOrIdea(id)}>
											<DeleteIcon color='secondary' aria-label='settings' />
										</IconButton>
									</>
								) : editoption === 'idea' ? (
									<>
										<IconButton
											onClick={() =>
												handleOpenEditIdea(
													theme,
													description,
													files,
													id,
													themeid
												)
											}
											aria-label='edittheme'>
											<EditIcon />
										</IconButton>
										<IconButton
											color='secondary'
											aria-label='settings'
											onClick={() => deleteThemeOrIdea(id)}>
											<DeleteIcon />
										</IconButton>
									</>
								) : (
									<></>
								)}
							</>
						}
					/>
					<Link href={href}>
						<a>
							<CardContent>
								<Typography
									className={classes.title2}
									variant='h6'
									component='p'
									noWrap>
									{theme}
								</Typography>
								{editoption !== 'theme' && editoption !== 'idea' ? (
									<div>
										<Typography className={classes.title2}>
											{category}
										</Typography>
										<Typography className={classes.title2}>
											{description}
										</Typography>
									</div>
								) : (
									<></>
								)}
							</CardContent>
						</a>
					</Link>
				</Card>
			</BoxComponent>

			<Dialog
				classes={{ paper: classes.paper }}
				fullWidth
				open={EditTheme}
				aria-labelledby='form-dialog-title'
				onClose={handleCloseEditTheme}>
				<DialogContent>
					<CreateThemeFrom
						newthemename={themename}
						newthemedesc={themedesc}
						newthemefiles={themedocs}
						newthemecategory={themecategory}
						themeid={Id}
						closeMe={handleCloseEditThemeLate}
						type='update'
					/>
				</DialogContent>
			</Dialog>

			<Dialog
				classes={{ paper: classes.paper }}
				fullWidth
				open={EditIdea}
				aria-labelledby='form-dialog-title'
				onClose={handleCloseEditIdea}>
				<DialogContent>
					<CreateIdeaFrom
						newideaname={ideaname}
						newideadesc={ideadesc}
						newideafiles={ideadocs}
						ideaid={Id}
						themeid={themeId}
						closeMe={handleCloseEditIdeaLate}
						type='update'
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}
