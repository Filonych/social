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
	deleteComment,
	deletePost,
	getPostById,
	likePost,
} from '../../../redux/actions/postsActions'
import { clearMessage, setMessage } from '../../../redux/reducers/postsReducer'
import {
	selectMessage,
	selectSelectedPost,
} from '../../../redux/selectors/postSelectors'
import { selectUser } from '../../../redux/selectors/usersSelectors'
import { CommentForm } from '../components/CommentForm'
import * as SC from './styles'

export const DetailPostPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { id } = useParams()

	const user = useSelector(selectUser)
	const { post, loading } = useSelector(selectSelectedPost)
	const message = useSelector(selectMessage)

	const [showCommentForm, setShowCommentForm] = useState(false)
	const [commentToDelete, setCommentToDelete] = useState(null)

	const isLiked = post?.likes.includes(user?._id)
	const isAuthor = post?.author === user?.username
	const isAdmin = user?.roles.includes('ADMIN')

	const onDeletePost = () => {
		dispatch(clearMessage())
		dispatch(deletePost(id))
	}

	const onClickDeleteComment = commentId => {
		setCommentToDelete(commentId)
		dispatch(setMessage('Are you sure you want to delete this comment?'))
	}

	const onDeleteComment = () => {
		dispatch(clearMessage())
		dispatch(deleteComment({ id, commentToDelete }))
	}

	const onSubmitForm = formValues => {
		const date = formatDate()
		const commentId = new Date().getTime()
		formValues = { ...formValues, id, date, author: user.username, commentId }
		dispatch(addComment(formValues))
		setShowCommentForm(false)
	}

	const onLikePost = () => {
		dispatch(likePost(id))
	}

	const onCloseModal = () => {
		navigate('/')
		dispatch(clearMessage())
	}

	const onClickYes = () => {
		if (message === 'Are you sure you want to delete this post?') {
			onDeletePost()
			return
		}
		onDeleteComment()
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
								<Button onClick={onClickYes} className='danger'>
									Yes
								</Button>
								<Button onClick={() => dispatch(clearMessage())}>No</Button>
							</>
						) : (
							<Button onClick={onCloseModal}>OK</Button>
						)
					}
				/>
			)}
			{post && (
				<DetailedPostWrap>
					<DetailedPost post={post}></DetailedPost>
					<SC.ButtonsWrap>
						{user && !isAdmin && (
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
						{user && isAuthor && (
							<MenuItem link={`/posts/${id}/edit`}>
								<Button>Edit</Button>
							</MenuItem>
						)}
						{user && (isAdmin || isAuthor) && (
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
			{loading && <Loader />}
			<Comments post={post} onClickDeleteComment={onClickDeleteComment} />
		</Container>
	)
}
