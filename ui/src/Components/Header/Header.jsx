import './Header.scss';
import {Navbar,Container,Offcanvas,Nav,Form,FormControl,Button,NavDropdown} from 'react-bootstrap';
const Header = ()=>{
    return (
        <Navbar bg="dark" expand={false} variant="dark" > 
            <Container fluid >
                <Navbar.Brand href="#">Konzume</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">About</Nav.Link>
                    <Nav.Link href="#action2">Contact</Nav.Link>
                    <Nav.Link href="#action2">Sign Up</Nav.Link>
                    <Nav.Link href="#action2">Login</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
    );
}
export default Header;