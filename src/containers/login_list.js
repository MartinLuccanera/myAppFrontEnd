import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router'

class LoginList extends Component {
    state = {
        redirectToReferrer: false
    };

    /**
     * <p>Resolves the promise that I brought from the reducer.</p>
     *
     * @param pro
     */
    renderLogin(pro) {
        pro.then(result => {
            console.log('result.data', result.data);
            this.setState({redirectToReferrer: true})
        }).catch(result => {
            console.log('result', result.toString());
            this.setState({redirectToReferrer: false})
        });
    }

    render() {
        if (!this.props.login) {
            return <div> </div>
        }
        this.renderLogin(this.props.login.payload);

        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return (
                <Route exact path="/" render={() => (
                    <Redirect to="/success"/>
                )}/>
            );
        } else {
            //TODO: si cae aca explota todo!!!!, queda tirando intentos de login en bucle. seguro tiene q ver con state.
            return (
                <div> Failed to login. </div>
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