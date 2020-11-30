import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Header from './Header';
//Creating bootstrap Grid
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';

import AddEmpModal from './AddEmpModal';
import DeleteEmpModal from './DeleteEmpModal';

import EditEmpModal from './EditEmpModal';

class Employee extends Component {
    constructor(props){
        super(props);
        this.state={emps:[],addModalShow:false,deleteModalShow:false}
    }
    componentDidMount(){
        this.refreshList();
    }

    refreshList(){        
        //Consuming values from Api (GET method)
        fetch('https://localhost:44366/api/employees')
        .then(response=> response.json())
        .then(data=> {
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
        const{emps,empid,empname,department,mailid,doj}=this.state;
                let addModalClose =() => this.setState({addModalShow:false});
                let editModalClose =() => this.setState({editModalShow:false});
                let deleteModalClose =() => this.setState({deleteModalShow:false});
        return ( 
            // <div className="mt-5 d-flex justify-content-left">
            //     <h3>This is Employee page.</h3>
            // </div>
            <div className="page-container">
            <div className="content-wrap">
            <div className="container">
            <Header></Header>
                <Navigation></Navigation>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>EmployeeID</th>
                                <th>EmployeeName</th>
                                <th>Department</th>
                                <th>MailID</th>
                                <th>DOJ</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emps.map(emp=>
                                <tr id={emp.employeeID} key={emp.employeeID}>
                                <td>{emp.employeeID}</td>
                                <td>{emp.employeeName}</td>
                                <td>{emp.department}</td>
                                <td>{emp.mailID}</td>
                                <td>{emp.doj}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="m-2" variant="info" 
                                        onClick={()=> this.setState({editModalShow:true,
                                        empid:emp.employeeID,empname:emp.employeeName,
                                        department: emp.department,
                                        mailid:emp.mailID,
                                        doj:emp.doj})}>
                                            Edit
                                            </Button>
                                            {/* <Button
                                            className="m-2"
                                            onClick={()=> this.deleteEmp(emp.EmployeeID)} variant="danger"
                                            > Delete
                                            </Button> */}
                                            <Button
                                            className="m-2"
                                            onClick={()=> this.setState({deleteModalShow:true,empid:emp.employeeID})} 
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
                                            ></EditEmpModal>
                                             <DeleteEmpModal 
                                             show = {this.state.deleteModalShow}
                                             onHide = {deleteModalClose}
                                             empid = {empid}>

                                             </DeleteEmpModal>
                                    </ButtonToolbar>
                                </td>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=> this.setState({addModalShow:true})}>
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
 
export default Employee;