import React, { Component } from 'react';
import LoginForm from '../containers/login_form';
import LoginList from '../containers/login_list';

export default class App extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <LoginList />
            </div>
        );
    }
}