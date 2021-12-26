import Button from '@material-ui/core/Button'
import React from 'react'

export default function ButtonComponent({
	type,
	variant,
	color,
	children,
	classname,
	size,
	clickfunc,
	position,
	component,
	style,
}) {
	return (
		<Button
			style={style}
			component={component}
			variant={variant}
			type={type}
			align={position}
			color={color}
			size={size}
			className={classname}
			onClick={() => clickfunc()}>
			{children}
		</Button>
	)
}
