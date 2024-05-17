export const postsAPI = {
	async fetchPosts(userId, currentPage) {
		try {
			const response = await fetch(
				`http://localhost:3005/api/posts/list/?_userId=${userId}&_page=${currentPage}`
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

	async fetchByAuthor(author, privatePosts) {
		try {
			const response = await fetch(
				`http://localhost:3005/api/posts/byAuthor/?_privatePosts=${privatePosts}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
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
				},
			})
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchDeletePost(id) {
		try {
			if (!id) {
				throw new Error('ID is broken')
			}
			const response = await fetch(`http://localhost:3005/api/posts/delete`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
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

	async fetchEditPost(title, body, _id) {
		try {
			const response = await fetch('http://localhost:3005/api/posts/edit', {
				method: 'PUT',
				body: JSON.stringify({
					title,
					body,
					_id,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchAddComment(body, id, date, author, commentId) {
		try {
			const response = await fetch('http://localhost:3005/api/posts/comment', {
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
				},
			})
			const post = response.json()
			return post
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchLikePost(id, user) {
		try {
			const response = await fetch('http://localhost:3005/api/posts/likePost', {
				method: 'POST',
				body: JSON.stringify({
					id,
					user,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			const post = response.json()
			return post
		} catch (ex) {
			console.log(ex)
		}
	},
}
