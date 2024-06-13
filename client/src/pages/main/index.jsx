import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../../components/Pagination'
import { Posts } from '../../components/Posts'
import { Post } from '../../components/Posts/components/Post'
import { Container } from '../../components/ui/Container'
import { Loader } from '../../components/ui/Loader'
import { MainTitle } from '../../components/ui/MainTitle'
import { getPosts } from '../../redux/actions/postsActions'
import { selectPosts } from '../../redux/selectors/postSelectors'

export const MainPage = () => {
	const dispatch = useDispatch()

	const { list, loading, totalCount } = useSelector(selectPosts)

	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		dispatch(getPosts(currentPage))
	}, [currentPage])

	return (
		<Container>
			<MainTitle first='Recent' second='posts' />
			{loading && <Loader />}
			<Posts>
				{list && list.map(post => <Post key={post._id} post={post} />)}
			</Posts>
			{list && (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalCount={totalCount}
					itemsPerPage={6}
				/>
			)}
		</Container>
	)
}
