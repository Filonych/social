import React from 'react'
import { Typo } from '../ui/Typo'
import { Comment } from './components/Comment'
import * as SC from './styles'

export const Comments = ({ post, onClickDeleteComment }) => {
	const commentsCount = post?.comments?.length || 0

	return (
		<SC.CommentsWrap>
			{!!commentsCount && <Typo>Comments</Typo>}
			{post?.comments &&
				post.comments.map(comment => (
					<Comment
						key={comment.id}
						comment={comment}
						onClickDeleteComment={onClickDeleteComment}
					/>
				))}
		</SC.CommentsWrap>
	)
}
