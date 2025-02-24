import { searchApi } from '@/api/posts';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { Posts } from '@/types/interfaces';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const SearchResults = () => {
  const [search, setSearch] = useState<Posts[]>([]);
  const router = useRouter();
  const { searchTerm } = router.query as { searchTerm: string };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm)
    }
  }, [searchTerm])

  const handleSearch = async (searchTerm: string) => {
    try {
      const searchResultsData = await searchApi(searchTerm);
      if (searchResultsData) {
        setSearch(searchResultsData);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {search.length === 0 ? (
          <div className="container mx-auto p-4 items-center">
            <p className="text-sm font-medium text-[#666666] text-center py-4">SEARCH RESULTS</p>
            <h1 className="text-pretty text-[32px] font-[600] text-center font-sans">No results found for &quot;{searchTerm}&quot;</h1>
          </div>
        ) : (
          <div className="container mx-auto p-4 items-center">
            <p className="text-sm font-medium text-[#666666] text-center py-4">SEARCH RESULTS</p>
            <h1 className="text-pretty text-[32px] font-[600] text-center font-sans">Find our blogs for &quot;{searchTerm}&quot; from here</h1>
            <div className="w-[50%] container mx-auto items-center">
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {search.map((post: Posts) => (
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
        )}
      </main>
      <Footer />
    </div>
  )
}

export default SearchResults