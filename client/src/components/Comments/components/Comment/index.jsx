import React from 'react'
import { PostDetails } from '../../../Posts/components/PostDetails'
import { Link } from '../../../ui/Link'
import * as SC from './styles'

export const Comment = ({ comment }) => {
	return (
		<SC.CommentWrap>
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
