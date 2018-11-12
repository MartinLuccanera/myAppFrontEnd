import React, { Component } from "react";
import Route from "react-router";
import Redirect from "react-router-dom";

export default class NeedLogin extends Component {
    render() {
        return (
            <div>
                <p>You must log in to view this page.</p>
                <button onClick={
                    <Route exact path="/need_login" render={() => (
                        <Redirect to="/"/>
                    )}/>
                }>Log in</button>
            </div>
        );
    }
}