import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import PostCard from "./PostCard";

const PostsList = ({ shouldRefresh, onRefreshComplete }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          />
        </div>
      ))}
    </div>
  );
};

export default PostsList;
