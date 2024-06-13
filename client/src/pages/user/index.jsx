import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Posts } from '../../components/Posts'
import { Post } from '../../components/Posts/components/Post'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { Loader } from '../../components/ui/Loader'
import { Typo } from '../../components/ui/Typo'
import { getAuthorPosts } from '../../redux/actions/postsActions'
import { addFriend, removeFriend } from '../../redux/actions/usersActions'
import { selectAuthorPosts } from '../../redux/selectors/postSelectors'
import * as SC from './styles'
import { selectUser } from '../../redux/selectors/usersSelectors'

export const UserPage = () => {
	const dispatch = useDispatch()

	const user = useSelector(selectUser)
	const { list, loading } = useSelector(selectAuthorPosts)
	const { author } = useParams()

	const username = user?.username
	const isAuthor = username === author
	const isAuthUser = user?.roles.includes('USER')
	const areFriends = user?.friends.includes(author)

	const onAddFriend = () => {
		dispatch(addFriend(author))
	}

	const onRemoveFriend = () => {
		dispatch(removeFriend(author))
	}

	useEffect(() => {
		dispatch(getAuthorPosts(author))
	}, [user])

	return (
		<Container>
			<SC.Avatar />
			<SC.User>{author}</SC.User>
			{!isAuthor && isAuthUser && !areFriends && (
				<Button onClick={onAddFriend} className='white'>
					Add Friend
				</Button>
			)}
			{!isAuthor && isAuthUser && areFriends && (
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
