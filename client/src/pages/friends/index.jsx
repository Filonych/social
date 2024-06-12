import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import { Link } from '../../components/ui/Link'
import { MainTitle } from '../../components/ui/MainTitle'
import { getFriends } from '../../redux/actions/usersActions'
import { selectFriends } from '../../redux/selectors/usersSelectors'
import * as SC from './styles'

export const FriendsPage = () => {
	const dispatch = useDispatch()

	const { list } = useSelector(selectFriends)

	useEffect(() => {
		dispatch(getFriends())
	}, [])

	return (
		<Container>
			<MainTitle first='My' second='friends' />
			<SC.Wrap>
				{list?.map(friend => (
					<SC.Friend key={friend}>
						<SC.Image />
						<Link to={`/users/${friend}`}>{friend}</Link>
					</SC.Friend>
				))}
			</SC.Wrap>
		</Container>
	)
}
