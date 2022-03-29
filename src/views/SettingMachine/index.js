import React from 'react'
import {  Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))


class SettingMachine extends React.Component {
  render() {
    const { permission_add, permission_edit } = this.props.SESSION.PERMISSION
     
    return (
          <Switch>
            <Route path="/SettingMachine" render={props => <View {...props} {...this.props.SESSION} />} />
          </Switch>
    )
  }
}

export default SettingMachine