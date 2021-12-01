import './Login.scss';
import { Container,Row,Col,Form,InputGroup,FormControl,Button} from 'react-bootstrap';
import Header from '../../Components/Header/Header';
const Login = ()=>{
    return(
        <Container fluid className='gx-0'>
            <Row className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 style={{textAlign:"center"}}>Sign In</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
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
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">&#128274;</InputGroup.Text>
                            <FormControl
                            type="password"
                            placeholder="Enter your assword"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>  </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="show password" />
                        </Form.Group>
                        <Button variant="primary">
                            Login
                        </Button>
                        </Form>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant='link' style={{textDecoration:"none"}}>Not registered? Sign Up</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;