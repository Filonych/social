import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../../components/Pagination'
import { Container } from '../../components/ui/Container'
import { Loader } from '../../components/ui/Loader'
import { MainTitle } from '../../components/ui/MainTitle'
import { Post } from '../../components/ui/Post'
import { PostsWrap } from '../../components/ui/Post/components/PostsWrap'
import { getPosts } from '../../redux/slices/postsSlice'

export const MainPage = () => {
	const { list, loading } = useSelector(state => state.posts.posts)
	const { user } = useSelector(state => state.user)

	const [currentPage, setCurrentPage] = useState(1)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!user) {
			dispatch(getPosts({ currentPage }))
		}
		if (user) {
			dispatch(getPosts({ user: user._id, currentPage }))
		}
	}, [user])

	return (
		<Container>
			<MainTitle first='Recent' second='posts' />
			{loading && <Loader />}
			<PostsWrap>
				{list && list.map(post => <Post key={post._id} post={post}></Post>)}
			</PostsWrap>
			{list && (
				<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
			)}
		</Container>
	)
}
