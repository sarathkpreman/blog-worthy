import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { Login, Signup } from "components/Authentication";
import { getFromLocalStorage } from "utils/storage";

import PostsList from "./components/ActivityStream/PostList";
import { PrivateRoute } from "./components/commons";
import Home from "./components/Dashboard/Home";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <Switch>
        <Route exact component={PostsList} path="/posts" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Home}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
