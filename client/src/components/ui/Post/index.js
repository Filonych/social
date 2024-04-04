import React from 'react'
import * as SC from './styles'
import { Link } from '../Link'
import { PostDetails } from './components/PostDetails'

export const Post = ({ author, date, title, body, postLink, authorLink }) => (
	<SC.Post>
		<SC.Details>
			<PostDetails><Link to={authorLink}>{author}</Link></PostDetails>
			<PostDetails>{date}</PostDetails>
		</SC.Details>{' '}
		<SC.Title>{title}</SC.Title>
		<SC.Body>{body}</SC.Body>
    <Link to={postLink}>View post...</Link>
	</SC.Post>
)
