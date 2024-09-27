import React from "react";

const PostStatus = ({ isBlogWorthy }) => (
  <div className="flex items-center">
    <span
      aria-label={isBlogWorthy ? "Worthy status" : "Not Worthy status"}
      className={`inline-block min-w-[70px] rounded-full px-3 py-1 text-center text-xs font-medium ${
        isBlogWorthy ? "bg-green-400 text-white" : "bg-red-400 text-white"
      }`}
    >
      {isBlogWorthy ? "Blog-Worthy" : "Not Worthy"}
    </span>
  </div>
);

export default PostStatus;
