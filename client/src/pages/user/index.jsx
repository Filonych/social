import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../components/ui/Container'
import { Typo } from '../../components/ui/Typo'
import { Post } from '../../components/ui/Post'
import { Button } from '../../components/ui/Button'
import { PostsWrap } from '../../components/ui/Post/components/PostsWrap'
import * as SC from './styles'
import { useParams } from 'react-router-dom'
import { getPostsByAuthor } from '../../redux/slices/postsSlice'
import { RemoveFriend, addFriend } from '../../redux/slices/usersSlice'

export const UserPage = () => {
	const { user } = useSelector(state => state.user)
	const { list, loading } = useSelector(state => state.posts.postsByAuthor)
	const { author } = useParams()
	const dispatch = useDispatch()

	const isAuthUser = user?.username === author
	const isAddedToFriends = user?.friends.includes(author)

	const username = user?.username

	console.log('user', user)

	const onAddFriend = () => {
		dispatch(addFriend({ username, author }))
	}

	const onRemoveFriend = () => {
		dispatch(RemoveFriend({ username, author }))
	}
	

	useEffect(() => {
		dispatch(getPostsByAuthor(author))
	}, [])

	return (
		<Container>
			<SC.Avatar />
			{author && <div>{author}</div>}
			{user && !isAuthUser && !isAddedToFriends && (
				<Button onClick={onAddFriend} className='white'>
					Add Friend
				</Button>
			)}
			{user && !isAuthUser && isAddedToFriends && <Button onClick={onRemoveFriend}>Remove Friend</Button>}
			<Typo>Posts</Typo>
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
