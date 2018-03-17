import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Header from './Components/Header/header';
import Home from './Components/Home/home';
import Single from './Components/Single/single';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import './App.css';


class App extends Component {
  render() {
    return (
      <div id="main">
        <Header />
        <div className="container site-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/single/:id" component={Single} />
            <Route path="/login"component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
