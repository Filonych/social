import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InputEmail } from '../../components/InputEmail'
import { InputPassword } from '../../components/InputPassword'
import { InputUsername } from '../../components/InputUsername'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Form } from '../../components/ui/Form'
import { MainTitle } from '../../components/ui/MainTitle'
import { Modal } from '../../components/ui/Modal'
import { Warning } from '../../components/ui/Warning'
import { validateRegField } from '../../helpers/validateRegField'
import { regNewUser } from '../../redux/actions/usersActions'
import { clearMessage } from '../../redux/reducers/usersReducer'
import { selectMessage } from '../../redux/selectors/usersSelectors'

const DEFAULT_VALUES = { username: '', email: '', password: '' }

export const RegistrationPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const message = useSelector(selectMessage)

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const [validationErrors, setValidationErrors] = useState({
		usernameError: null,
		emailError: null,
		passwordError: null,
	})

	const { usernameError, emailError, passwordError } = validationErrors
	const { username, email, password } = formValues

	const disabled = !username || !email || !password

	const onSubmit = e => {
		e.preventDefault()

		const errors = validateRegField(formValues)
		const { usernameError, emailError, passwordError } = errors

		setValidationErrors(errors)
		if (usernameError || emailError || passwordError) {
			return
		}
		dispatch(regNewUser(formValues))
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}

	const onHandleClose = () => {
		if (message === 'User successfully added') {
			navigate('/auth')
		}
		dispatch(clearMessage())
	}

	return (
		<Container>
			{message && (
				<Modal
					text={message}
					buttons={<Button onClick={onHandleClose}>ОК</Button>}
				/>
			)}
			<MainTitle first='Create' second='account' />
			<Form onSubmit={onSubmit}>
				<InputUsername
					value={username}
					onChange={e => onChange(e.target.name, e.target.value)}
					className={usernameError ? 'red' : undefined}
				/>
				{usernameError && <Warning>{usernameError}</Warning>}
				<InputEmail
					value={email}
					onChange={e => onChange(e.target.name, e.target.value)}
					className={emailError ? 'red' : undefined}
				/>
				{emailError && <Warning>{emailError}</Warning>}
				<InputPassword
					value={password}
					onChange={e => onChange(e.target.name, e.target.value)}
					className={passwordError ? 'red' : undefined}
				/>
				{passwordError && <Warning>{passwordError}</Warning>}
				<Button type='submit' disabled={disabled}>
					Create account
				</Button>
			</Form>
		</Container>
	)
}
