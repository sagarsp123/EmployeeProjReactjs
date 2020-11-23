import React, { Component } from 'react';

//Creating bootstrap Grid
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';

import EditDepModal from './EditDepModal';

class Department extends Component {
    constructor(props){
        super(props);
        this.state={deps:[],addModalShow:false}
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
        fetch('http://localhost:63308/api/department')
        .then(response=> response.json())
        .then(data=> {
            this.setState({
                deps:data
            });
        }  
        );
    }
    
    //To refresh the grid after adding in page
    componentDidUpdate(){
        this.refreshList();
    }

     //Deleting values from Api
    deleteDep(depid){
        if(window.confirm('Are you sure?'))
        {
            fetch('http://localhost:63308/api/department/'+depid,
            {
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }

    render() { 
        const{deps,depid,depname}=this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});
        return ( 
            // <div className="mt-5 d-flex justify-content-left">
            //     <h3>This is Department page.</h3>
            // </div>
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>DepartmentID</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key={dep.DepartmentID}>
                        <td>{dep.DepartmentID}</td>
                        <td>{dep.DepartmentName}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="m-2" variant="info" 
                                onClick={()=> this.setState({editModalShow:true,depid:dep.DepartmentID,depname:dep.DepartmentName})}>
                                    Edit
                                    </Button>
                                    <Button
                                    className="m-2"
                                    onClick={()=> this.deleteDep(dep.DepartmentID)} variant="danger"
                                    > Delete
                                    </Button>
                                    <EditDepModal
                                     show = {this.state.editModalShow}
                                     onHide = {editModalClose}
                                     depid= {depid}
                                     depname = {depname}
                                    ></EditDepModal>
                            </ButtonToolbar>
                        </td>
                        </tr>
                        )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant='primary' onClick={()=> this.setState({addModalShow:true})}>
                 Add Department
                </Button>
                <AddDepModal show={this.state.addModalShow} onHide={addModalClose}>
                </AddDepModal>
            </ButtonToolbar>
            </div>
         );
    }
}
 
export default Department;