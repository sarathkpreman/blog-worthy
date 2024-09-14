import React, { useState, useEffect, useCallback } from "react";

import { Modal } from "@bigbinary/neetoui";
import axios from "axios";

import postsApi from "apis/posts";

import PostCard from "./PostCard";

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
    <div className="flex flex-col items-center space-y-6 p-8">
      {posts.map(post => (
        <div className="flex w-full max-w-lg justify-center" key={post.id}>
          <PostCard
            description={post.description}
            downvotes={post.downvotes}
            title={post.title}
            upvotes={post.upvotes}
            onClick={() => handlePostClick(post.slug)}
          />
        </div>
      ))}
      {selectedPost && (
        <Modal
          isOpen={isModalOpen}
          size="large"
          title="Post Details"
          onClose={handleModalClose}
        >
          <div className="max-h-[80vh] overflow-y-auto p-6">
            {" "}
            <h2 className="mb-4 text-xl font-bold">
              {selectedPost.title}
            </h2>{" "}
            <p>{selectedPost.description}</p>
          </div>
          <div className="flex justify-end p-6">
            <button className="btn btn-secondary" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostsList;
