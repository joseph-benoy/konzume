import './Header.scss';
import {Navbar,Container,Offcanvas,Nav,Form,FormControl,Button,NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Header = ()=>{
    const nav = useNavigate();
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
                    <Nav.Link onClick={()=>nav("/home")}>Home</Nav.Link>
                    <Nav.Link onClick={()=>nav("/about")}>About</Nav.Link>
                    <Nav.Link onClick={()=>nav("/contact")}>Contact</Nav.Link>
                    <Nav.Link onClick={()=>nav("/signup")}>Sign Up</Nav.Link>
                    <Nav.Link onClick={()=>nav("/login")}>Login</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
    );
}
export default Header;