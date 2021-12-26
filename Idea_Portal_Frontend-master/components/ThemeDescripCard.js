import { Avatar } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ls from 'local-storage'
import { useRouter } from 'next/router'
import React from 'react'
import BoxComponent from './BoxComponent'
import ButtonComponent from './ButtonComponent'
import CreateIdeaFrom from './CreateIdeaFrom'
import Link from 'next/link'

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
	paper: { border: '5px solid #ff9800' },
})

export default function ThemeCard({
	client,
	theme,
	description,
	dateofposting,
	themeid,
	author,
	category,
}) {
	const [open, setOpen] = React.useState(false)
	const classes = useStyles()

	const closeCreateIdeaonSubmit = () => {
		setTimeout(() => setOpen(false), 1000)
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const router = useRouter()
	return (
		<BoxComponent boxshadow={2} m={0.5} p={0.5} bgcolor='primary.main'>
			<Card variant='outlined'>
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
				/>
				<CardContent>
					<Typography
						className={classes.title2}
						variant='h5'
						gutterBottom
						noWrap>
						{theme}
					</Typography>
					<br />
					<Typography className={classes.title2}>Description</Typography>

					<Typography variant='body2' component='p'>
						{description}
					</Typography>
					<br />
					<Typography className={classes.title2}>Category</Typography>

					<Typography variant='body2' component='p'>
						{category}
					</Typography>
					<br/>
					<Typography className={classes.title2}>Posted By</Typography>

					<Typography variant='body2' component='p'>
						{author}
					</Typography>
					<br />
					<Typography className={classes.title2}>Attached Documents</Typography>
					<Typography style={{ color: 'blue' }}>
						<Link href={'/theme/' + themeid + '/themedocuments'}>
							Check out the documents here...
						</Link>
					</Typography>
				</CardContent>
				<CardActions>
					<ButtonComponent
						color='primary'
						clickfunc={() => router.push('/theme/' + themeid + '/ideas')}
						variant='contained'
						size='medium'>
						Show Ideas
					</ButtonComponent>
					{ls.get('product_manager') ? (
						<ButtonComponent
							color='primary'
							variant='contained'
							clickfunc={handleClickOpen}
							size='medium'>
							Create Idea
						</ButtonComponent>
					) : (
						<></>
					)}
				</CardActions>
			</Card>

			<Dialog
				fullWidth
				open={open}
				classes={{ paper: classes.paper }}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'>
				<DialogContent>
					<CreateIdeaFrom themeid={themeid} closeMe={closeCreateIdeaonSubmit} />
				</DialogContent>
			</Dialog>
		</BoxComponent>
	)
}
