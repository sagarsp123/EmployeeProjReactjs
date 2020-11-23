import React, { Component } from 'react';

//Creating bootstrap Grid
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';

import AddEmpModal from './AddEmpModal';

import EditEmpModal from './EditEmpModal';

class Employee extends Component {
    constructor(props){
        super(props);
        this.state={emps:[],addModalShow:false}
    }
    componentDidMount(){
        this.refreshList();
    }

    refreshList(){        
        //Consuming values from Api (GET method)
        fetch('http://localhost:63308/api/employee')
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
    deleteEmp(empid){
        if(window.confirm('Are you sure?'))
        {
            fetch('http://localhost:63308/api/employee/'+empid,
            {
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render() { 
        const{emps,empid,empname,department,mailid,doj}=this.state;
                let addModalClose =() => this.setState({addModalShow:false});
                let editModalClose =() => this.setState({editModalShow:false});
        return ( 
            // <div className="mt-5 d-flex justify-content-left">
            //     <h3>This is Employee page.</h3>
            // </div> 
                <div>
                    <Table className="mt-4" striped bordered hover size="sm">
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
                                <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DOJ}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="m-2" variant="info" 
                                        onClick={()=> this.setState({editModalShow:true,
                                        empid:emp.EmployeeID,empname:emp.EmployeeName,
                                        department: emp.Department,
                                        mailid:emp.MailID,
                                        doj:emp.DOJ})}>
                                            Edit
                                            </Button>
                                            <Button
                                            className="m-2"
                                            onClick={()=> this.deleteEmp(emp.EmployeeID)} variant="danger"
                                            > Delete
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
         );
    }
}
 
export default Employee;