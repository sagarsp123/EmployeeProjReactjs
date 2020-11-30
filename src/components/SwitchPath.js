import React, { Component } from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './Home';
import Department from './Department';
import Employee from './Employee';
import Signup from './Signup';
import Aboutus from './Aboutus';
import Login from './Login'

class SwitchPath extends Component {
    state = {  }
    render() { 
        return (
            <Switch>
            <Route path='/' component={Login} exact></Route>
            <Route path='/Aboutus' component={Aboutus} exact></Route>
            <Route path='/Home' component={Home} exact></Route>
            <Route path='/Department' component={Department}></Route>
            <Route path='/Employee' component={Employee}></Route>
            <Route path='/Signup' component={Signup}></Route>
          </Switch>
          );
    }
}
 
export default SwitchPath;