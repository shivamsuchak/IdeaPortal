import { Card, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FilterListIcon from '@material-ui/icons/FilterList'
import { useRouter } from 'next/router'
import React from 'react'
import GetAppIcon from '@material-ui/icons/GetApp'
import ErrorComponent from '../../../../components/ErrorComponent'
import Headtag from '../../../../components/Headtag'
import NewTableForIdeas from '../../../../components/NewTableForIdeas'
import SpinnerComponent from '../../../../components/SpinnerComponent'
import Heading from '../../../../components/TypoComponent'
import userservice from '../../../../services/userservice'
const useStyles = makeStyles((theme) => ({
	outerGrid: {
		border: '2px transparent',
		borderImageSlice: 1,
		borderImageSource: 'linear-gradient(to left, red, orange)',
	},
	innerGrid: {
		margin: theme.spacing(2),
		border: '5px solid',
		borderImageSlice: 1,
		padding: theme.spacing(2),
		borderImageSource: 'linear-gradient(to left, red, orange)',
		borderRadius: '5px',
	},
	title: {
		textAlign: 'center',
		padding: '2%',
	},
}))
export default function IdeaPage() {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const classes = useStyles()
	const router = useRouter()
	const [showmostliked, setShowMostLiked] = React.useState(false)
	const [showmostcommented, setShowMostCommented] = React.useState(false)
	const [showrecentlyadded, setShowRecentlyAdded] = React.useState(true)
	const [downloadurl, setDownloadUrl] = React.useState('')

	React.useEffect(() => {
		async function fetchData() {
			try {
				const res = await userservice.downloadIdeasByTheme(router.query.themeid)
				setDownloadUrl(res.result)
			} catch (err) {
				fetchData()
			}
		}
		fetchData()
	}, [])

	const showMostLiked = () => {
		setShowMostLiked(true)
		setShowMostCommented(false)
		setShowRecentlyAdded(false)
		handleClose()
	}

	const showMostCommented = () => {
		setShowMostLiked(false)
		setShowMostCommented(true)
		setShowRecentlyAdded(false)
		handleClose()
	}
	const showRecentlyAdded = () => {
		setShowMostLiked(false)
		setShowMostCommented(false)
		setShowRecentlyAdded(true)
		handleClose()
	}

	const setData = () => {
		if (showmostliked) {
			return userservice.getMostLikedIdeasbyThemeId(router.query.themeid)
		} else if (showmostcommented) {
			return userservice.getMostCommentedIdeasbyThemeId(router.query.themeid)
		} else if (showrecentlyadded) {
			return userservice.getNewestIdeasbyThemeId(router.query.themeid)
		}
	}
	const { data, error } = setData()
	const ideas = data?.data
	if (error) return <ErrorComponent />
	if (!data) return <SpinnerComponent />
	return (
		<>
			{ideas[Object.keys(ideas)[2]] !== null ? (
				<Heading variant='h4' classname={classes.title}>
					{' '}
					Ideas for {ideas[Object.keys(ideas)[2]][0].theme.themeName}
				</Heading>
			) : (
				<div></div>
			)}

			<Grid container direction='row'>
				<Grid
					container
					style={{ marginBottom: '0.5%' }}
					alignItems='flex-end'
					justify='flex-end'>
					{ideas.totalElements > 0 ? (
						<>
							<a href={downloadurl}>
								<GetAppIcon />
							</a>
							<Button
								size='large'
								aria-controls='fade-menu'
								aria-haspopup='true'
								onClick={handleClick}>
								<FilterListIcon />
							</Button>
						</>
					) : (
						<>
							<div style={{ marginTop: '2%' }}></div>
							<br />
						</>
					)}
				</Grid>
			</Grid>

			<Menu
				id='fade-menu'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}>
				<MenuItem onClick={showMostLiked}>Most Liked</MenuItem>
				<MenuItem onClick={showMostCommented}>Most Commented</MenuItem>
				<MenuItem onClick={showRecentlyAdded}>Recently Added</MenuItem>
			</Menu>
			<Headtag title={'Ideas ' + router.query.themeid} />
			<Card>
				<Grid container className={classes.outerGrid}>
					{ideas.totalElements > 0 ? (
						<Grid
							container
							alignItems='center'
							justify='center'
							className={classes.innerGrid}>
							{showmostliked ? (
								<Heading variant='h4'>Most Liked Ideas </Heading>
							) : showmostcommented ? (
								<Heading variant='h4'>Most Commented Ideas </Heading>
							) : showrecentlyadded ? (
								<Heading variant='h4'>Recently Added Ideas </Heading>
							) : (
								<></>
							)}

							{showmostliked ? (
								<NewTableForIdeas ideas={ideas} />
							) : showmostcommented ? (
								<NewTableForIdeas ideas={ideas} />
							) : showrecentlyadded ? (
								<NewTableForIdeas ideas={ideas} />
							) : (
								<></>
							)}
						</Grid>
					) : (
						<Grid container alignItems='center' justify='center'>
							<Heading variant='h5'>{ideas.statusText}</Heading>
						</Grid>
					)}
				</Grid>
			</Card>
		</>
	)
}
