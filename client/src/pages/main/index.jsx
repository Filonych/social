import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../../components/Pagination'
import { Posts } from '../../components/Posts'
import { Post } from '../../components/Posts/components/Post'
import { Container } from '../../components/ui/Container'
import { Loader } from '../../components/ui/Loader'
import { MainTitle } from '../../components/ui/MainTitle'
import { getPosts } from '../../redux/slices/postsSlice'

export const MainPage = () => {
	const dispatch = useDispatch()

	const { list, loading } = useSelector(state => state.posts.posts)
	const { user } = useSelector(state => state.user)

	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		dispatch(getPosts({ user: user?._id, currentPage }))
	}, [user])

	return (
		<Container>
			<MainTitle first='Recent' second='posts' />
			{loading && <Loader />}
			<Posts>
				{list && list.map(post => <Post key={post._id} post={post}/>)}
			</Posts>
			{list && (
				<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
			)}
		</Container>
	)
}
