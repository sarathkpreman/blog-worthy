import React from "react";

const WriterBar = () => (
  <button className="border-teal-500 hover:bg-teal-500 focus:border-teal-500 focus:outline-none flex items-center justify-center rounded-full border bg-transparent px-3 py-2 hover:text-white">
    <i className="ri-quill-pen-fill mr-1 text-lg" />
    <p className="text-sm">Inkspire...</p>
  </button>
);

export default WriterBar;
