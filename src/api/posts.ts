import axios from 'axios';
import api from './endPoint';

const API_URL = `${api.baseApi}/api/posts`;

type UserToken = string;

interface Post {
  title: string;
  caption: string;
  content: string;
  // _id: string;
  _id?: string;
  category: string;
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

interface PostBody {
  content: string;
  author: string;
}

interface EditPost {
  _id: string;
  title: string;
  caption: string;
  slug: string;
  body: PostBody;
  user: User;
  tags: string[];
  categories: Category[];
  isFeatured: boolean;
  // createdAt: string;
  // updatedAt: string;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  photo: string;
  id: string;
}

interface EditPostResponse {
  _id: string;
  title: string;
  caption: string;
  slug: string;
  body: PostBody;
  user: User;
  tags: string[];
  categories: Category[];
  isFeatured: boolean;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  photo: string;
  id: string;
}

interface Category {
  title: string;
}

//Get all posts
export async function fetchPosts() {
  try {
    const response = await axios.get(API_URL);
    if (response.data.responseStatus === 'success') {
      return response.data;
    }
  } catch (error) {
    console.log("Errror", error);
  }
}

//Get featured posts
export const featuredPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/featured`)
    return response.data;
  } catch (error) {
    console.log('Error', error)
  }

}


//Create a new post
export async function createPost(post: Post, userToken: UserToken): Promise<Post | undefined> {
  try {
    const response = await axios.post(
      API_URL,
      {
        title: post.title,
        caption: post.caption,
        body: {
          content: post.content,
        },
        user: post._id,
        categories: [post.category],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data as Post;
    }
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}


//Update post
export const updatePost = async (postId: string, post: Post): Promise<{ data: Post } | undefined> => {
  try {
    const response = await axios.put(`${API_URL}/${postId}`, post);
    return response.data;
  } catch (error) {
    console.log('Error in updating post', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${postId}`);
    return response.data;
  } catch (error) {
    console.log('Error in deleting post', error)
  }

};

//Get Single post
export async function getSinglePost(slug: string | null) {
  const url = `${api.baseApi}/api/posts/${slug}`;
  try {
    const response = await axios.get(url, {
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

//Get recent post
export async function getRecentPosts() {
  const url = `${api.baseApi}/api/posts/recentposts`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error)
  }
}

//Get recommended posts
export async function recommendedPostsApi(category: Category) {
  const url = `${api.baseApi}/api/posts/recommended?category=${category.title}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

//Search posts
export async function searchApi(searchTerm: string) {
  const url = `${api.baseApi}/api/posts/search?searchKeyword=${searchTerm}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

//Edit a post
export async function editPost(post: EditPost, slug: string, userToken: string): Promise<EditPostResponse | undefined> {
  const url = `${api.baseApi}/api/posts/${slug}`;
  try {
    const response = await axios.put(
      url,
      {
        title: post.title,
        caption: post.caption,
        body: {
          content: post.body.content,
          author: post.user.name,
        },
        photo: post.photo,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
    return undefined;
  }
}