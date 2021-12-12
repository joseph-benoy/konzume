import { Container,Row,Col,InputGroup,FormControl } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import './Contact.scss';
const Contact = ()=>{
    return(
        <Container fluid className='gx-0'>
            <Row className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Connect with us</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>@</InputGroup.Text>
                        <FormControl
                        placeholder="valid email id"
                        />
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;