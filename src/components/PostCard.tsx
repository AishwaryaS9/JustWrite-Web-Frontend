import { Category } from '@/types/interfaces';
import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from "react-icons/fa";

interface PostCardProps {
    title: string;
    body: string;
    photo: string;
    author: string;
    avatar: string;
    slug: string;
    categories: Category[];
    postedDate: string | Date;
}

const PostCard: React.FC<PostCardProps> = ({ title, body, photo, author, avatar, slug, categories, postedDate }) => {
    const calculateTimeAgo = (date: string | Date): string => {
        const now = new Date();
        const postDate = new Date(date);
        const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return `1 day ago`;
        if (diffInDays < 365) return `${diffInDays} days ago`;
        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    };

    return (
        <div className="rounded-lg mx-10 my-4 p-6 ">
            <div className="flex-shrink-0 w-full h-48">
                <img
                    src={photo || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-all duration-200 mt-4">
                {title}
            </h2>

            <p className="text-gray-600 mt-2 line-clamp-3">
                {body}
            </p>

            <div className="flex flex-wrap gap-2 mb-4 my-4">
                {categories?.length > 0 ? (
                    categories.map((category: Category, index: number) => (
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

            <div className="flex items-center text-sm text-gray-500 mt-4 space-x-4">
                <div className="flex items-center space-x-2">
                    {avatar ? (
                        <img src={avatar} className="w-4 h-4 text-gray-400" alt="avatar" />
                    ) : (
                        <FaUserCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="capitalize">{author}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span>{postedDate ? calculateTimeAgo(postedDate) : 'N/A'}</span>
                </div>
            </div>
            <Link style={{ textDecoration: "underline" }}
                href={`/${slug}`}
                className="text-indigo-600 mt-3 inline-block hover:text-indigo-800 font-semibold transition-all duration-200 "
            >
                Read More...
            </Link>
        </div>
    );
};

export default PostCard;
