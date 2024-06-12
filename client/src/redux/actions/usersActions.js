import { createAsyncThunk } from '@reduxjs/toolkit'
import { usersAPI } from '../../api/usersAPI'

export const regNewUser = createAsyncThunk(
	'users/fetchNewUser',
	async (userData) => {
		return await usersAPI.fetchNewUser(userData)
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
	async (author) => {
		return await usersAPI.fetchAddFriend(author)
	}
)

export const removeFriend = createAsyncThunk(
	'users/fetchRemoveFriend',
	async (author) => {
		return await usersAPI.fetchRemoveFriend(author)
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
	async () => {
		return await usersAPI.fetchCheckAuth()
	}
)

export const getUsers = createAsyncThunk(
	'users/fetchUsers',
	async ({ currentPage }) => {
		return await usersAPI.fetchUsers(currentPage)
	}
)