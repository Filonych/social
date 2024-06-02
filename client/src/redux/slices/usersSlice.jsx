import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { usersAPI } from '../../api/usersAPI'

export const regNewUser = createAsyncThunk(
	'users/fetchNewUser',
	async ({ username, email, password }) => {
		return await usersAPI.fetchNewUser(username, email, password)
	}
)

export const getFriends = createAsyncThunk(
	'users/fetchGetFriends',
	async () => {
		return await usersAPI.fetchGetFriends()
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

export const checkAuth = createAsyncThunk('users/fetchCheckAuth', async () => {
	return await usersAPI.fetchCheckAuth()
})

export const getUsers = createAsyncThunk(
	'users/fetchUsers',
	async ({ currentPage }) => {
		return await usersAPI.fetchUsers(currentPage)
	}
)

const initialState = {
	user: null,
	message: null,
	friends: {
		list: null,
		loading: false,
	},
	users: {
		list: null,
		loading: false,
		totalCount: 0,
	},
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
			.addCase(getFriends.pending, state => {
				state.friends = {
					list: null,
					loading: true,
				}
			})
			.addCase(getFriends.fulfilled, (state, action) => {
				state.friends = {
					list: action.payload.friends,
					loading: false,
				}
			})

			.addCase(addFriend.fulfilled, (state, action) => {
				return { ...state, user: action.payload.user }
			})
			.addCase(RemoveFriend.fulfilled, (state, action) => {
				return { ...state, user: action.payload.user }
			})
			.addCase(getUsers.pending, state => {
				state.users = {
					list: null,
					loading: true,
				}
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.users = {
					list: action.payload.users,
					loading: false,
					totalCount: action.payload.totalCount,
				}
			})
	},
})

export const { logout, clearMessage } = usersSlice.actions

export default usersSlice.reducer
