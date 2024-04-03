import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/slices/usersSlice'

export const AuthPage = () => {
	const [formValues, setFormValues] = useState({ email: "", password: "" });
	const { user } = useSelector((state) => state.user)

	console.log(user)
	
  const dispatch = useDispatch();
	const onSubmit = e => {
		e.preventDefault()
		dispatch(login(formValues))
	}

	const onChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };
	return (
		<Form onSubmit={onSubmit}>
			<Field>
				<Input
					type='email'
					name='email'
					value={formValues.email}
					placeholder='E-mail'
					onChange={(e) => onChange(e.target.name, e.target.value)}
				/>
			</Field>
			<Field>
				<Input
					type='password'
					name='password'
					value={formValues.password}
					placeholder='Пароль'
					onChange={(e) => onChange(e.target.name, e.target.value)}
				/>
			</Field>
			<Button type='submit'>Войти</Button>
		</Form>
	)
}
