import { BASE_URL_USERS } from '../constants/baseUrl'
import { getAuthHeaders, handleResponse } from '../helpers/apiHelpers'

export const usersAPI = {
	async fetchNewUser(userData) {
		try {
			const response = await fetch(`${BASE_URL_USERS}/add`, {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchLogin(email, password) {
		try {
			const response = await fetch(`${BASE_URL_USERS}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})
			const data = await response.json()
			if (data.token) localStorage.setItem('token', data.token)
			return await data
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchCheckAuth() {
		try {
			const response = await fetch(`${BASE_URL_USERS}/checkAuth`, {
				method: 'GET',
				headers: getAuthHeaders(),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchAddFriend(friend) {
		try {
			const response = await fetch(`${BASE_URL_USERS}/addFriend`, {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify({ friend }),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchRemoveFriend(friend) {
		try {
			const response = await fetch(`${BASE_URL_USERS}/removeFriend`, {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify({ friend }),
			})
			return await handleResponse(response)
		} catch (ex) {
			console.log(ex)
		}
	},

	async fetchUsers(currentPage) {
		try {
			const response = await fetch(
				`${BASE_URL_USERS}/list/?_page=${currentPage}`,
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
}
