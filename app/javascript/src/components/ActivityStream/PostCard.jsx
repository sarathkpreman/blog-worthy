import React from "react";

const PostCard = ({ title, description, upvotes, downvotes }) => (
  <div className="mx-auto mb-8 max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
    <div className="p-8">
      <h2 className="mb-4 text-4xl font-bold text-blue-500">{title}</h2>
      <p className="description-text text-lg text-gray-700">{description}</p>
    </div>
    <hr className="breaker" />
    <div className="flex items-center justify-between  bg-gray-100 px-8 py-4">
      {/* Actions Container */}
      <div className="flex items-center space-x-4">
        {/* Upvote Button */}
        <button className="flex items-center space-x-2">
          <i className="ri-thumb-up-line" />
          <span>{upvotes}</span>
        </button>
        {/* Downvote Button */}
        <button className="flex items-center space-x-2">
          <i className="ri-thumb-down-line" />
          <span>{downvotes}</span>
        </button>
        {/* Comment section */}
        <button className="flex items-center space-x-2">
          <i className="ri-chat-4-line" />
        </button>
      </div>
    </div>
  </div>
);

export default PostCard;
