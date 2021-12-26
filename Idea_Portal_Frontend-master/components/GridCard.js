import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import React from 'react'
import userservice from '../services/userservice'
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
const GridCard = () => {
	const [themes, setThemes] = React.useState([])
	const [newerror, setNewError] = React.useState(undefined)
	React.useEffect(() => {
		async function fetchData() {
			try {
				const data = await userservice.getAllThemes()
				setThemes(data)
			} catch (error) {
				setNewError(true)
			}
		}
		fetchData()
	}, [])

	const classes = useStyles()

	if (newerror) return <ErrorComponent />
	if (!themes) return <SpinnerComponent />
	return (
		<>
			{themes.totalElements > 0 ? (
				<TypoComponent variant='h4' classname={classes.title}>
					{' '}
					Themes posted by the Client Partners
				</TypoComponent>
			) : (
				<div className={classes.title}></div>
			)}

			<br />
			<Grid container spacing={2}>
				{themes.totalElements > 0 ? (
					themes.result.map((theme) => {
						return (
							<Grid item xs={12} sm={4}>
								<Link
									as={'/theme/' + theme.themeID}
									href={'/theme/' + theme.themeID}>
									<a>
										<div>
											<Card
												href={'/theme/' + theme.themeID}
												client={theme.user.userCompany}
												dateofposting={theme.themeDate.substring(0, 10)}
												theme={theme.themeName}
												description={'Created by : ' + theme.user.userName}
												category={
													'Category : ' +
													theme?.themesCategory?.themeCategoryName
												}
											/>
										</div>
									</a>
								</Link>
							</Grid>
						)
					})
				) : (
					<></>
				)}
			</Grid>
			{themes.totalElements === 0 ? (
				<TypoComponent variant='h5' classname={classes.title}>
					{themes.statusText}
				</TypoComponent>
			) : (
				<></>
			)}
		</>
	)
}

export default GridCard
