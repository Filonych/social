import React from 'react'
import { Link } from '../Link'
import { PostDetails } from '../Post/components/PostDetails'
import * as SC from './styles'

export const DetailedPost = ({
	author,
	date,
	title,
	body,
	authorLink,
	likes,
	commentsCount,
}) => (
	<SC.DetailedPost>
		<SC.Details>
			<PostDetails>
				<Link to={authorLink}>{author}</Link>
			</PostDetails>
			<PostDetails>{date}</PostDetails>
			<PostDetails>{`${likes} ${
				likes === 0 || likes > 1 ? 'likes' : 'like'
			}`}</PostDetails>
			<PostDetails>{`${commentsCount} ${
				commentsCount === 0 || commentsCount > 1 ? 'comments' : 'comment'
			}`}</PostDetails>
		</SC.Details>{' '}
		<SC.Title>{title}</SC.Title>
		<SC.Body>{body}</SC.Body>
	</SC.DetailedPost>
)
