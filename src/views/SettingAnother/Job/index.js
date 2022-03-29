import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));
const Detail = React.lazy(() => import("./detail"));
class Job extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/settinganother/job/insert"
          render={(props) => (
            <Insert {...props} {...this.props.SESSION} {...this.props} />
          )}
        />

        <Route
          exact
          path="/settinganother/job/update/:code"
          render={(props) => (
            <Update {...props} {...this.props.SESSION} {...this.props.USER} />
          )}
        />

        <Route
          exact
          path="/settinganother/job/detail/:code"
          render={(props) => <Detail {...props} {...this.props.SESSION} />}
        />

        <Route
          exact
          path="/settinganother/job"
          render={(props) => (
            <View {...props} {...this.props.SESSION} {...this.props} />
          )}
        />
      </Switch>
    );
  }
}

export default Job;
