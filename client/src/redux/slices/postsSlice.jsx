import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postsAPI } from "../../api/postsAPI";

export const getPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (user) => {
    return await postsAPI.fetchPosts(user);
  }
);

// export const getFreshPosts = createAsyncThunk(
//   "posts/fetchFreshPosts",
//   async (limit) => {
//     return await postsAPI.fetchFreshPosts(limit);
//   }
// );

export const getPostById = createAsyncThunk(
  "posts/fetchbyId",
  async (id) => {
    return await postsAPI.fetchbyId(id);
  }
);

export const getPostsByAuthor = createAsyncThunk(
  "posts/fetchByAuthor",
  async ({author, privatePosts}) => {
    return await postsAPI.fetchByAuthor(author, privatePosts);
  }
);

export const addPost = createAsyncThunk(
  "posts/fetchNewPost",
  async ({ title, body, date, author, authorId, isPrivate }) => {
    return await postsAPI.fetchNewPost(title, body, date, author, authorId, isPrivate);
  }
);

export const deletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async ({ id }) => {    
    return await postsAPI.fetchDeletePost(id);
  }
);

export const addComment = createAsyncThunk(
  "posts/fetchAddComment",
  async ({ body, id, date, author }) => {
    return await postsAPI.fetchAddComment(body, id, date, author);
  }
);

export const likePost = createAsyncThunk(
  "posts/fetchLikePost",
  async ({ id, user }) => {
    return await postsAPI.fetchLikePost(id, user);
  }
);

const initialState = {
  posts: {
    list: null,
    loading: false,
  },
  postForView: {
    post: null,
    loading: false,
  },
  postsByAuthor: {
    list: null,
    loading: false,
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  // reducers: {
  //   showPost: (state, action) => {
  //     state.postForView = {
  //       post: action.payload,
  //       loading: false,
  //     };
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.posts = {
          list: null,
          loading: true,
        };
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = {
          list: action.payload.posts,
          loading: false,
        };
      })

      .addCase(getPostsByAuthor.pending, (state) => {
        state.postsByAuthor = {
          list: null,
          loading: true,
        };
      })
      .addCase(getPostsByAuthor.fulfilled, (state, action) => {
        state.postsByAuthor = {
          list: action.payload.posts,
          loading: false,
        };
      })
      // .addCase(getFreshPosts.pending, (state) => {
      //   state.freshPosts = {
      //     freshPosts: null,
      //     loading: true,
      //   };
      // })
      // .addCase(getFreshPosts.fulfilled, (state, action) => {
      //   state.freshPosts = {
      //     freshPosts: action.payload,
      //     loading: false,
      //   };
      // })
      .addCase(getPostById.pending, (state) => {
        state.postForView = {
          post: null,
          loading: true,
        };
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.postForView = {
          post: action.payload.post,
          loading: false,
        };
      })

      .addCase(addComment.pending, (state) => {
        state.postForView = {
          post: null,
          loading: true,
        };
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.postForView = {
          post: action.payload.post,
          loading: false,
        };
        console.log('postForView', state.postForView)
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.postForView = {
          post: action.payload.post,
          loading: false,
        };
        console.log('postForView', state.postForView)
      })
  },
});

export const { showPost } = postsSlice.actions;

export default postsSlice.reducer;


