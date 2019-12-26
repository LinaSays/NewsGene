import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


const Menu = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="/">NewsGene</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
        <Nav.Link href="/">Acceuil</Nav.Link>
        <Nav.Link href="/figaro">
            Figaro
        </Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
);
}

export default Menu;
