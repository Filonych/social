import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/usersSlice'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { MenuItem } from '../ui/MenuItem'
import * as SC from './styles'

export const Root = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user } = useSelector(state => state.user)

	const onClickExitBtn = async () => {
		await dispatch(logout())
		navigate('/auth')
	}
	return (
		<Container>
			<SC.Menu>
				<NavLink to='/'>
					<img src='img/rocket.svg' />
				</NavLink>
				{user && (
					<SC.MenuLinks>
						<MenuItem link={`/users/${user.username}`}>
							{user.username}
						</MenuItem>
						<MenuItem link='/friends'>Friends</MenuItem>
						<MenuItem link='/add'>Add Post</MenuItem>
						<MenuItem>
							<Button className='white' onClick={onClickExitBtn}>
								Logout
							</Button>
						</MenuItem>
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
