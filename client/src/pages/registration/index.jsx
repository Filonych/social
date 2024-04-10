import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { MainTitle } from '../../components/ui/MainTitle'
import { Modal } from '../../components/ui/Modal'
import { regNewUser } from '../../redux/slices/usersSlice'

const DEFAULT_VALUES = { username: '', email: '', password: '' }
const SUCCESSED_TEXT = 'Вы успешно зарегистрировались'
const FAILED_TEXT = 'Пользователь с таким email уже существует'

export const RegistrationPage = () => {
	const [formValues, setFormValues] = useState(DEFAULT_VALUES)

	const disabled =
		!formValues.username || !formValues.email || !formValues.password

	const [showModal, setShowModal] = useState(false)
	const [modalText, setModalText] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = async e => {
		e.preventDefault()
		const response = await dispatch(regNewUser(formValues))
		console.log(response)

		if (
			response?.payload?.message ===
			'Пользователь с таким именем пользователя или адресом электронной почты уже существует'
		) {
			setShowModal(true)
			return
		}
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}

	const onHandleClose = () => {
		if (modalText === SUCCESSED_TEXT) {
			navigate('/auth')
		}
		setShowModal(false)
	}

	return (
		<Container>
			{showModal && (
				<Modal
					text={modalText}
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
