import './Login.scss';
import { Container,Row,Col,Form,InputGroup,FormControl,Button} from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import React from 'react';
const Login = ()=>{
    const showPassword = React.useCallback(()=>{
        const pass = document.getElementById('pass');
        if(pass.getAttribute('type')==='text'){
            pass.setAttribute('type','password');
        }
        else{
            pass.setAttribute('type','text');
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
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form id="login-form">
                    <h2 style={{textAlign:"center"}}>Sign In</h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">&#128274;</InputGroup.Text>
                            <FormControl
                            id="pass"
                            type="password"
                            placeholder="Enter your assword"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>  </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="show password"  onClick={showPassword} />
                        </Form.Group>
                        <Button variant="primary">
                            Login
                        </Button>
                        <Button variant='link' style={{textDecoration:"none"}}>Not registered? Sign Up</Button>
                        </Form>

                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;