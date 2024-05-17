import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PasswordVisibility } from '../../components/PasswordVisibility'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { MainTitle } from '../../components/ui/MainTitle'
import { Modal } from '../../components/ui/Modal'
import { login } from '../../redux/slices/usersSlice'

const DEFAULT_VALUES = { email: '', password: '' }

export const AuthPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const [showModal, setShowModal] = useState(null)
	const [showPassword, setShowPassword] = useState(false)

	const disabled = !formValues.email || !formValues.password

	const onSubmit = async e => {
		e.preventDefault()

		const response = await dispatch(login(formValues))

		if (response.payload.message === 'User not found') {
			setShowModal(true)
			return
		}

		navigate('/')
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}
	return (
		<Container>
			{showModal && (
				<Modal
					text='User not found'
					buttons={<Button onClick={() => setShowModal(false)}>ОК</Button>}
				/>
			)}
			<MainTitle first='Login' />
			<Form onSubmit={onSubmit}>
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
						type={showPassword ? 'text' : 'password'}
						name='password'
						value={formValues.password}
						placeholder='Password'
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
					<PasswordVisibility
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
				</Field>
				<Button type='submit' disabled={disabled}>
					Login
				</Button>
			</Form>
		</Container>
	)
}
