import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export class Hub extends Component {

    constructor(props){
        super(props);
    }

    render() {
        console.log('this.props.state: ', this.props.state);
        //This needs to be protected with login
        //token has to be valid
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <RaisedButton
                            className="raised-button"
                            label="Profile"
                            primary={true}
                            onClick={
                                (event) => this.handleClick(event)
                            }
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event){
        //redirect to profile page
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