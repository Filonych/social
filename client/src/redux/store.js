import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'
import postsReducer from './reducers/postsReducer'

export const store = configureStore({
	reducer: {
		user: usersReducer,
		posts: postsReducer,
	},
})
