import React from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));

class Depament extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <View {...props} {...this.props.SESSION} {...this.props.USER} />
          )}
        />
      </Switch>
    );
  }
}

export default Depament;
