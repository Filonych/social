import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsAPI } from '../../api/postsAPI'

export const getPosts = createAsyncThunk(
	'posts/fetchPosts',
	async ({ user, currentPage }) => {
		return await postsAPI.fetchPosts(user, currentPage)
	}
)

export const getPostById = createAsyncThunk('posts/fetchbyId', async id => {
	return await postsAPI.fetchbyId(id)
})

export const getPostsByAuthor = createAsyncThunk(
	'posts/fetchByAuthor',
	async ({ author, privatePosts }) => {
		return await postsAPI.fetchByAuthor(author, privatePosts)
	}
)

export const addPost = createAsyncThunk(
	'posts/fetchNewPost',
	async ({ title, body, date, author, authorId, isPrivate }) => {
		return await postsAPI.fetchNewPost(
			title,
			body,
			date,
			author,
			authorId,
			isPrivate
		)
	}
)

export const deletePost = createAsyncThunk(
	'posts/fetchDeletePost',
	async ({ id }) => {
		return await postsAPI.fetchDeletePost(id)
	}
)

export const addComment = createAsyncThunk(
	'posts/fetchAddComment',
	async ({ body, id, date, author, commentId }) => {
		return await postsAPI.fetchAddComment(body, id, date, author, commentId)
	}
)

export const likePost = createAsyncThunk(
	'posts/fetchLikePost',
	async ({ id, user }) => {
		return await postsAPI.fetchLikePost(id, user)
	}
)

const initialState = {
	posts: {
		list: null,
		loading: false,
		totalCount: 0,
	},
	postForView: {
		post: null,
		loading: false,
	},
	postsByAuthor: {
		list: null,
		loading: false,
	},
	message: null,
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
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

			.addCase(getPostsByAuthor.pending, state => {
				state.postsByAuthor = {
					list: null,
					loading: true,
				}
			})
			.addCase(getPostsByAuthor.fulfilled, (state, action) => {
				state.postsByAuthor = {
					list: action.payload.posts,
					loading: false,
				}
			})
			.addCase(getPostById.pending, state => {
				state.postForView = {
					post: null,
					loading: true,
				}
			})
			.addCase(getPostById.fulfilled, (state, action) => {
				state.postForView = {
					post: action.payload.post,
					loading: false,
				}
			})

			.addCase(addComment.pending, state => {
				state.postForView = {
					post: null,
					loading: true,
				}
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.postForView = {
					post: action.payload.post,
					loading: false,
				}
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.postForView = {
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
				}
			})
	},
})

export const { clearMessage } = postsSlice.actions

export default postsSlice.reducer
