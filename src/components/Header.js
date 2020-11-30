import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Col, Container,  Image} from 'react-bootstrap';
import './Aboutus.css';

class Header extends Component {
    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
 <Image src="assets/image4.png" className="about-logo" rounded />
  <h2 className="m-3 d-flex justify-content-center">
         Employee Management Portal
        </h2>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    
    
      {/* <Button positionvariant="outline-success float-right pull-right" onClick={event =>  window.location.href='/'}>Log Out</Button> */}
     
   
  </Navbar.Collapse>
</Navbar>
         );
    }
}
 
export default Header;