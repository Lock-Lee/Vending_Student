import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));

class Stock extends Component {
  render() {
    console.log(this.props.SESSION);
    const { permission_add, permission_edit, permission_view } =
      this.props.SESSION.PERMISSION;
    return (
      <Switch>
        {permission_edit ? (
          <Route
            exact
            path="/settinganother/stock/stock/update/:code"
            render={(props) => <Update {...props} />}
          />
        ) : null}

        {permission_add ? (
          <Route
            exact
            path="/settinganother/stock/stock/insert"
            render={(props) => <Insert {...props} />}
          />
        ) : null}
        {permission_view ? (
          <Route
            path="/settinganother/stock/stock"
            render={(props) => <View {...props} {...this.props.SESSION} />}
          />
        ) : (
          this.props.history.push("/")
        )}
      </Switch>
    );
  }
}
export default Stock;
