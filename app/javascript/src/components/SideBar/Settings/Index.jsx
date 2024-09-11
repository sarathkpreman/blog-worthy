import React from "react";

import Logout from "./Logout";
import Profile from "./Profile";

const Settings = () => (
  <div className="basic-user-settings flex flex-col items-center space-y-4">
    <div className="user-profile">
      <button>
        <Profile />
      </button>
    </div>
    <div className="profile-logout">
      <button>
        <Logout />
      </button>
    </div>
  </div>
);

export default Settings;
