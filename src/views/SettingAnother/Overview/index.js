import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));

class Product extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          component={View}
          path="/settinganother/overview"
          render={(props) => (
            <View {...props} {...this.props} {...this.props.SESSION} />
          )}
        />
      </Switch>
    );
  }
}
export default Product;
