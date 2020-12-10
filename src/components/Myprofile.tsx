import React, { Component } from 'react';
import {Table, Row, Col, Form} from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';
import "./Aboutus.css";
import moment from 'moment';
import Navigation from './Navigation';
import ManagerNavigation from './ManagerNavgiation';
interface userdata {
  emailID: string,
     employeeID: number,
    employeeName: string,
    profilePassword: string,
    userID: number,
    userRole: string
}

class Myprofile extends Component<userdata> {

  state = {
    EmployeeID:0,
    userRole:"",
    employeeName:"",
    department: "",
    mailID:"",
    doj:"",
    profiles:[
      {
        
        employeeID:"",
        employeeName:"",
        department: "",
        mailID:"",
        doj:"",
        EmployeeID:0,
        isLoading:true

      }
    
    ]
  };
  constructor (props:any) {
    super(props);
  // this.state = {
  //     profiles:[],
     
      
  // }
  }


  componentDidMount(){
    let obj:userdata = JSON.parse(localStorage.getItem('currentUser') || '{}');

    console.log("userInfo",obj.employeeID);
    this.state.EmployeeID=obj.employeeID;
    this.refreshList();
}

 
refreshList(){
  //Hardcoded values
  // this.setState({
  //     deps:[{"DepartmentID":1,"DepartmentName":"IT"},
  //     {"DepartmentID":2,"DepartmentName":"Support"}]
  // })


  
  //Consuming values from Api (GET method)
  fetch('https://localhost:44366/api/employees/'+this.state.EmployeeID)
  .then(response=> response.json())
  .then(data=> {
      this.setState({
        employeeName:data.employeeName,
        department:data.department,
        mailID:data.mailID,
        doj:moment(data.doj).format('DD/MM/YYYY')

               
      });
      console.log("Emp",data);
      
  }  
  );

 
}
    render() { 
      const {profiles} = this.state;
      console.log(profiles);
      let comp = null;
      if(this.state.userRole == 'Employee') {
          comp = <Navigation></Navigation>
        } else {
          comp = <ManagerNavigation></ManagerNavigation>
        }
        return ( 
             <div className="page-container">
            <div className="content-wrap">
             <div className="container">
             <Header></Header>
             {comp}
             <Row className="leaveReq"> 
                <h3 className=" d-flex justify-content-center">My Profile</h3>
                <Col sm={6} className="marginCssleft">
                 <Form >
  <Form.Group  as={Row} controlId="formPlaintextName">
    <Form.Label column sm="4">
    
      Name:
    </Form.Label>
    <Col sm="8">
    <Form.Control plaintext readOnly defaultValue={this.state.employeeName}/>
        {/* {this.state.profiles.map(profile=>
                        <tr id={profile.employeeID} key={profile.employeeID}>
                        <td>{profile.employeeName}</td>
                        
                        </tr>
                        )} */}
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextDesignation">
    <Form.Label column sm="4">
      Designation:
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue="Software Engineer" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="4">
      Email:
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue={this.state.mailID} />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextDept">
    <Form.Label column sm="4">
      Department:
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue={this.state.department} />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formPlaintextDoj">
    <Form.Label column sm="4">
      Date of Joining:
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue={this.state.doj} />
    </Col>
  </Form.Group>


  

  {/* <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="1">
      Password
    </Form.Label>
    <Col sm="5">
      <Form.Control type="text" placeholder="Readonly input here..." readOnly />
    </Col>style={{display: this.state.isTable}} 
  </Form.Group> 
</Form> */}


{/* <Table className="tableCss" bordered striped  hover size="lg">
                        <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Email </th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.profiles.map(profile=>
                        <tr id={profile.employeeID} key={profile.employeeID}>
                          
                        <td>{profile.employeeName}</td>
                        <td>Software Engineer</td>
                        <td>{profile.mailID}</td>
                        <td>{profile.department}</td>
                    <td>{profile.doj}</td>
                        </tr>
                        )}
                </tbody>
            </Table> */}

            {/* <Form >
  <Form.Group  as={Row} controlId="formPlaintextName">
    <Form.Label column sm="2">
    
      Name
    </Form.Label>
    <Col sm="5">
    {/* <Form.Control plaintext readOnly defaultValue="{profile.employeeName}"/> 
        {this.state.profiles.map(profile=>
                        <tr id={profile.employeeID} key={profile.employeeID}>
                          
                        </tr>
                        )}
    </Col>
  </Form.Group> */}
  </Form>
  </Col>
  </Row>

                    </div>
                 </div>
                 <Footer></Footer>
                 </div>
         );
    }
}
 
export default Myprofile;

