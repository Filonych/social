import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../../components/Pagination'
import { Container } from '../../components/ui/Container'
import { Loader } from '../../components/ui/Loader'
import { MainTitle } from '../../components/ui/MainTitle'
import * as SC from './styles'
import { getUsers } from '../../redux/actions/usersActions'
import { selectUsers } from '../../redux/selectors/usersSelectors'
import { User } from './components/User'

export const Users = () => {
	const dispatch = useDispatch()

	const { list, loading, totalCount } = useSelector(selectUsers)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		dispatch(getUsers({ currentPage }))
	}, [currentPage])

	return (
		<Container>
			<MainTitle first='All' second='users' />
			{loading && <Loader />}
			<SC.Wrap>
				{list &&
					list.map(user => (
						<User key={user._id} user={user}/>
					))}
			</SC.Wrap>
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
