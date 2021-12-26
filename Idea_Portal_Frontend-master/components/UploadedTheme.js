import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ls from 'local-storage'
import React from 'react'
import clientpartnerservice from '../services/clientpartnerservice'
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

const UploadedTheme = () => {
	const token = ls.get('token')
	clientpartnerservice.setToken(token)
	const { data, error } = clientpartnerservice.getClientPartnerThemes(
		ls.get('userid')
	)

	const themes = data?.data
	const classes = useStyles()
	if (error) return <ErrorComponent />
	if (!data) return <SpinnerComponent />
	return (
		<>
			<TypoComponent variant='h4' classname={classes.title}>
				{' '}
				{ls.get('username')} Themes
			</TypoComponent>
			<br />
			<Grid container spacing={2}>
				{themes.totalElements > 0 ? (
					themes.result?.map((theme) => {
						return (
							<Grid item xs={12} sm={4}>
								{/* <Link
									href={'/theme/' + theme.themeID}
									as={'/theme/' + theme.themeID}>
									<a>
										<div> */}
								<Card
									href={'/theme/' + theme.themeID}
									editoption='theme'
									files={theme.artifacts.filter(
										(ntheme) => ntheme.isModified === 'FALSE'
									)}
									category={theme?.themesCategory?.themeCategoryName}
									id={theme.themeID}
									description={theme.themeDescription}
									client={theme.user.userCompany}
									dateofposting={theme.themeDate.substring(0, 10)}
									theme={theme.themeName}></Card>
								{/* </div>
									</a>
								</Link> */}
							</Grid>
						)
					})
				) : (
					<></>
				)}
			</Grid>
			{themes.totalElements === 0 ? (
				<TypoComponent variant='h6' classname={classes.title}>
					{themes.statusText}
				</TypoComponent>
			) : (
				<></>
			)}
		</>
	)
}
export default UploadedTheme
