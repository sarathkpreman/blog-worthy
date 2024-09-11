import React from "react";

import Profile from "./Profile";
import WriterBar from "./WriterBar";

const Navbar = () => (
  <div className="fixed right-0 top-0 z-10 flex w-full items-center justify-center bg-white shadow-md">
    <div className="flex">
      <WriterBar />
    </div>
    <div className="flex">
      <Profile />
    </div>
  </div>
);

export default Navbar;
