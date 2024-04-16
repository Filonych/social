import { postsAPI } from './postsAPI'

describe('Получаем с сервера пост с выбранным id', () => {
	test('получаем пост с id "6616b1882dae08b279b388f3"', async () => {
		const id = '6616b1882dae08b279b388f3'

		const post = await postsAPI.fetchbyId(id)

		expect(post.post._id).toBe(id)
	})
})
