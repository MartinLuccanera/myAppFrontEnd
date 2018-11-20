import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router'

class LoginList extends Component {
    message = 'Failed to login';
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
            console.log('result.data', result.data);
            this.message = '';
            this.setState({
                isLoginSuccessful: true
            });
        }).catch(result => {
            this.message = 'Failed to login';
            console.log('result', result.toString());
            //If I set state to something else, the component will re-render and the app will loop out of control.
        });
    }

    render() {
        if (!this.props.login) {
            return <div> </div>
        }

        if (this.state.isLoginSuccessful) {
            console.log('this.props: ', this.props);
            console.log('Logged in');
            return (
                <Route exact path="/" render={() => (
                    <Redirect to="/success"/>
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
function

mapStateToProps(state) {
    return {
        login: state.login
    };
}

//We are exporting the connected version of LoginList (for state's sake).
export default connect(mapStateToProps)(LoginList);