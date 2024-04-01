import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { usersAPI } from '../../api/usersAPI'

export const regNewUser = createAsyncThunk(
	'users/fetchNewUser',
	async ({ username, email, password }) => {
		return await usersAPI.fetchNewUser(username, email, password)
	}
)

const initialState = {
	user: null,
}

export const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload
		},
		logout: state => {
			state.user = null
		},
	},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getPosts.pending, (state) => {
  //       state.posts = {
  //         list: null,
  //         loading: true,
  //       };
  //     })
  //     .addCase(getPosts.fulfilled, (state, action) => {
  //       state.posts = {
  //         list: action.payload.posts,
  //         loading: false,
  //       };
  //       state.totalCount = action.payload.totalCount;
  //     })}
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
