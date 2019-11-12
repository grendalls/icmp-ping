import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">PingMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Dropdown className="ml-auto">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                marginTop: '8px'
              }}
            >
              <Dropdown.Item>
                <Link style={{ textAlign: 'center', display: 'block' }} to="/">
                  Settings
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link style={{ textAlign: 'center', display: 'block' }} to="/">
                  Sign Out
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
