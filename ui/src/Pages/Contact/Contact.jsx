import { Container,Row,Col,InputGroup,FormControl,Form,Button,Alert } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import './Contact.scss';
import { Person} from 'react-bootstrap-icons';
import React from 'react';
const Contact = ()=>{
    const [alertType,setAlertType] = React.useState("light");
    const [error,setError] = React.useState("");
    return(
        <Container fluid className='gx-0'>
            <Row className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form id="messageForm">
                        <h1>Contact us</h1>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>{<Person/>}</InputGroup.Text>
                                <FormControl
                                required
                                type="text"
                                placeholder="your full name"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>@</InputGroup.Text>
                                <FormControl
                                required
                                type="email"
                                placeholder="valid email id"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Message</Form.Label>
                            <InputGroup>
                                <FormControl rows={5} as="textarea" placeholder="enter your message here"/>
                            </InputGroup>
                        </Form.Group>
                        <Row>
                            <Button variant="dark" id="sendBtn">
                                Send message
                            </Button>                          
                        </Row>
                    </Form>
                </Col>
                
            </Row>
            <Row>
                <Col>
                    <Alert id="msgAlert" variant={alertType}>{error}</Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
