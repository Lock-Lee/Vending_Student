import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));
const Productbygroup = React.lazy(() => import("./productbygroup"));
export default class index extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/settinganother/user/userby-group/insert"
          render={(props) => <Insert {...props} />}
        />
        <Route
          exact
          path="/settinganother/user/userby-group"
          render={(props) => <View {...props} />}
        />
        <Route
          exact
          path="/settinganother/user/userby-group/productbyproduct/:code"
          render={(props) => <Productbygroup {...props} />}
        />
        <Route
          exact
          path="/settinganother/user/userby-group/update/:code"
          render={(props) => <Update {...props} />}
        />
      </Switch>
    );
  }
}
