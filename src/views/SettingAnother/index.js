import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const Machine = React.lazy(() => import("./Machine"));
const User = React.lazy(() => import("./User"));
const Stock = React.lazy(() => import("./Stock"));
const Product = React.lazy(() => import("./Product"));
const Job = React.lazy(() => import("./Job"));
const ToolslifeReccord = React.lazy(() => import("./Toolslife-reccord"));
const TRP = React.lazy(() => import("./TRP"));
const Settingcostcenter = React.lazy(() => import("./settingcostcenter"));
const Supplier = React.lazy(() => import("./Supplier"));
const Abnormal = React.lazy(() => import("./Abnormal"));
const Reorder = React.lazy(() => import("./Reorder"));
const Location = React.lazy(() => import("./Location"));
const Production = React.lazy(() => import("./Production"));
const Overview = React.lazy(() => import("./Overview"));
class SettingAnother extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/settinganother/product"
          render={(props) => <Product {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/stock"
          render={(props) => <Stock {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/user"
          render={(props) => <User {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/machine"
          render={(props) => <Machine {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/job"
          render={(props) => <Job {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/ToolslifeReccord"
          render={(props) => (
            <ToolslifeReccord {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          path="/settinganother/TRP"
          render={(props) => <TRP {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/Supplier"
          render={(props) => <Supplier {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/abnormal"
          render={(props) => <Abnormal {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/reorder"
          render={(props) => <Reorder {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/settingcostcenter"
          render={(props) => (
            <Settingcostcenter {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          path="/settinganother/location"
          render={(props) => <Location {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/production"
          render={(props) => <Production {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother/overview"
          render={(props) => <Overview {...props} {...this.props.SESSION} />}
        />
        <Route
          path="/settinganother"
          render={(props) => <View {...props} {...this.props.SESSION} />}
        />
      </Switch>
    );
  }
}
export default SettingAnother;
