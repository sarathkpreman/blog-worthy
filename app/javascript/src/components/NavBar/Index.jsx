import React, { useEffect, useRef } from "react";

import InkspireLogo from "./InkspireLogo";
import NetvoteHeart from "./NetvoteHeart";
import Notification from "./Notification";
import Profile from "./Profile";

import WriterButton from "../commons/WriterButton";

const Navbar = () => {
  const setIsUserMenuOpen = React.useMemo(() => false, []);
  const userMenuRef = useRef(null);

  const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);

  const handleClickOutside = event => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed z-10 w-full bg-gray-50 shadow-md">
      <div className="container mx-auto flex max-w-screen-xl items-center justify-between p-2">
        <div className="flex items-center space-x-4">
          <InkspireLogo />
        </div>
        <div className="flex justify-center">
          <WriterButton />
        </div>
        <div className="relative ml-4 flex items-center space-x-5">
          <Notification />
          <NetvoteHeart />
          <button className="flex items-center" onClick={toggleUserMenu}>
            <Profile />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
