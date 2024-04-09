import React from 'react'
import { Link } from '../Link'
import { PostDetails } from './components/PostDetails'
import * as SC from './styles'

export const Post = ({
	author,
	date,
	title,
	body,
	postLink,
	authorLink,
	isPrivate,
}) => (
	<SC.Post>
		<SC.Details>
			<PostDetails>
				<Link to={authorLink}>{author}</Link>
			</PostDetails>
			<PostDetails>{date}</PostDetails>
			<PostDetails>{`${isPrivate ? 'Private' : 'Public'}`}</PostDetails>
		</SC.Details>{' '}
		<SC.Title>{title}</SC.Title>
		<SC.Body>{body}</SC.Body>
		<Link to={postLink}>View post...</Link>
	</SC.Post>
)
