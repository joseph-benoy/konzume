import { Container,Row,Col,InputGroup,FormControl,Form,Button,Alert } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import './Contact.scss';
import { Person} from 'react-bootstrap-icons';
import React from 'react';
import axios from 'axios';
import qs from 'qs';
const Contact = ()=>{
    const [alertType,setAlertType] = React.useState("light");
    const [error,setError] = React.useState("");
    const [name,setName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [message,setMessage] = React.useState("");
    const sendMessage = React.useCallback(async()=>{
        if(name!==""){
            if(email!==""){
                if(message.length>5){
                    try{
                        const params = qs.stringify({
                            name:name,
                            email:email,
                            message:message
                        });
                        const res = await axios({
                            method: 'POST',
                            headers: { 'content-type': 'application/x-www-form-urlencoded' },
                            url: '/admin/newmessage',
                            data:params
                        });
                        setError("Message sent successfully!");
                        setAlertType("success");
                    }
                    catch(e){
                        setError("Couldn't send message!");
                        setAlertType("danger");
                    }
                }
                else{
                    setError("Message should be longer!");
                    setAlertType("danger");
                }
            }
            else{
                setError("Email can't be empty!");
                setAlertType("danger");
            }
        }
        else{
            setError("Name can't be empty!");
            setAlertType("danger");
        }
    });
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
                                onChange={(e)=>setName(e.target.value)}
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
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Message</Form.Label>
                            <InputGroup>
                                <FormControl onChange={(e)=>setMessage(e.target.value)} rows={5} as="textarea" placeholder="enter your message here"/>
                            </InputGroup>
                        </Form.Group>
                        <Row>
                            <Button variant="dark" id="sendBtn" onClick={sendMessage}>
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
