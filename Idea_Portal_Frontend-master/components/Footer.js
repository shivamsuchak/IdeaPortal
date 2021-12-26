import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
	footer: {
		background: 'linear-gradient(to right bottom, orange, #ff7b54)',
		width: `100%`,
		position: 'relative',
		overflow: 'hidden',
		marginTop: '6em',
		padding: '2em 0 ',
		bottom: 0,
		flex: 0,
	},
	link: {
		fontSize: '1.25em',
		color: '#fff',
		fontWeight: 'bold',
	},
	copylight: {
		color: '#fff',
		fontSize: '1em',
		fontWeight: 'normal',
	},
}))

const Footer = () => {
	const classes = useStyles()

	return (
		<footer className={classes.footer}>
			<Container maxWidth='lg' flex>
				<Grid container spacing={3} justify='center'>
					<Grid item sm={4} className={classes.link}>
						Links <hr />
						<Grid container direction='column' className={classes.copylight}>
							<a href='/'>
								<Typography>Home</Typography>
							</a>
							<Typography>About</Typography>
							<Typography>FAQ</Typography>
						</Grid>
					</Grid>

					<Grid item sm={4} className={classes.link}>
						Industries <hr />
						<Grid container direction='column' className={classes.copylight}>
							<Typography>Banking, Financial Services & Insurance </Typography>
							<Typography>Healthcare & Life Sciences</Typography>
							<Typography>Software & Hi-Tech</Typography> <br />
						</Grid>
					</Grid>

					<Grid item sm={4} className={classes.link}>
						Contact Us <hr />
						<Grid container direction='column' className={classes.copylight}>
							<Typography>Email abc@persistent.com</Typography>
							<Typography>Contact XXXXX</Typography>
							<Typography>Office Add</Typography>
						</Grid>
					</Grid>
				</Grid>
				<br />
				<hr />
				<Grid
					container
					direction='column'
					className={classes.link}
					justify='center'
					alignItems='center'>
					<Grid Item style={{ fontSize: '30px' }}>
						Idea Portal
					</Grid>
					<br />
					<Grid Item>
						An in-house website where client can post themes, product manager
						can submit ideas and participants can join for development.
					</Grid>
				</Grid>
			</Container>
		</footer>
	)
}

export default Footer
