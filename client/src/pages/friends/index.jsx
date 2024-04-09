import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import { Link } from '../../components/ui/Link'
import { MainTitle } from '../../components/ui/MainTitle'
import * as SC from './styles'

export const FriendsPage = () => {
	const { user } = useSelector(state => state.user)

	const isUser = user?.friends

	return (
		<Container>
			<MainTitle first='My' second='friends' />
			<SC.Wrap>
				{isUser &&
					user.friends.map(friend => (
						<SC.Friend key={friend}>
							<SC.Image></SC.Image>
							<Link to={`/users/${friend}`}>{friend}</Link>
						</SC.Friend>
					))}
			</SC.Wrap>
		</Container>
	)
}
