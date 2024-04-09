import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../../helpers/formatDate'
import { addPost } from '../../../redux/slices/postsSlice'
import { PostForm } from '../components/PostForm'

export const AddPostPage = () => {
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
		dispatch(addPost(formValues))
	}

	return (
		<>
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
