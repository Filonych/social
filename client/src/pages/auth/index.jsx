import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { InputEmail } from '../../components/InputEmail'
import { InputPassword } from '../../components/InputPassword'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Form } from '../../components/ui/Form'
import { MainTitle } from '../../components/ui/MainTitle'
import { Modal } from '../../components/ui/Modal'
import { login } from '../../redux/actions/usersActions'
import { clearMessage } from '../../redux/reducers/usersReducer'
import { selectMessage, selectUser } from '../../redux/selectors/usersSelectors'

const DEFAULT_VALUES = { email: '', password: '' }

export const AuthPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const user = useSelector(selectUser)
	const message = useSelector(selectMessage)

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)

	const disabled = !formValues.email || !formValues.password

	const onSubmit = async e => {
		e.preventDefault()
		dispatch(login(formValues))
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}

	const onHandleClose = () => {
		if (user) {
			dispatch(clearMessage())
			navigate('/')
		}

		if (!user) dispatch(clearMessage())
	}

	return (
		<Container>
			{message && (
				<Modal
					text={message}
					buttons={<Button onClick={onHandleClose}>ОК</Button>}
				/>
			)}
			<MainTitle first='Login' />
			<Form onSubmit={onSubmit}>
				<InputEmail
					value={formValues.email}
					onChange={e => onChange(e.target.name, e.target.value)}
				/>
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
