import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/app';
import reducers from './reducers';
import Hub from './containers/hub';
import ProfileEdit from './containers/profile_edit';

const createStoreWithMiddleware = applyMiddleware()(createStore);

//Single page stuff. Route uses these routes to show the JSX as requested.
//Route helps you have a single page to show, the origin of the JSX is defined here via the /page -> Class mapping (sorta?).
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/hub" component={Hub}/>
                <Route path="/profile-edit" component={ProfileEdit}/>
            </div>
        </Router>
    </Provider>,
    document.querySelector('.container')
);
