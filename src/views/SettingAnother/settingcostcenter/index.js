import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));

class Settingcostcenter extends Component {
    render() {
        return (
            <Switch>

                <Route
                    exact
                    path="/settinganother/settingcostcenter"
                    render={(props) => (
                        <View {...props} {...this.props.SESSION} {...this.props} />
                    )}
                />

            </Switch>
        );
    }
}

export default Settingcostcenter;