export const postsAPI = {
	async fetchPosts(currentPage) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(
				`http://localhost:3005/api/posts/list/?_page=${currentPage}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token ? `Bearer ${token}` : '',
					},
				}
			)
			if (!response.ok) {
				throw new Error('Error fetching data')
			}
			const responseData = await response.json()
			const posts = responseData.posts.result
			const totalCount = responseData.posts.metadata.totalCount
			return { posts, totalCount }
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchByAuthor(author) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(
				`http://localhost:3005/api/posts/byAuthor`,

				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token ? `Bearer ${token}` : '',
					},
					body: JSON.stringify({ author }),
				}
			)
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchbyId(id) {
		try {
			if (!id) {
				throw new Error('ID is broken')
			}
			const response = await fetch(`http://localhost:3005/api/posts/list/${id}`)
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchNewPost(title, body, date, author, authorId, isPrivate) {
		try {
			const token = localStorage.getItem('token')

			const response = await fetch('http://localhost:3005/api/posts/add', {
				method: 'POST',
				body: JSON.stringify({
					title,
					body,
					date,
					author,
					authorId,
					isPrivate,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: token ? `Bearer ${token}` : '',
				},
			})
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchDeletePost(id) {
		try {
			const token = localStorage.getItem('token')
			if (!id) {
				throw new Error('ID is broken')
			}
			const response = await fetch(`http://localhost:3005/api/posts/delete`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: token ? `Bearer ${token}` : '',
				},
				body: JSON.stringify({
					id,
				}),
			})
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchEditPost(title, body, _id, isPrivate) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch('http://localhost:3005/api/posts/edit', {
				method: 'PUT',
				body: JSON.stringify({
					title,
					body,
					_id,
					isPrivate,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: token ? `Bearer ${token}` : '',
				},
			})
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchAddComment(body, id, date, author, commentId) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(
				'http://localhost:3005/api/posts/addComment',
				{
					method: 'POST',
					body: JSON.stringify({
						body,
						id,
						date,
						author,
						commentId,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
						Authorization: token ? `Bearer ${token}` : '',
					},
				}
			)
			const post = response.json()
			return post
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchDeleteComment(postId, commentId, user) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(
				'http://localhost:3005/api/posts/deleteComment',
				{
					method: 'POST',
					body: JSON.stringify({
						postId,
						commentId,
						user,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
						Authorization: token ? `Bearer ${token}` : '',
					},
				}
			)
			return response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchLikePost(id, user) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch('http://localhost:3005/api/posts/likePost', {
				method: 'POST',
				body: JSON.stringify({
					id,
					user,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					Authorization: token ? `Bearer ${token}` : '',
				},
			})
			const post = response.json()
			return post
		} catch (ex) {
			console.log(ex)
		}
	},
}
