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

export const checkAuth = createAsyncThunk(
	'users/fetchCheckAuth',
	async token => {
		return await usersAPI.fetchCheckAuth(token)
	}
)

const initialState = {
	user: null,
	message: null,
}

export const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			localStorage.removeItem('token')
			return { ...state, user: null }
		},
		clearMessage: state => {
			state.message = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(regNewUser.fulfilled, (state, action) => {
				return { ...state, message: action.payload.message }
			})
			.addCase(login.fulfilled, (state, action) => {
				return {
					...state,
					user: action.payload.user,
					message: action.payload.message,
				}
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				return {
					...state,
					user: action.payload.user,
				}
			})
			.addCase(addFriend.fulfilled, (state, action) => {
				return { ...state, user: action.payload.user }
			})
			.addCase(RemoveFriend.fulfilled, (state, action) => {
				return { ...state, user: action.payload.user }
			})
	},
})

export const { logout, clearMessage } = usersSlice.actions

export default usersSlice.reducer
