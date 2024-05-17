import React, { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Container } from '../../../../components/ui/Container'
import { Field } from '../../../../components/ui/Field'
import { Form } from '../../../../components/ui/Form'
import { Input } from '../../../../components/ui/Input'
import { MainTitle } from '../../../../components/ui/MainTitle'
import * as SC from './styles'

const DEFAULT_VALUES = { title: '', body: '' }

export const PostForm = ({ first, second, onSubmitForm, defaultValues }) => {
	const [formValues, setFormValues] = useState(defaultValues || DEFAULT_VALUES)
	const disabled = !formValues.title || !formValues.body

	const onSubmit = e => {
		e.preventDefault()
		onSubmitForm(formValues)
		if (!defaultValues) {
			setFormValues(DEFAULT_VALUES)
		}
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}

	return (
		<Container>
			<MainTitle first={first} second={second} />
			<Form onSubmit={onSubmit}>
				<Field>
					<Input
						type='text'
						name='title'
						value={formValues.title}
						placeholder='Title'
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</Field>
				<Field>
					<SC.Textarea
						type='text'
						name='body'
						value={formValues.body}
						placeholder='Text'
						rows={10}
						cols={30}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</Field>
				<Button type='submit' disabled={disabled}>
					Save
				</Button>
			</Form>
		</Container>
	)
}
