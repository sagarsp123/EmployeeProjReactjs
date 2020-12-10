import React from 'react';
import propTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from './employee.css';
import './Aboutus.css';
import {Col, Container,  Image} from 'react-bootstrap';



function getInitials(name) {
  if (!name) {
    return 'NA';
  }
  let names = name.split(' ');
  if (names.length < 2) {
    return names[0][0] + names[0][0];
  }
  return names[0][0] + names[1][0];
}

const empchart = ({...props}) => {
  const { emp, clickHandler, open, classes } = props;

  if (emp.managerID) {
    return (
      
                 
      <List className={classes.listWidth}>
      
        <ListItem  button onClick={() => clickHandler(emp.employeeName, open ? !open : true)}>
          <Avatar className={classes.manager}>{getInitials(emp.employeeName)}</Avatar>
          <ListItemText inset primary={emp.employeeName} 
          secondary={
              <div>
               <div>Department - {emp.department}</div>
               <div>Email - {emp.mailID}</div>
                 {/* <div> DOJ - {emp.doj}</div>  */}
              </div>
            }/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      

    )
   } else {
    return (
      <div>   
      <List disablePadding>
        <ListItem className={classes.listWidth}>
          <Avatar className={classes.employee}>{getInitials(emp.employeeName)}</Avatar>
          <ListItemText inset primary={emp.employeeName} secondary={
              <div>
                <div>Department - {emp.department}</div>
                <div>Email - {emp.mailID}</div>
                 {/* <div> DOJ - {emp.doj}</div> */}
               </div>
             } />
         </ListItem>
       </List>

       <Image className="about-org" src="assets/Org.jpg"  rounded />
       </div>   
     
     )
  }



  
}

empchart.propTypes = {
  emp: propTypes.object.isRequired,
  clickHandler: propTypes.func.isRequired,
  open: propTypes.bool,
  classes: propTypes.object.isRequired
}

export default withStyles(styles)(empchart);
