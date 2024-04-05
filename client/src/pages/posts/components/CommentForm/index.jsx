import React, { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Container } from '../../../../components/ui/Container'
import { Field } from '../../../../components/ui/Field'
import { Form } from '../../../../components/ui/Form'
import { Typo } from '../../../../components/ui/Typo'
import * as SC from './styles'
import { useSelector } from 'react-redux'

// TODO: поправить тут весь код, он полностью скопирован

const DEFAULT_VALUES = { body: '' }

export const CommentForm = ({ title, onSubmitForm, defaultValues }) => {
	const { user } = useSelector((state) => state.user)
	const [formValues, setFormValues] = useState(defaultValues || DEFAULT_VALUES)
	const disabled = !formValues.body

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
			<Typo>{title}</Typo>
			<Form onSubmit={onSubmit}>
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
				<Button type='submit' disabled={disabled}>
					Comment
				</Button>
			</Form>
		</Container>
	)
}
