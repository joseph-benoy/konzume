import { Container,Row,Col,Form,InputGroup,FormControl,Button,Alert } from 'react-bootstrap';
import './Register.scss';
import Header from '../../Components/Header/Header';
import React from 'react';
import {People,Person,FileLock,ShieldLock} from 'react-bootstrap-icons';
import qs from 'qs';
import axios from 'axios';
const Register = ()=>{
    const [otp,setOtp] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [cpassword,setCpassword] = React.useState("");
    const [fname,setFname] = React.useState("");
    const [lname,setLname] = React.useState("");
    const otpVerificaton = ()=>{
        if(otp!==''){
            if(otp.length===4){

            }
        }
    }
    const otpRequest = async ()=>{
        if(email!==''){
            const params = qs.stringify({
                email:`${email}`
            });
            try{
                let res = axios(
                    {
                        method: 'POST',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        url: '/user/requestotp',
                        data:params
                    });
                    console.log(res.data);
            }
            catch(e){
                console.log(e.response.data.error);
            }
        }
    }
    return(
        <Container fluid className='gx-0'>
            <Row className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="register-form">
                        <h2 style={{textAlign:"center"}}>Sign Up</h2>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><Person/></InputGroup.Text>
                                        <FormControl
                                        placeholder="First name"
                                        aria-label="Fristname"
                                        aria-describedby="basic-addon1"
                                        onChange = {(e)=>{
                                            setFname(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2"><People/></InputGroup.Text>
                                        <FormControl
                                        placeholder="Last name"
                                        aria-label="Lastname"
                                        aria-describedby="basic-addon2"
                                        onChange = {(e)=>{
                                            setLname(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon3">@</InputGroup.Text>
                                        <FormControl
                                        type="email"
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon3"
                                        onChange = {(e)=>{
                                            setEmail(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><FileLock/></InputGroup.Text>
                                        <FormControl
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        onChange = {(e)=>{
                                            setPassword(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Confirm password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><FileLock/></InputGroup.Text>
                                        <FormControl
                                        type="password"
                                        placeholder="Confirm password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        onChange = {(e)=>{
                                            setCpassword(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                    <Button id="requestBtn" variant="primary"  onClick={otpRequest}>
                                        Request OTP
                                    </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={10}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>OTP</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><ShieldLock/></InputGroup.Text>
                                        <FormControl
                                        placeholder="one time password"
                                        aria-label="otp"
                                        aria-describedby="basic-addon1"
                                        onChange={(e)=>{
                                            setOtp(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" id="otp-btn" onClick={otpVerificaton}>
                                        Verify OTP
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" disabled id="register-btn">
                                        Register
                                    </Button>
                                </div>                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                    <Alert id="reg-alert" variant="danger">TEst</Alert>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;