export const postsAPI = {
	async fetchPosts(userId, currentPage) {
		try {
			const response = await fetch(
				`http://localhost:3005/api/posts/list/?_userId=${userId}&_page=${currentPage}`
			)
			if (!response.ok) {
				throw new Error('Ошибка при получении данных')
			}
			const responseData = await response.json();
      const posts = responseData.posts.result;
      const totalCount = responseData.posts.metadata.totalCount;
			console.log('posts',posts)
      return { posts, totalCount };
		} catch (ex) {
			console.log(ex)
		}
	},

	// fetchFreshPosts(limit = 3) {
	//   try {
	//     return fetch(
	//       `http://localhost:3003/api/posts/list/?_perPage=${limit}&_sort=id&_order=desc`
	//     )
	//       .then((response) => response.json())
	//       .then((posts) => posts.posts.data);
	//   } catch (ex) {
	//     console.log(ex);
	//   }
	// },

	fetchByAuthor(author, privatePosts) {
		try {
			return fetch(`http://localhost:3005/api/posts/byAuthor/?_privatePosts=${privatePosts}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ author }),
			})
				.then(response => response.json())
				.then(posts => posts)
		} catch (ex) {
			console.log(ex)
		}
	},

	fetchbyId(id) {
		try {
			if (!id) {
				throw new Error('ID is broken')
			}
			return fetch(`http://localhost:3005/api/posts/list/${id}`)
				.then(response => response.json())
				.then(post => post)
		} catch (ex) {
			console.log(ex)
		}
	},

	fetchNewPost(title, body, date, author, authorId, isPrivate) {
		try {
			fetch('http://localhost:3005/api/posts/add', {
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
		} catch (ex) {
			console.log(ex)
		}
	},

	fetchDeletePost(id) {
		try {
			if (!id) {
				throw new Error('ID is broken')
			}
			fetch(`http://localhost:3005/api/posts/delete`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
				}),
			})
		} catch (ex) {
			console.log(ex)
		}
	},

	fetchAddComment(body, id, date, author) {
		try {
			return fetch('http://localhost:3005/api/posts/comment', {
				method: 'POST',
				body: JSON.stringify({
					body,
					id,
					date,
					author,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then(response => response.json())
				.then(post => post)
		} catch (ex) {
			console.log(ex)
		}
	},

	fetchLikePost(id, user) {
		try {
			console.log('id', id)
			return fetch('http://localhost:3005/api/posts/likePost', {
				method: 'POST',
				body: JSON.stringify({
					id,
					user,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then(response => response.json())
				.then(post => post)
		} catch (ex) {
			console.log(ex)
		}
	},
}
