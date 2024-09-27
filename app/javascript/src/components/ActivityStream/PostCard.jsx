import React, { useState } from "react";

import axios from "axios";

import PostStatus from "./PostStatus";

const PostCard = ({
  title,
  description,
  initialUpvotes,
  initialDownvotes,
  initialIsBlogWorthy,
  userName,
  onClick,
  postSlug,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [isBlogWorthy, setIsBlogWorthy] = useState(initialIsBlogWorthy);
  const [upvoteClicked, setUpvoteClicked] = useState(false);
  const [downvoteClicked, setDownvoteClicked] = useState(false);

  const voteUpdate = async (slug, voteType) => {
    try {
      const response = await axios.patch(`/posts/${slug}/update_votes`, {
        vote_type: voteType,
      });

      return response.data;
    } catch (error) {
      logger.error("Failed to update votes: ", error);

      return null;
    }
  };

  const handleUpvote = async () => {
    const result = await voteUpdate(postSlug, "upvote");
    if (result) {
      setUpvotes(result.upvotes);
      setIsBlogWorthy(result.is_blog_worthy);
      setUpvoteClicked(!upvoteClicked);
      if (downvoteClicked) setDownvoteClicked(false);
    }
  };

  const handleDownvote = async () => {
    const result = await voteUpdate(postSlug, "downvote");
    if (result) {
      setDownvotes(result.downvotes);
      setIsBlogWorthy(result.is_blog_worthy);
      setDownvoteClicked(!downvoteClicked);
      if (upvoteClicked) setUpvoteClicked(false);
    }
  };

  return (
    <div className="flex h-[600px] w-full max-w-[350px] flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="flex-grow overflow-y-auto p-6">
        <div className="flex items-center gap-2">
          <h1
            className="mb-2 cursor-pointer text-4xl font-semibold"
            style={{ color: "#484848" }}
            onClick={onClick}
          >
            {title}
          </h1>
          <div className="ml-2 flex-shrink-0">
            <PostStatus isBlogWorthy={isBlogWorthy} />
          </div>
        </div>
        <hr className="border-gray-150 my-4 border-t" />
        <div className="flex items-center">
          <p
            className="mb-2 text-sm font-semibold"
            style={{ color: "#484848" }}
          >
            Author: {userName}
          </p>
        </div>
        <p className="font-md text-sm" style={{ color: "#767676" }}>
          {description.length > 150
            ? `${description.substring(0, 150)}...`
            : description}
        </p>
      </div>
      <div className="flex items-center justify-between bg-gray-50 p-3 px-4 py-4">
        <div className="ml-3 flex items-center space-x-5">
          <button
            className="flex items-center space-x-2"
            style={{ color: "#00A699" }}
            onClick={handleUpvote}
          >
            <i
              className={`${
                upvoteClicked ? "ri-thumb-up-fill" : "ri-thumb-up-line"
              } text-xl`}
            />
            <span>{upvotes}</span>
          </button>
          <button
            className="flex items-center space-x-2"
            style={{ color: "#FF5A5F" }}
            onClick={handleDownvote}
          >
            <i
              className={`${
                downvoteClicked ? "ri-thumb-down-fill" : "ri-thumb-down-line"
              } text-xl`}
            />
            <span>{downvotes}</span>
          </button>
          <button
            className="flex items-center space-x-2"
            style={{ color: "#484848" }}
          >
            <i className="ri-chat-1-line text-xl" />
          </button>
        </div>
        <button
          className="mr-3 flex items-center space-x-2"
          style={{ color: "#484848" }}
        >
          <i className="ri-edit-box-fill text-lg" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
