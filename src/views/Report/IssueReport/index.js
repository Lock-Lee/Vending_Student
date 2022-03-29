import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view")); 

class IssueReport extends Component {
  render() {
    return (
      <Switch> 
        <Route
          exact 
          path="/report/issue"
          render={(props) => (
            <View {...props} {...this.props} {...this.props.SESSION} />
          )}
        />
      </Switch>
    );
  }
}
export default IssueReport;
