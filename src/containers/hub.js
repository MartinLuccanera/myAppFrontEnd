import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Route, Redirect} from 'react-router';

export class Hub extends Component {

    constructor(props) {
        super(props);
        this.handleReLogin = this.handleReLogin.bind(this);
        this.state = { needLogin: false }
    }

    render() {
        console.log('hub - this.props: ', this.props);
        console.log('this.state.needRedirect: ', this.state.needRedirect);
        if (this.state.needRedirect) {
            return (
                <Route exact path="/hub" render={() => (
                    <Redirect to="/"/>
                )}/>
            );
        }
        //This needs to be protected with login
        //token has to be valid
        if (this.props.state.login && this.props.state.login.payload && this.props.state.login.payload.access_token) {
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

    handleClick() {
        //redirect to profile page
    }

    handleReLogin() {
        this.setState({needRedirect: true});
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

//The only reason why we are passing null here is that whenever we are passing a function, that is supposed to map
// our dispatch to the props of our container, it always goes in as the second argument.
// That is why we pass null as the first. We are saying that we don't need the state.
export default connect(mapStateToProps)(Hub);