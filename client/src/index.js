import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './components/Root'
import './index.css'
import { AuthPage } from './pages/auth'
import { FriendsPage } from './pages/friends'
import { MainPage } from './pages/main'
import { AddPostPage } from './pages/posts/add/index'
import { DetailPostPage } from './pages/posts/detail'
import { EditPostPage } from './pages/posts/edit'
import { RegistrationPage } from './pages/registration'
import { UserPage } from './pages/user'
import { Users } from './pages/users'
import { store } from './redux/store'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: 'auth',
				element: <AuthPage />,
			},
			{
				path: 'registration',
				element: <RegistrationPage />,
			},
			{
				path: 'friends',
				element: <FriendsPage />,
			},
			{
				path: 'add',
				element: <AddPostPage />,
			},
			{
				path: 'posts/:id',
				element: <DetailPostPage />,
			},
			{
				path: 'posts/:id/edit',
				element: <EditPostPage />,
			},
			{
				path: 'users/:author',
				element: <UserPage />,
			},
			{
				path: '/users',
				element: <Users />,
			},
		],
	},
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
