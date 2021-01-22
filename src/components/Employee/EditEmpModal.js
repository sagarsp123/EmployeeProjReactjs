import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import * as moment from 'moment';
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import configData from "../config.json";
const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class EditEmpModal extends Component {
    constructor(props){
        super(props);

        this.state = {deps:[],snackbaropen:false,snackbarmsg:'',  EmailID:this.props.mailid,
        emailAddressError: "",Doj:this.props.doj,isLoading:true,userdata:[]};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    componentWillMount(){
      localStorage.getItem('currentUser') && this.setState({
          userdata:JSON.parse(localStorage.getItem('currentUser')),
          isLoading:false
      })
    }

    handleChange(event) {
      const { name, value } = event.target;
  
      this.setState({
        [name]: value
      });
  
      return;
    }
  
    handleBlur(event) {
      const { name } = event.target;
  
      this.validateField(name);
      return;
    }

    validateField(name) {
      let isValid = false;
  
       if (name === "EmailID") isValid = this.validateEmailAddress();
    }
    
    validateEmailAddress() {
      let emailAddressError = "";
      const value = this.state.EmailID;
      if (value.trim === "") emailAddressError = "Email Address is required";
      else if (!emailValidator.test(value))
        emailAddressError = "Email is not valid";
  
      this.setState({
        emailAddressError
      });
      return emailAddressError === "";
    }

    //Collecting all department details using api which can be used as value for Department drop-down list
    componentDidMount(){
        fetch(configData.URL+'/departments',{
          'method': 'GET',
          'mode': 'cors',
          'headers': {
            'Content-Type': 'application/json; charset=utf-8;',
            //'Content-Type':'application/x-www-form-urlencoded',
          'Authorization':'bearer '+this.state.userdata.secureToken
        }
        })
        .then(response=> response.json())
        .then(data=> {
            this.setState({
                deps:data
            });
        }  
        );
    }

    snackbarClose =(event) =>{
        this.setState({snackbaropen:false});
        };
    
        handleSubmit(event){
          event.preventDefault();
          // alert(event.target.DepartmentName.value);
    
          //consuming post Api method
          fetch(configData.URL+'/employees',{
            method:'PUT',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization':'bearer '+this.state.userdata.secureToken
            },
            body:JSON.stringify({
              employeeID:event.target.EmployeeID.value,
              employeeName: event.target.EmployeeName.value,
              department: event.target.Department.value,
              mailID: event.target.EmailID.value,
              doj:event.target.DOJ.value,
              managerID:1
            })
          })
          .then(res=> {res.json()
            console.log(res);
            if(res.status == 200)
            {
              this.setState({snackbaropen:true,snackbarmsg:'Updated Successfully'});
            }
            else
            {
              this.setState({snackbaropen:true,snackbarmsg:'Update Failed'});
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
            <Modal.Header style={{backgroundColor:'lightgrey'}} closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{marginLeft:'39%'}}>
                Edit Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{marginLeft:'19%'}}>
            
                <Row>
                  <Col sm={9}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group style={{display:"none"}} controlId="EmployeeID">
                        <Form.Label>EmployeeID</Form.Label>
                        <Form.Control type="text" name="EmployeeID" required defaultValue={this.props.empid} disabled placeholder="EmployeeID"></Form.Control>
                      </Form.Group>
                      <Form.Group as={Row} controlId="EmployeeName">
                        <Form.Label column sm="5">Employee Name</Form.Label>
                        <Col sm="7">
                        <Form.Control type="text" name="EmployeeName" required defaultValue={this.props.empname} placeholder="EmployeeName"></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="Department">
                        <Form.Label column sm="5">Department</Form.Label>
                        <Col sm="7">
                        <Form.Control as="select" defaultValue={this.props.department}>
                            {this.state.deps.map(dep=> 
                            <option key={dep.departmentID}>{dep.departmentName}</option>
                                )}
                        </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="EmailID">
                        <Form.Label column sm="5">Email</Form.Label>
                        <Col sm="7">
                        <Form.Control type="text" name="EmailID" required defaultValue={this.props.mailid} placeholder="Email ID"
                         onChange={this.handleChange}
                         onBlur={this.handleBlur}
                         autoComplete="off">
                         </Form.Control>
                         {this.state.emailAddressError && (
              <div className="validationTextPopup">{this.state.emailAddressError}</div>
            )}                 
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="DOJ">
                        <Form.Label column sm="5">DOJ</Form.Label>
                        <Col sm="7">
                        <Form.Control type="datetime" disabled name="DOJ" required defaultValue={moment(this.props.doj).format('DD/MM/YYYY')} placeholder="DOJ"></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group  as={Row} style={{marginLeft:'21%'}}>
                        <Button  column sm="5"  className="PoupButtonCss" variant="grey" type="submit">
                          Update Employee
                        </Button>
                        <Col sm="7">
                        <Button variant="danger" className="PopupCloseButtonCss" onClick={this.props.onHide}>Close</Button>
                          </Col>
                      </Form.Group>      
                    </Form>
                  </Col>
                </Row>
           
            </Modal.Body>
            {/* <Modal.Footer>
             
            </Modal.Footer> */}
          </Modal>
           </div>
         );
    }
}
 
export default EditEmpModal;