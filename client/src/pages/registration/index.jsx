import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InputPassword } from '../../components/InputPassword'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { MainTitle } from '../../components/ui/MainTitle'
import { Modal } from '../../components/ui/Modal'
import { Warning } from '../../components/ui/Warning'
import { validateRegField } from '../../helpers/validateRegField'
import { clearMessage, regNewUser } from '../../redux/slices/usersSlice'

const DEFAULT_VALUES = { username: '', email: '', password: '' }

export const RegistrationPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { message } = useSelector(state => state.user)

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const [validationErrors, setValidationErrors] = useState({
		username: null,
		email: null,
		password: null,
	})

	const disabled =
		!formValues.username || !formValues.email || !formValues.password

	const onSubmit = e => {
		e.preventDefault()

		const errors = validateRegField(formValues)
		setValidationErrors(errors)
		if (errors.username || errors.email || errors.password) {
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
						className={validationErrors.username ? 'red' : undefined}
					/>
					{validationErrors.username && (
						<Warning>{validationErrors.username}</Warning>
					)}
				</Field>
				<Field>
					<Input
						type='email'
						name='email'
						value={formValues.email}
						placeholder='E-mail'
						onChange={e => onChange(e.target.name, e.target.value)}
						className={validationErrors.email ? 'red' : undefined}
					/>
					{validationErrors.email && (
						<Warning>{validationErrors.email}</Warning>
					)}
				</Field>
				<Field>
					<InputPassword
						value={formValues.password}
						onChange={e => onChange(e.target.name, e.target.value)}
						className={validationErrors.password ? 'red' : undefined}
					/>
					{validationErrors.password && (
						<Warning>{validationErrors.password}</Warning>
					)}
				</Field>
				<Button type='submit' disabled={disabled}>
					Create account
				</Button>
			</Form>
		</Container>
	)
}
