import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

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

			<NavLink to={'/'}>Главная </NavLink>
			<NavLink>Мой профиль</NavLink>
			<NavLink>Посты</NavLink>
			<NavLink to={'/auth'}>Войти</NavLink>
			<NavLink to={'/registration'}>Создать профиль</NavLink>
			<NavLink>Выйти</NavLink>
			<Outlet />
		</>
	)
}
