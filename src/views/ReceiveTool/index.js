import React from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));

class ReceiveTool extends React.Component {
  render() {
    // const { permission_add, permission_edit } = this.props.SESSION.PERMISSION;

    return (
      <Switch>
        <Route
          path="/ReceiveTool"
          render={(props) => (
            <View {...props} {...this.props.SESSION} key={"1"} />
          )}
        />
      </Switch>
    );
  }
}

export default ReceiveTool;
