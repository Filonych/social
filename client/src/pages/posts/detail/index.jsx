import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { DetailedPost } from '../../../components/ui/DetailedPost'
import { DetailedPostWrap } from '../../../components/ui/DetailedPostWrap'
import { Link } from '../../../components/ui/Link'
import { Loader } from '../../../components/ui/Loader'
import { PostDetails } from '../../../components/ui/Post/components/PostDetails'
import { Typo } from '../../../components/ui/Typo'
import { Modal } from '../../../components/ui/Modal'
import { formatDate } from '../../../helpers/formatDate'
import {
	addComment,
	deletePost,
	getPostById,
	likePost,
} from '../../../redux/slices/postsSlice'
import { CommentForm } from '../components/CommentForm'
import * as SC from './styles'

export const DetailPostPage = () => {
	const { user } = useSelector(state => state.user)

	const { id } = useParams()
	const { post, loading } = useSelector(state => state.posts.postForView)
	const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const likes = post?.likes?.length || 0
	const commentsCount = post?.comments?.length || 0
	const isLiked = post?.likes.includes(user?._id)

	const onDeletePost = () => {
		dispatch(deletePost({ id }))
		setShowModal(true)
	}

	const onSubmitForm = formValues => {
		const date = formatDate()
		const commentId = new Date().getTime()
		formValues = { ...formValues, id, date, author: user.username, commentId }
		dispatch(addComment(formValues)).then(() => dispatch(getPostById(id)))
		setShowForm(false)
	}

	const onLikePost = () => {
		dispatch(likePost({ id, user: user._id }))
	}

	const onCloseModal = () => {
    
      navigate("/");
			setShowModal(false);
    
  };

	useEffect(() => {
		dispatch(getPostById(id))
	}, [])

	return (
		<Container>
			{showModal && (
        <Modal
          text="Пост успешно удалён"
          buttons={<Button onClick={() => onCloseModal()}>ОК</Button>}
        />
      )}
			{loading && <Loader />}
			{post && (
				<DetailedPostWrap>
					<DetailedPost
						author={post.author}
						date={post.date}
						title={post.title}
						body={post.body}
						authorLink={`/users/${post.author}`}
						likes={likes}
						commentsCount={commentsCount}
						onLikePost={onLikePost}
						isPrivate={post.isPrivate}
					></DetailedPost>
					{user && <SC.ButtonsWrap>
						<Button className={isLiked ? undefined :'white'} onClick={onLikePost}>{isLiked ? 'Liked' : 'Like'}
						</Button>
						<Button onClick={() => setShowForm(true)}>Comment</Button>
						{user._isAdmin && <button onClick={onDeletePost}>Удалить</button>}
					</SC.ButtonsWrap> }
					
				</DetailedPostWrap>
			)}

			{showForm && <CommentForm onSubmitForm={onSubmitForm} button='Comment' />}
			{!!commentsCount && <Typo>Comments</Typo>}
			<SC.CommentsWrap>
				{post?.comments &&
					post.comments.map(comment => (
						<SC.CommentWrap key={comment.id}>
							<SC.PostDetailsWrap>
								<PostDetails>
									<Link to={`/users/${comment.author}`}>{comment.author}</Link>
								</PostDetails>
								<PostDetails>{comment.date}</PostDetails>
							</SC.PostDetailsWrap>

							<SC.CommentText>{comment.body}</SC.CommentText>
						</SC.CommentWrap>
					))}
			</SC.CommentsWrap>
		</Container>
	)
}
