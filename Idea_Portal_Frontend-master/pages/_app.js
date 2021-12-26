import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Brightness4SharpIcon from '@material-ui/icons/Brightness4Sharp'
import Brightness7SharpIcon from '@material-ui/icons/Brightness7Sharp'
import React from 'react'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
// import ls from 'local-storage'
// import PageNotFound from './404'
import Paper from '@material-ui/core/Paper'
import Iconbutton from '../components/Iconbutton'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const [darkMode, setDarkMode] = React.useState(false)
	const path = router?.pathname
	// React.useEffect(() => {
	// 	if (
	// 		!ls.get('logged_in') &&
	// 		(path === '/dashboard' ||
	// 			path === '/userprofile' ||
	// 			path === '/clientpartner/mythemes' ||
	// 			path === '/productmanager/myideas')
	// 	) {
	// 		router.push('/')
	// 	} else if (
	// 		ls.get('logged_in') &&
	// 		ls.get('client_partner') &&
	// 		path === '/productmanager/myideas'
	// 	) {
	// 		router.push('/')
	// 	} else if (
	// 		ls.get('logged_in') &&
	// 		ls.get('product_manager') &&
	// 		path === '/clientpartner/mythemes'
	// 	) {
	// 		router.push('/')
	// 	} else {
	// 		if (
	// 			path === '/clientpartner/mythemes' ||
	// 			path === 'productmanager/myideas'
	// 		) {
	// 			router.push('/')
	// 		}
	// 	}
	// }, [])
	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				main: '#ff9800',
			},

			text: {
				primary: '#FFF',
			},
		},
		// typography: {
		// 	fontFamily: [
		// 		'Gordita',
		// 		'-apple-system',
		// 		'BlinkMacSystemFont',
		// 		'Segoe UI',
		// 		'Roboto',
		// 		'Helvetica Neue',
		// 		'Arial',
		// 		'Noto Sans',
		// 		'sans-serif',
		// 	].join(','),
		// 	button: {
		// 		fontFamily:
		// 			'Gordita,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif',
		// 	},
		// },
	})

	const lightTheme = createMuiTheme({
		palette: {
			type: 'light',
			primary: {
				main: '#ff9800',
			},

			text: {
				primary: '#1F1C22',
			},
		},
		// typography: {
		// 	fontFamily: [
		// 		'Gordita',
		// 		'-apple-system',
		// 		'BlinkMacSystemFont',
		// 		'Segoe UI',
		// 		'Roboto',
		// 		'Helvetica Neue',
		// 		'Arial',
		// 		'Noto Sans',
		// 		'sans-serif',
		// 	].join(','),
		// 	button: {
		// 		fontFamily:
		// 			'Gordita,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif',
		// 	},
		// },
	})

	return (
		<>
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				{path !== '/404' ? (
					<>
						<Navbar>
							{' '}
							<Iconbutton
								size='medium'
								clickfunc={() => setDarkMode(!darkMode)}>
								{darkMode ? (
									<Brightness7SharpIcon />
								) : (
									<Brightness4SharpIcon style={{ color: 'white' }} />
								)}
							</Iconbutton>
						</Navbar>
						<div style={{ minHeight: '50vh' }}>
							<Component {...pageProps} />
						</div>
						<Footer />
					</>
				) : (
					<Paper style={{ height: '100vh', overflowX: 'hidden' }}>
						{' '}
						<Component {...pageProps} />
					</Paper>
				)}
			</ThemeProvider>
		</>
	)
}

export default MyApp
