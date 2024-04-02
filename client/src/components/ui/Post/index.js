import React from 'react'
import * as SC from './styles'
import { Link } from '../Link'

export const Post = ({ author, date, title, body, link }) => (
	<SC.Post>
		<SC.Details>
			<SC.DetailsItem>{author}</SC.DetailsItem>
			<SC.DetailsItem>{date}</SC.DetailsItem>
		</SC.Details>{' '}
		<SC.Title>{title}</SC.Title>
		<SC.Body>{body}</SC.Body>
    <Link to={link}>View post...</Link>
	</SC.Post>
)
