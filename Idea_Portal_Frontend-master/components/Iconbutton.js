import IconButton from '@material-ui/core/IconButton'
import React from 'react'

const Iconbutton = ({
	size,
	children,
	clickfunc,
	edge,
	color,
	style,
	arialabel,
	disabled,
	aria_controls,
	aria_haspopup,
}) => {
	return (
		<IconButton
			style={style}
			disabled={disabled}
			aria-label={arialabel}
			aria-controls={aria_controls}
			aria-haspopup={aria_haspopup}
			color={color}
			size={size}
			onClick={() => clickfunc()}
			edge={edge}>
			{children}
		</IconButton>
	)
}

export default Iconbutton
