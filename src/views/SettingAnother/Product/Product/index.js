import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Insert = React.lazy(() => import("./insert"));
const Update = React.lazy(() => import("./update"));
const Slotlayout = React.lazy(() => import("./slotlayout"));

class Product extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/settinganother/product/product/slotlayout/:code"
          render={(props) => <Slotlayout {...props} {...this.props.SESSION} />}
        />{" "}
        <Route
          exact
          path="/settinganother/product/product/update/:code"
          render={(props) => <Update {...props} {...this.props.SESSION} />}
        />
        <Route
          exact
          path="/settinganother/product/product/insert"
          render={(props) => <Insert {...props} {...this.props.SESSION} />}
        />
        <Route
          exact
          component={View}
          path="/settinganother/product/product"
          render={(props) => (
            <View {...props} {...this.props} {...this.props.SESSION} />
          )}
        />
      </Switch>
    );
  }
}
export default Product;
