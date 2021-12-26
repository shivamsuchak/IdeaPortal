import { Grid } from '@material-ui/core'
import Chips from '../components/Chip'
import ls from 'local-storage'
import userservice from '../services/userservice'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import BallotIcon from '@material-ui/icons/Ballot'
import React from 'react'

const ChipBar = () => {
	const [ideacount, setIdeaCount] = React.useState(0)
	const [themecount, setThemeCount] = React.useState(0)
	const [cpcount, setCpCount] = React.useState(0)
	const [pmcount, setPmCount] = React.useState(0)
	const [empcount, setEmpCount] = React.useState(0)
	React.useEffect(() => {
		const token = ls.get('token')
		async function fetchData() {
			if (token) {
				userservice.setToken(token)
				const themes = await userservice.getNoOfThemes()
				setThemeCount(themes.result)
				const ideas = await userservice.getNoOfIdeas()
				setIdeaCount(ideas.result)
				const users = await userservice.getNoOfUsers()
				setCpCount(users.result['Client Partner'])
				setPmCount(users.result['Product Manager'])
				setEmpCount(users.result['Participant'])
			} else {
				return
			}
		}
		fetchData()
	})

	return (
		<>
			<br></br>
			<Grid item container spacing={2} sm={12} xs={12} justify='center'>
				<Grid item xs={12} sm={2}>
					<Chips label={themecount} label2='Themes' avatar={<BallotIcon />} />
				</Grid>
				<Grid item xs={12} sm={2}>
					<Chips
						label={ideacount}
						label2='Ideas'
						avatar={<EmojiObjectsIcon />}
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Chips label={cpcount} label2='Client' label3='Partners' />
				</Grid>
				<Grid item xs={12} sm={2}>
					<Chips label={pmcount} label2='Product' label3='Managers' />
				</Grid>
				<Grid item xs={12} sm={2}>
					<Chips label={empcount} label2='Employees' />
				</Grid>
			</Grid>
			<br />
		</>
	)
}

export default ChipBar
