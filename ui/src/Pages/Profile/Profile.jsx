import './Profile.scss';
import { Row,Col,Form,InputGroup,FormControl,Button } from 'react-bootstrap';
import {People,Person} from 'react-bootstrap-icons';
const Profile = ()=>{
    return(
        <>
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
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon3"
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
                                        <InputGroup.Text id="basic-addon1">&#128274;</InputGroup.Text>
                                        <FormControl
                                        type="password"
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" disabled id="register-btn">
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