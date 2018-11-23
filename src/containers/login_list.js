import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router'
import {bindActionCreators} from "redux";
import {hubAction} from "../actions/hub_action";

export class LoginList extends Component {
    message = 'Failed to login';
    //React stuff
    constructor(props){
        super(props);
        this.state = {
            isLoginSuccessful: null
        }
    }

    /**
     * <p>Resolves the promise that I brought from the reducer.</p>
     *
     * @param pro
     */
    renderLogin(pro) {
        pro.then(result => {
            this.message = '';
            //Once async request finishes, alter React's state for page to re-render.
            this.setState({
                isLoginSuccessful: true,
                result: result
            });

            //Store async call result to be used in other parts of the app.
            this.props.hubAction({
                access_token: this.state.result.data.access_token,
                refresh_token: this.state.result.data.refresh_token,
                username: this.props.login.username
            });
        }).catch(result => {
            this.message = 'Failed to login';
            //If I set state to something else, the component will re-render and the app will loop out of control.
        });
    }

    render() {
        //First render, show nothing.
        if (!this.props.login) {
            return <div> </div>
        }

        //If login is successful, go on.
        if (this.state.isLoginSuccessful) {
            return (
                <Route exact path="/" render={() => (
                    <Redirect to="/hub"/>
                )}/>
            );
        } else {
            this.renderLogin(this.props.login.payload);
            return (
                <div>{this.message}</div>
            );
        }
    }
}

/**
 * We are using state.login because we assigned the LoginReducer to a login key in reducers.index (combinedReducers)
 *
 * @param state
 * @returns {{login: *|Function}}
 */
function mapStateToProps(state) {
    return {
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ hubAction }, dispatch);
}

//We are exporting the connected version of LoginList (for state's sake).
export default connect(mapStateToProps, mapDispatchToProps)(LoginList);