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

	const { user, friends } = useSelector(state => state.user)
	const { list, loading, isAddedToFriends } = useSelector(
		state => state.posts.postsByAuthor
	)
	const { author } = useParams()

	const username = user?.username
	const authorIsAuthUser = username === author
	const areFriends = isAddedToFriends || friends?.list?.includes(author)

	const onAddFriend = async () => {
		await dispatch(addFriend({ author }))
		dispatch(getPostsByAuthor({ author }))
	}

	const onRemoveFriend = async () => {
		await dispatch(RemoveFriend({ author }))
		dispatch(getPostsByAuthor({ author }))
	}

	useEffect(() => {
		dispatch(getPostsByAuthor({ author }))
	}, [])

	return (
		<Container>
			<SC.Avatar />
			<SC.User>{author}</SC.User>
			{user && !authorIsAuthUser && !areFriends && !user?.isAdmin && (
				<Button onClick={onAddFriend} className='white'>
					Add Friend
				</Button>
			)}
			{user && !authorIsAuthUser && areFriends && !user?.isAdmin && (
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
