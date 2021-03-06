import './About.scss';
import Header from '../../Components/Header/Header';
import { Container,Row,Col } from 'react-bootstrap';
const About = ()=>{
    return(
        <Container fluid className='gx-0'>
            <Row className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>About</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default About;