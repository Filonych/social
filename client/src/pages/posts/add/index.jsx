import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../redux/slices/postsSlice'
import { PostForm } from '../components/PostForm'

export const AddPostPage = () => {
	const { user } = useSelector(state => state.user)
	const dispatch = useDispatch()

	const onSubmitForm = formValues => {
		const date = new Date().toISOString()
		formValues = { ...formValues, date, author: user.username }
		dispatch(addPost(formValues))
	}

	return (
		<>
			<PostForm
				title='Добавление нового поста'
				onSubmitForm={onSubmitForm}
				button='Add post'
			/>
		</>
	)
}
