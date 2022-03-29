import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Update = React.lazy(() => import("./update"));

class Location extends Component {
  render() {
    return (
      <Switch>
        {
          <Route
            exact
            path="/settinganother/location/update/:code"
            render={(props) => <Update {...props} {...this.props.SESSION} />}
          />
        }

        <Route
          path="/settinganother/location"
          render={(props) => <View {...props} {...this.props.SESSION} />}
        />
      </Switch>
    );
  }
}
export default Location;
