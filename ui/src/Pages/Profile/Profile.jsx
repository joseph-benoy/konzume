import './Profile.scss';
import { Row,Col,Form,InputGroup,FormControl,Button } from 'react-bootstrap';
import {People,Person} from 'react-bootstrap-icons';
import React from 'react';
import axios from 'axios';
const Profile = ()=>{
    const showPassword = React.useCallback(()=>{
        const pass = document.getElementById('pass');
        if(pass.getAttribute('type')==='text'){
            pass.setAttribute('type','password');
        }
        else{
            pass.setAttribute('type','text');
        }
    });
    const [id,setId] = React.useState("");
    const [fname,setFname] = React.useState("");
    const [lname,setLname] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [error,setError] = React.useState("");
    const [alertType,setAlert] = React.useState("danger");
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
    return(
        <>
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
                                        <InputGroup.Text id="basic-addon1">&#128274;</InputGroup.Text>
                                        <FormControl
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        value={password}
                                        id="pass"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="show password"  onClick={showPassword} />
                        </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" disabled id="update-btn">
                                        Save
                                    </Button>
                                </div>                            
                            </Col>
                        </Row>
                    </Form>
                    </>
    );
}
export default Profile;