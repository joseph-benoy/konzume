import { Button, Col, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

const Home = ()=>{
    const nav = useNavigate();
    return(
        <Container fluid className='gx-0'>
            <Row  className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Container id="mainContainer">
                        <Row>
                            <Col>
                                <h1>Think twice before you buy once</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p id="midText">Konzume will help you decide the right product for your needs after wise analytics!</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <Button variant="dark" onClick={()=>nav("/login")}>Sign In</Button>
                            </Col>
                            <Col lg={3}>
                                <Button id="signupBtn" variant="link" onClick={()=>nav("/signup")}>Sign Up</Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col lg={6}>
                    <img src="home.png" alt="home-image" fluid id="home-image"/>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;