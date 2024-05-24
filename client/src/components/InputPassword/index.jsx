import { useState } from 'react'
import { Field } from '../ui/Field'
import { Input } from '../ui/Input'
import * as SC from './styles'

export const InputPassword = ({ ...props }) => {
	const [showPassword, setShowPassword] = useState(false)

	const toggleShowPassword = () => {
		setShowPassword(prevState => !prevState)
	}

	return (
		<Field>
			<Input
				type={showPassword ? 'text' : 'password'}
				name='password'
				placeholder='Password'
				{...props}
			/>
			<SC.Img
				src={showPassword ? 'img/eye.svg' : 'img/eye-off.svg'}
				alt={showPassword ? 'Show password' : 'Hide password'}
				onClick={toggleShowPassword}
			/>
		</Field>
	)
}
