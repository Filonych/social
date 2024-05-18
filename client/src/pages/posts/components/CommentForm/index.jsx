import React, { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Container } from '../../../../components/ui/Container'
import { Field } from '../../../../components/ui/Field'
import { Form } from '../../../../components/ui/Form'
import { Textarea } from '../../../../components/ui/Textarea'
import { Typo } from '../../../../components/ui/Typo'
import { Warning } from '../../../../components/ui/Warning'
import { validateTextField } from '../../../../helpers/validateTextField'

const DEFAULT_VALUES = { body: '' }
const MAX_COMMENT_LENGTH = 500

export const CommentForm = ({ title, onSubmitForm }) => {
	const [formValues, setFormValues] = useState(DEFAULT_VALUES)
	const [commentError, setCommentError] = useState(null)

	const disabled = !formValues.body || commentError

	const onSubmit = e => {
		e.preventDefault()
		onSubmitForm(formValues)
		setFormValues(DEFAULT_VALUES)
	}

	const onChange = (name, value) => {
		validateTextField(name, value, MAX_COMMENT_LENGTH, setCommentError)
		setFormValues({ ...formValues, [name]: value })
	}

	return (
		<Container>
			<Typo>{title}</Typo>
			<Form onSubmit={onSubmit}>
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
					{commentError && <Warning>{commentError}</Warning>}
				</Field>
				<Button type='submit' disabled={disabled}>
					Comment
				</Button>
			</Form>
		</Container>
	)
}
