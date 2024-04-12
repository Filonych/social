import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Posts } from '../../components/Posts'
import { Post } from '../../components/Posts/components/Post'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Loader } from '../../components/ui/Loader'
import { Typo } from '../../components/ui/Typo'
import { getPostsByAuthor } from '../../redux/slices/postsSlice'
import { RemoveFriend, addFriend } from '../../redux/slices/usersSlice'
import * as SC from './styles'

export const UserPage = () => {
	const dispatch = useDispatch()

	const { user } = useSelector(state => state.user)
	const { list, loading } = useSelector(state => state.posts.postsByAuthor)
	const { author } = useParams()

	const authorIsAuthUser = user?.username === author
	const isAddedToFriends = user?.friends.includes(author)

	const username = user?.username

	const onAddFriend = () => {
		dispatch(addFriend({ username, author }))
	}

	const onRemoveFriend = () => {
		dispatch(RemoveFriend({ username, author }))
	}

	useEffect(() => {
		if (isAddedToFriends || user?.username === author) {
			dispatch(getPostsByAuthor({ author }))
		}
		if (!isAddedToFriends && user?.username !== author) {
			dispatch(getPostsByAuthor({ author, privatePosts: false }))
		}
	}, [author, user])

	return (
		<Container>
			<SC.Avatar />
			<SC.User>{author}</SC.User>
			{user && !authorIsAuthUser && !isAddedToFriends && (
				<Button onClick={onAddFriend} className='white'>
					Add Friend
				</Button>
			)}
			{user && !authorIsAuthUser && isAddedToFriends && (
				<Button onClick={onRemoveFriend}>Remove Friend</Button>
			)}
			{list?.length > 0 && <Typo>Posts</Typo>}
			{loading && <Loader />}
			<Posts>
				{list && list.map(post => <Post key={post._id} post={post}></Post>)}
			</Posts>
		</Container>
	)
}
