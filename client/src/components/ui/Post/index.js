import React from 'react'
import { Link } from '../Link'
import { PostDetails } from './components/PostDetails'
import * as SC from './styles'

export const Post = ({ post }) => {
	const { author, date, title, body, isPrivate } = post
	return (
		<SC.Post>
			<SC.DetailsWrap>
				<SC.Details>{`${isPrivate ? 'Private' : 'Public'}`}</SC.Details>
				<SC.Details>
					<PostDetails>
						<Link to={`/users/${post.author}`}>{author}</Link>
					</PostDetails>
					<PostDetails>{date}</PostDetails>
				</SC.Details>
			</SC.DetailsWrap>
			<SC.Title>{title}</SC.Title>
			<SC.Body>{body}</SC.Body>
			<Link to={`/posts/${post._id}`}>View post...</Link>
		</SC.Post>
	)
}
