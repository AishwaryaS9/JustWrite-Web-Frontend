import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostCategory {
  id: string;
  title: string;
}

interface PostCategoryState {
  postCategories: PostCategory[];
}

const initialState: PostCategoryState = {
  postCategories: [],
};

const postCategorySlice = createSlice({
  name: 'postCategories',
  initialState,
  reducers: {
    setPostCategories: (state, action: PayloadAction<PostCategory[]>) => {
      state.postCategories = action.payload;
    },
    addPostCategory: (state, action: PayloadAction<PostCategory>) => {
      state.postCategories.push(action.payload);
    },
    updatePostCategory: (state, action: PayloadAction<PostCategory>) => {
      const index = state.postCategories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.postCategories[index] = action.payload;
      }
    },
    deletePostCategory: (state, action: PayloadAction<string>) => {
      state.postCategories = state.postCategories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
});

export const {
  setPostCategories,
  addPostCategory,
  updatePostCategory,
  deletePostCategory,
} = postCategorySlice.actions;

export const postCategoryReducer = postCategorySlice.reducer;
