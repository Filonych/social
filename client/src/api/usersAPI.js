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

	async fetchCheckAuth(token) {
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
}
