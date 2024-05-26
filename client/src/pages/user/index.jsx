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

	const username = user?.username

	const authorIsAuthUser = username === author
	const isAddedToFriends = user?.friends.includes(author)
	const userIsAdmin = user?.isAdmin === true

	const onAddFriend = () => {
		dispatch(addFriend({ username, author }))
	}

	const onRemoveFriend = () => {
		dispatch(RemoveFriend({ username, author }))
	}

	useEffect(() => {
		// закомментенный ниже код не работает, т.к. если мы заходим на страницу пользователя не залогинившись, то посты вообще не грузятся
		// if (!user) {
		// 	return
		// }
		if (isAddedToFriends || authorIsAuthUser || userIsAdmin) {
			dispatch(getPostsByAuthor({ author }))
		} else if (!isAddedToFriends && !authorIsAuthUser) {
			dispatch(getPostsByAuthor({ author, privatePosts: false }))
		}
		// из зависимостей убрала author, а user оставила, т.к. если убрать user, то
		// этот useEffect не будет срабатывать после проверки токена в Root
	}, [user])

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
