import React, { Component } from 'react';
import DefaultLayout from './DefaultLayout';
import PreloginProc from './PreloginProc';

class App extends Component {
  state = {
    initComp: "DefaultLayout"
  }
  switchProc = (comp) => {
    this.setState({
      initComp: comp
    })
  }
  render() {
    return (
      <div>
        {this.state.initComp === "DefaultLayout" && (
          <DefaultLayout switchProc={this.switchProc} />
        )}
        {this.state.initComp === "Login" && (
          <PreloginProc switchProc={this.switchProc}/>
        )}
      </div>
    );
  }
}

export default App;