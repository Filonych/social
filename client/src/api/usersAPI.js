export const usersAPI = {
	async fetchNewUser(username, email, password) {
		try {
			const response = await fetch('http://localhost:3005/api/users/add', {
				method: 'POST',
				body: JSON.stringify({
					username,
					email,
					password,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			const message = await response.json()
			return message
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchLogin(email, password) {
		try {
			const response = await fetch('http://localhost:3005/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})
			const user = await response.json()
			localStorage.setItem('token', user.token)
			return user
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchCheckAuth() {
		const token = localStorage.getItem('token')
		try {
			const response = await fetch(
				'http://localhost:3005/api/users/checkAuth',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const user = await response.json()
			return user
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchGetFriends() {
		const token = localStorage.getItem('token')
		try {
			const response = await fetch(
				'http://localhost:3005/api/users/getFriends',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return await response.json()
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchAddFriend(username, friend) {
		try {
			const response = await fetch(
				'http://localhost:3005/api/users/addFriend',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, friend }),
				}
			)
			const user = await response.json()
			return user
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchRemoveFriend(username, friend) {
		try {
			const response = await fetch(
				'http://localhost:3005/api/users/removeFriend',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, friend }),
				}
			)
			const user = await response.json()
			return user
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchUsers(currentPage) {
		try {
			const token = localStorage.getItem('token')
			const response = await fetch(
				`http://localhost:3005/api/users/list/?_page=${currentPage}`,
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
			const users = responseData.users?.result
			const totalCount = responseData.users?.metadata.totalCount
			return { users, totalCount }
		} catch (ex) {
			console.log(ex)
		}
	},
}
