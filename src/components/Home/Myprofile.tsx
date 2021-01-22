import React, { Component } from 'react';
import {Table, Row, Col, Form} from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Headerlogin from '../Header/Headerlogin';
import "../Aboutus.css";
import moment from 'moment';
import Navigation from '../Header/Navigation';
import ManagerNavigation from '../Header/ManagerNavgiation';
import configData from "../config.json";

interface userdata {
  emailID: string,
     employeeID: number,
    employeeName: string,
    profilePassword: string,
    userID: number,
    userRole: string,
    secureToken:string
}

class Myprofile extends Component<userdata> {

  state = {
    EmployeeID:0,
    userRole:"",
    secureToken:"null",
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
    this.state.userRole=obj.userRole;
    this.state.secureToken = obj.secureToken;
    this.refreshList();
}

 
refreshList(){
  //Hardcoded values
  // this.setState({
  //     deps:[{"DepartmentID":1,"DepartmentName":"IT"},
  //     {"DepartmentID":2,"DepartmentName":"Support"}]
  // })


  
  //Consuming values from Api (GET method)
  fetch(configData.URL+'/employees/'+this.state.EmployeeID,{
    'method': 'GET',
    'mode': 'cors',
    'headers': {
      'Content-Type': 'application/json; charset=utf-8;',
    'Authorization':'bearer '+this.state.secureToken
  }
  })
  .then(response=> response.json())
  .then(data=> {
      this.setState({
        employeeName:data.employeeName,
        department:data.department,
        mailID:data.mailID,
        doj:moment(data.doj).format('DD/MM/YYYY')

               
      });
      console.log("Emp",this.state.userRole);
      
  }  
  );

 
}
    render() { 
      if (this.state.secureToken) {
        return(
          <div className="page-container">
          <Headerlogin></Headerlogin>
        <div className="content-wrap">
        <div className="container">
          
            <h2 className="styleObj1">
                Please login in the Employee Portal
            </h2>
            <p className="styleObj"><a href="/">Click here</a></p>
            </div>
            </div>
            <Footer></Footer>
            </div>
        )
       }
       else{
      const {profiles} = this.state;
      console.log(profiles);
      let comp:any;
      if(this.state.userRole =='Employee') {
          comp = <Navigation></Navigation>
        } else {
          comp = <ManagerNavigation></ManagerNavigation>
        }
        return ( 
             <div className="page-container">
             <Header></Header>
             {comp}
            <div className="content-wrap">
             <div className="container">
             {/* <Header></Header>
             {comp} */}
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
}
 
export default Myprofile;

