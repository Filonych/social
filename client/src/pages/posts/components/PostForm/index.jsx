import React, { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Container } from '../../../../components/ui/Container'
import { Field } from '../../../../components/ui/Field'
import { Form } from '../../../../components/ui/Form'
import { Input } from '../../../../components/ui/Input'
import { Typo } from '../../../../components/ui/Typo'
import * as SC from './styles'

const DEFAULT_VALUES = {
	title: '',
	body: '',
  isPrivate: false,
}

export const PostForm = ({ title, onSubmitForm, button }) => {
	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const disabled = !formValues.title || !formValues.body

	const onSubmit = e => {
		e.preventDefault()
		onSubmitForm(formValues)
		setFormValues(DEFAULT_VALUES)
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}

	return (
		<Container>
			<Typo>{title}</Typo>
			<Form onSubmit={onSubmit}>
				<Field>
					<Input
						type='text'
						name='title'
						value={formValues.title}
						placeholder='Заголовок'
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</Field>
				<Field>
					<SC.Textarea
						type='text'
						name='body'
						value={formValues.body}
						placeholder='Текст'
						rows={10}
						cols={30}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
				</Field>
				<label>
					<input
						name='isPrivate'
						type='checkbox'
						checked={formValues.isPrivate}
						onChange={e => onChange(e.target.name, e.target.checked)}
					/>
					Только для друзей
				</label>

				<Button type='submit' disabled={disabled}>
					{button}
				</Button>
			</Form>
		</Container>
	)
}
