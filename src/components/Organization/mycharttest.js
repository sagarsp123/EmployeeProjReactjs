import React, { Component } from 'react';
import OrgChart from './mychart';
import Navigation from '../Header/Navigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Headerlogin from '../Header/Headerlogin';
import ManagerNavigation from '../Header/ManagerNavgiation';

            class mycharttest extends Component {
              constructor(props) {
                super(props);
                this.state = {isLoading:true,userdata:[]};
              }

              componentWillMount(){
                localStorage.getItem('currentUser') && this.setState({
                    userdata:JSON.parse(localStorage.getItem('currentUser')),
                    isLoading:false
                })
            }

              render() {
                const styleObj1 = {
                  marginTop:"5%",
                  textAlign: "center",
               
              }
              const styleObj = {
                  textAlign: "center",
               
              }
             
                if (this.state.userdata.secureToken==null ) {
                return(
                  <div className="page-container">
                  <Headerlogin></Headerlogin>
                <div className="content-wrap">
                <div className="container">
                  
                    <h2 style={styleObj1}>
                        Please login in the Employee Portal
                    </h2>
                    <p style={styleObj}><a href="/">Click here</a></p>
                    </div>
                    </div>
                    <Footer></Footer>
                    </div>
                )
              }
              else{
                let comp = "";
                if (this.state.userdata.userRole == 'Employee') {
                    comp = <Navigation></Navigation>
                  } else {
                    comp = <ManagerNavigation></ManagerNavigation>
                  }
                return (
                  <div className="page-container">
                  <div className="content-wrap">
                           <div style={{height: '100%'}}>
                           <Header></Header>
                         {comp}
                          <h2 className="m-3 d-flex justify-content-center">
        Organization Structure
        </h2>
    

     <div className="OrgChange">


                           <OrgChart nodes={
                                     [{id: 1, name: "Arjun Reddy" , title: "Director","Department": "HR" },
                                     {id: 2, pid: 1, name: "Vaibhav Raut" , title: "Senior Manager","Department": "IT" },
                                     {id: 3, pid: 1, name: "Amit Gupta" , title: "Senior Specialist" ,"Department": "IT"},
                                     {id: 4, pid: 2, name: "Leena Thomas" , title: "Programmer" ,"Department": "IT"},
                                     {id: 5, pid: 2, name: "Abhi Sharma" , title: "Specialist","Department": "IT" },
                                     {id: 6, pid: 5, name: "John Rose" , title: "Developer","Department": "IT" },
                                     {id: 7, pid: 5, name: "Jyoti Pathare" , title: "Developer","Department": "IT" }]} />
                  </div>
                  </div>
                  </div>
                  <Footer></Footer>
                  </div>
                );
               }
              }
            }
            export default mycharttest;
        