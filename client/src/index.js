import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { store } from './redux/store'
import { Root } from './components/Root'
import './index.css'
import { AuthPage } from './pages/auth'
import { RegistrationPage } from './pages/registration'
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
