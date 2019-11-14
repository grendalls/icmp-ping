import React, { Component } from "react";
import "./App.css";
import Login from "../Login";
import Register from "../Register";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Header from "../Header";
import DeviceTable from "../DeviceTable";
import { Box } from "@material-ui/core";

class App extends Component {
  state = {
    isLoggedIn: false,
    devices: []
  };
  handleAction = isOk => {
    this.setState(state => {
      return { ...state, ...isOk };
    });
  };
  handleSignOut = () => {
    this.setState(state => {
      return { ...state, isLoggedIn: false };
    });
  };
  render() {
    const { isLoggedIn } = this.state;

    return (
      <BrowserRouter>
        {isLoggedIn ? (
          <Header handleSignOut={() => this.handleSignOut()} />
        ) : null}
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Login
                  {...props}
                  handleAction={isOk => this.handleAction(isOk)}
                />
              );
            }}
          />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/table"
            render={() => {
              return isLoggedIn ? <DeviceTable /> : <Redirect to="/" />;
            }}
          />
        </Box>
      </BrowserRouter>
    );
  }
}

export default App;
