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
import { clearMessage, login } from '../../redux/slices/usersSlice'

const DEFAULT_VALUES = { email: '', password: '' }

export const AuthPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { message } = useSelector(state => state.user)

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const [showModal, setShowModal] = useState(null)

	const disabled = !formValues.email || !formValues.password

	const onSubmit = async e => {
		e.preventDefault()

		const response = await dispatch(login(formValues))

		if (response.payload.message) {
			setShowModal(true)
			return
		}

		navigate('/')
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}

	const onHandleClose = () => {
		setShowModal(false)
		dispatch(clearMessage())
	}
	return (
		<Container>
			{showModal && (
				<Modal
					text={message}
					buttons={<Button onClick={() => onHandleClose()}>ОК</Button>}
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
				<InputPassword
					value={formValues.password}
					onChange={e => onChange(e.target.name, e.target.value)}
				/>
				<Button type='submit' disabled={disabled}>
					Login
				</Button>
			</Form>
		</Container>
	)
}
