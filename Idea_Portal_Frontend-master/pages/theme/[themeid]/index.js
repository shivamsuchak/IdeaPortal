import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import React from 'react'
import ErrorComponent from '../../../components/ErrorComponent'
import Headtag from '../../../components/Headtag'
import SpinnerComponent from '../../../components/SpinnerComponent'
import ThemeCard from '../../../components/ThemeDescripCard'
import TypoComponent from '../../../components/TypoComponent'
import userservice from '../../../services/userservice'

const useStyles = makeStyles({
	title: {
		textAlign: 'center',
		padding: '2%',
	},
})
const ThemePage = () => {
	const router = useRouter()
	const classes = useStyles()
	const { data, error } = userservice.getThemebyId(router.query.themeid)
	const theme = data?.data?.result
	if (error) return <ErrorComponent />
	if (!data) return <SpinnerComponent />
	return (
		<>
			<Headtag title={'Theme ' + router.query.themeid} />
			<TypoComponent variant='h4' classname={classes.title}>
				{' '}
				{theme.themeName}
			</TypoComponent>
			<Grid container direction='column'>
				<Grid item container>
					<Grid item xs={false} sm={2} />
					<Grid item xs={12} sm={8}>
						<ThemeCard
							client={theme.user.userCompany}
							dateofposting={theme.themeDate.substring(0, 10)}
							theme={theme.themeName}
							description={theme.themeDescription}
							themeid={router.query.themeid}
							author={theme.user.userName}
							category={theme?.themesCategory?.themeCategoryName}
						/>
					</Grid>
					<Grid item xs={false} sm={2} />
				</Grid>
			</Grid>
		</>
	)
}

export default ThemePage
