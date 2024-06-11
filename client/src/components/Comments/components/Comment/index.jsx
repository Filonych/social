import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../../../../redux/reducers/postsReducer'
import { PostDetails } from '../../../Posts/components/PostDetails'
import { Button } from '../../../ui/Button'
import { Link } from '../../../ui/Link'
import * as SC from './styles'
import { selectUser } from '../../../../redux/selectors/usersSelectors'

export const Comment = ({ comment, setCommentToDelete }) => {
	const dispatch = useDispatch()

	const user = useSelector(selectUser)

	const onClickButton = commentId => {
		setCommentToDelete(commentId)
		dispatch(setMessage('Are you sure you want to delete this comment?'))
	}

	return (
		<SC.CommentWrap>
			<SC.PostDetailsWrap>
				<PostDetails>
					<Link to={`/users/${comment.author}`}>{comment.author}</Link>
				</PostDetails>
				<PostDetails>{comment.date}</PostDetails>
			</SC.PostDetailsWrap>
			<SC.CommentText>{comment.body}</SC.CommentText>
			{user && (user.isAdmin || comment.author === user.username) && (
				<SC.ButtonWrap>
					<Button className='white' onClick={() => onClickButton(comment.id)}>
						Delete
					</Button>
				</SC.ButtonWrap>
			)}
		</SC.CommentWrap>
	)
}
