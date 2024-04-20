import React, { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Container } from '../../../../components/ui/Container'
import { Field } from '../../../../components/ui/Field'
import { Form } from '../../../../components/ui/Form'
import { Typo } from '../../../../components/ui/Typo'
import * as SC from './styles'

const DEFAULT_VALUES = { body: '' }

export const CommentForm = ({ title, onSubmitForm }) => {
	const [formValues, setFormValues] = useState(DEFAULT_VALUES)

	const disabled = !formValues.body

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
					Comment
				</Button>
			</Form>
		</Container>
	)
}
