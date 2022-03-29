import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));

class Abnomal extends Component {
  render() {
    console.log();
    return (
      <Switch>
        <Route
          exact
          path="/settinganother/abnormal/insert"
          render={(props) => (
            <Insert {...props} {...this.props.SESSION} {...this.props} />
          )}
        />

        <Route
          exact
          path="/settinganother/abnormal/update/:code"
          render={(props) => (
            <Update {...props} {...this.props.SESSION} {...this.props.USER} />
          )}
        />

        <Route
          path="/settinganother/abnormal"
          render={(props) => (
            <View {...props} {...this.props.SESSION} {...this.props} />
          )}
        />
      </Switch>
    );
  }
}

export default Abnomal;
