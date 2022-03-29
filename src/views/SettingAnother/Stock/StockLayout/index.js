import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
// const Insert = React.lazy(() => import('./insert'));
// const Update = React.lazy(() => import('./update'));



class StockLayout extends Component {
    render() {
        return (
            <Switch>
                {/* <Route exact path="/settinganother/product/product-type/update/:code" render={props => <Update {...props} />} /> */}
                {/* <Route exact path="/settinganother/product/product-type/insert" render={props => <Insert {...props} />} /> */}
                <Route path="/settinganother/stock/stock-layout" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (StockLayout);