import React from "react";

import PostCard from "./PostCard";
import PostsList from "./PostList";
import PostStatus from "./PostStatus";

const ActivityStream = () => (
  <div className="flex flex-col items-center justify-center">
    <PostsList />
    <PostCard />
    <PostStatus />
  </div>
);

export default ActivityStream;
