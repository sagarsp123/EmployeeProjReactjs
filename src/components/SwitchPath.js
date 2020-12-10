import React, { Component } from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './Home';
import Department from './Department';
import Employee from './Employee';
import Signup from './Signup';
import Aboutus from './Aboutus';
import Login from './Login'
import  Fileupload  from './FileUpload';
import LeaveRequest from "./LeaveRequest";
import EmpOrgStruc from "./EmpOrgStruc";
import OrgChart from "./mycharttest"; 
import LeaveDetails from './LeaveApprove'
import MyProfile from './Myprofile';


class SwitchPath extends Component {
    state = {  }
    render() { 
        return (
            <BrowserRouter>
            <Switch>
            <Route path='/' component={Login} exact></Route>
            <Route path='/Aboutus' component={Aboutus} exact></Route>
            <Route path='/Home' component={Home} exact></Route>
            <Route path='/Department' component={Department}></Route>
            <Route path='/Employee' component={Employee}></Route>
            <Route path='/Signup' component={Signup}></Route>
            <Route path='/Fileupload' component={Fileupload}></Route>
            <Route path="/Leaverequest" component={LeaveRequest}></Route>
            <Route path="/OrgChart" component={OrgChart}></Route>
            <Route path="/LeaveDetails" component={LeaveDetails}></Route>
            <Route path="/MyProfile" component={MyProfile}></Route>
          </Switch>
          </BrowserRouter>
          );
    }
}
 
export default SwitchPath;