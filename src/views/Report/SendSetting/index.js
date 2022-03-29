import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));



class ProductGroup extends Component {
    render() {
        return (
            <Switch> 
                <Route path="/report/send-setting" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (ProductGroup);