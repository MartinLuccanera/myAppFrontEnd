import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginList extends Component {

    /**
     * <p>Resolves the promise that I brought from the reducer.</p>
     *
     * @param pro
     */
    renderLogin(pro) {
        pro.then(results => {
            console.log('results.data', results.data);
            return results.data
        });
    }

    render() {
        if (!this.props.login) {
            return <div>Select a book to get started.</div>
        }
        return (
            <div>
                Login: {this.renderLogin(this.props.login.payload)} Logged in as {this.props.login.username}
            </div>
        );
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