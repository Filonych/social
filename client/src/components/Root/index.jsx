import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from '../ui/Button'
import * as SC from './styles'

export const Root = () => {
	const { user } = useSelector(state => state.user)
	return (
		<>
			{/* <NavLink to={'/'}>Главная </NavLink>
			{user && <NavLink>Мой профиль</NavLink>}
			{user && <NavLink>Посты</NavLink>}
			{!user && <NavLink to={'/auth'}>Войти</NavLink>}
			{!user && <NavLink to={'/registration'}>Создать профиль</NavLink>}
			{user && <NavLink>Выйти</NavLink>} */}
			<SC.Menu>
				<NavLink to={'/'}>
					<img src='img/rocket.svg' />
				</NavLink>
				<SC.MenuLinks>
					<SC.MenuItem to={'/user'}>kate27</SC.MenuItem>
					<SC.MenuItem to={'/friends'}>Friends</SC.MenuItem>
					<SC.MenuItem to={'/add'}>Add Post</SC.MenuItem>
					<SC.MenuItem to={'/auth'}>
						<Button className='white'>Login</Button>
					</SC.MenuItem>
					<SC.MenuItem to={'/registration'}>
						<Button>Create account</Button>
					</SC.MenuItem>
					<SC.MenuItem><Button className='white'>Logout</Button></SC.MenuItem>
				</SC.MenuLinks>
			</SC.Menu>

			<Outlet />
		</>
	)
}
