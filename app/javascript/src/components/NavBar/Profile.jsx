import React from "react";

import { Avatar } from "@bigbinary/neetoui";

const Profile = () => (
  <div>
    <Avatar
      size="medium"
      user={{
        imageUrl: "https://i.pravatar.cc/300",
      }}
      onClick={function noRefCheck() {}}
    />
  </div>
);

export default Profile;
