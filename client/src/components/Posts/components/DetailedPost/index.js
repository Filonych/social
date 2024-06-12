import React from 'react'
import { Link } from '../../../ui/Link'
import { InfoPanel } from '../InfoPanel'
import * as SC from './styles'

export const DetailedPost = ({ post }) => {
	const { author, date, title, body, isPrivate } = post

	const likes = post?.likes?.length || 0
	const commentsCount = post?.comments?.length || 0

	return (
		<SC.DetailedPost>
			<SC.Details>
				<InfoPanel>
					<Link to={`/users/${author}`}>{author}</Link>
				</InfoPanel>
				<InfoPanel>{date}</InfoPanel>
				<InfoPanel>{`${likes} ${
					likes === 0 || likes > 1 ? 'likes' : 'like'
				}`}</InfoPanel>
				<InfoPanel>{`${commentsCount} ${
					commentsCount === 0 || commentsCount > 1 ? 'comments' : 'comment'
				}`}</InfoPanel>
				<InfoPanel>{`${isPrivate ? 'Private' : 'Public'}`}</InfoPanel>
			</SC.Details>{' '}
			<SC.Title>{title}</SC.Title>
			<SC.Body>{body}</SC.Body>
		</SC.DetailedPost>
	)
}
