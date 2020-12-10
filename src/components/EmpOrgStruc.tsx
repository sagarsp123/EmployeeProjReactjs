import * as React from 'react';
import { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Header from './Header';
import Empshow from './empshow';

class EmpOrgStruc extends React.Component {

    render() { 
        return (
            <div>
            <Header></Header>
            <Navigation></Navigation>
            <Empshow></Empshow>
            <Footer></Footer>
            </div>
         );
    }
}
 
export default EmpOrgStruc;