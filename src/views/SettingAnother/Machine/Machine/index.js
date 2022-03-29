import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));

class Machine extends Component {
  render() {
    const { permission_add, permission_edit } = this.props.SESSION.PERMISSION;
    return (
      <Switch>
        {permission_add ? (
          <Route
            exact
            path="/settinganother/machine/machine/update/:code"
            render={(props) => <Update {...props} {...this.props.SESSION} />}
          />
        ) : (
          ""
        )}
        {permission_edit ? (
          <Route
            exact
            path="/settinganother/machine/machine/insert"
            render={(props) => <Insert {...props} {...this.props.SESSION} />}
          />
        ) : (
          ""
        )}
        <Route
          path="/settinganother/machine/machine"
          render={(props) => <View {...props} {...this.props.SESSION} />}
        />
      </Switch>
    );
  }
}
export default Machine;
