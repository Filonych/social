import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { Root } from './components/Root'
import './index.css'
import { AuthPage } from './pages/auth'
import { FriendsPage } from './pages/friends'
import { AddPostPage } from './pages/posts/add/index'
import { DetailPostPage } from './pages/posts/detail'
import { RegistrationPage } from './pages/registration'
import { UserPage } from './pages/user'
import { store } from './redux/store'
import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <App />,
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
				path: 'users/:author',
				element: <UserPage />,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
