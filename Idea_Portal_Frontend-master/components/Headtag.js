import Head from 'next/head'
import React from 'react'
export default function Headtag({ title }) {
	return (
		<>
			<Head>
				<title>{title}</title>

				<meta property='og:title' content={title} key='title' />
			</Head>
			<Head>
				<meta property='og:title' content={title} key='title' />
			</Head>
		</>
	)
}
