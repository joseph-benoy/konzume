import { Container,Row,Col,Nav,Form,InputGroup,FormControl,Button,Alert } from 'react-bootstrap';
import './Register.scss';
import Header from '../../Components/Header/Header';
import React from 'react';
import {People,Person,FileLock,ShieldLock,Eye,EyeSlash } from 'react-bootstrap-icons';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = ()=>{
    const [otp,setOtp] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [cpassword,setCpassword] = React.useState("");
    const [fname,setFname] = React.useState("");
    const [lname,setLname] = React.useState("");
    const [alertType,setAlertType] = React.useState("light");
    const [error,setError] = React.useState("");
    const [regStatus,setRegStatus] = React.useState(true);
    const [loginStatus,setLogin] = React.useState(true);
    const [eyeType,setEye] = React.useState("Eye");
    const showPassword = React.useCallback(()=>{
        const pass = document.getElementById('pass');
        if(pass.getAttribute('type')==='text'){
            pass.setAttribute('type','password');
            setEye("Eye");
        }
        else{
            pass.setAttribute('type','text');
            setEye("EyeSlash");
        }
    });
    const [eyeTypeC,setEyeC] = React.useState("Eye");
    const showPasswordC = React.useCallback(()=>{
        const pass = document.getElementById('cpass');
        if(pass.getAttribute('type')==='text'){
            pass.setAttribute('type','password');
            setEyeC("Eye");
        }
        else{
            pass.setAttribute('type','text');
            setEyeC("EyeSlash");
        }
    });
    const registerUser = async ()=>{
        if(fname!==''){
            if(lname!==''){
                if(email!==''){
                    if(password!==''&&cpassword!==''){
                        if(password===cpassword){
                            let params = qs.stringify({
                                fname:fname,
                                lname:lname,
                                email:email,
                                password:password
                            });
                            try{
                                setError("Wait! Registering your account....");
                                setAlertType("primary");
                                let res = await axios(
                                    {
                                        method: 'POST',
                                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                        url: '/user/createuser',
                                        data:params
                                    });
                                    setError("Your account is active now!");
                                    setAlertType("success");
                                    setLogin(false);
                            }
                            catch(e){
                                setError(e.response.data.error);
                                setAlertType("danger");
                            }
                        }
                        else{
                            setError("Passwords don't match");
                            setAlertType("danger");
                        }
                    }
                    else{
                        setError("Passwords can't be empty!");
                        setAlertType("danger");
                    }
                    
                }
                else{
                    setError("Email can't be empty!");
                    setAlertType("danger");
                }
            }
            else{
                setError("Last name can't be empty!");
                setAlertType("danger");
            }
        }
        else{
            setError("First name can't be empty!");
            setAlertType("danger");
        }
    }
    const otpVerificaton = async ()=>{
        const params = qs.stringify({
            email:email,
            otp:otp
        });
        if(otp!==''){
            if(otp.length===4){
                try{
                    setError("Wait! otp is being verified....");
                    setAlertType("primary");
                    let res = await axios(
                        {
                            method: 'POST',
                            headers: { 'content-type': 'application/x-www-form-urlencoded' },
                            url: '/user/verifyotp',
                            data:params
                        });
                        setError("OTP is verified! Now you can register!");
                        setAlertType("success");
                        setRegStatus(false);
                }
                catch(e){
                    setError("OTP is incorrect!");
                    setAlertType("success");
                }

            }
        }
        else{
            setError("Invalid OTP!");
            setAlertType("danger");
        }
    }
    const otpRequest = async ()=>{
        if(email!==''){
            const params = qs.stringify({
                email:`${email}`
            });
            setError("Wait! otp is being sent....");
            setAlertType("primary");
            try{
                let res = await axios(
                    {
                        method: 'POST',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        url: '/user/requestotp',
                        data:params
                    });
                    setError("OTP is sent to "+email+"!");
                    setAlertType("success");
            }
            catch(e){
                setError("User already exists!");
                setAlertType("danger");
            }
        }
        else{
            setError("User details cannot be empty!");
            setAlertType("danger");
        }
    }
    const nav = useNavigate();
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
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text><People/></InputGroup.Text>
                                        <FormControl
                                        placeholder="First name"
                                        aria-label="Firstname"
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
                                        id="pass"
                                        />
                                        <InputGroup.Text>{(eyeType==='Eye')?<Eye onClick={showPassword}/>:<EyeSlash onClick={showPassword}/>}</InputGroup.Text>
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
                                        id="cpass"
                                        />
                                        <InputGroup.Text>{(eyeType==='Eye')?<Eye onClick={showPasswordC}/>:<EyeSlash onClick={showPassword}/>}</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                    <Button id="requestBtn" variant="dark"  onClick={otpRequest}>
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
                                    <Button variant="dark" id="otp-btn" onClick={otpVerificaton}>
                                        Verify OTP
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <div className="d-grid gap-2">
                                    <Button onClick={registerUser} variant="dark" disabled={regStatus} id="register-btn">
                                        Register
                                    </Button>
                                </div>                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                    <Alert id="reg-alert" variant={alertType}>{error}</Alert>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="link" disabled={loginStatus} id="login-link" onClick={()=>nav("/login")}>Login to your account</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;