import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { checkAuth } from '../../redux/actions/usersActions'
import { logout } from '../../redux/reducers/usersReducer'
import { selectUser } from '../../redux/selectors/usersSelectors'
import { Container } from '../ui/Container'
import { AdminMenu, GuestMenu, UserMenu } from './components/MenuItems'
import * as SC from './styles'

export const Root = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = useSelector(selectUser)

	const isAdmin = user?.roles.includes('ADMIN')
	const isAuthUser = user?.roles.includes('USER')

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
				{isAuthUser && (
					<UserMenu username={user.username} onClickExitBtn={onClickExitBtn} />
				)}
				{isAdmin && <AdminMenu onClickExitBtn={onClickExitBtn} />}
				{!user && <GuestMenu />}
			</SC.Menu>
			<Outlet />
		</Container>
	)
}
