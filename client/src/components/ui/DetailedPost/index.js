import React from 'react'
import * as SC from './styles'
import { Link } from '../Link'
import { PostDetails } from '../Post/components/PostDetails'

export const DetailedPost = ({ author, date, title, body }) => (
	<SC.DetailedPost>
		<SC.Details>
			<PostDetails>{author}</PostDetails>
			<PostDetails>{date}</PostDetails>
			<PostDetails>5 likes</PostDetails>
			<PostDetails>3 comments</PostDetails>
		</SC.Details>{' '}
		<SC.Title>{title}</SC.Title>
		<SC.Body>{body}</SC.Body>
	</SC.DetailedPost>
)
