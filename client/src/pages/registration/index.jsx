import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '../../components/ui/Button'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { regNewUser } from '../../redux/slices/usersSlice'

const DEFAULT_VALUES = { username: '', email: '', password: '' }

export const RegistrationPage = () => {
	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const dispatch = useDispatch()
	const onSubmit = e => {
		e.preventDefault()
		console.log(formValues)
		dispatch(regNewUser(formValues))
	}

	const onChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

	return (
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
			<Button type='submit'>Создать профиль</Button>
		</Form>
	)
}
