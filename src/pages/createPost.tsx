import { createPost } from '@/api/posts';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import blog from '../assets/images/blog.png';
import { useAppSelector } from '@/redux/hooks';
import PageTitle from '@/components/pageTitle';
import { RootState } from '@/redux/store';
import { FormDataPost } from '@/types/interfaces';

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState<FormDataPost>({
    title: '',
    caption: '',
    content: '',
    user: '',
    category: "",
  });

  const userId = useAppSelector((state: RootState) => state.user.userId);
  const userToken = useAppSelector((state: RootState) => state.user.token) || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPost: FormDataPost = formData;

      if (newPost) {
        await createPost(newPost, userToken);
        toast.success("Post created successfully!")
        setFormData({
          title: '',
          caption: '',
          content: '',
          user: userId || "",
          category: "",
        });
      }
      else {
        toast.error("Failed to create post. Please try again")
      }
    } catch (error) {
      console.log('Error.', error);
    }
  };

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
        theme="light" />
      {/* <div className="container mx-auto"> */}
      <div className="flex flex-col min-h-screen">
        <PageTitle />
        <Navbar />
        <main className="flex-grow">
          <div className='min-h-screen w-full flex items-center justify-center bg-gray-100 '>
            <div className="font-[sans-serif]">
              <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
                  <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="mb-8" >
                        <h3 className="text-gray-800 text-3xl font-bold">Create Post</h3>
                        <p className="text-gray-500 text-sm mt-4 leading-relaxed">Write and share your thoughts with the world. Let&apos;s get started!</p>

                      </div>
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">Title</label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-primaryColor"
                            placeholder="Enter the title"
                            required
                          />

                        </div>
                      </div>
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">Caption</label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            id="caption"
                            name="caption"
                            value={formData.caption}
                            onChange={handleChange}
                            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-primaryColor"
                            placeholder="Enter the caption"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">Content</label>
                        <div className="relative flex items-center">
                          <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-primaryColor"
                            placeholder="Enter the content"
                            rows={4}
                            required
                          ></textarea>
                        </div>
                      </div>

                   
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">Category</label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-primaryColor"
                            placeholder="Enter the category"
                            required
                          />
                        </div>
                      </div>

                      <div className="!mt-8">
                        <button
                          type="submit"
                          className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-primaryColor hover:bg-primaryColorLight focus:outline-none"
                        >
                          Submit Post
                        </button>
                      </div>

                    </form>
                  </div>
                  <div className="max-md:mt-8">
                    <Image
                      className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Sign In"
                      src={blog}
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </main >
        <Footer />
      </div >

    </>
  );
};

export default CreatePost;
