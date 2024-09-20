import React from "react";

const PostCard = ({
  title,
  description,
  upvotes,
  downvotes,
  userName,
  onClick,
}) => (
  <div className="mb-6 flex w-full max-w-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-white">
    <div className="flex-grow p-6">
      <h1
        className="mb-2 text-xl font-semibold text-blue-600"
        onClick={onClick}
      >
        {title}
      </h1>
      <div>
        <p className="mb-1 text-sm font-semibold text-black">
          Author: {userName}
        </p>
      </div>
      <p className="description-text text-sm text-gray-700">{description}</p>
    </div>
    <div className="flex items-center justify-between bg-gray-100 px-6 py-3">
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 text-blue-600">
          <i className="ri-thumb-up-line" />
          <span>{upvotes}</span>
        </button>
        <button className="flex items-center space-x-2 text-red-600">
          <i className="ri-thumb-down-line" />
          <span>{downvotes}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600">
          <i className="ri-chat-4-line" />
        </button>
      </div>
    </div>
  </div>
);

export default PostCard;
