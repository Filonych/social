import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { MainTitle } from '../../components/ui/MainTitle'
import { login } from '../../redux/slices/usersSlice'

export const AuthPage = () => {
	const [formValues, setFormValues] = useState({ email: '', password: '' })
	const { user } = useSelector(state => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const onSubmit = e => {
		e.preventDefault()
		dispatch(login(formValues))
		navigate('/')
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}
	return (
		<Container>
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
						type='password'
						name='password'
						value={formValues.password}
						placeholder='Пароль'
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</Field>
				<Button type='submit'>Войти</Button>
			</Form>
		</Container>
	)
}
