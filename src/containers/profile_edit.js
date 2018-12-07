import React, {Component} from 'react';
import {MuiThemeProvider, TextField} from "material-ui";
import {connect} from "react-redux";
import axios from "axios/index";
import {ENDPOINT_URL} from "./hub";
import img from '../../resources/images/giphy.gif'

export class ProfileEdit extends Component {

    constructor(props) {
        super(props);
        this.renderProfilePage = this.renderProfilePage.bind(this);
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


    render() {

        console.log('in render');
        console.log('this.props.state: ', this.props.state);
        if (this.props.state.login && this.props.state.login.payload && this.props.state.login.payload.access_token) {
            //TODO: Show a spinner until inner state has received confirmation from valid token AND finished receiving
            //TODO: JSON from backend with user data.
            if (!this.props.state.message) {
                console.log('No message.');
                this.fetchProfile(this.props.state.login.payload.username, this.props.state.login.payload.access_token);
                return(
                    <div>
                        <img src={img} />
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                name="id"
                                className="input-group"
                                floatingLabelText="id"
                                value={this.state.message.data.id}
                            /><br/>
                            <TextField
                                name="name"
                                className="input-group"
                                floatingLabelText="name"
                                value={this.state.message.data.name}
                            /><br/>
                            <TextField
                                name="username"
                                className="input-group"
                                floatingLabelText="username"
                                value={this.state.message.data.username}
                            /><br/>
                            <TextField
                                name="bio"
                                className="input-group"
                                floatingLabelText="bio"
                                value={this.state.message.data.bio}
                            /><br/>
                            <TextField
                                name="email"
                                className="input-group"
                                floatingLabelText="email"
                                value={this.state.message.data.email}
                            /><br/>
                        </div>
                    </MuiThemeProvider>
                </div>
            )
        }
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
}

//TODO: Ver como conectar esto con redux y que reciba el state del paso anterior.
//TODO: OOOO hacer un nuevo get al server y popular con eso.
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

export default connect(mapStateToProps)(ProfileEdit);
