import React from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));

class Productlist extends React.Component {
  render() {
    // const { permission_add, permission_edit } = this.props.SESSION.PERMISSION;

    return (
      <Switch>
        <Route
          exact
          path="/settinganother/reorder"
          render={(props) => <View {...props} {...this.props.SESSION} />}
        />
        <Route
          exact
          path="/settinganother/reorder/insert"
          render={(props) => <Insert {...props} {...this.props.SESSION} />}
        />
        <Route
          exact
          path="/settinganother/reorder/update/:code"
          render={(props) => <Update {...props} {...this.props.SESSION} />}
        />
      </Switch>
    );
  }
}

export default Productlist;
