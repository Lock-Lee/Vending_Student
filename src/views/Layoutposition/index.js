import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));

export default class Layoutpositiion extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          render={(props) => (
            <View {...props} {...this.props.SESSION} {...this.props.USER} />
          )}
        />
      </Switch>
    );
  }
}
