import React from "react";

import { Avatar } from "@bigbinary/neetoui";

import { getFromLocalStorage } from "../../utils/storage";

const Profile = () => {
  const userName = getFromLocalStorage("authUserName");

  return (
    <div className="flex items-center gap-2">
      <Avatar
        size="medium"
        user={{
          imageUrl: "https://i.pravatar.cc/300",
        }}
        onClick={function noRefCheck() {}}
      />
      <span>{userName}</span>
    </div>
  );
};

export default Profile;
