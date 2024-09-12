import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PostsList from "./components/ActivityStream/PostList";
import Home from "./components/Dashboard/Home";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={PostsList} path="/posts" />
    </Switch>
  </Router>
);

export default App;
