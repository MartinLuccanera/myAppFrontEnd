import React, {Component} from 'react';
import {MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import {connect} from "react-redux";
import {Route, Redirect} from 'react-router';
import {profileEditAction} from "../actions/profile_edit_action";
import {bindActionCreators} from "redux";
import {ENDPOINT_URL} from "./hub";
import axios from "axios/index";
import img from '../../resources/images/giphy.gif';

export class ProfileEdit extends Component {

    constructor(props) {
        super(props);
        this.handleReLogin = this.handleReLogin.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.submitProfileChanges = this.submitProfileChanges.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {};
        if (this.props.state.profile && this.props.state.profile.data) {
            this.state = {
                birthdate: this.props.state.profile.data.birthdate,
                name: this.props.state.profile.data.name,
                username: this.props.state.profile.data.username,
                bio: this.props.state.profile.data.bio,
                email: this.props.state.profile.data.email,
                needLogin: false
            };
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Route exact path="/profile-edit" render={() => (
                    <Redirect to="/hub"/>
                )}/>
            );
        }
        if (this.state.needRedirect) {
            //If you are not logged in, you are redirected to login page (AKA /).
            return (
                <Route exact path="/profile-edit" render={() => (
                    <Redirect to="/"/>
                )}/>
            );
        }
        if (this.props.state.login && this.props.state.login.payload &&
            this.props.state.login.payload.access_token && this.props.state.profile) {
            return (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <h3>Edit your profile</h3>
                            <TextField
                                name="birthdate"
                                className="input-group"
                                floatingLabelText="Date of birth"
                                value={this.state.birthdate}
                                onChange={this.onInputChange}
                            /><br/>
                            <TextField
                                name="name"
                                className="input-group"
                                floatingLabelText="name"
                                value={this.state.name}
                                onChange={this.onInputChange}
                            /><br/>
                            <TextField
                                name="username"
                                className="input-group"
                                floatingLabelText="username"
                                value={this.state.username}
                            /><br/>
                            <TextField
                                name="bio"
                                className="input-group"
                                floatingLabelText="bio"
                                value={this.state.bio}
                                onChange={this.onInputChange}
                            /><br/>
                            <TextField
                                name="email"
                                className="input-group"
                                floatingLabelText="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            /><br/>
                            <RaisedButton
                                className="raised-button"
                                label="Submit profile changes"
                                primary={true}
                                onClick={
                                    (event) =>
                                        this.submitProfileChanges(
                                            this.props.state.login.payload.username,
                                            this.props.state.login.payload.access_token,
                                            this.state.birthdate,
                                            this.state.name,
                                            this.state.username,
                                            this.state.bio,
                                            this.state.email
                                        )
                                }
                            />
                            <RaisedButton
                                className="raised-cancel-button"
                                label="Cancel"
                                primary={false}
                                onClick={this.handleCancel}
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
     * <p>If you are not logged in, state is updated and login-redirect-button is shown.</p>
     */
    handleReLogin() {
        this.setState({needRedirect: true});
    }

    /**
     * <p>If you are not logged in, state is updated and login-redirect-button is shown.</p>
     */
    handleCancel() {
        this.setState({redirect: true});
    }

    onInputChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    /**
     * <p>Redirect you to edit your profile.</p>
     */
    submitProfileChanges(user, token, birthdate, name, username, bio, email) {
        console.log("TOKEN", token);
        const url = `${ENDPOINT_URL}?username=${user}&name=${name}&email=${email}&bio=${bio}&birthdate=${birthdate}`;
        var data = {
            username: user,
            name: name,
            email: email,
            bio: bio,
            birthdate: birthdate
        };
        //performs async request for auth data.
        const request = axios.post(
            url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res) => {
            this.setState({redirect: true});
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        });
        return (
            <div>
                <img src={img}/>
            </div>
        );
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({profileEditAction}, dispatch);
}

//We are exporting the connected version of LoginList (for state's sake).
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
//export default connect(mapDispatchToProps)(ProfileEdit);
