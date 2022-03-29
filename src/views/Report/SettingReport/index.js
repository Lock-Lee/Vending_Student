import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view")); 

class SettingReport extends Component {
  render() {
    return (
      <Switch> 
        <Route
          exact
          component={View}
          path="/report/setting"
          render={(props) => (
            <View {...props} {...this.props} {...this.props.SESSION} />
          )}
        />
      </Switch>
    );
  }
}
export default SettingReport;
