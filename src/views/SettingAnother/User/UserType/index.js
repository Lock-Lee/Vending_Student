import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));

class UserType extends Component {
    render() {
        const { permission_edit, permission_add } = this.props.SESSION.PERMISSION
        return (
            <Switch>
                {permission_edit ? <Route exact path="/settinganother/user/user-type/update/:code" render={props => <Update {...props} />} /> : ""}
                {permission_add ? <Route exact path="/settinganother/user/user-type/insert" render={props => <Insert {...props} />} /> : ""}
                <Route path="/settinganother/user/user-type" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (UserType);