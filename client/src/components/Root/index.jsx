import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { checkAuth } from '../../redux/actions/usersActions'
import { logout } from '../../redux/reducers/usersReducer'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { MenuItem } from '../ui/MenuItem'
import * as SC from './styles'
import { selectUser } from '../../redux/selectors/usersSelectors'

export const Root = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = useSelector(selectUser)

	const onClickExitBtn = async () => {
		await dispatch(logout())
		navigate('/auth')
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) dispatch(checkAuth())
	}, [])

	return (
		<Container>
			<SC.Menu>
				<NavLink to='/'>
					<img src='img/rocket.svg' alt='logo' />
				</NavLink>
				{user && !user?.isAdmin && (
					<SC.MenuLinks>
						<MenuItem link={`/users/${user.username}`}>
							{user.username}
						</MenuItem>
						<MenuItem link='/friends'>Friends</MenuItem>
						<MenuItem link='/add'>Add Post</MenuItem>{' '}
						<Button className='white' onClick={onClickExitBtn}>
							Logout
						</Button>
					</SC.MenuLinks>
				)}
				{user && user?.isAdmin && (
					<SC.MenuLinks>
						<MenuItem link='/users'>Users</MenuItem>
						<Button className='white' onClick={onClickExitBtn}>
							Logout
						</Button>
					</SC.MenuLinks>
				)}
				{!user && (
					<SC.MenuLinks>
						<MenuItem link='/auth'>
							<Button className='white'>Login</Button>
						</MenuItem>
						<MenuItem link='/registration'>
							<Button>Create account</Button>
						</MenuItem>
					</SC.MenuLinks>
				)}
			</SC.Menu>

			<Outlet />
		</Container>
	)
}
