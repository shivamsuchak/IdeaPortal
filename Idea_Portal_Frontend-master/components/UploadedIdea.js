import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ls from 'local-storage'
import React from 'react'
import productmanagerservice from '../services/productmanagerservice'
import ErrorComponent from './ErrorComponent'
import SpinnerComponent from './SpinnerComponent'
import Card from './ThemeCard'
import TypoComponent from './TypoComponent'

const useStyles = makeStyles({
	title: {
		textAlign: 'center',
		padding: '2%',
	},
})

const UploadedIdea = () => {
	const token = ls.get('token')
	productmanagerservice.setToken(token)
	const { data, error } = productmanagerservice.getProductManagerIdeas(
		ls.get('userid')
	)
	const ideas = data?.data
	const classes = useStyles()

	if (error) return <ErrorComponent />
	if (!data) return <SpinnerComponent />
	return (
		<>
			{ideas.totalElements > 0 ? (
				<TypoComponent variant='h4' classname={classes.title}>
					{' '}
					{ls.get('username')} Ideas
				</TypoComponent>
			) : (
				<div className={classes.title}></div>
			)}
			<br />
			<Grid container spacing={2}>
				{ideas.totalElements > 0 ? (
					ideas.result.map((idea) => (
						<Grid item xs={12} sm={4}>
							{/* <Link
								href={'/theme/' + idea.theme.themeID + '/ideas/' + idea.ideaID}
								as={'/theme/' + idea.theme.themeID + '/ideas/' + idea.ideaID}>
								<a> */}
							<Card
								href={'/theme/' + idea.theme.themeID + '/ideas/' + idea.ideaID}
								editoption='idea'
								description={idea.ideaDescription}
								files={idea.artifacts.filter(
									(nidea) => nidea.isModified === 'FALSE'
								)}
								id={idea.ideaID}
								themeid={idea.theme.themeID}
								client={idea.theme.themeName}
								dateofposting={idea.ideaDate.substring(0, 10)}
								theme={idea.ideaName}
							/>
							{/* </a>
							</Link> */}
						</Grid>
					))
				) : (
					<></>
				)}
			</Grid>
			{ideas.totalElements === 0 ? (
				<TypoComponent variant='h6' classname={classes.title}>
					{ideas.statusText}
				</TypoComponent>
			) : (
				<></>
			)}
		</>
	)
}

export default UploadedIdea
