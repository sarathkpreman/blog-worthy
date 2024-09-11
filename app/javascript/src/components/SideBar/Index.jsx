import React from "react";

import ProfileImage from "./ProfileImage";
import Settings from "./Settings/Index";

const SideBar = () => (
  <div className="flex flex-col items-center justify-end">
    <div className="mb-4 p-5">
      <ProfileImage />
    </div>
    <hr className="my-4 w-1/2" />
    <div>
      <Settings />
    </div>
  </div>
);

export default SideBar;
