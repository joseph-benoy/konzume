import './DashHeader.scss';
import {Navbar,Container,Offcanvas,Nav,Form,FormControl,Button,NavDropdown} from 'react-bootstrap';
const DashHeader = ()=>{
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Konzume</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home" className="nav-links">Search</Nav.Link>
                    <Nav.Link href="#features">Settings</Nav.Link>
                    <Nav.Link href="#pricing">Profile</Nav.Link>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
      </>
    );
}

export default DashHeader;