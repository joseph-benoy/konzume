import './Login.scss';
import { Container,Row,Col,Form,InputGroup,FormControl,Button,Alert} from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { FileLock,Eye,EyeSlash } from 'react-bootstrap-icons';
const Login = ()=>{
    const nav = useNavigate();
    const [alertType,setAlertType] = React.useState("light");
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
    const { register, handleSubmit} = useForm();
    const [error,setError] = React.useState("");
    const onSubmit = async (data)=>{
        try{
            const params = qs.stringify({
                email:data.email,
                password:data.password
            });
        const resp = await axios({
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: '/user/login',
                    data:params
                }
            );
            sessionStorage.setItem("jwt",resp.data.jwt);
            sessionStorage.setItem("uid",resp.data.uid);
            sessionStorage.setItem("email",resp.data.email);
            nav("/dashboard/search");
        }
        catch(e){
            let message = e.response.data.error;
            if(message=="wrong password"){
                setError("Wrong password!");
            }
            if(message=="username doesnot exits"){
                setError("User doesn't exist!");
            }
            setAlertType("danger");
        }
    }
    const getPassword = async(data)=>{
        try{
            setError("Password is being sent...");
            setAlertType("info");
            const params = qs.stringify({
                email:data.email
            });
            const resp = await axios({
                        method: 'POST',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        url: '/user/getpassword',
                        data:params
                    }
                );
                setError("Password is send to "+data.email);
                setAlertType("success");
        }
        catch(e){
            setError("Can't find your account!");
            setAlertType("danger");
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
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 style={{textAlign:"center"}}>Sign In</h2>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                            required
                            type="email"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            {...register("email")}
                            />
                        </InputGroup>

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FileLock/></InputGroup.Text>
                            <FormControl
                            required
                            id="pass"
                            type="password"
                            placeholder="Enter your assword"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            {...register("password")}
                            />
                            <InputGroup.Text>{(eyeType==='Eye')?<Eye onClick={showPassword}/>:<EyeSlash onClick={showPassword}/>}</InputGroup.Text>

                        </InputGroup>
                      </Form.Group>
                        <Button variant="dark" type="submit">
                            Login
                        </Button>
                        <Button variant='link' onClick={handleSubmit(getPassword)} style={{textDecoration:"none"}}>Request for password</Button>
                        </Form>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Button id="regBtn" variant='link' onClick={()=>nav("/signup")} style={{textDecoration:"none"}}>Not registered? Sign Up</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alert id="error-alert" variant={alertType}>{error}</Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;