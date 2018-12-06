import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Route, Redirect} from 'react-router';
import axios from "axios/index";
import {TextField} from "material-ui";

const ENDPOINT_URL = 'http://localhost:8080/secured/user/profile';
export class Hub extends Component {
//TODO: Cuando hago click en editar el perfil, mandar todo a profile/edit y manejar los cambios de los inputs ahi.
    /**
     * React stuff.
     * @param props
     */
    constructor(props) {
        super(props);
        this.handleReLogin = this.handleReLogin.bind(this);
        this.renderProfilePage = this.renderProfilePage.bind(this);
        this.handleMakeProfileEditable = this.handleMakeProfileEditable.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = { needLogin: false }
    }

    renderProfilePage(pro) {
        pro.then(result => {
            //Once async request finishes, alter React's state for page to re-render.
            this.setState({
                message: result
            });
        }).catch(result => {
            //If I set state to something else, the component will re-render and the app will loop out of control.
        });
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
            if (!this.state.message){ // || this.state.editable) {
                if (this.state.editable) {
                    console.log('Editable.');
                    //return null;
                } else {
                    console.log('No message.');
                }
                this.fetchProfile(this.props.state.login.payload.username, this.props.state.login.payload.access_token);
                return null;
            }
            console.log('Yes message.');
            console.log('this.state.message.data: ', this.state.message.data);
            //const items = this.state.message.data.map((d,i) => <li>{d[i].name}</li>);
            if (this.state.editable) {
                return (
                    <div>
                        <MuiThemeProvider>
                            <div>

                                <TextField
                                    name="id"
                                    className="form-group"
                                    floatingLabelText="id"
                                    value={this.state.message.data.id}
                                /><br/>
                                <TextField
                                    name="name"
                                    className="form-group"
                                    floatingLabelText="name"
                                    value={this.state.message.data.name}
                                /><br/>
                                <TextField
                                    name="username"
                                    className="form-group"
                                    floatingLabelText="username"
                                    value={this.state.message.data.username}
                                /><br/>
                                <TextField
                                    name="bio"
                                    className="form-group"
                                    floatingLabelText="bio"
                                    value={this.state.message.data.bio}
                                /><br/>
                                <TextField
                                    name="email"
                                    className="form-group"
                                    floatingLabelText="email"
                                    value={this.state.message.data.email}
                                /><br/>
                                <RaisedButton
                                    className="raised-button"
                                    label="Submit profile change"
                                    primary={true}
                                    onClick={this.submitProfileChange}
                                /> <br/>
                            </div>
                        </MuiThemeProvider>
                    </div>
                )
            } else {
                return (
                    <div>
                        <MuiThemeProvider>
                            <div>
                                <TextField
                                    name="id"
                                    floatingLabelText="id"
                                    value={this.state.message.data.id}
                                    onChange={this.onInputChange}
                                /><br/>
                                <TextField
                                    name="name"
                                    floatingLabelText="name"
                                    value={this.state.message.data.name}
                                    onChange={this.onInputChange}
                                /><br/>
                                <TextField
                                    name="username"
                                    floatingLabelText="username"
                                    value={this.state.message.data.username}
                                    onChange={this.onInputChange}
                                /><br/>
                                <TextField
                                    name="bio"
                                    floatingLabelText="bio"
                                    value={this.state.message.data.bio}
                                    onChange={this.onInputChange}
                                /><br/>
                                <TextField
                                    name="email"
                                    floatingLabelText="email"
                                    value={this.state.message.data.email}
                                    onChange={this.onInputChange}
                                /><br/>
                                <RaisedButton
                                    className="raised-button"
                                    label="Edit profile fields"
                                    primary={true}
                                    onClick={this.handleMakeProfileEditable}
                                /> <br/>
                            </div>
                        </MuiThemeProvider>
                    </div>
                )
            }
        } else {
            console.log('No state, no token.');
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
    handleMakeProfileEditable() {
        this.setState({editable: true});
    }

    /**
     * <p>If you are not logged in, state is updated and login-redirect-button is shown.</p>
     */
    handleReLogin() {
        this.setState({needRedirect: true});
    }

    fetchProfile(user, token) {
        const url = `${ENDPOINT_URL}?username=${user}`;
        //performs async request for auth data.
        const request = axios.get(
            url, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );
        this.renderProfilePage(request);
    }

    onInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
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