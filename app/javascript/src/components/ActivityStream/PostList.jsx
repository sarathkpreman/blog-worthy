import React, { useState, useEffect } from "react";

import axios from "axios";

import PostCard from "./PostCard";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        // Extract posts from response
        setPosts(response.data.posts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div className="p-8">
      <div className="mb-6·text-center">
        <h1 className="text-3xl font-bold text-blue-500" />
      </div>
      <div className="gap-6·sm:grid-cols-2·md:grid-cols-3·grid·grid-cols-1">
        {posts.map(post => (
          <PostCard
            description={post.description}
            downvotes={post.downvotes}
            key={post.id}
            title={post.title}
            upvotes={post.upvotes}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
