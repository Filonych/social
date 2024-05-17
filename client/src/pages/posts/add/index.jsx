import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { Field } from '../../../components/ui/Field'
import { Form } from '../../../components/ui/Form'
import { Input } from '../../../components/ui/Input'
import { MainTitle } from '../../../components/ui/MainTitle'
import { Modal } from '../../../components/ui/Modal'
import { formatDate } from '../../../helpers/formatDate'
import { addPost, clearMessage } from '../../../redux/slices/postsSlice'
import * as SC from './styles'

const DEFAULT_VALUES = {
	title: '',
	body: '',
	isPrivate: false,
}

export const AddPostPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [formValues, setFormValues] = useState(DEFAULT_VALUES)

	const { user } = useSelector(state => state.user)
	const { message } = useSelector(state => state.posts)

	const disabled = !formValues.title || !formValues.body

	const onSubmitForm = e => {
		e.preventDefault()
		const date = formatDate()
		const updatedFormValues = {
			...formValues,
			date,
			author: user.username,
			authorId: user._id,
		}
		dispatch(addPost(updatedFormValues))
	}

	const onChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value })
	}

	const onCloseModal = () => {
		setFormValues(DEFAULT_VALUES)
		if (message === 'The post successfully added') {
			navigate('/')
		}
		dispatch(clearMessage())
	}

	return (
		<>
			{message && (
				<Modal
					text={message}
					buttons={<Button onClick={() => onCloseModal()}>ОК</Button>}
				/>
			)}
			<Container>
				<MainTitle first='Add' second='post' />
				<Form onSubmit={onSubmitForm}>
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
						{'Add post'}
					</Button>
				</Form>
			</Container>
		</>
	)
}
