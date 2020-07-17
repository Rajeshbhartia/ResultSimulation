import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';

class PreloginProc extends Component {
    state = {
        initComp: "login"
    }
    switchComp = (initComp) => {
        this.setState({
            initComp
        })
    }

    render() {
        return (
            <>
                {this.state.initComp === "login" && (
                    <Login switchProc={this.props.switchProc} switchComp={this.switchComp} />
                )}
                {this.state.initComp === "signup" && (
                    <Signup switchProc={this.props.switchProc} switchComp={this.switchComp} />
                )}
            </>
        );
    }
}

export default PreloginProc;