import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import TypoComponent from './TypoComponent'
import { orange } from '@material-ui/core/colors'

import React from 'react'

const useStyles = makeStyles((theme) => ({
	pchip: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		maxWidth: '20rem',
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	avatar: {
		color: theme.palette.getContrastText(orange[500]),
		backgroundColor: orange[500],
	},
	chipStyle: {
		width: '15%',
		height: '12%',
		marginLeft: '1%',
		fontSize: '1.3rem',
	},
}))

export default function Chips({ label2, label3, avatar, label }) {
	const classes = useStyles()
	return (
		<>
			<Chip
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
				}}
				label={
					<section>
						<TypoComponent
							style={{ fontSize: '1.5rem', textAlign: 'center' }}
							className={classes.pchip}>
							{label}{' '}
						</TypoComponent>
						<TypoComponent
							style={{ fontSize: '1rem', textAlign: 'center' }}
							className={classes.pchip}>
							{label2}{' '}
						</TypoComponent>
						<TypoComponent
							style={{ fontSize: '1rem', textAlign: 'center' }}
							className={classes.pchip}>
							{label3}
						</TypoComponent>
					</section>
				}
				variant='outlined'
				avatar={
					<Avatar
						style={{ marginRight: '15%', height: '60%', width: '20%' }}
						aria-label='recipe'
						className={classes.avatar}>
						{avatar}
					</Avatar>
				}
			/>
		</>
	)
}
