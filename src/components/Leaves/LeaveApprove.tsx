import React, { Component } from 'react';
import {Table, Button,ButtonToolbar, Row, Col, Form,Image} from 'react-bootstrap';
import FileUpload from './FileUpload';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Headerlogin from '../Header/Headerlogin';
import Navigation from '../Header/Navigation';
import moment from 'moment';
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

 
class LeaveApprove  extends Component<userdata> {
    state={
      LeaveID:"",
        LeaveType: null,
        StartDate: null,
        EndDate: null,
        TLeaves: null,
        EmployeeID:0,
        userRole:"",
        secureToken:"null",
        d1:0,
        d2:0,
        diff:0,
        isTable:"none",
        snackbaropen:false,
        snackbarmsg:'',
        userInfo:null,
        isLoading:true,
        // userdata:[{
        //   emailID: "",
        //  employeeID: null,
        // employeeName: "",
        // profilePassword: "",
        // userID: 0,
        // userRole: ""
        // }],
        leaves:[
          {
            leaveID:"",
            employeeID:"",
            leaveType:"",
            lStartDate: "",
            lEndDate:"",
            leaveDays:"",
            leaveStatus:"",
            employeeName:""
    
          }
        
        ]
      
      };
      constructor(props:any){
        super(props);
        this.updateLeaveStatus = this.updateLeaveStatus.bind(this);

    }
    
    componentDidMount(){
        let obj:userdata = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
      console.log("userInfo",obj.employeeID);
      this.state.EmployeeID=obj.employeeID;
      this.state.userRole = obj.userRole;
      this.state.secureToken = obj.secureToken;
      console.log("Emp",this.state.userRole);
      this.refreshList();
  }

  refreshList(){
    //Consuming values from Api (GET method)
    fetch(configData.URL+'/LeaveDetails',{
      'method': 'GET',
      'mode': 'cors',
      'headers': {
        'Content-Type': 'application/json; charset=utf-8;',
        //'Content-Type':'application/x-www-form-urlencoded', 
      'Authorization':'bearer '+this.state.secureToken
    }
    })
    .then(response=> response.json())
    .then(data=> {
        this.setState({
            leaves:data         
        });
        console.log(data);
    }  
    );

   
}
componentDidUpdate(){
  this.refreshList();
}
 updateLeaveStatus(leaveid:string,leavestatus:string){
    fetch(configData.URL+'/LeaveDetails/'+leaveid +'/'+leavestatus,{
      method:'PUT',
      headers:{
        // 'Accept':'application/json',
        // 'Content-Type':'application/json',
        'Authorization':'bearer '+this.state.secureToken
      },
          })
          .then(res=> {
          if(res.status == 200)
          {
            this.refreshList();
            window.alert("Leave " + leavestatus +" Successfully");
           
            this.setState({snackbaropen:true,snackbarmsg:'Updated Successfully'});
          }
          else
          {
            this.setState({snackbaropen:true,snackbarmsg:'Update Failed'});
          }
          })
}

    render() { 
      if (this.state.secureToken != "null") {
        let comp:any;
      if(this.state.userRole == 'Employee') {
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
            <Table className="tabledataAlignCenter" striped bordered hover size="sm">
                        <thead>
                    <tr>
                      <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Leave Days</th>
                        <th>Leave Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.leaves.map(leave=>
                        <tr id={leave.leaveID} key={leave.leaveID}>
                        <td style={{paddingTop:"21px"}}>{leave.employeeName}</td>
                        <td style={{paddingTop:"21px"}}>{leave.leaveType}</td>
                        <td style={{paddingTop:"21px"}}>{moment(leave.lStartDate).format('DD/MM/YYYY')}</td>
                        <td style={{paddingTop:"21px"}}>{moment(leave.lEndDate).format('DD/MM/YYYY')}</td>
                        <td style={{paddingTop:"21px"}}>{leave.leaveDays}</td>
                        <td style={{paddingTop:"21px"}}>{leave.leaveStatus}</td>
                        <td>
                            <ButtonToolbar className="tableDataButtonPadding">
                                <Button className="m-2 GeryButtonCss" variant="grey" 
                                 onClick={()=> this.updateLeaveStatus(leave.leaveID,"Approved")}>
                                    Approve
                                    </Button>
                                    {/* <Button
                                    className="m-2"
                                    onClick={()=> this.deleteDep(dep.DepartmentID)} variant="danger"
                                    > Delete
                                    </Button>                                     */}
                                    <Button className="m-2 GeryButtonCss" variant="grey"
                                     onClick={()=> this.updateLeaveStatus(leave.leaveID,"Rejected")}>
                                    Reject
                                    </Button>
                            </ButtonToolbar>
                         
                        </td>
                        </tr>
                        )}
                </tbody>
            </Table>
            </div>
            </div>
            <Footer></Footer>
            </div>
         );
    }
    else{
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
  
  }
}
 
export default LeaveApprove;