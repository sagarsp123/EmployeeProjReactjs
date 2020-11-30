import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

class Navigation extends Component {
    render() { 
        return ( 
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white"
                to="/Home">Home</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white"
                to="/Aboutus">About Us</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white"
                to="/department">Department</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white"
                to="/employee">Employee</NavLink>
                 <NavLink className="d-inline p-2 bg-dark text-white"
                to="/">Logout</NavLink>
                </Nav>
                </Navbar.Collapse>
                
            </Navbar>
         );
    }
}
 
export default Navigation;