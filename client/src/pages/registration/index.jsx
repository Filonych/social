import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PasswordVisibility } from '../../components/PasswordVisibility'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { MainTitle } from '../../components/ui/MainTitle'
import { Modal } from '../../components/ui/Modal'
import { Warning } from '../../components/ui/Warning'
import { clearMessage, regNewUser } from '../../redux/slices/usersSlice'

const DEFAULT_VALUES = { username: '', email: '', password: '' }

export const RegistrationPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { message } = useSelector(state => state.user)

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const [usernameError, setUsernameError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [emailError, setEmailError] = useState(null)
	const [showPassword, setShowPassword] = useState(false)

	const isValidUsername = username => /^[a-zA-Z0-9_-]+$/.test(username)

	const isValidEmail = email =>
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
			email
		)

	const isValidPassword = password =>
		/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`]+$/.test(password)

	const disabled =
		!isValidUsername(formValues.username) ||
		formValues.username.length > 20 ||
		!isValidEmail(formValues.email) ||
		!isValidPassword(formValues.password)

	const onSubmit = e => {
		e.preventDefault()
		dispatch(regNewUser(formValues))
	}

	const onChange = (name, value) => {
		if (name === 'username') {
			if (value.length > 20) {
				setUsernameError('The username is too long.')
			} else if (!isValidUsername(value)) {
				setUsernameError('The username format is not valid')
			} else {
				setUsernameError(null)
			}
		} else if (name === 'email') {
			if (!isValidEmail(value)) {
				setEmailError('The email format is not valid.')
			} else {
				setEmailError(null)
			}
		} else if (name === 'password') {
			if (!isValidPassword(value)) {
				setPasswordError('The password format is not valid.')
			} else {
				setPasswordError(null)
			}
		}

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
					buttons={<Button onClick={() => onHandleClose()}>ОК</Button>}
				/>
			)}
			<MainTitle first='Create' second='account' />
			<Form onSubmit={onSubmit}>
				<Field>
					<Input
						type='text'
						name='username'
						value={formValues.username}
						placeholder='Username'
						onChange={e => onChange(e.target.name, e.target.value)}
						className={usernameError ? 'red' : undefined}
					/>
					{usernameError && <Warning>{usernameError}</Warning>}
				</Field>
				<Field>
					<Input
						type='email'
						name='email'
						value={formValues.email}
						placeholder='E-mail'
						onChange={e => onChange(e.target.name, e.target.value)}
						className={emailError ? 'red' : undefined}
					/>
					{emailError && <Warning>{emailError}</Warning>}
				</Field>
				<Field>
					<Input
						type={showPassword ? 'text' : 'password'}
						name='password'
						value={formValues.password}
						placeholder='Password'
						onChange={e => onChange(e.target.name, e.target.value)}
						className={passwordError ? 'red' : undefined}
					/>
					<PasswordVisibility
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
					{passwordError && <Warning>{passwordError}</Warning>}
				</Field>
				<Button type='submit' disabled={disabled}>
					Create account
				</Button>
			</Form>
		</Container>
	)
}
