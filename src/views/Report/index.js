import React from "react";
import { Route, Switch } from "react-router-dom";

const View = React.lazy(() => import("./view"));
const ReceiveReport = React.lazy(() => import("./ReceiveReport"));
const IssueReport = React.lazy(() => import("./IssueReport"));
const BalanceReport = React.lazy(() => import("./BalanceReport"));
const IncidentReport = React.lazy(() => import("./IncidentReport"));
const TransactionReport = React.lazy(() => import("./TransactionReport"));
const LowStockReport = React.lazy(() => import("./LowStockReport"));
const SettingReport = React.lazy(() => import("./SettingReport"));
const SendSetting = React.lazy(() => import("./SendSetting"));
const SendSettingInsert = React.lazy(() => import("./SendSetting/insert"));
const SendSettingUpdate = React.lazy(() => import("./SendSetting/update"));

class Report extends React.Component {
  render() {
    const { permission_add, permission_edit } = this.props.SESSION.PERMISSION;

    return (
      <Switch>
        <Route
          exact
          path="/report/receive"
          render={(props) => (
            <ReceiveReport {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          exact
          path="/report/issue"
          render={(props) => <IssueReport {...props} {...this.props.SESSION} />}
        />
        <Route
          exact
          path="/report/balance"
          render={(props) => (
            <BalanceReport {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          exact
          path="/report/incident"
          render={(props) => (
            <IncidentReport {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          exact
          path="/report/transaction"
          render={(props) => (
            <TransactionReport {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          exact
          path="/report/lowstock"
          render={(props) => (
            <LowStockReport {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          exact
          path="/report/setting"
          render={(props) => (
            <SettingReport {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          exact
          path="/report/send-setting"
          render={(props) => <SendSetting {...props} {...this.props.SESSION} />}
        />
        <Route
          exact
          path="/report/send-setting/insert"
          render={(props) => (
            <SendSettingInsert {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          exact
          path="/report/send-setting/update/:code"
          render={(props) => (
            <SendSettingUpdate {...props} {...this.props.SESSION} />
          )}
        />
        <Route
          path="/report"
          render={(props) => {
            return <View {...props} {...this.props.SESSION} key={"1"} />;
          }}
        />
      </Switch>
    );
  }
}

export default Report;
