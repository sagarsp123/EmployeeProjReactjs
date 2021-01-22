import React, { Component } from 'react';
import Navigation from '../Header/Navigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
//Creating bootstrap Grid
import {Table} from 'react-bootstrap';
import Headerlogin from '../Header/Headerlogin';
import {Button, ButtonToolbar} from 'react-bootstrap';
import * as moment from 'moment';
import AddEmpModal from './AddEmpModal';
import DeleteEmpModal from './DeleteEmpModal';
import ManagerNavigation from '../Header/ManagerNavgiation';
import EditEmpModal from './EditEmpModal';
import configData from "../config.json";

class Employee extends Component {
    constructor(props){
        super(props);
        this.state={emps:[],addModalShow:false,deleteModalShow:false,isLoading:true,userdata:[]}
    }
    componentDidMount(){
        this.refreshList();
    }

    componentWillMount(){
        localStorage.getItem('currentUser') && this.setState({
            userdata:JSON.parse(localStorage.getItem('currentUser')),
            isLoading:false
        })
    }

    refreshList(){        
        //Consuming values from Api (GET method)
        const options = {
            method: "GET",
            headers: new Headers({'Authorization':'bearer '+this.state.userdata.secureToken}),
            mode: 'cors'
        };
        fetch(configData.URL+'/employees',options)
        .then(response=> response.json())
        .then(data=> {
            console.log("data",data);
            this.setState({
                emps:data
            });
        }  
        );
    }
    
    //To refresh the grid after adding in page
    componentDidUpdate(){
        this.refreshList();
    }

     //Deleting values from Api
    // deleteEmp(empid){
    //     if(window.confirm('Are you sure?'))
    //     {
    //         fetch('http://localhost:63308/api/employee/'+empid,
    //         {
    //             method:'DELETE',
    //             header:{'Accept':'application/json',
    //             'Content-Type':'application/json'}
    //         })
    //     }
    // }

    render() { 
        if (this.state.userdata.secureToken==null) {
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
        console.log(this.props.location.state);
        const{emps,empid,empname,department,mailid,doj,managerID}=this.state;
                let addModalClose =() => this.setState({addModalShow:false});
                let editModalClose =() => this.setState({editModalShow:false});
                let deleteModalClose =() => this.setState({deleteModalShow:false});
                let comp = "";
        if (this.state.userdata.userRole == 'Employee') {
            comp = <Navigation></Navigation>
          } else {
            comp = <ManagerNavigation></ManagerNavigation>
          }
        return ( 
            // <div className="mt-5 d-flex justify-content-left">
            //     <h3>This is Employee page.</h3>
            // </div>
            <div className="page-container">
                <Header></Header>
            {comp}
            <div className="content-wrap">
            <div className="container">
            {/* <Header></Header>
            {comp} */}
                <div>
                    <Table className="tabledataAlignCenter"striped bordered hover size="sm">
                        <thead>
                            <tr>
                                {/* <th>EmployeeID</th> */}
                                <th >EmployeeName</th>
                                <th>Department</th>
                                <th>MailID</th>
                                <th>DOJ</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emps.map(emp=>
                                <tr id={emp.employeeID} key={emp.employeeID}>
                                {/* <td>{emp.employeeID}</td> */}
                                <td style={{paddingTop:"21px"}}>{emp.employeeName}</td>
                                <td style={{paddingTop:"21px"}}>{emp.department}</td>
                                <td style={{paddingTop:"21px"}}>{emp.mailID}</td>
                                <td style={{paddingTop:"21px"}}>{moment(emp.doj).format('DD/MM/YYYY')}</td>
                                <td>
                                    <ButtonToolbar className="tableDataButtonPadding">
                                        <Button className="m-2 GeryButtonCss" variant="grey" 
                                        onClick={()=> this.setState({editModalShow:true,
                                        empid:emp.employeeID,empname:emp.employeeName,
                                        department: emp.department,
                                        mailid:emp.mailID,
                                        doj:emp.doj,
                                        managerID:emp.managerID})}>
                                            Edit
                                            </Button>
                                            {/* <Button
                                            className="m-2"
                                            onClick={()=> this.deleteEmp(emp.EmployeeID)} variant="danger"
                                            > Delete
                                            </Button> */}
                                            <Button
                                            className="m-2"
                                            onClick={()=> this.setState({deleteModalShow:true,empid:emp.employeeID,empname:emp.employeeName})} 
                                            variant="danger">
                                             Delete
                                            </Button>
                                            <EditEmpModal
                                             show = {this.state.editModalShow}
                                             onHide = {editModalClose}
                                             empid= {empid}
                                             empname = {empname}
                                             department = {department}
                                             mailid = {mailid}
                                             doj = {doj}
                                             managerID = {managerID}
                                            ></EditEmpModal>
                                             <DeleteEmpModal 
                                             show = {this.state.deleteModalShow}
                                             onHide = {deleteModalClose}
                                             empid = {empid}
                                             empname={empname}>

                                             </DeleteEmpModal>
                                    </ButtonToolbar>
                                </td>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                <ButtonToolbar style={{marginLeft:'42%'}}>
                    <Button className="GeryButtonCss" variant="grey"  onClick={()=> this.setState({addModalShow:true})}>
                         Add Employee
                    </Button>
                    <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}>
                    </AddEmpModal>
                </ButtonToolbar>
                </div>
          </div>
        </div>
        <Footer></Footer>
     </div>
         );
      }
    }
}
 
export default Employee;