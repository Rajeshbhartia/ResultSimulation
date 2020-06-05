import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Icon } from '@material-ui/core';
import PageContent from './PageContent';
import Faq from './Faq';
import AppLogo from "./resource/app_logo.png"

class App extends Component {
  state = {
    content: "home"
  }
  setContent = (content) => {
    this.setState({
      content
    })
  }
  render() {
    let opA = this.state.content === "home" ? 0.9 : 1;
    let opB = this.state.content === "faq" ? 0.9 : 1;

    return (
      <div >
        <AppBar position="fixed" color="primary" elevation={2} >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems:"center"}}>
              <Icon style={{ marginRight:8}}>
                <img alt="logo" src={AppLogo} height={25} width={25} />
              </Icon>
              <Typography variant="h6" component="h2">
                KARMA
            </Typography>
            </div>
            <div>
              <span style={{ paddingRight: "20px", cursor: "pointer", opacity: opA }} onClick={() => { this.setContent("home") }}> Home</span>
              <span style={{ cursor: "pointer", opacity: opB }} onClick={() => { this.setContent("faq") }}> Faq</span>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: "70px", padding: "20px" }}>
          {this.state.content === "home" && (
            <PageContent />
          )}
          {this.state.content === "faq" && (
            <Faq />
          )}
        </div>
      </div>
    );
  }
}

export default App;
