import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view")); 

class LowStockReport extends Component {
  render() {
    return (
      <Switch> 
        <Route
          exact 
          path="/report/lowstock"
          render={(props) => (
            <View {...props} {...this.props} {...this.props.SESSION} />
          )}
        />
      </Switch>
    );
  }
}
export default LowStockReport;
