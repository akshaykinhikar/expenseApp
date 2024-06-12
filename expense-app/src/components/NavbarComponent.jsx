import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, NavLink } from "react-router-dom";
import Footer from './footer';

function NavbarComponent() {
    return (
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Expense App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/group">Group</Nav.Link>
                            <Nav.Link as={NavLink} to="/todo">Todo</Nav.Link>
                            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className='component-holder'>
                <Outlet />
            </div>

            <Footer />
        </>
    );
}

export default NavbarComponent;