import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, Container,  Image} from 'react-bootstrap';
import {BrowserRouter, Route,Switch,withRouter,Router} from 'react-router-dom';
import SwitchPath from './SwitchPath';
import Navigation from './Navigation';
import Footer from './Footer';
import Header from './Header';
import Signup from './Signup';
import './Aboutus.css'
class Home extends Component {
    // handleClick = () => {

    //     this.props.history.push("/signup");
        
    //  }
    render() { 
        return ( 
            <div className="page-container">
            <div className="content-wrap">
            <div className="container">
   
                {/* <h3 className="m-3 d-flex justify-content-center">
        Employee Management Portal
        </h3> */}
                <Header></Header>
                <Navigation></Navigation>
            <div className="mt-5 d-flex justify-content-left">
              
                <h3>Welcome to Employee Management Portal!!!</h3>
                <br></br>
                <container>
                {/* <h3 style={styleObj}>About Us</h3> */}
                    <Col xs={12} sm={10} smOffset={4}>
                    
                        <Image src="assets/image3.jpg" className="about-profile-pic" rounded />
                      
    
                    </Col>
                    </container>
                {/* <Button type='submit'classname="m-2" onClick={this.handleClick} style={{marginLeft: 30}} variant="danger">Close</Button> */}
                <BrowserRouter>
               
                <Switch>
                <Route path='/signup' component={Signup}></Route>
                </Switch>
               
          </BrowserRouter>
         
               
          </div>
          </div>
        </div>
          <Footer></Footer>
            </div>
           
         );
    }
}
 
export default Home;