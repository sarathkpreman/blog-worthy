import React, { useState, useEffect, useCallback } from "react";

import { Modal } from "@bigbinary/neetoui";
import axios from "axios";

import postsApi from "apis/posts";
import { getFromLocalStorage } from "utils/storage";

import PostCard from "./PostCard";

const userName = getFromLocalStorage("authUserName");

const PostsList = ({ shouldRefresh, onRefreshComplete }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/posts");
      setPosts(response.data.posts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      if (onRefreshComplete) {
        onRefreshComplete();
      }
    }
  }, [onRefreshComplete]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, shouldRefresh]);

  const handlePostClick = async slug => {
    try {
      const response = await postsApi.show(slug);
      setSelectedPost(response.data.post);
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    } catch (error) {
      logger.error("Error fetching post details:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div className="flex justify-center p-8">
      <div className="grid grid-cols-1 gap-8">
        {posts.map(post => (
          <PostCard
            description={post.description}
            downvotes={post.downvotes}
            key={post.id}
            title={post.title}
            upvotes={post.upvotes}
            userName={userName}
            onClick={() => handlePostClick(post.slug)}
          />
        ))}
        {selectedPost && (
          <Modal
            isOpen={isModalOpen}
            size="large"
            title="Post Details"
            onClose={handleModalClose}
          >
            <div className="max-h-[80vh] overflow-y-auto p-6">
              <h1
                className="mb-2 text-4xl font-semibold"
                style={{ color: "#484848" }}
              >
                {selectedPost.title}
              </h1>
              <p
                className="mb-2 text-sm font-semibold"
                style={{ color: "#484848" }}
              >
                Author: {selectedPost.user.name}
              </p>
              <p style={{ color: "#767676" }}>{selectedPost.description}</p>
            </div>
            <div className="flex justify-end space-x-2 p-6">
              <button
                className="btn btn-secondary flex items-center space-x-2"
                onClick={handleModalClose}
              >
                <i
                  className="ri-delete-bin-fill text-lg"
                  style={{ color: "#484848" }}
                />
                <span>Delete</span>
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PostsList;
