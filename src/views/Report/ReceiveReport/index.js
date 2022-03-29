import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));

class ReceiveReport extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/report/receive"
          render={(props) => {
            return <View {...props} {...this.props} {...this.props.SESSION} />;
          }}
        />
      </Switch>
    );
  }
}
export default ReceiveReport;
