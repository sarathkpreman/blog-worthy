import React, { useState } from "react";

import PostsList from "../ActivityStream/PostList";
import NavBar from "../NavBar/Index";

const Home = () => {
  const [shouldRefreshPosts, setShouldRefreshPosts] = useState(false);

  const handleFormSuccess = () => {
    setShouldRefreshPosts(true);
  };

  const handleRefreshComplete = () => {
    setShouldRefreshPosts(false);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="fixed left-0 right-0 top-0 z-10">
        <NavBar onFormSuccess={handleFormSuccess} />
      </div>
      <div className="mx-4 mt-20 flex flex-grow flex-col">
        <div className="flex flex-grow items-center justify-center p-5">
          <div className="h-full w-full max-w-3xl">
            <PostsList
              shouldRefresh={shouldRefreshPosts}
              onRefreshComplete={handleRefreshComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
