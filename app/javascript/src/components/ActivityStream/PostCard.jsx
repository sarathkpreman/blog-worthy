import React from "react";

const PostCard = ({
  title,
  description,
  upvotes,
  downvotes,
  userName,
  onClick,
}) => (
  <div className="flex h-[600px] w-full max-w-[350px] flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
    <div className="flex-grow overflow-y-auto p-6">
      <h1
        className="mb-2 cursor-pointer text-4xl font-semibold"
        style={{ color: "#484848" }}
        onClick={onClick}
      >
        {title}
      </h1>
      <p className="mb-2 text-sm font-semibold" style={{ color: "#484848" }}>
        Author: {userName}
      </p>
      <p className="font-md text-sm" style={{ color: "#767676" }}>
        {description.length > 100
          ? `${description.substring(0, 150)}...`
          : description}
      </p>
    </div>
    <div className="flex items-center justify-between bg-gray-50 p-3 px-4 py-4">
      <div className="flex items-center space-x-5">
        <button
          className="flex items-center space-x-2"
          style={{ color: "#00A699" }}
        >
          <i className="ri-thumb-up-line text-lg" />
          <span>{upvotes}</span>
        </button>
        <button
          className="flex items-center space-x-2"
          style={{ color: "#FF5A5F" }}
        >
          <i className="ri-thumb-down-line text-lg" />
          <span>{downvotes}</span>
        </button>
        <button
          className="flex items-center space-x-2"
          style={{ color: "#484848" }}
        >
          <i className="ri-chat-4-line" />
        </button>
      </div>
      <button
        className="flex items-center space-x-2"
        style={{ color: "#484848" }}
      >
        <i className="ri-edit-box-fill text-lg" />
        <span>Edit</span>
      </button>
    </div>
  </div>
);

export default PostCard;
