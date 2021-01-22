import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";

class DeleteEmpModal extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {isLoading:true,userdata:[]};
    }

    componentWillMount(){
      localStorage.getItem('currentUser') && this.setState({
          userdata:JSON.parse(localStorage.getItem('currentUser')),
          isLoading:false
      })
    }


    handleSubmit(event){
        event.preventDefault();
        console.log(this.props.empid);

        //Deleting values from Api
        fetch(configData.URL+'/employees/'+this.props.empid,
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
              <Modal.Title id="contained-modal-title-vcenter" style={{marginLeft:'28%'}}>
                Delete Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:300}}>
                <Row>
                  <Col sm={15}>
                    <Form>
                    <Form.Group controlId="EmployeeID" style={{width: 'max-content',marginLeft:'12%'}}>
                        <Form.Label>Are you sure you want to delete employee:{this.props.empname}?</Form.Label>
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
 
export default DeleteEmpModal;