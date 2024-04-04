import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { usersAPI } from '../../api/usersAPI'

export const regNewUser = createAsyncThunk(
	'users/fetchNewUser',
	async ({ username, email, password }) => {
		return await usersAPI.fetchNewUser(username, email, password)
	}
)

export const addFriend = createAsyncThunk(
	'users/fetchAddFriend',
	async ({ username, author }) => {
		return await usersAPI.fetchAddFriend(username, author)
	}
)

export const RemoveFriend = createAsyncThunk(
	'users/fetchRemoveFriend',
	async ({ username, author }) => {
		return await usersAPI.fetchRemoveFriend(username, author)
	}
)

export const login = createAsyncThunk(
	'users/fetchLogin',
	async ({ email, password }) => {
		return await usersAPI.fetchLogin(email, password)
	}
)

const initialState = {
	user: null,
}

export const authSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: builder => {
		builder
			//     .addCase(getPosts.pending, (state) => {
			//       state.posts = {
			//         list: null,
			//         loading: true,
			//       };
			//     })
			.addCase(login.fulfilled, (state, action) => {
				return { ...state, user: action.payload.user }
			})
			.addCase(addFriend.fulfilled, (state, action) => {
				return { ...state, user: action.payload.user }
			})
			.addCase(RemoveFriend.fulfilled, (state, action) => {
				return { ...state, user: action.payload.user }
			})
	},
})

export default authSlice.reducer
