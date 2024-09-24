import React, { useEffect, useRef } from "react";

import InkspireLogo from "./InkspireLogo";
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
    <nav className="fixed z-10 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center p-2">
        <div className="flex items-center">
          <InkspireLogo />
        </div>
        <div className="flex flex-grow justify-center space-x-8">
          <WriterButton />
        </div>
        <div className="relative flex items-center">
          <button className="flex items-center" onClick={toggleUserMenu}>
            <Profile />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
