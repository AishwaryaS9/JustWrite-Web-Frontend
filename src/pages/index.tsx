import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { featuredPosts, getRecentPosts } from '../api/posts';
import { getCategories } from '../api/postCategories';
import { useRouter } from 'next/router';
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Pagination } from 'swiper/modules';
import PageTitle from '@/components/pageTitle';
import { Category, Posts } from '@/types/interfaces';

const Home: React.FC = () => {
  const [postData, setPostData] = useState<Posts[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Posts | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter()

  const getPosts = async () => {
    const recentPostLists = await getRecentPosts();
    if (recentPostLists) {
      setPostData(recentPostLists)
    }
  }

  const getFeaturedPost = async () => {
    try {
      const featuredPostData = await featuredPosts()
      if (featuredPostData) {
        setFeaturedPost(featuredPostData)
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  useEffect(() => {
    getPosts()
    getFeaturedPost();
    handleGetCategory();
  }, [])

  const handlePost = (slug: string) => {
    router.push(`/${slug}`)
  }

  const handleAllPosts = () => {
    router.push('/allPosts')
  }

  const handleGetCategory = async () => {
    try {
      const response = await getCategories();
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      console.log('Failed to load categories', error);
    }
  }

  const handleCategoryPosts = async (categoryname: string) => {
    try {
      router.push(`/category/${categoryname}`)
    } catch (error) {
      console.log('Error', JSON.stringify(error))

    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle />
      <Navbar />
      <main className="flex-grow">
        <div className='container mx-auto '>
          {featuredPost && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 bg-[#7C4EE4] px-8 py-4">
              <div className="flex flex-col items-start md:w-1/2 space-y-8">
                <h1 className="text-pretty font-semibold text-white mb-4">Featured Post</h1>
                <h2 className="text-4xl font-bold text-white font-sans">{featuredPost.title}</h2>
                <p className="text-white font-extralight leading-7 truncate-lines">{featuredPost.body?.content}</p>
                <button
                  onClick={() => handlePost(featuredPost.slug)}
                  className="text-gray-600 font-sans hover:text-indigo-800 font-medium bg-white py-2 px-2 rounded-md shadow-lg w-[170px] h-[53px] ">
                  Read more
                </button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={featuredPost.photo}
                  alt={featuredPost.title}
                  className="rounded-lg shadow-xl w-[480px] h-[375px] object-cover "
                />
              </div>
            </div>
          )}
          <h1 className="text-pretty font-semibold text-[#33333] text-2xl font-sans py-8 px-8">
            Categories
          </h1>
          <div className="mb-6 px-8 h-[80px]">
            <Swiper
              slidesPerView="auto"
              spaceBetween={5}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="category-swiper"
            >
              {categories.map((category: Category) => (

                <SwiperSlide key={category._id} style={{ width: 'auto' }}>
                  <button
                    onClick={() => handleCategoryPosts(category.title)}
                    className="px-8 py-2 bg-[#D1E7E5] hover:bg-[#7C4EE4] text-gray-800  hover:text-white rounded-full "
                  >
                    {category.title}
                  </button>
                </SwiperSlide>

              ))}
            </Swiper>
          </div>
          <div className="flex px-8 flex-row justify-between items-center mb-8">
            <h1 className="text-pretty font-semibold text-[#33333] text-2xl font-sans">
              Our Recent Post
            </h1>
            <button onClick={() => handleAllPosts()}
              className="ml-auto text-white font-sans rounded-md font-medium bg-[#7C4EE4] py-2 px-2 shadow-lg w-[147px] h-[53px]"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {postData.map((post: Posts) => (
              <PostCard
                key={post.id} 
                title={post.title}
                body={post.body.content}
                photo={post.photo}
                author={post.user.name}
                avatar={post.user.avatar}
                slug={post.slug}
                categories={post.categories}
                postedDate={post.createdAt}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
