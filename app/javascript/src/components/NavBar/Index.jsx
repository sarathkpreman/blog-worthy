import React from "react";

import Profile from "./Profile";

import WriterButton from "../commons/WriterButton";

const Navbar = ({ onFormSuccess }) => (
  <div className="fixed right-0 top-0 z-10 flex h-16 w-full items-center justify-center bg-warmGray text-white shadow-md">
    <div className="mr-4 flex">
      <WriterButton onSuccess={onFormSuccess} />
    </div>
    <div className="flex">
      <Profile />
    </div>
  </div>
);

export default Navbar;
