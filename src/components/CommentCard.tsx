import React from 'react';

interface CommentCardProps {
  desc: string;
  author: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ desc, author }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <p className="text-gray-600">{desc}</p>
      <div className="text-gray-500">By {author}</div>
    </div>
  );
};

export default CommentCard;
