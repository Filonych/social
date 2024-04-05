import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import * as SC from './styles'

export const FriendsPage = () => {
	const { user } = useSelector(state => state.user)

	const isUser = user?.friends

	return (
		<Container>
			<SC.Wrap>
				{isUser &&
					user.friends.map(friend => (
						<div key={friend}>
							<SC.Image></SC.Image>
							<div>{friend}</div>
						</div>
					))}
			</SC.Wrap>
		</Container>
	)
}
