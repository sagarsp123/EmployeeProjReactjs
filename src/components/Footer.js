import React from 'react';
import "./Footer.css";

const Footer = () => {
    return(
        <div className="main-footer">
        <div className="container">
            <div className="row">
           {/* column1 */}
        <div className="col"> 
        <h4> LNTINFO INC</h4>
        <ul className="list-unstyled">
        <li>022-523-2555</li>
        <li>Mumbai, India</li>
        <li>326 Mindspace</li>
        

        </ul>
        </div>


        <div className="col">
            <h4>HELP</h4>
            <ul className="list-unstyled">
                <li>Call Services</li>
                <li>Guide Section</li>
                <li>FAQ</li>
            </ul>
        </div>


        <div className="col">
            <h4>CONTACT US</h4>
            <ul className="list-unstyled">
                <li>About Us</li>
                <li>Services</li>
                <li>Updates</li>
            </ul>
        </div>

            </div>
        <hr/>
            <div className="row">
            <p className="col-sm">
        &copy;{new Date().getFullYear()} LNTINFO INC | All rights reserved | Terms Of Service | Privacy
            </p>

            </div>
        </div>
          
        </div>
    )
}

export default Footer;