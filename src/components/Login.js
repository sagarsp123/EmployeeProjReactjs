import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


class Login extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.state = {userdata:[],snackbaropen:false,snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://localhost:44366/api/userdetails/'+event.target.EmailID.value)
    .then(response=> response.json())
    .then(data=> {
        this.setState({
          userdata:data,        
        });
        console.log(this.state.userdata);
        console.log(this.state.userdata.emailID);
        
        if(this.state.userdata.emailID == "true" && this.state.userdata.profilePassword == event.target.Password.value){
          this.props.history.push('/Home')
        }
        
        else
        {
          this.setState({snackbaropen:true,snackbarmsg:'Login Failed'});
        }
        console.log(data);
    }  
    );
    
  }

  snackbarClose =(event) =>{
    this.setState({snackbaropen:false});
    };
  
    snackbarClose =(event) =>{
      this.setState({snackbaropen:false});
      };

    render() { 
      const{EmailID,Password,Role}=this.state;
        return ( 
          <div className="container">
          <Snackbar anchorOrigin={{vertical:'center',horizontal:'center'}}
             open={this.state.snackbaropen}
             autoHideDuration={3000}
             onClose={this.snackbarClose}
             message={<span id="message-id">{this.state.snackbarmsg}</span>}
             action={[
               <IconButton key="close"
               arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}> x</IconButton>
             ]}>
              
             </Snackbar>
                <Row className="Signin"> 
                <h2 className="m-3 d-flex justify-content-center">
         Employee Management Portal
        </h2>
       
                <h3>Login</h3> 
                  <Col sm={4}>
        
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="EmailID">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="EmailID" required placeholder="Enter Email"></Form.Control>                        
                      </Form.Group>
                      <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="Password" required placeholder="Enter Password"></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="EmpRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select">
                            <option id="1">Employee</option>
                            <option id="2">Manager</option>
                        </Form.Control>  
                      </Form.Group>
                      <Form.Group>
                        <Button varient="primary" type="submit">
                        Login
                        </Button>
                        <Button variant="success" onClick={event =>  window.location.href='/Signup'} classname="m-2" style={{marginLeft: 30}}>Signup</Button>

                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
      </div>
   
         );
    }
}
 
export default Login;