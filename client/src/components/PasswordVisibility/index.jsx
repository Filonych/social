import * as SC from './styles'

export const PasswordVisibility = ({ showPassword, setShowPassword }) => {
	const toggleShowPassword = () => {
		setShowPassword(prevState => !prevState)
	}

	return (
		<SC.Img
			src={showPassword ? 'img/eye.svg' : 'img/eye-off.svg'}
			alt={showPassword ? 'Show password' : 'Hide password'}
			onClick={toggleShowPassword}
		/>
	)
}
