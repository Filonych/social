import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Comments } from '../../../components/Posts/components/Comments'
import { DetailedPost } from '../../../components/Posts/components/DetailedPost'
import { DetailedPostWrap } from '../../../components/Posts/components/DetailedPostWrap'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { Loader } from '../../../components/ui/Loader'
import { Modal } from '../../../components/ui/Modal'
import { formatDate } from '../../../helpers/formatDate'
import {
	addComment,
	clearMessage,
	deletePost,
	getPostById,
	likePost,
} from '../../../redux/slices/postsSlice'
import { CommentForm } from '../components/CommentForm'
import * as SC from './styles'

export const DetailPostPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { id } = useParams()

	const { user } = useSelector(state => state.user)
	const { post, loading } = useSelector(state => state.posts.postForView)
	const { message } = useSelector(state => state.posts)

	const [showCommentForm, setShowCommentForm] = useState(false)

	const isLiked = post?.likes.includes(user?._id)

	const onDeletePost = () => {
		dispatch(deletePost({ id }))
	}

	const onSubmitForm = async formValues => {
		const date = formatDate()
		const commentId = new Date().getTime()
		formValues = { ...formValues, id, date, author: user.username, commentId }
		await dispatch(addComment(formValues))
		await dispatch(getPostById(id))
		setShowCommentForm(false)
	}

	const onLikePost = () => {
		dispatch(likePost({ id, user: user._id }))
	}

	const onCloseModal = () => {
		navigate('/')
		dispatch(clearMessage())
	}

	useEffect(() => {
		dispatch(getPostById(id))
	}, [])

	return (
		<Container>
			{message && (
				<Modal
					text={message}
					buttons={<Button onClick={() => onCloseModal()}>ОК</Button>}
				/>
			)}
			{loading && <Loader />}
			{post && (
				<DetailedPostWrap>
					<DetailedPost onLikePost={onLikePost}></DetailedPost>
					{user && (
						<SC.ButtonsWrap>
							<Button
								className={isLiked ? undefined : 'white'}
								onClick={onLikePost}
							>
								{isLiked ? 'Liked' : 'Like'}
							</Button>
							<Button onClick={() => setShowCommentForm(true)}>Comment</Button>
							{user._isAdmin && <button onClick={onDeletePost}>Delete</button>}
						</SC.ButtonsWrap>
					)}
				</DetailedPostWrap>
			)}

			{showCommentForm && (
				<CommentForm onSubmitForm={onSubmitForm} button='Comment' />
			)}

			<Comments post={post} />
		</Container>
	)
}
