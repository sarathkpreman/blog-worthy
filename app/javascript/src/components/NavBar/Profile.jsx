import React, { useState, useEffect, useRef } from "react";

import { Avatar } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

const Profile = () => {
  const userName = getFromLocalStorage("authUserName");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility when Avatar or Username is clicked
  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={toggleDropdown}
      >
        <Avatar
          size="medium"
          user={{
            imageUrl: "https://i.pravatar.cc/300",
          }}
        />
        <span>{userName}</span>
      </div>
      {dropdownVisible && (
        <ul className="absolute right-0 mt-4 w-48 rounded-md border bg-black shadow-lg">
          <li className="px-4 py-2 hover:bg-gray-600">
            <Link to="/account">Account</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-600">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-600">
            <Link to="/settings">Settings</Link>
          </li>
          <div className="my-1 h-px bg-gray-700" />
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-600"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default Profile;
