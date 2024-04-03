import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { DetailedPost } from '../../../components/ui/DetailedPost'
import { getPostById } from '../../../redux/slices/postsSlice'
import { CommentForm } from '../components/CommentForm'
import { DetailedPostWrap } from '../../../components/ui/DetailedPostWrap'
import * as SC from './styles'
import { Typo } from '../../../components/ui/Typo'

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

			<div>
				{post?.comments &&
					post.comments.map(comment => (
						<div key={comment.author}>
							<div>{comment.body}</div>
							<div>{comment.author}</div>
							<div>{comment.date}</div>
						</div>
					))}
			</div>
		</Container>
	)
}
