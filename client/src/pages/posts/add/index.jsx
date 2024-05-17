import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { Modal } from '../../../components/ui/Modal'
import { formatDate } from '../../../helpers/formatDate'
import { addPost, clearMessage } from '../../../redux/slices/postsSlice'
import { PostForm } from '../components/PostForm'

export const AddPostPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user } = useSelector(state => state.user)
	const { message } = useSelector(state => state.posts)

	const onSubmitForm = formValues => {
		const date = formatDate()
		const updatedFormValues = {
			...formValues,
			date,
			author: user.username,
			authorId: user._id,
		}
		dispatch(addPost(updatedFormValues))
	}

	const onCloseModal = () => {
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
				<PostForm first='Add' second='post' onSubmitForm={onSubmitForm} />
			</Container>
		</>
	)
}
