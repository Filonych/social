import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../redux/selectors/usersSelectors'
import { InfoPanel } from '../../../Posts/components/InfoPanel'
import { Button } from '../../../ui/Button'
import { Link } from '../../../ui/Link'
import * as SC from './styles'

export const Comment = ({ comment, onClickDeleteComment }) => {
	const user = useSelector(selectUser)

	const isAdmin = user?.roles.includes('ADMIN')
	const isAuthor = comment.author === user?.username

	return (
		<SC.CommentWrap>
			<SC.InfoPanelWrap>
				<InfoPanel>
					<Link to={`/users/${comment.author}`}>{comment.author}</Link>
				</InfoPanel>
				<InfoPanel>{comment.date}</InfoPanel>
			</SC.InfoPanelWrap>
			<SC.CommentText>{comment.body}</SC.CommentText>
			{user && (isAdmin || isAuthor) && (
				<SC.ButtonWrap>
					<Button
						className='white'
						onClick={() => onClickDeleteComment(comment.id)}
					>
						Delete
					</Button>
				</SC.ButtonWrap>
			)}
		</SC.CommentWrap>
	)
}
