import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));



class ProductGroup extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/settinganother/product/product-brand/update/:code" render={props => <Update {...props} />} />
                <Route exact path="/settinganother/product/product-brand/insert" render={props => <Insert {...props} />} />
                <Route path="/settinganother/product/product-brand" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (ProductGroup);