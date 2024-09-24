import React, { useState, useEffect, useRef } from "react";

import { Avatar } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

const userName = getFromLocalStorage("authUserName");

const Profile = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

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
        <span className="font-cursive ml-1 text-sm font-bold text-gray-800">
          {userName}
        </span>
      </div>
      {dropdownVisible && (
        <ul className="w-47 absolute right-0 mt-6 rounded-md border bg-white shadow-md">
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/account">Account</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/settings">Settings</Link>
          </li>
          <li
            className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-100"
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
