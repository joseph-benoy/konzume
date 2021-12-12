import './DashHeader.scss';
import {Navbar,Container,Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const DashHeader = ()=>{
    const nav = useNavigate();
    return (
        <>
        <Navbar bg="dark" variant="dark" style={{position:"sticky !important",top:"0 !important"}}>
            <Container>
                <Navbar.Brand href="#home" id="heading">Konzume</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={()=>{nav("/dashboard/search");}} className="nav-links">Search</Nav.Link>
                    <Nav.Link onClick={()=>{nav("/dashboard/profile");}}>Profile</Nav.Link>
                    <Nav.Link onClick={()=>{nav("/login");sessionStorage.removeItem("jwt")}}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
      </>
    );
}

export default DashHeader;