import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class DeleteDepModal extends Component {
    constructor(props){
        super(props);
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={isLoading:true,userdata:[]}
    }
    componentWillMount(){
      localStorage.getItem('currentUser') && this.setState({
          userdata:JSON.parse(localStorage.getItem('currentUser')),
          isLoading:false
      })
  }

    handleSubmit(event){
      event.preventDefault();
      console.log(this.props.depid);

     //Deleting values from Api
      fetch(configData.URL+'/departments/'+this.props.depid,
      {
        'method': 'DELETE',
        'mode': 'cors',
        'headers': {
          'Content-Type': 'application/json; charset=utf-8;',
          //'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'bearer '+this.state.userdata.secureToken
      }
      });
     
    }
    

    render() { 
        return (   
            <div className="container">  
            <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header style={{backgroundColor:'lightgrey'}} closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{marginLeft:'27%'}}>
                Delete Department
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:300}}>
                <Row>
                  <Col sm={15}>
                    <Form>
                    <Form.Group controlId="DepartmentID" style={{width: 'max-content',marginLeft:'12%'}}>
                        <Form.Label>Are you sure you want to delete department:{this.props.depname}?</Form.Label>
                      </Form.Group>
                      <Form.Group style={{marginLeft:'37%'}}>
                      <Button  variant="primary" onClick={this.handleSubmit} onClickCapture={this.props.onHide}>Confirm</Button>
                      <Button variant="danger" onClick={this.props.onHide} style={{marginLeft: 30}}>Cancel</Button> 
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
           
            </Modal.Body>
          </Modal>
            </div>
            );
    }
}
 
export default DeleteDepModal;