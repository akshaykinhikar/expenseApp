import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, NavLink } from "react-router-dom";

function NavbarComponent() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Expense App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/group">Group</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Outlet />
        </>
    );
}

export default NavbarComponent;