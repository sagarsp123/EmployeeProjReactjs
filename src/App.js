import './App.css';
import Button from 'react-bootstrap/Button';
import SwitchPath from './components/SwitchPath';
import Header from './components/Header';
//Implementing Component Routing in React
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (

   
    <div className="container">
        {/* <h3 className="m-3 d-flex justify-content-center">
        Employee Management Portal
        </h3> */}
        {/* <Navigation></Navigation> */}
       <SwitchPath></SwitchPath>
    </div>

    // <Signup></Signup>


  
  );
}

export default App;
