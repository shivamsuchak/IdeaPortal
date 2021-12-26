// const withPWA = require('next-pwa')
// const runtimeCaching = require('next-pwa/cache')

// module.exports = withPWA({
// 	pwa: {
// 		dest: 'public',
// 		runtimeCaching,
// 	},
// })
module.exports = {
	env: {
		BASE_URL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '',
	},
}
