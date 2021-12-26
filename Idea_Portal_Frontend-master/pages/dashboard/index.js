import ThemesByDate from '../../components/ThemesByDateChart'
import Headtag from '../../components/Headtag'
import IdeasByTheme from '../../components/IdeasByThemeChart'
import ParticipantsByIdea from '../../components/ParticipantsByIdeaChart'
import TopLikedIdeas from '../../components/TopLikedIdeasChart'
import TopDislikedIdeas from '../../components/TopDislikedIdeaChart'
import { Grid } from '@material-ui/core'
import ChipBar from '../../components/ChipBar'
import React from 'react'
export default function Dashboard() {
	return (
		<>
			<Headtag title='Dashboard' />
			<br />
			<div>
				<ChipBar />
			</div>
			<br />
			<br />
			<Grid container direction='column'>
				<Grid item container>
					<Grid item xs={false} sm={2} />
					<Grid item xs={12} sm={8}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<ThemesByDate />
							</Grid>
							<Grid item xs={12} sm={6}>
								<IdeasByTheme />
							</Grid>
							<Grid item xs={12} sm={6}>
								<ParticipantsByIdea />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TopDislikedIdeas />
							</Grid>
							<Grid item xs={12} sm={12}>
								<TopLikedIdeas />
							</Grid>
						</Grid>
						<Grid item xs={false} sm={2} />
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}
