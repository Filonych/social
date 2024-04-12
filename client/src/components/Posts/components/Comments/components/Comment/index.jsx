import React from 'react'
import { Link } from '../../../../../ui/Link'
import { PostDetails } from '../../../PostDetails'
import * as SC from './styles'

export const Comment = ({ comment }) => {
	return (
		<SC.CommentWrap key={comment.id}>
			<SC.PostDetailsWrap>
				<PostDetails>
					<Link to={`/users/${comment.author}`}>{comment.author}</Link>
				</PostDetails>
				<PostDetails>{comment.date}</PostDetails>
			</SC.PostDetailsWrap>
			<SC.CommentText>{comment.body}</SC.CommentText>
		</SC.CommentWrap>
	)
}
