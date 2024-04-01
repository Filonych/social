import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/usersSlice'
import postsReducer from "./slices/postsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		posts: postsReducer,
	},
})
