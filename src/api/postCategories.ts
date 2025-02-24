import axios from 'axios';
import api from './endPoint';

const API_URL = `${api.baseApi}/api/post-categories`;

// Fetch all post categories
export const fetchPostCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching post categories:", error);
    throw error;
  }
};


// Create a new post category
export const createPostCategory = async (category: string) => {
  try {
    const response = await axios.post(API_URL, category);
    return response.data;
  } catch (error) {
    console.error("Error creating post category:", error);
    throw error;
  }
};

// Update a post category
export const updatePostCategory = async (categoryId: string, category: string) => {
  try {
    const response = await axios.put(`${API_URL}/${categoryId}`, category);
    return response.data;
  } catch (error) {
    console.error("Error updating post category:", error);
    throw error;
  }

};

// Delete a post category
export const deletePostCategory = async (categoryId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post category:", error);
    throw error;
  }

};

//Get Categories
export async function getCategories() {
  const url = `${api.baseApi}/api/post-categories`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

//Get post by category
export async function getPostsByCategory(categoryName: string) {
  const url = `${api.baseApi}/api/posts/category/${categoryName}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
}