import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Modal } from '../../../components/ui/Modal'
import { clearMessage, editPost } from '../../../redux/slices/postsSlice'
import { PostForm } from '../components/PostForm'

export const EditPostPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { id } = useParams()
	const { post } = useSelector(state => state.posts.postForView)
	const { message } = useSelector(state => state.posts)

	const onSubmitForm = formValues => {
		dispatch(editPost(formValues))
	}

	const onCloseModal = () => {
		navigate(`/posts/${id}`)
		dispatch(clearMessage())
	}

	if (!post) {
		return <>Post is not found</>
	}

	return (
		<>
			{message && (
				<Modal
					text={message}
					buttons={<Button onClick={() => onCloseModal()}>ОК</Button>}
				/>
			)}
			<PostForm
				first='Edit'
				second='post'
				onSubmitForm={onSubmitForm}
				defaultValues={post}
			/>
		</>
	)
}
