import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuPopover,
    MenuLink,
  } from "@reach/menu-button";
  import "@reach/menu-button/styles.css";
  import './Aboutus.css';
  import SwitchPath from './SwitchPath';
  import Signup from './Signup'

import Avatar from '@material-ui/core/Avatar';


function handleChange(){
  localStorage.clear();
};


 function Person() {

    return (
      <Menu>
        <MenuButton     className="button-primary"
    style={{ boxShadow: "2px 2px 2px hsla(0, 0%, 0%, 0.25)" }}
       ><Avatar ></Avatar><span aria-hidden>▾</span>
       </MenuButton>
        <MenuList>
          <MenuLink href="/" onClick={handleChange}> <img
            src="assets/logout.png" className="logout" rounded
            alt="Logout"
          />
Logout</MenuLink>
          <MenuLink href="/MyProfile">  <img
            src="assets/me.jpg" className="logout" rounded
            alt="About Me" />About Me</MenuLink>
        </MenuList>
      </Menu>
    );
  }
  export default Person;  