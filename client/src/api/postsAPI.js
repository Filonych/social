export const postsAPI = {
	async fetchPosts() {
		try {
			const response = await fetch(`http://localhost:3005/api/posts/list/`)
			if (!response.ok) {
				throw new Error('Ошибка при получении данных')
			}
			const posts = await response.json()
			return posts
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

	// fetchbyId(id) {
	//   try {
	//     if (!id) {
	//       throw new Error("ID is broken");
	//     }
	//     return fetch(`http://localhost:3003/api/posts/list/${id}`)
	//       .then((response) => response.json())
	//       .then((post) => post);
	//   } catch (ex) {
	//     console.log(ex);
	//   }
	// },

	// fetchNewPost(title, body, id) {
	//   try {
	//     fetch("http://localhost:3003/api/posts/add", {
	//       method: "POST",
	//       body: JSON.stringify({
	//         title,
	//         body,
	//         id,
	//       }),
	//       headers: {
	//         "Content-type": "application/json; charset=UTF-8",
	//       },
	//     });
	//   } catch (ex) {
	//     console.log(ex);
	//   }
	// },

	// fetchDeletePost(id) {
	//   try {
	//     if (!id) {
	//       throw new Error("ID is broken");
	//     }
	//     fetch(`http://localhost:3003/api/posts/delete`, {
	//       method: "DELETE",
	//       headers: {
	//         Accept: "application/json",
	//         "Content-Type": "application/json",
	//       },
	//       body: JSON.stringify({
	//         id,
	//       }),
	//     });
	//   } catch (ex) {
	//     console.log(ex);
	//   }
	// },

	// fetchEditPost(title, body, id) {
	//   try {
	//     fetch("http://localhost:3003/api/posts/edit", {
	//       method: "PUT",
	//       body: JSON.stringify({
	//         title,
	//         body,
	//         id,
	//       }),
	//       headers: {
	//         "Content-type": "application/json; charset=UTF-8",
	//       },
	//     });
	//   } catch (ex) {
	//     console.log(ex);
	//   }
	// },
}
