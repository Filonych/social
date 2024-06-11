import { createAsyncThunk } from '@reduxjs/toolkit'
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

export const getAuthorPosts = createAsyncThunk(
	'posts/fetchByAuthor',
	async ({ author }) => {
		return await postsAPI.fetchByAuthor(author)
	}
)

export const addPost = createAsyncThunk(
	'posts/fetchNewPost',
	async postData => {
		return await postsAPI.fetchNewPost(postData)
	}
)

export const deletePost = createAsyncThunk(
	'posts/fetchDeletePost',
	async (id) => {
		return await postsAPI.fetchDeletePost(id)
	}
)

export const editPost = createAsyncThunk(
	'posts/fetchEditPost',
	async (postData) => {
		return await postsAPI.fetchEditPost(postData)
	}
)

export const addComment = createAsyncThunk(
	'posts/fetchAddComment',
	async (commentData) => {
		return await postsAPI.fetchAddComment(commentData)
	}
)

export const deleteComment = createAsyncThunk(
	'posts/fetchDeleteComment',
	async ({ id, commentToDelete }) => {
		return await postsAPI.fetchDeleteComment(id, commentToDelete)
	}
)

export const likePost = createAsyncThunk(
	'posts/fetchLikePost',
	async (id) => {
		return await postsAPI.fetchLikePost(id)
	}
)
