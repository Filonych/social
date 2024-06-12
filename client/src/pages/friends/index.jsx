import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import { Link } from '../../components/ui/Link'
import { MainTitle } from '../../components/ui/MainTitle'
import { selectUser } from '../../redux/selectors/usersSelectors'
import * as SC from './styles'

export const FriendsPage = () => {

	const user = useSelector(selectUser)

	return (
		<Container>
			<MainTitle first='My' second='friends' />
			<SC.Wrap>
				{user?.friends.map(friend => (
					<SC.Friend key={friend}>
						<SC.Image />
						<Link to={`/users/${friend}`}>{friend}</Link>
					</SC.Friend>
				))}
			</SC.Wrap>
		</Container>
	)
}
