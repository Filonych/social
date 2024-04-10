import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/usersSlice'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import * as SC from './styles'

export const Root = () => {
	const { user } = useSelector(state => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onClickExitBtn = () => {
		dispatch(logout())
		navigate('/auth')
	}
	return (
		<Container>
			<SC.Menu>
				<NavLink to={'/'}>
					<img src='img/rocket.svg' />
				</NavLink>
				<SC.MenuLinks>
					{user && (
						<SC.MenuItem to={`/users/${user.username}`}>
							{user.username}
						</SC.MenuItem>
					)}
					{user && <SC.MenuItem to={'/friends'}>Friends</SC.MenuItem>}
					{user && <SC.MenuItem to={'/add'}>Add Post</SC.MenuItem>}
					{!user && (
						<SC.MenuItem to={'/auth'}>
							<Button className='white'>Login</Button>
						</SC.MenuItem>
					)}
					{!user && (
						<SC.MenuItem to={'/registration'}>
							<Button>Create account</Button>
						</SC.MenuItem>
					)}
					{user && (
						<SC.MenuItem>
							<Button className='white' onClick={onClickExitBtn}>
								Logout
							</Button>
						</SC.MenuItem>
					)}
				</SC.MenuLinks>
			</SC.Menu>

			<Outlet />
		</Container>
	)
}
