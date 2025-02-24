import Link from 'next/link';
import React from 'react';

interface RecommendedPostCardProps {
    title: string;
    caption: string;
    photo: string;
    author: string;
    slug: string;
    createdDate: string;
}

const RecommendedPostCard: React.FC<RecommendedPostCardProps> = ({ title, caption, photo, author, slug, createdDate }) => {
   
    const formattedDate = createdDate
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(createdDate))
    : null;
   

    return (
        <div className="flex  p-4 ">
            <div className="flex-shrink-0 w-32 h-32 mr-4">
                <img
                    src={photo || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-all duration-200">
                    <Link href={`/${slug}`}>{title}</Link>
                </h2>

                <p className="text-gray-600 mt-1 line-clamp-2">
                    {caption}
                </p>

                <div className="text-sm text-gray-500 mt-2">
                    <span>By {author}</span>
                    <span className="mx-2">|</span>
                    {/* <span>{new Date(createdDate).toLocaleDateString()}</span> */}
                    <span>{formattedDate}</span>

                </div>
            </div>
        </div>
    );
};

export default RecommendedPostCard;
