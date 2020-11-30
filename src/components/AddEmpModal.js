import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AddEmpModal extends Component {
    constructor(props){
        super(props);

        this.state = {deps:[],snackbaropen:false,snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Collecting all department details using api which can be used as value for Department drop-down list
    componentDidMount(){
        fetch('https://localhost:44366/api/departments')
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
          fetch('https://localhost:44366/api/employees',{
            method:'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              employeeID:0,
              employeeName: event.target.EmployeeName.value,
              department: event.target.Department.value,
              mailID: event.target.MailID.value,
              doj: event.target.DOJ.value
            })
          })
          .then(res=> {res.json()
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
                Add Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <Row>
                  <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="EmployeeName">
                        <Form.Label>EmployeeName</Form.Label>
                        <Form.Control type="text" name="EmployeeName" required placeholder="EmployeeName"></Form.Control>                        
                      </Form.Group>
                      <Form.Group controlId="Department">
                        <Form.Label>Department</Form.Label>
                        {/* <Form.Control type="text" name="Department" required placeholder="Department"></Form.Control> */}
                        
                        {/* Creating Drop-down */}
                        <Form.Control as="select">
                            {this.state.deps.map(dep=> 
                            <option key={dep.departmentID}>{dep.departmentName}</option>
                                )}
                        </Form.Control>                        
                      </Form.Group>
                      <Form.Group controlId="MailID">
                        <Form.Label>MailID</Form.Label>
                        <Form.Control type="text" name="MailID" required placeholder="MailID"></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="DOJ">
                        <Form.Label>DOJ</Form.Label>
                        <Form.Control type="date" name="DOJ" required placeholder="DOJ"></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Button varient="primary" type="submit">
                          Add Employee
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
           
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
           </div>
        );
    }
}
 
export default AddEmpModal;