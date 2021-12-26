import Typography from '@material-ui/core/Typography'
import React from 'react'

export default function Heading({
	variant,
	children,
	position,
	classname,
	style,
}) {
	return (
		<Typography
			variant={variant}
			align={position}
			className={classname}
			style={style}>
			{children}
		</Typography>
	)
}
