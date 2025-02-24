import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Body {
  content: string;
  author: string;
}

interface User {
  _id: string;
  avatar: string;
  name: string;
  verified: boolean;
}

interface Category {
  _id: string;
  title: string;
}

interface Post {
  id: string;
  title: string;
  caption: string;
  slug: string;
  body: Body;
  user: User;
  tags: string[];
  categories: Category[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  photo: string;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setAllPosts, addPost, updatePost, deletePost } = postSlice.actions;

export const postReducer = postSlice.reducer;
