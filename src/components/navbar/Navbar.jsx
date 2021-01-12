import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Auth from 'src/servises/auth';
import {
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
  DropdownMenu,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  Collapse,
  NavLink,
} from 'reactstrap';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="mb-4" color="light" light
        expand="lg"
      >
        <NavbarBrand href="/dashboard">Contact Book</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="w-100">
            <NavItem className="mr-auto">
              <NavLink href="https://github.com/leotoni">GitHub</NavLink>
            </NavItem>
            <NavItem className="float-right">
              <UncontrolledDropdown inNavbar>
                <DropdownToggle nav caret>
                  User
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => history.push('/dashboard/contact/000')}>
                    <span>Profile</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {
                    Auth.deleteUser();
                    history.push('/login');
                  }}
                  >
                    <span>
                      Logout
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
