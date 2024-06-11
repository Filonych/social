import { createSlice } from '@reduxjs/toolkit'
import {
	addFriend,
	checkAuth,
	getFriends,
	getUsers,
	login,
	regNewUser,
	removeFriend,
} from '../actions/usersActions'

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
			.addCase(removeFriend.fulfilled, (state, action) => {
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
