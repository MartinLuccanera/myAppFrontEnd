import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/app';
import NeedLogin from './components/need_login';
import reducers from './reducers';
import Hub from './containers/hub';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/need_login" component={NeedLogin}/>
                <Route path="/hub" component={Hub}/>
            </div>
        </Router>
    </Provider>,
    document.querySelector('.container')
);
