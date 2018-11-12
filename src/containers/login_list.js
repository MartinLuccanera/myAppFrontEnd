import React, {Component} from 'react';
import {connect} from 'react-redux';

class LoginList extends Component {

    renderLogin(pro) {
        pro.then(results => {
            console.log('results.data', results.data);
            //state.setState(results.data);
            return results.data
        });
    }

    render() {
        console.log('got here');
        console.log('this.props', this.props);
        console.log('this.props.login', this.props.login);
        if (!this.props.login_) {
            //If book is null (at boot-up time there is no selected book).
            return <div>Select a book to get started.</div>
        }
        return (
            <div>
                Login: {this.renderLogin(this.props.login_)}
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
        login_: state.login
    };
}

//We are exporting the connected version of LoginList (for state's sake).
export default connect(mapStateToProps)

(
    LoginList
)
;