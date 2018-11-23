import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Route, Redirect} from 'react-router';

export class Hub extends Component {

    /**
     * React stuff.
     * @param props
     */
    constructor(props) {
        super(props);
        this.handleReLogin = this.handleReLogin.bind(this);
        this.state = { needLogin: false }
    }

    /**
     * Here be thy magic.
     * @returns {*}
     */
    render() {
        if (this.state.needRedirect) {
            //If you are not logged in, you are redirected to login page (AKA /).
            return (
                <Route exact path="/hub" render={() => (
                    <Redirect to="/"/>
                )}/>
            );
        }
        //TODO: token has to be valid
        if (this.props.state.login && this.props.state.login.payload && this.props.state.login.payload.access_token) {
            //TODO: Show a spinner until inner state has received confirmation from valid token AND finished receiving
            //TODO: JSON from backend with user data.
            return (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton
                                className="raised-button"
                                label="Profile"
                                primary={true}
                                onClick={this.handleClick}
                            />
                        </div>
                    </MuiThemeProvider>
                </div>
            )
        } else {
            return (
                <div>
                    You need to login to access this page.
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton
                                className="raised-button"
                                label="Login"
                                primary={true}
                                onClick={this.handleReLogin}
                            />
                        </div>
                    </MuiThemeProvider>
                </div>
            )
        }
    }

    /**
     * <p>If you are logged in, you are shown your profile.</p>
     */
    handleClick() {
        //TODO: redirect to profile page
    }

    /**
     * <p>If you are not logged in, state is updated and login-redirect-button is shown.</p>
     */
    handleReLogin() {
        this.setState({needRedirect: true});
    }
}

/**
 * Redux stuff.
 * @param state
 * @returns {{state: *}}
 */
function mapStateToProps(state) {
    return {
        state: state
    };
}

export default connect(mapStateToProps)(Hub);