import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Post } from '../../components/ui/Post'
import { PostsWrap } from '../../components/ui/Post/components/PostsWrap'
import { Typo } from '../../components/ui/Typo'
import { getPostsByAuthor } from '../../redux/slices/postsSlice'
import { RemoveFriend, addFriend } from '../../redux/slices/usersSlice'
import * as SC from './styles'
import { Loader } from '../../components/ui/Loader'

export const UserPage = () => {
	const { user } = useSelector(state => state.user)
	const { list, loading } = useSelector(state => state.posts.postsByAuthor)
	const { author } = useParams()

	const dispatch = useDispatch()

	const isAuthUser = user?.username === author
	const isAddedToFriends = user?.friends.includes(author)
	const noPosts = !!list?.length

	const username = user?.username

	const onAddFriend = () => {
		dispatch(addFriend({ username, author }))
	}

	const onRemoveFriend = () => {
		dispatch(RemoveFriend({ username, author }))
	}

	useEffect(() => {
		if (isAddedToFriends || user?.username === author) {
			dispatch(getPostsByAuthor({author}))
		}
		if (!isAddedToFriends && user?.username !== author) {
			dispatch(getPostsByAuthor({author, privatePosts: false}))
		}

	}, [author, user])

	return (
		<Container>
			<SC.Avatar />
			{author && <SC.User>{author}</SC.User>}
			{user && !isAuthUser && !isAddedToFriends && (
				<Button onClick={onAddFriend} className='white'>
					Add Friend
				</Button>
			)}
			{user && !isAuthUser && isAddedToFriends && (
				<Button onClick={onRemoveFriend}>Remove Friend</Button>
			)}
			{noPosts && <Typo>Posts</Typo>}
			{loading && <Loader/>}
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
						>
						</Post>
					))}
			</PostsWrap>
		</Container>
	)
}
