import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../redux/slices/postsSlice'
import * as SC from './styles'

const ITEMS_PER_PAGE = 6

export const Pagination = ({ currentPage, setCurrentPage }) => {
	// добавила состояние pagination из-за useEffect
	// const [pagination, setPagination] = useState([]);
	const { user } = useSelector(state => state.user)

	const dispatch = useDispatch()

	const { totalCount } = useSelector(state => state.posts.posts)
	const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

	// по-моему, итерация в useEffect срабатывает так же часто, как и без него
	// ниже оба варианта для сравнения

	const pagination = []
	for (let i = 1; i <= totalPages; i++) {
		pagination.push(i)
	}
	// console.log("check pagination")

	// useEffect(() => {
	//   const pagination = [];
	//   for (let i = 1; i <= totalPages; i++) {
	//     pagination.push(i);
	//   }

	//   // console.log("check pagination")

	//   setPagination(pagination);
	// }, [totalPages]);

	const changeCurrentPage = page => {
		const currentPage = page
		setCurrentPage(page)
		// dispatch(changeFilter({ currentPage }));
		dispatch(getPosts({ user: user?._id, currentPage }))
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
