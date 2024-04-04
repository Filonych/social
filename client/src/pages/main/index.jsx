import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import { Post } from '../../components/ui/Post'
import { PostsWrap } from '../../components/ui/Post/components/PostsWrap'
import { getPosts } from '../../redux/slices/postsSlice'

// const posts = [
// 	{
// 		_id: '660ad80abf8311e9425af2b1',
// 		title: 'The best animated movies of all time',
// 		body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem in pharetra dapibus, quam enim rhoncus nunc, vel gravida sem velit eu sem. Cras vel ex sit amet odio fermentum finibus. Ut aliquet augue',
// 		author: 'kate27',
// 		date: '2023-05-18',
// 		likes: 0,
// 		visibility: 'public',
// 	},
// 	{
// 		_id: '660ad80abf8311e9425af2b2',
// 		title: 'Recent movies worth watching',
// 		body: 'Nulla eu convallis risus. Duis tincidunt convallis mauris, ut ultrices metus commodo eget. Curabitur vitae ante nec libero dictum interdum. Nulla eu mauris ultricies, molestie elit a, lobortis turpis. Vivamus fermentum odio a est scelerisque tincidunt. Nam sed aliquam eros. Sed nec nunc bibendum, consectetur lacus sed, ullamcorper nibh. In commodo malesuada nulla, eget finibus risus semper sit amet.',
// 		author: 'kate27',
// 		date: '2023-06-30',
// 		likes: 0,
// 		visibility: 'private',
// 	},
// 	{
// 		_id: '660ad80abf8311e9425af2b3',
// 		title: 'Classic movies you must see',
// 		body: 'Vestibulum ultricies mi vel hendrerit aliquam. Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. In at massa vitae risus gravida sodales nec in tortor. Integer vel convallis elit, quis aliquet urna.',
// 		author: 'mike34',
// 		date: '2023-04-25',
// 		likes: 0,
// 		visibility: 'public',
// 	},
// 	{
// 		_id: '660ad80abf8311e9425af2b4',
// 		title: 'Review of the latest Hollywood blockbusters',
// 		body: 'Cras at consectetur velit. Maecenas lobortis hendrerit felis, ut mattis purus. Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus. Nam auctor vel velit at venenatis.',
// 		author: 'mike34',
// 		date: '2023-07-10',
// 		likes: 0,
// 		visibility: 'private',
// 	},
// 	{
// 		_id: '660ad80abf8311e9425af2b5',
// 		title: 'Review of the latest movie',
// 		body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem in pharetra dapibus, quam enim rhoncus nunc, vel gravida sem velit eu sem. Cras vel ex sit amet odio fermentum finibus. Ut aliquet augue',
// 		author: 'john doe',
// 		date: '2023-05-10',
// 		likes: 0,
// 		visibility: 'public',
// 	},
// 	{
// 		_id: '660ad80abf8311e9425af2b6',
// 		title: 'Top 10 animated movies',
// 		body: 'Nulla eu convallis risus. Duis tincidunt convallis mauris, ut ultrices metus commodo eget. Curabitur vitae ante nec libero dictum interdum. Nulla eu mauris ultricies, molestie elit a, lobortis turpis. Vivamus fermentum odio a est scelerisque tincidunt. Nam sed aliquam eros. Sed nec nunc bibendum, consectetur lacus sed, ullamcorper nibh. In commodo malesuada nulla, eget finibus risus semper sit amet.',
// 		author: 'john doe',
// 		date: '2023-06-15',
// 		likes: 0,
// 		visibility: 'private',
// 	},
// 	{
// 		_id: '660ad80abf8311e9425af2b7',
// 		title: 'New releases in cinema',
// 		body: 'Vestibulum ultricies mi vel hendrerit aliquam. Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. In at massa vitae risus gravida sodales nec in tortor. Integer vel convallis elit, quis aliquet urna.',
// 		author: 'john_doe',
// 		date: '2023-04-20',
// 		likes: 0,
// 		visibility: 'public',
// 	},
// 	{
// 		_id: '660ad80abf8311e9425af2b8',
// 		title: 'Review of popular TV series',
// 		body: 'Cras at consectetur velit. Maecenas lobortis hendrerit felis, ut mattis purus. Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus. Nam auctor vel velit at venenatis.',
// 		author: 'john_doe',
// 		date: '2023-07-05',
// 		likes: 0,
// 		visibility: 'private',
// 	},
// ]

