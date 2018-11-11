import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from "../actions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LoginForm extends Component {
    //We do this constructor thing to initiate the component-level state (not the redux state).
    //Then, we are gonna use a change handler on the input to update the state.
    constructor(props) {
        super(props);

        this.state = {username: '', password: ''};
        /* By doing this, we are saying that 'this' (our instance of loginForm) has a function called onInputChange
         * bind that function to 'this' and then replace onInputChange with this new bound instance of this function
         * (Override the local method with the new method that has 'this' bind).
         */
        this.onInputChange = this.onInputChange.bind(this);

        //Remember to bind the context or else 'this' won't be what we expect it to be (will
        // error on this.props.fetchWeather(this.state.term);)
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    /* All DOM eventHandlers like onClick come along with 'event' object (Vanilla JS). */

    onInputChange(event) {
        //console.log(event.target);
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    /**
     * <p>This is to prevent the browser to try to submit the form when pressing 'enter' or clicking 'submit' button.
     * That behavior is the default one when dealing with a <form/>.</p>
     * <p>Also, we are gonna call the action creator whenever the user submits the form.</p>
     *
     * @param event
     */
    onFormSubmit(event) {
        event.preventDefault();
        //Now we attempt to login.
        this.props.login(this.state.username, this.state.password);
        //this.setState({password: ''}); //-> clear search form.
    }


    render() {
        {/*input-group is a bootstrap css*/}
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            className="input-group"
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onInputChange}
                        />
                        <br/>
                        <TextField
                            className="input-group"
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onInputChange}
                        />
                        <br/>
                        <RaisedButton
                            label="Submit"
                            primary={true}
                            style={style}
                            onClick={
                                (event) => this.onFormSubmit(event)
                            }
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

/**
 * <p>This causes the action creator (whenever it gets called and returns an action) binds
 * action creators (fetchWeather) with dispatch to make sure that that action flows down into the middleware and then
 * into the reducers inside our redux application.</p>
 * <p>So, by binding the action creator (fetchWeather) to dispatch and then mapping it to props; gives us access to
 * the function this.prop.fetchWeather inside our component. Now we can use it in onFormSubmit().</p>
 *
 * @param dispatch
 * @returns {*}
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({login}, dispatch);
}

//The only reason why we are passing null here is that whenever we are passing a function, that is supposed to map
// our dispatch to the props of our container, it always goes in as the second argument. That is why we pass null as the first.
// We are saying that we don't need the state.
export default connect(null, mapDispatchToProps)(LoginForm);