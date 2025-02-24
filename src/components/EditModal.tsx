import React, { useState } from 'react';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { editPost } from '@/api/posts';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/hooks';
import { EditPost } from '@/types/interfaces';
import { RootState } from '@/redux/store';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: EditPost
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, post }) => {
   const [formData, setFormData] = useState<EditPost>(post);
  
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const userToken = useAppSelector((state: RootState) => state.user.token) || '';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'content') {
      setFormData({
        ...formData,
        body: {
          ...formData.body,
          content: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    if (!formData.title.trim() || !formData.caption.trim() || !formData.body.content.trim() || !formData.photo.trim()) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/^https?:\/\/.+$/.test(formData.photo)) {
      toast.error("Invalid URL for the photo.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const editResponse = await editPost(formData, slug, userToken);
      if (editResponse) {
        toast.success('Post updated successfully!');
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to update post. Please try again.');
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        toast.error((error as { message: string }).message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Post"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-semibold text-gray-600 mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="caption" className="text-sm font-semibold text-gray-600 mb-2">Caption</label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-semibold text-gray-600 mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.body.content}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="photo" className="text-sm font-semibold text-gray-600 mb-2">Image</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 text-white bg-[#7C4EE4] rounded-md  transition duration-300 focus:outline-none focus:ring-2
           focus:ring-blue-400 focus:ring-offset-2"
        >
          Update Post
        </button>
      </form>

      <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="text-gray-500 hover:underline text-center"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
