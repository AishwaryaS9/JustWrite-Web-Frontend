import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { getPostsByCategory } from '@/api/postCategories';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import Footer from '@/components/Footer';
import { Posts } from '@/types/interfaces';
import PageTitle from '@/components/pageTitle';

const CategoryPost = () => {
  const [category, setCategory] = useState<Posts[]>([]);
  const router = useRouter();
  const categoryname = router.query.categoryname as string | undefined | '';


  useEffect(() => {
    if (categoryname) {
      handleGetCategoryPosts(categoryname);
    }
  }, [categoryname]);


  const handleGetCategoryPosts = async (categoryname: string) => {
    try {
      const response = await getPostsByCategory(categoryname);
      if (response) {
        setCategory(response);
      }
    } catch (error) {
      console.log("Failed to load category posts", error)
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle />
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto p-4 items-center">
          <p className="text-sm font-semibold text-[#666666] text-center py-4">
            {/* {categoryname.toUpperCase()} */}
            {categoryname ? categoryname.toUpperCase() : 'Category'}
          </p>
          <h1 className="text-pretty text-[48px] font-[600] text-center font-sans">Find our all blogs related to {categoryname} from here</h1>
          <div className="w-[50%] container mx-auto items-center">
            <p className="text-sm font-light text-[#666666] text-center py-4 leading-6">our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {category.map((post: Posts) => (
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
  )
}

export default CategoryPost