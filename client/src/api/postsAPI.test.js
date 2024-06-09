import { postsAPI } from './postsAPI'

describe('Получаем с сервера пост с выбранным id', () => {
	test('получаем пост с id "66521d0858b745273a981471"', async () => {
		const id = '66521d0858b745273a981471'

		const post = await postsAPI.fetchbyId(id)

		expect(post.post._id).toBe(id)
	})
})
