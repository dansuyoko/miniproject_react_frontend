import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText, Button } from 'reactstrap';
import '../../components/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavbarDashboard() {
  return (
    <div className="nav-bar">
      <Navbar color="info" expand="md" fixed="top" light>
        <NavbarBrand href="/">
          <FontAwesomeIcon icon={'car'} size={'70'} />
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button href="/login">
              <FontAwesomeIcon icon={'sign-in'} /> Login
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarDashboard;
