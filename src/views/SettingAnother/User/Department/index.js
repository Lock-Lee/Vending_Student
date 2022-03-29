import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));



class Department extends Component {
    render() {
        const { permission_edit, permission_add } = this.props.SESSION.PERMISSION
        return (
            <Switch>
                {permission_edit ? <Route exact path="/settinganother/user/department/update/:code" render={props => <Update {...props} />} /> : ""}
                {permission_add ? <Route exact path="/settinganother/user/department/insert" render={props => <Insert {...props} />} /> : ""}
                <Route path="/settinganother/user/department" render={props => <View {...props} {...this.props.SESSION.PERMISSION} />} />
            </Switch>
        )
    }
}
export default (Department);