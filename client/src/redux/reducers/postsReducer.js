// src/redux/reducers/postsReducer.js
import { createSlice } from '@reduxjs/toolkit'
import {
	addComment,
	addPost,
	deleteComment,
	deletePost,
	editPost,
	getAuthorPosts,
	getPostById,
	getPosts,
	likePost,
} from '../actions/postsActions'

const initialState = {
	posts: {
		list: null,
		loading: false,
		totalCount: 0,
	},
	selectedPost: {
		post: null,
		loading: false,
	},
	authorPosts: {
		list: null,
		loading: false,
		isAddedToFriends: false,
	},
	message: null,
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setMessage: (state, action) => {
			state.message = action.payload
		},
		clearMessage: state => {
			state.message = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getPosts.pending, state => {
				state.posts = {
					list: null,
					loading: true,
				}
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.posts = {
					list: action.payload.posts,
					loading: false,
					totalCount: action.payload.totalCount,
				}
			})
			.addCase(getAuthorPosts.pending, state => {
				state.authorPosts = {
					list: null,
					loading: true,
				}
			})
			.addCase(getAuthorPosts.fulfilled, (state, action) => {
				state.authorPosts = {
					list: action.payload.posts,
					loading: false,
					isAddedToFriends: action.payload.isAddedToFriends,
				}
			})
			.addCase(getPostById.pending, state => {
				state.selectedPost = {
					post: null,
					loading: true,
				}
			})
			.addCase(getPostById.fulfilled, (state, action) => {
				state.selectedPost = {
					post: action.payload.post,
					loading: false,
				}
			})
			.addCase(addComment.pending, state => {
				state.selectedPost = {
					...state.selectedPost,
					post: {
						...state.selectedPost.post,
						comments: null,
					},
					loading: true,
				}
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.selectedPost = {
					...state.selectedPost,
					post: {
						...state.selectedPost.post,
						comments: action.payload.comments,
					},
					loading: false,
				}
			})
			.addCase(deleteComment.pending, state => {
				state.selectedPost = {
					...state.selectedPost,
					post: {
						...state.selectedPost.post,
						comments: null,
					},
					loading: true,
				}
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.selectedPost = {
					...state.selectedPost,
					post: {
						...state.selectedPost.post,
						comments: action.payload.comments,
					},
					loading: false,
				}
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.selectedPost = {
					post: action.payload.post,
					loading: false,
				}
			})
			.addCase(addPost.fulfilled, (state, action) => {
				return {
					...state,
					message: action.payload.message,
				}
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				return {
					...state,
					message: action.payload.message,
					selectedPost: {
						post: null,
						loading: false,
					},
				}
			})
			.addCase(editPost.fulfilled, (state, action) => {
				return {
					...state,
					message: action.payload.message,
				}
			})
	},
})

export const { clearMessage, setMessage } = postsSlice.actions

export default postsSlice.reducer
