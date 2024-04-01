import React from 'react'
import { Button } from '../../components/ui/Button'
import { Field } from '../../components/ui/Field'
import { Form } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'

export const AuthPage = () => {
	const onSubmit = e => {
		e.preventDefault()
	}
	return (
		<Form onSubmit={onSubmit}>
			<Field>
				<Input
					type='email'
					name='email'
					// value={formValues.email}
					placeholder='E-mail'
					// onChange={(e) => onChange(e.target.name, e.target.value)}
				/>
			</Field>
			<Field>
				<Input
					type='password'
					name='password'
					// value={formValues.password}
					placeholder='Пароль'
					// onChange={(e) => onChange(e.target.name, e.target.value)}
				/>
			</Field>
			<Button type='submit'>Войти</Button>
		</Form>
	)
}
