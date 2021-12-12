import './Profile.scss';
import { Row,Col,Form,InputGroup,FormControl,Button,Alert,Modal } from 'react-bootstrap';
import {People,Person,Eye,EyeSlash,FileLock} from 'react-bootstrap-icons';
import React from 'react';
import axios from 'axios';
import qs from 'qs';
const Profile = ()=>{
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
    const [id,setId] = React.useState("");
    const [fname,setFname] = React.useState("");
    const [lname,setLname] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [error,setError] = React.useState("");
    const [alertType,setAlert] = React.useState("light");
    React.useEffect(async ()=>{
        const resp = await axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${sessionStorage.getItem("jwt")}`
            },
            url: '/user/fetch',
        });
        setFname(resp.data.user[0]['FNAME']);
        setLname(resp.data.user[0]['LNAME']);
        setEmail(resp.data.user[0]['EMAIL']);
        setPassword(resp.data.user[0]['PASSWORD']);
        setId(resp.data.user[0]['ID']);
    },[]);
    const updateUser = React.useCallback(async ()=>{
        if(fname!==""){
            if(lname!==""){
                if(email!==""){
                    if(password.length>3){
                        try{
                            const params = qs.stringify({
                                fname:fname,
                                lname:lname,
                                email:email,
                                password:password
                            });
                            const res = await axios({
                                method: 'POST',
                                headers: { 'content-type': 'application/x-www-form-urlencoded',
                                    'Authorization':`Bearer ${sessionStorage.getItem("jwt")}`
                                },
                                url: '/user/updateuser',
                                data:params
                            });
                            setError("Updated user data!");
                            setAlert("success");
                        }
                        catch(e){
                            setError(e.response.data.error);
                            setAlert("danger");
                        }
                    }
                    else{
                        setError("Password is too short!");
                        setAlert("danger");
                    }
                }
                else{
                    setError("Email can't be empty!");
                    setAlert("danger");
                }
            }
            else{
                setError("Last name can't be empty!");
                setAlert("danger");
            }
        }
        else{
            setError("First name can't be empty!");
            setAlert("danger");
        }
    });
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
                <Modal show={show} onHide={handleClose} backdrop="static" centered id="modal">
                <Modal.Header closeButton>
                <Modal.Title>Delete account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are u sure about deleting your account?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Delete account
                </Button>
                </Modal.Footer>
            </Modal>
                <Form id="profile-form">
                        <h2 style={{textAlign:"center"}}>Profile</h2>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><Person/></InputGroup.Text>
                                        <FormControl
                                        placeholder="First name"
                                        aria-label="Fristname"
                                        aria-describedby="basic-addon1"
                                        value={fname}
                                        onChange={(e)=>{
                                            setFname(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon2"><People/></InputGroup.Text>
                                        <FormControl
                                        placeholder="Last name"
                                        aria-label="Lastname"
                                        aria-describedby="basic-addon2"
                                        value={lname}
                                        onChange={(e)=>{
                                            setLname(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon3">@</InputGroup.Text>
                                        <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon3"
                                        value={email}
                                        onChange={(e)=>{
                                            setEmail(e.target.value);
                                        }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><FileLock/></InputGroup.Text>
                                        <FormControl
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        value={password}
                                        id="pass"
                                        onChange={(e)=>{
                                            setPassword(e.target.value);
                                        }}
                                        />
                                        <InputGroup.Text>{(eyeType==='Eye')?<Eye onClick={showPassword}/>:<EyeSlash onClick={showPassword}/>}</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <div className="d-grid gap-2">
                                    <Button variant="dark" id="update-btn" onClick={updateUser}>
                                        Save
                                    </Button>
                                </div>                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="link" id="deleteBtn" onClick={handleShow}>Delete this account</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col>
                            <Alert id="error-alert" variant={alertType}>{error}</Alert>
                        </Col>
                    </Row>
                    </>
    );
}
export default Profile;