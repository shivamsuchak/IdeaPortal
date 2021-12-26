import Box from '@material-ui/core/Box'
import React from 'react'

export default function BoxComponent({
	display,
	boxshadow,
	bgcolor,
	m,
	p,
	children,
	component,
	className,
}) {
	return (
		<Box
			className={className}
			boxShadow={boxshadow}
			component={component}
			display={display}
			bgcolor={bgcolor}
			m={m}
			p={p}>
			{children}
		</Box>
	)
}
