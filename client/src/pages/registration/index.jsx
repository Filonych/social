import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { MainTitle } from '../../components/ui/MainTitle'
import { Modal } from '../../components/ui/Modal'
import { clearMessage, regNewUser } from '../../redux/slices/usersSlice'

const DEFAULT_VALUES = { username: '', email: '', password: '' }

export const RegistrationPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { message } = useSelector(state => state.user)

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)

	const disabled =
		!formValues.username || !formValues.email || !formValues.password

	const onSubmit = e => {
		e.preventDefault()
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
					/>
				</Field>
				<Field>
					<Input
						type='email'
						name='email'
						value={formValues.email}
						placeholder='E-mail'
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</Field>
				<Field>
					<Input
						type='password'
						name='password'
						value={formValues.password}
						placeholder='Password'
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</Field>
				<Button type='submit' disabled={disabled}>
					Create account
				</Button>
			</Form>
		</Container>
	)
}
