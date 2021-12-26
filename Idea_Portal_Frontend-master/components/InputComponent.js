import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React from 'react'

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'orange',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'orange',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'grey',
			},
			'&:hover fieldset': {
				borderColor: 'orange',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'orange',
			},
		},
	},
})(TextField)
export default function Input({
	disabled,
	id,
	label,
	children,
	variant,
	color,
	style,
	value,
	onchangefunc,
	type,
	select,
	InputProps,
	fullWidth,
	placeholder,
	multiline,
	rows,
	helperText,
}) {
	return (
		<CssTextField
			disabled={disabled}
			fullWidth={fullWidth}
			id={id}
			rows={rows}
			multiline={multiline}
			label={label}
			placeholder={placeholder}
			variant={variant}
			color={color}
			required
			select={select}
			type={type}
			value={value}
			helperText={helperText}
			onChange={(e) => onchangefunc(e)}
			style={style}
			InputProps={InputProps}>
			{children}
		</CssTextField>
	)
}
