import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/slices/postsSlice'
import { Container } from '../../components/ui/Container'
import { Post } from '../../components/ui/Post'
import { PostsWrap } from '../../components/ui/Post/components/PostsWrap'

export const MainPage = () => {
	const { list, loading } = useSelector(state => state.posts.posts)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPosts())
	}, [])

	return (
		<Container>
			{loading && <>...Loading</>}
			<PostsWrap>
				{list &&
					list.map(post => (
						<Post key={post._id} author={post.author} date={post.date} title={post.title} body={post.body} link={`/posts/${post._id}`}>
							<div>{post.title}</div>
							<div>{post.body}</div>
						</Post>
					))}
			</PostsWrap>
		</Container>
	)
}
