import Employee from './empchart';
import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
    class empshow extends Component {
        constructor (props) {
          super(props);
          this.state = {
            manager:[],
            namesDirection: {}
          }
        }
      
        handleClick = (name, open) => {
          this.setState({
            namesDirection: {
              [name]: open
            }
          })
        }

        componentDidMount(){
          this.refreshList();
      }
  
     
     refreshList(){
          //Hardcoded values
          // this.setState({
          //     deps:[{"DepartmentID":1,"DepartmentName":"IT"},
          //     {"DepartmentID":2,"DepartmentName":"Support"}]
          // })
          
          //Consuming values from Api (GET method)
          fetch('https://localhost:44366/api/EmployeeOrg/16')
          .then(response=> response.json())
          .then(data=> {
              this.setState({
                  manager:data          
              });
              // console.log(data);
          }  
          );
     
         
      }
      
        render() {
          const { manager, namesDirection } = this.state;
         // const{deps,depid,depname}=this.state;
         // const data = this.props.employeeList;
      
          console.log(manager);
          return (
         
          
            manager.length
            ? manager.map(element => 
          
              <Employee
                key={element.employeeID}
                emp={element}
                clickHandler={this.handleClick}
                open={namesDirection[element.employeeName]}
              />
      

            )
            : <p>There is no data to display</p>
          )
        }
      }
      
    
  export default empshow;
  