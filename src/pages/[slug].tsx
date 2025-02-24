import { getSinglePost, recommendedPostsApi } from '@/api/posts';
import { getUserProfile } from '../api/userApi';
import { createComment, deletePostComment, getCommentsByPost, updatePostComment } from '../api/comments';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { RingLoader } from 'react-spinners';
import RecommendedPostCard from '../components/RecommendedPostCard';
import EditModal from '@/components/EditModal'
import { useAppSelector } from '@/redux/hooks';
import PageTitle from '@/components/pageTitle';
import { RootState } from '@/redux/store';
import { SinglePost, Category, RecommendedPost, Comment, ProfileDetails } from '@/types/interfaces';

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  const [post, setPost] = useState<SinglePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userProfile, setUserProfile] = useState<ProfileDetails | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');
  const [recommendedPosts, setRecommendedPosts] = useState<RecommendedPost[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SinglePost | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost();
      fetchComments();
    }
  }, [slug]);

  const userToken = useAppSelector((state: RootState) => state.user.token) || '';

  const openModal = (post: SinglePost): void => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
    loadPost();
    fetchComments();
  };

  const loadPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPost = await getSinglePost(slug);
      setPost(fetchedPost);
      if (fetchedPost && fetchedPost.categories && fetchedPost.categories.length > 0) {
        handleRecommendedPosts(fetchedPost.categories[0]);
      }
    } catch (error) {
      console.log('Error', JSON.stringify(error))
      setError('Failed to load post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendedPosts = async (category: Category) => {
    try {
      const recommendedPostResponse = await recommendedPostsApi(category);
      if (recommendedPostResponse) {
        setRecommendedPosts(recommendedPostResponse);
      } else {
        console.log("Failed to load recommended posts", error);
      }
    } catch (error) {
      console.log("Failed loading recommended posts", error);
    }
  };

  const fetchComments = async () => {
    try {
      if (slug) {
        const response = await getCommentsByPost(slug, userToken);
        setComments(response || []);
      }

    } catch (error) {
      console.log("Error fetching comments", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const data = await getUserProfile(userToken);
     
      setUserProfile(data);
    } catch (error) {
      console.log('Error fetching user details', error);
    }
  };


  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    if (!userToken) {
      toast.warn("Please login to add a comment.");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      const addComment = await createComment(newComment, slug, userToken);
      if (addComment) {
        setComments([...comments, addComment]);
        toast.success("Comment added successfully!");
        setNewComment("");
        fetchComments();
      } else {
        toast.error("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment", error);
      toast.error("An error occurred while adding the comment.");
    }
  };


  const handleEditComment = async (commentId: string) => {
    if (editingCommentId === commentId) {
      try {
        const response = await updatePostComment(commentId, editedComment, userToken);
        if (response) {
          setComments(
            comments.map(comment =>
              comment.id === commentId ? { ...comment, desc: editedComment } : comment
            )
          );
          toast.success('Comment updated successfully!');
          setEditingCommentId(null);
          setEditedComment('');
        } else {
          toast.error('Failed to edit comment. Please try again');
        }
      } catch (error) {
        console.log("Error updating comment", error);
      }
    } else {
      setEditingCommentId(commentId);
      const comment = comments.find(c => c.id === commentId);
      setEditedComment(comment?.desc || '');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await deletePostComment(commentId, userToken);
      if (response) {

        fetchComments();
        toast.success('Comment deleted successfully!');
      } else {
        toast.error('Failed to delete comment. Please try again.');
      }
    } catch (error) {
      console.log("Error deleting comment", error);
      toast.error('Error deleting comment.');
    }

  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RingLoader color="#4A90E2" size={60} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col min-h-screen">
        <PageTitle />
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {post?.categories?.length ? (
                    post.categories.map((category: Category, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium rounded-full shadow-sm"
                      >
                        {category?.title}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No categories available.</span>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-gray-900">{post?.title}</h1>

                <p className="text-gray-600 line-clamp-2">
                  {post?.caption}
                </p>

                {post?.photo && (
                  <div className="w-full">
                    <img
                      src={post.photo}
                      alt="Post image"
                      className="w-[80%] h-auto object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    By{" "}
                    <span className="font-semibold capitalize">
                      {post?.user?.name || "Unknown Author"}
                    </span>
                    <span className="ml-4">
                      Published on{" "}
                      <span className="font-semibold">
                        {post?.createdAt
                          ? new Date(post.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                          : 'N/A'}
                      </span>
                    </span>
                  </div>
                 
                  {post?.user?._id === userProfile?._id && post && (
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(post)}
                      >
                        <FaEdit color={"#7C4EE4"} className="w-5 h-5 " />
                      </button>
                    </div>
                  )}

                </div>

                <div className="prose lg:prose-lg text-gray-800 leading-8">
                  {typeof post?.body === "object"
                    ? post?.body?.content
                    : post?.body || "No Content"}
                </div>

                <div className="space-y-4">
                  {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <img
                              src={
                                comment?.user?.avatar?.trim()
                                  ? comment.user.avatar
                                  : "https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small_2x/profile-icon-login-head-icon-vector.jpg"
                              }
                              alt={`${comment?.user?.name || "User"}'s avatar`}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <div>
                              <span className="text-sm text-gray-500 capitalize">
                                {comment?.user?.name}
                              </span>
                              <span className="ml-2 text-gray-400">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {comment?.user?._id === userProfile?._id && (
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => handleEditComment(comment.id)}
                              >
                                <FaEdit color={"#7C4EE4"} className="w-4 h-4" />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {editingCommentId === comment.id ? (
                          <div className="mt-2">
                            <textarea
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                              className="w-full border rounded-lg p-2 text-gray-800"
                            />
                            <div className="flex space-x-2 mt-2">
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleEditComment(comment.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-2 text-gray-700">{comment.desc}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments available.</p>
                  )}
                </div>

                <div className="mt-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full border rounded-lg p-2 text-gray-800"
                  ></textarea>
                  <button
                    onClick={handleAddComment}
                    className="mt-2 bg-[#7C4EE4] text-white px-4 py-2 rounded-lg "
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/3 sticky top-16 self-start">
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4 text-center">Recommended Posts</h2>
                  <ul className="space-y-4">
                    {recommendedPosts.map((post: RecommendedPost) => (
                      <RecommendedPostCard
                        key={post.id}
                        title={post.title}
                        caption={post.caption}
                        photo={post.photo}
                        author={post.user.name}
                        slug={post.slug}
                        createdDate={post.createdAt}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {isModalOpen && selectedPost && (
              <EditModal
                isOpen={isModalOpen}
                onClose={closeModal}
                post={selectedPost}
              />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PostPage;

