import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { DetailedPost } from '../../../components/ui/DetailedPost'
import { DetailedPostWrap } from '../../../components/ui/DetailedPostWrap'
import { Link } from '../../../components/ui/Link'
import { Loader } from '../../../components/ui/Loader'
import { PostDetails } from '../../../components/ui/Post/components/PostDetails'
import { Typo } from '../../../components/ui/Typo'
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

	console.log('user',user)

	const { id } = useParams()
	const { post, loading } = useSelector(state => state.posts.postForView)
	const [showForm, setShowForm] = useState(false)
	const dispatch = useDispatch()

	const likes = post?.likes?.length || 0
	const commentsCount = post?.comments?.length || 0
	const isLiked = post?.likes.includes(user?._id)

	console.log('post',post )

	const onDeletePost = () => {
		dispatch(deletePost({ id }))
	}

	const onSubmitForm = formValues => {
		const date = formatDate()
		formValues = { ...formValues, id, date, author: user.username }
		dispatch(addComment(formValues)).then(() => dispatch(getPostById(id)))
	}

	const onLikePost = () => {
		dispatch(likePost({ id, user: user._id }))
	}

	useEffect(() => {
		dispatch(getPostById(id))
	}, [])

	return (
		<Container>
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
						<button onClick={onDeletePost}>Удалить</button>
					</SC.ButtonsWrap>}
					
				</DetailedPostWrap>
			)}

			{showForm && <CommentForm onSubmitForm={onSubmitForm} button='Comment' />}
			{!!commentsCount && <Typo>Comments</Typo>}
			<SC.CommentsWrap>
				{post?.comments &&
					post.comments.map(comment => (
						<SC.CommentWrap key={`${comment.author}_${comment.date}`}>
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
