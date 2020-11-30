import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddDepModal extends Component {
    constructor(props){
        super(props);

        this.state = {snackbaropen:false,snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose =(event) =>{
    this.setState({snackbaropen:false});
    };

    handleSubmit(event){
      event.preventDefault();
      // alert(event.target.DepartmentName.value);

      //consuming post Api method
      fetch('https://localhost:44366/api/departments',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          departmentID:0,
          departmentName: event.target.DepartmentName.value
        })
      })
      .then(res=> {res.json()
        console.log(res);
        if(res.status == 201)
        {
          this.setState({snackbaropen:true,snackbarmsg:'Added Successfully'});
        }
        else
        {
          this.setState({snackbaropen:true,snackbarmsg:'Operation Failed'});
        }
      })
      .then((result)=>{
        // alert(result);
        // this.setState({snackbaropen:true,snackbarmsg:result});
      },
      (error)=>{
        //alert('Failed')
        // this.setState({snackbaropen:true,snackbarmsg:'Failed'});
      }
      )
    }

    render() { 
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
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Department
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <Row>
                  <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="DepartmentName">
                        <Form.Label>DepartmentName</Form.Label>
                        <Form.Control type="text" name="DepartmentName" required placeholder="DepartmentName"></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Button variant="primary" type="submit">
                          Add Department
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
           
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
           </div>
         );
    }
}

