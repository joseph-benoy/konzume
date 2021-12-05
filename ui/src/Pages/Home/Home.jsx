import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import './Home.scss';
const Home = ()=>{
    return(
        <Container fluid className='gx-0'>
            <Row  className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Home</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;