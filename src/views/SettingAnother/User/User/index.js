import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));

class User extends Component {
  render() {
    console.log(this.props.SESSION.PERMISSION);
    const { permission_edit, permission_add, permission_view } =
      this.props.SESSION.PERMISSION;
    return (
      <Switch>
        {permission_edit ? (
          <Route
            exact
            path="/settinganother/user/user/update/:code"
            render={(props) => <Update {...props} {...this.props.SESSION} />}
          />
        ) : (
          ""
        )}
        {permission_add ? (
          <Route
            exact
            path="/settinganother/user/user/insert"
            render={(props) => <Insert {...props} {...this.props.SESSION} />}
          />
        ) : (
          ""
        )}
        {permission_view ? (
          <Route
            path="/settinganother/user/user"
            render={(props) => <View {...props} {...this.props.SESSION} />}
          />
        ) : (
          this.props.history.push("/")
        )}
      </Switch>
    );
  }
}
export default User;
