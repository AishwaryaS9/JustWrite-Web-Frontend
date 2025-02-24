import axios from 'axios';
import api from './endPoint';


export async function getCommentsByPost(slug: string, userToken: string) {
  const url = `${api.baseApi}/api/comments/post/${slug}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
  return [];
}

export async function createComment(comment: string, slug: string, userToken: string) {
  const url = `${api.baseApi}/api/comments`;
  try {
    const response = await axios.post(url, {
      "desc": comment,
      "slug": slug
    }, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error", error);
  }
}


export async function updatePostComment(commentId: string, updatedComment: string, userToken: string) {
  const url = `${api.baseApi}/api/comments/${commentId}`;
  if (!userToken) {
    console.log("User is not authenticated.");
    return;
  }

  try {
    const response = await axios.put(
      url,
      { desc: updatedComment },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {

      return response.data;
    } else {
      console.log("Failed to update comment, status:", response.status);
    }
  } catch (error) {
    console.log("Error updating comment:", error);
  }
}

export async function deletePostComment(commentId: string, userToken: string) {
  const url = `${api.baseApi}/api/comments/${commentId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log("Error deleting comment", error);
  }
}