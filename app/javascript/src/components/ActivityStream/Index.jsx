import React from "react";

import PostCard from "./PostCard";
import PostsList from "./PostList";

const ActivityStream = () => (
  <div className="flex flex-col items-center justify-center">
    <PostsList />
    <PostCard />
  </div>
);

export default ActivityStream;
