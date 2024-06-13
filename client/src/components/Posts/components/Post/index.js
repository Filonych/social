import React from 'react'
import { Link } from '../../../ui/Link'
import { InfoPanel } from '../InfoPanel'
import * as SC from './styles'

export const Post = ({ post }) => {
	const { author, date, title, body, isPrivate, _id } = post

	return (
		<SC.Post>
			<SC.DetailsWrap>
				<SC.Details>{`${isPrivate ? 'Private' : 'Public'}`}</SC.Details>
				<SC.Details>
					<InfoPanel>
						<Link to={`/users/${author}`}>{author}</Link>
					</InfoPanel>
					<InfoPanel>{date}</InfoPanel>
				</SC.Details>
			</SC.DetailsWrap>
			<SC.Title>{title}</SC.Title>
			<SC.Body>{body}</SC.Body>
			<Link to={`/posts/${_id}`}>View post...</Link>
		</SC.Post>
	)
}
