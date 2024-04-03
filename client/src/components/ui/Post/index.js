import React from 'react'
import * as SC from './styles'
import { Link } from '../Link'
import { PostDetails } from './components/PostDetails'

export const Post = ({ author, date, title, body, link }) => (
	<SC.Post>
		<SC.Details>
			<PostDetails>{author}</PostDetails>
			<PostDetails>{date}</PostDetails>
		</SC.Details>{' '}
		<SC.Title>{title}</SC.Title>
		<SC.Body>{body}</SC.Body>
    <Link to={link}>View post...</Link>
	</SC.Post>
)
