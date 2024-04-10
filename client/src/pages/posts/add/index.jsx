import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../../helpers/formatDate'
import { addPost } from '../../../redux/slices/postsSlice'
import { PostForm } from '../components/PostForm'
import { Modal } from '../../../components/ui/Modal'
import { Button } from '../../../components/ui/Button'

export const AddPostPage = () => {
	const [showModal, setShowModal] = useState(false)
	const { user } = useSelector(state => state.user)
	const dispatch = useDispatch()

	const onSubmitForm = formValues => {
		const date = formatDate()
		formValues = {
			...formValues,
			date,
			author: user.username,
			authorId: user._id,
		}
		setShowModal(true);
		dispatch(addPost(formValues))
	}

	return (
		<>
			{showModal && (
				<Modal
					text='Пост успешно добавлен'
					buttons={<Button onClick={() => setShowModal(false)}>ОК</Button>}
				/>
			)}
			<PostForm
				first='Add'
				second={'post'}
				title='Добавление нового поста'
				onSubmitForm={onSubmitForm}
				button='Add post'
			/>
		</>
	)
}
