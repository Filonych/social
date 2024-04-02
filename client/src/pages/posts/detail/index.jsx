import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostById } from '../../../redux/slices/postsSlice'

export const DetailPostPage = () => {
	const { id } = useParams()
	const { post, loading } = useSelector((state) => state.posts.postForView);
  const dispatch = useDispatch();

	useEffect(() => {
    dispatch(getPostById(id));
  }, []);

	return <div>{post && post.title}</div>
}
