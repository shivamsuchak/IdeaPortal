import { Grid, Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Card from '@material-ui/core/Card';
import React from 'react'
import { useRouter } from 'next/router'
import ErrorComponent from '../../../../../components/ErrorComponent'
import Headtag from '../../../../../components/Headtag'
import IdeaDesc from '../../../../../components/IdeaDescComponent'
import LikeComment from '../../../../../components/LikeComment'
import SpinnerComponent from '../../../../../components/SpinnerComponent'
import Heading from '../../../../../components/TypoComponent'
import userservice from '../../../../../services/userservice'
const useStyles = makeStyles((theme) => ({
	outerGrid: {
		border: '1px transparent',
	},
	innerGrid1: {
		border: '4px solid #ff9800',
		borderRadius: '5px',
		flexGrow: 1,
	},
	innerGrid: {
		margin: theme.spacing(2),
		border: '4px solid #ff9800',
		borderRadius: '5px',
		flexGrow: 1,
	},
	ideaGrid: {
		margin: theme.spacing(1),
	},
	title: {
		textAlign: 'center',
		padding: '2%',
	},
}))

export default function Description() {
	const classes = useStyles()
	const router = useRouter()
	const { data, error } = userservice.getIdeabyId(router.query.ideaid)

	const idea = data?.data
	if (error) return <ErrorComponent />
	if (!data) return <SpinnerComponent />
	return (
		<>
			<Headtag title={'Idea ' + router.query.ideaid} />
			<Heading variant='h4' classname={classes.title}>
				{' '}
				{idea.result.ideaName}
			</Heading>
			{/* <Grid item container justify="space-between" direction="row" className={classes.ideaGrid}> */}
			<Grid container className={classes.innerGrid1}>
				<Card>
				<Grid container>
					<Grid item container sm={8} xs={12} className={classes.ideaGrid}>
						<IdeaDesc
							heading='Idea Name :'
							description={idea.result.ideaName}
						/>

						<IdeaDesc
							heading='Description :'
							description={idea.result.ideaDescription}
						/>

						<IdeaDesc
							heading='Submitted By :'
							description={idea.result.user.userName}
						/>

						<IdeaDesc
							heading='Documents :'
							description={
								<Typography style={{ color: 'blue' }}>
									<Link
										href={
											'/theme/' +
											router.query.themeid +
											'/ideas/' +
											idea.result.ideaID +
											'/ideadocuments'
										}>
										Check out the documents here...
									</Link>
								</Typography>
							}
						/>
					</Grid>
					<Grid item xs={0}>
						<Divider orientation='vertical' />
					</Grid>
					<Grid item contaier sm={3} xs={12} className={classes.ideaGrid}>
						<LikeComment
							themeid={router.query.themeid}
							ideaid={router.query.ideaid}
						/>
					</Grid>
				</Grid>
				</Card>
			</Grid>
		</>
	)
}
