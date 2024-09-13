import React from "react";

import { Avatar } from "@bigbinary/neetoui";

const Profile = () => (
  <div className="flex items-center gap-2">
    <Avatar
      size="medium"
      user={{
        imageUrl: "https://i.pravatar.cc/300",
      }}
      onClick={function noRefCheck() {}}
    />
    <span>Sarath</span>
  </div>
);

export default Profile;
