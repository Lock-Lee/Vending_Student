import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));

class Inventory extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          component={View}
          path="/inventory"
          render={(props) => (
            <View {...props} {...this.props} {...this.props.SESSION} />
          )}
        />
      </Switch>
    );
  }
}
export default Inventory;
