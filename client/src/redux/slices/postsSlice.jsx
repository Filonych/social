import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsAPI } from '../../api/postsAPI'

export const getPosts = createAsyncThunk(
	'posts/fetchPosts',
	async currentPage => {
		return await postsAPI.fetchPosts(currentPage)
	}
)

export const getPostById = createAsyncThunk('posts/fetchbyId', async id => {
	return await postsAPI.fetchbyId(id)
})

export const getPostsByAuthor = createAsyncThunk(
	'posts/fetchByAuthor',
	async ({ author }) => {
		return await postsAPI.fetchByAuthor(author)
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
	async ({ id, username }) => {
		return await postsAPI.fetchDeletePost(id, username)
	}
)

export const editPost = createAsyncThunk(
	'posts/fetchEditPost',
	async ({ title, body, _id, isPrivate }) => {
		return await postsAPI.fetchEditPost(title, body, _id, isPrivate)
	}
)

export const addComment = createAsyncThunk(
	'posts/fetchAddComment',
	async ({ body, id, date, author, commentId }) => {
		return await postsAPI.fetchAddComment(body, id, date, author, commentId)
	}
)

export const deleteComment = createAsyncThunk(
	'posts/fetchDeleteComment',
	async ({ id, commentToDelete, username }) => {
		return await postsAPI.fetchDeleteComment(id, commentToDelete, username)
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
					isAddedToFriends: action.payload.isAddedToFriends,
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
					...state.postForView,
					post: {
						...state.postForView.post,
						comments: null,
					},
					loading: true,
				}
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.postForView = {
					...state.postForView,
					post: {
						...state.postForView.post,
						comments: action.payload.comments,
					},
					loading: false,
				}
			})

			.addCase(deleteComment.pending, state => {
				state.postForView = {
					...state.postForView,
					post: {
						...state.postForView.post,
						comments: null,
					},
					loading: true,
				}
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.postForView = {
					...state.postForView,
					post: {
						...state.postForView.post,
						comments: action.payload.comments,
					},
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
					postForView: {
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
