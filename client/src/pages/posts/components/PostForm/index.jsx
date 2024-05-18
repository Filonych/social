import React, { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Container } from '../../../../components/ui/Container'
import { Field } from '../../../../components/ui/Field'
import { Form } from '../../../../components/ui/Form'
import { Input } from '../../../../components/ui/Input'
import { MainTitle } from '../../../../components/ui/MainTitle'
import { Textarea } from '../../../../components/ui/Textarea'
import { Warning } from '../../../../components/ui/Warning'
import { validateTextField } from '../../../../helpers/validateTextField'

const DEFAULT_VALUES = {
	title: '',
	body: '',
	isPrivate: false,
}

const MAX_TITLE_LENGTH = 100
const MAX_BODY_LENGTH = 2000

export const PostForm = ({ first, second, onSubmitForm, defaultValues }) => {
	const [formValues, setFormValues] = useState(defaultValues || DEFAULT_VALUES)

	const [titleError, setTitleError] = useState(null)
	const [bodyError, setBodyError] = useState(null)

	const disabled =
		!formValues.title ||
		!formValues.body ||
		(formValues.title && !formValues.title.trim()) ||
		(formValues.body && !formValues.body.trim())

	const onSubmit = e => {
		e.preventDefault()
		onSubmitForm(formValues)
		if (!defaultValues) {
			setFormValues(DEFAULT_VALUES)
		}
	}

	const onChange = (name, value) => {
		if (name === 'title') {
			validateTextField(name, value, MAX_TITLE_LENGTH, setTitleError)
		}

		if (name === 'body') {
			validateTextField(name, value, MAX_BODY_LENGTH, setBodyError)
		}
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
						className={titleError ? 'red' : ''}
					/>
					{titleError && <Warning>{titleError}</Warning>}
				</Field>
				<Field>
					<Textarea
						type='text'
						name='body'
						value={formValues.body}
						placeholder='Text'
						rows={10}
						cols={30}
						onChange={e => onChange(e.target.name, e.target.value)}
					/>
					{bodyError && <Warning>{bodyError}</Warning>}
				</Field>
				<label>
					<input
						name='isPrivate'
						type='checkbox'
						checked={formValues.isPrivate}
						onChange={e => onChange(e.target.name, e.target.checked)}
					/>
					Private post
				</label>
				<Button type='submit' disabled={disabled}>
					Save
				</Button>
			</Form>
		</Container>
	)
}