// const updatedPosts = posts.map(post => ({
// 	...post,
// 	comments: [
// 		{
// 			'author': 'michaelscott165',
// 			'date': this.date,
// 			body: 'Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.',
// 		},
// 		{
// 			author: 'gwenthequeen09',
// 			date: post.date,
// 			body: 'Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. ',
// 		},
// 		{
// 			author: 'lisa_smith',
// 			date: post.date,
// 			body: 'Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.',
// 		},
// 	],
// }))


// const check2 = 
// [{
// 	"_id": "660ad80abf8311e9425af2b1",
// 	"title": "The best animated movies of all time",
// 	"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem in pharetra dapibus, quam enim rhoncus nunc, vel gravida sem velit eu sem. Cras vel ex sit amet odio fermentum finibus. Ut aliquet augue",
// 	"author": "kate27",
// 	"date": "2023-05-18",
// 	"likes": 0,
// 	"visibility": "public",
// "comments": [
// {
// 	"author": "michaelscott165",
// 	"date": "2023-05-18",
// 	"body": "Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// },
// {
// 	"author": "gwenthequeen09",
// 	"date": "2023-05-18",
// 	"body": "Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. ",
// },
// {
// 	"author": "lisa_smith",
// 	"date": "2023-05-18",
// 	"body": "Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// }]
// },
// {
// 	"_id": "660ad80abf8311e9425af2b2",
// 	"title": "Recent movies worth watching",
// 	"body": "Nulla eu convallis risus. Duis tincidunt convallis mauris, ut ultrices metus commodo eget. Curabitur vitae ante nec libero dictum interdum. Nulla eu mauris ultricies, molestie elit a, lobortis turpis. Vivamus fermentum odio a est scelerisque tincidunt. Nam sed aliquam eros. Sed nec nunc bibendum, consectetur lacus sed, ullamcorper nibh. In commodo malesuada nulla, eget finibus risus semper sit amet.",
// 	"author": "kate27",
// 	"date": "2023-06-30",
// 	"likes": 0,
// 	"visibility": "private",
// "comments": [
// {
// 	"author": "michaelscott165",
// 	"date": "2023-05-18",
// 	"body": "Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// },
// {
// 	"author": "gwenthequeen09",
// 	"date": "2023-05-18",
// 	"body": "Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. ",
// },
// {
// 	"author": "lisa_smith",
// 	"date": "2023-05-18",
// 	"body": "Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// }]
// },
// {
// 	"_id": "660ad80abf8311e9425af2b3",
// 	"title": "Classic movies you must see",
// 	"body": "Vestibulum ultricies mi vel hendrerit aliquam. Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. In at massa vitae risus gravida sodales nec in tortor. Integer vel convallis elit, quis aliquet urna.",
// 	"author": "mike34",
// 	"date": "2023-04-25",
// 	"likes": 0,
// 	"visibility": "public",
// "comments": [
// {
// 	"author": "michaelscott165",
// 	"date": "2023-05-18",
// 	"body": "Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// },
// {
// 	"author": "gwenthequeen09",
// 	"date": "2023-05-18",
// 	"body": "Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. ",
// },
// {
// 	"author": "lisa_smith",
// 	"date": "2023-05-18",
// 	"body": "Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// }]
// },
// {
// 	"_id": "660ad80abf8311e9425af2b4",
// 	"title": "Review of the latest Hollywood blockbusters",
// 	"body": "Cras at consectetur velit. Maecenas lobortis hendrerit felis, ut mattis purus. Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus. Nam auctor vel velit at venenatis.",
// 	"author": "mike34",
// 	"date": "2023-07-10",
// 	"likes": 0,
// 	"visibility": "private",
// "comments": [
// {
// 	"author": "michaelscott165",
// 	"date": "2023-05-18",
// 	"body": "Curabitur at nisl lectus. Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// },
// {
// 	"author": "gwenthequeen09",
// 	"date": "2023-05-18",
// 	"body": "Sed finibus euismod risus, et faucibus est hendrerit a. Donec eget venenatis nisi. ",
// },
// {
// 	"author": "lisa_smith",
// 	"date": "2023-05-18",
// 	"body": "Vivamus ultricies sed sapien vel vehicula. Sed vel pulvinar nisi. Aenean eget dui felis. Vivamus ac tortor vitae magna vulputate faucibus.",
// }]
// }]

// console.log('updatedPosts', updatedPosts)

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
						<Post
							key={post._id}
							author={post.author}
							date={post.date}
							title={post.title}
							body={post.body}
							postLink={`/posts/${post._id}`}
							authorLink={`/users/${post.author}`}
						>
							<div>{post.title}</div>
							<div>{post.body}</div>
						</Post>
					))}
			</PostsWrap>
		</Container>
	)
}
