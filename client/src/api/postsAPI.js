import { BASE_URL_POSTS } from '../constants/baseUrl'
import { getAuthHeaders, handleResponse } from '../helpers/apiHelpers'

export const postsAPI = {
	async fetchPosts(currentPage) {
		try {
			const response = await fetch(
				`${BASE_URL_POSTS}/list/?_page=${currentPage}`,
				{
					method: 'GET',
					headers: getAuthHeaders(),
				}
			)
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchByAuthor(author) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/byAuthor`, {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify({ author }),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchbyId(id) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/list/${id}`)
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchNewPost(postData) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/add`, {
				method: 'POST',
				body: JSON.stringify(postData),
				headers: getAuthHeaders(),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchDeletePost(id) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/delete`, {
				method: 'DELETE',
				headers: getAuthHeaders(),
				body: JSON.stringify({
					id,
				}),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchEditPost(postData) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/edit`, {
				method: 'PUT',
				headers: getAuthHeaders(),
				body: JSON.stringify(postData),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchAddComment(commentData) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/addComment`, {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify(commentData),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchDeleteComment(postId, commentId) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/deleteComment`, {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify({
					postId,
					commentId,
				}),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchLikePost(id) {
		try {
			const response = await fetch(`${BASE_URL_POSTS}/likePost`, {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify({
					id,
				}),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},
}
