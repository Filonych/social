import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/slices/postsSlice'

export const MainPage = () => {
	const { list, loading } = useSelector(state => state.posts.posts)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPosts())
	}, [])

	return (
		<div>
			{loading && <>...Loading</>}
			{list &&
				list.map(post => (
					<div key={post._id}>
						<div>{post.title}</div>
						<div>{post.body}</div>
						<div>{post.author}</div>
					</div>
				))}
		</div>
	)
}
