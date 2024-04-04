import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { DetailedPost } from '../../../components/ui/DetailedPost'
import { DetailedPostWrap } from '../../../components/ui/DetailedPostWrap'
import { Link } from '../../../components/ui/Link'
import { PostDetails } from '../../../components/ui/Post/components/PostDetails'
import { Typo } from '../../../components/ui/Typo'
import { getPostById } from '../../../redux/slices/postsSlice'
import { CommentForm } from '../components/CommentForm'
import * as SC from './styles'

export const DetailPostPage = () => {
	const { id } = useParams()
	const { post, loading } = useSelector(state => state.posts.postForView)
	const [showForm, setShowForm] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPostById(id))
	}, [])

	return (
		<Container>
			<DetailedPostWrap>
				{post && (
					<DetailedPost
						author={post.author}
						date={post.date}
						title={post.title}
						body={post.body}
						authorLink={`/users/${post.author}`}
					></DetailedPost>
				)}
				<SC.ButtonsWrap>
					<Button className='white'>Like</Button>
					<Button onClick={() => setShowForm(true)}>Comment</Button>
					<button>Удалить</button>
				</SC.ButtonsWrap>
			</DetailedPostWrap>

			{showForm && <CommentForm />}
			{post?.comments && <Typo>Comments</Typo>}
			<SC.CommentsWrap>
				{post?.comments &&
					post.comments.map(comment => (
						<SC.CommentWrap key={comment.author}>
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