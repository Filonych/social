import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Comments } from '../../../components/Comments'
import { DetailedPost } from '../../../components/Posts/components/DetailedPost'
import { DetailedPostWrap } from '../../../components/Posts/components/DetailedPostWrap'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { Loader } from '../../../components/ui/Loader'
import { MenuItem } from '../../../components/ui/MenuItem'
import { Modal } from '../../../components/ui/Modal'
import { formatDate } from '../../../helpers/formatDate'
import {
	addComment,
	clearMessage,
	deleteComment,
	deletePost,
	getPostById,
	likePost,
	setMessage,
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
	const [commentToDelete, setCommentToDelete] = useState(null)

	const isLiked = post?.likes.includes(user?._id)

	const onDeletePost = () => {
		dispatch(clearMessage())
		dispatch(deletePost({ id }))
	}

	const onDeleteComment = () => {
		dispatch(clearMessage())
		const username = user.username
		dispatch(deleteComment({ id, commentToDelete, username }))
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
					buttons={
						post ? (
							<>
								<Button
									onClick={() =>
										message === 'Are you sure you want to delete this post?'
											? onDeletePost()
											: onDeleteComment()
									}
									className='danger'
								>
									Yes
								</Button>
								<Button onClick={() => dispatch(clearMessage())}>No</Button>
							</>
						) : (
							<Button onClick={() => onCloseModal()}>OK</Button>
						)
					}
				/>
			)}
			{loading && <Loader />}
			{post && (
				<DetailedPostWrap>
					<DetailedPost onLikePost={onLikePost}></DetailedPost>
					<SC.ButtonsWrap>
						{user && !user.isAdmin && (
							<>
								<Button
									className={isLiked ? 'white' : undefined}
									onClick={onLikePost}
								>
									{isLiked ? 'Liked' : 'Like'}
								</Button>
								<Button onClick={() => setShowCommentForm(true)}>
									Comment
								</Button>
							</>
						)}
						{user && post.author === user?.username && (
							<MenuItem link={`/posts/${id}/edit`}>
								<Button>Edit</Button>
							</MenuItem>
						)}
						{user && (user?.isAdmin || post.author === user?.username) && (
							<Button
								onClick={() =>
									dispatch(
										setMessage('Are you sure you want to delete this post?')
									)
								}
							>
								Delete
							</Button>
						)}
					</SC.ButtonsWrap>
				</DetailedPostWrap>
			)}
			{showCommentForm && (
				<CommentForm onSubmitForm={onSubmitForm} button='Comment' />
			)}

			<Comments post={post} setCommentToDelete={setCommentToDelete} />
		</Container>
	)
}
