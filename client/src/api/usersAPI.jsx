export const usersAPI = {
	fetchNewUser(username, email, password) {
		try {
			fetch('http://localhost:3005/api/users/add', {
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
		} catch (ex) {
			console.log(ex)
		}
	},

	
}
