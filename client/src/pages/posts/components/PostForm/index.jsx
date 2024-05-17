import React, { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Container } from '../../../../components/ui/Container'
import { Field } from '../../../../components/ui/Field'
import { Form } from '../../../../components/ui/Form'
import { Input } from '../../../../components/ui/Input'
import { MainTitle } from '../../../../components/ui/MainTitle'
import { Textarea } from '../../../../components/ui/Textarea'
import { Warning } from '../../../../components/ui/Warning'

const DEFAULT_VALUES = {
	title: '',
	body: '',
	isPrivate: false,
}

const MAX_TITLE_LENGTH = 100
const MAX_BODY_LENGTH = 1000
const MAX_WORD_LENGTH = 20

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
			if (!value.trim()) {
				setTitleError('The title field cannot be empty')
			} else if (value.length > MAX_TITLE_LENGTH) {
				setTitleError('The title is too long')
			} else {
				setTitleError(null)
			}
		}
		setFormValues({ ...formValues, [name]: value })
	}

	// const maxWordLength = 20; // Максимальная длина слова
	// const titleWords = title.split(' ');
	// const contentWords = content.split(' ');
	// const isLongWordExist = titleWords.some(word => word.length > maxWordLength) || contentWords.some(word => word.length > maxWordLength);
	// if (isLongWordExist) {
	//   // Обработка ошибки
	//   console.error(`The title and content fields cannot contain words longer than ${maxWordLength} characters.`);
	//   return;

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
