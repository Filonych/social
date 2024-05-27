import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import { Link } from '../../components/ui/Link'
import { MainTitle } from '../../components/ui/MainTitle'
import { getFriends } from '../../redux/slices/usersSlice'
import * as SC from './styles'

export const FriendsPage = () => {
	const dispatch = useDispatch()
	const { list } = useSelector(state => state.user.friends)

	useEffect(() => {
		dispatch(getFriends())
	}, [])

	return (
		<Container>
			<MainTitle first='My' second='friends' />
			<SC.Wrap>
				{list?.map(friend => (
					<SC.Friend key={friend}>
						<SC.Image></SC.Image>
						<Link to={`/users/${friend}`}>{friend}</Link>
					</SC.Friend>
				))}
			</SC.Wrap>
		</Container>
	)
}
