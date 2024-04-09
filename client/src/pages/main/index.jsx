import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import { Loader } from '../../components/ui/Loader'
import { MainTitle } from '../../components/ui/MainTitle'
import { Post } from '../../components/ui/Post'
import { PostsWrap } from '../../components/ui/Post/components/PostsWrap'
import { getPosts } from '../../redux/slices/postsSlice'

export const MainPage = () => {
	const { list, loading } = useSelector(state => state.posts.posts)
	const { user } = useSelector(state => state.user)

	console.log('user', user)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!user) {
			dispatch(getPosts())
		}
		if (user) {
			dispatch(getPosts(user._id))
		}
	}, [user])

	return (
		<Container>
			<MainTitle first='Recent' second='posts' />
			{loading && <Loader />}
			<PostsWrap>
				{list &&
					list.map(post => (
						<Post
							key={post._id}
							author={post.author}
							date={post.date}
							title={post.title}
							body={post.body}
							postLink={`/posts/${post._id}`}
							authorLink={`/users/${post.author}`}
							isPrivate={post.isPrivate}
						></Post>
					))}
			</PostsWrap>
		</Container>
	)
}
