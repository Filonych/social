import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../redux/slices/postsSlice'
import { PostForm } from '../components/PostForm'
import { formatDate } from '../../../helpers/formatDate'

export const AddPostPage = () => {
	const { user } = useSelector(state => state.user)
	const dispatch = useDispatch()

	const onSubmitForm = formValues => {
		const date = formatDate()
		formValues = { ...formValues, date, author: user.username }
		dispatch(addPost(formValues))
	}

	return (
		<>
			<PostForm
			first='Add' second={'post'}
				title='Добавление нового поста'
				onSubmitForm={onSubmitForm}
				button='Add post'
			/>
		</>
	)
}
