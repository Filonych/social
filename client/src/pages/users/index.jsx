import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../../components/Pagination'
import { Container } from '../../components/ui/Container'
import { Link } from '../../components/ui/Link'
import { Loader } from '../../components/ui/Loader'
import { MainTitle } from '../../components/ui/MainTitle'
import { getUsers } from '../../redux/slices/usersSlice'

export const Users = () => {
	const dispatch = useDispatch()

	const { list, loading, totalCount } = useSelector(state => state.user.users)
	console.log('state.user.users', list, loading, totalCount)

	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		dispatch(getUsers({ currentPage }))
	}, [currentPage])
	return (
		<Container>
			<MainTitle first='All' second='users' />
			{loading && <Loader />}
			<div>
				{list &&
					list?.map((user, index) => (
						<div key={user?._id}>
							<Link to={`/users/${user?.username}`}>
								{(currentPage - 1) * 10 + index + 1}
								{user?.username}
							</Link>
						</div>
					))}
			</div>
			{list && (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalCount={totalCount}
					itemsPerPage={10}
				/>
			)}
		</Container>
	)
}
