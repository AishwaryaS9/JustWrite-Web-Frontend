import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { RingLoader } from 'react-spinners';
import { setAllPosts } from '@/redux/slices/postSlice';
import { useAppDispatch } from '@/redux/hooks';
import PageTitle from '@/components/pageTitle';
import { Posts } from '@/types/interfaces';

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        if (fetchedPosts) {
          setPosts(fetchedPosts.data);
          dispatch(setAllPosts(fetchedPosts.data))
        } else {
          setError('No posts found');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || 'Failed to fetch posts.');
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    return () => {
      setPosts([]);
      setLoading(false);
      setError(null);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle />
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto p-4 items-center">
          <p className="text-sm font-medium text-[#666666] text-center py-4">OUR BLOGS</p>
          <h1 className="text-pretty text-[48px] font-[600] text-center font-sans">Find our all blogs from here</h1>
          <div className="w-[50%] container mx-auto items-center">
            <p className="text-sm font-light text-[#666666] text-center py-4 leading-6">Our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along</p>
          </div>
          {loading &&
            <div className="flex items-center justify-center">
              <RingLoader color="#7C4EE4" size={60} className="my-6" />
            </div>
          }
          {error && <div className="text-center py-4 text-red-500">{error}</div>}
          {!loading && !error && posts.length === 0 && <div className="text-center py-4">No posts available</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {posts.map((post: Posts) => (
              <PostCard
                key={post.id}
                title={post.title}
                body={post.body.content}
                photo={post.photo}
                author={post.user.name}
                avatar={post.user.avatar}
                slug={post.slug}
                categories={post.categories}
                postedDate={post.createdAt} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllPosts;


