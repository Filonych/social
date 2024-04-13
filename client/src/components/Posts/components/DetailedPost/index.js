import React from 'react'
import { useSelector } from 'react-redux'
import { PostDetails } from '../PostDetails'
import * as SC from './styles'
import { Link } from '../../../ui/Link'

export const DetailedPost = () => {
	const { post } = useSelector(state => state.posts.postForView)
	const { author, date, title, body, isPrivate } = post

	const likes = post?.likes?.length || 0
	const commentsCount = post?.comments?.length || 0

	return (
		<SC.DetailedPost>
			<SC.Details>
				<PostDetails>
					<Link to={`/users/${author}`}>{author}</Link>
				</PostDetails>
				<PostDetails>{date}</PostDetails>
				<PostDetails>{`${likes} ${
					likes === 0 || likes > 1 ? 'likes' : 'like'
				}`}</PostDetails>
				<PostDetails>{`${commentsCount} ${
					commentsCount === 0 || commentsCount > 1 ? 'comments' : 'comment'
				}`}</PostDetails>
				<PostDetails>{`${isPrivate ? 'Private' : 'Public'}`}</PostDetails>
			</SC.Details>{' '}
			<SC.Title>{title}</SC.Title>
			<SC.Body>{body}</SC.Body>
		</SC.DetailedPost>
	)
}
