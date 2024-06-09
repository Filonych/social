import * as SC from './styles'

export const Pagination = ({
	currentPage,
	setCurrentPage,
	totalCount,
	itemsPerPage,
}) => {
	const totalPages = Math.ceil(totalCount / itemsPerPage)
	const pagination = []
	for (let i = 1; i <= totalPages; i++) {
		pagination.push(i)
	}

	const changeCurrentPage = page => {
		setCurrentPage(page)
		console.log('page',page)
	}

	return (
		<SC.Wrap>
			{pagination.map(page => (
				<SC.Page
					key={page}
					onClick={() => changeCurrentPage(page)}
					className={currentPage === page ? 'active' : undefined}
				>
					{page}
				</SC.Page>
			))}
		</SC.Wrap>
	)
}
