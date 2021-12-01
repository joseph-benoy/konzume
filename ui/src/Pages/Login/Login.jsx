import './Login.scss';
import { Container,Row,Col} from 'react-bootstrap';
import Header from '../../Components/Header/Header';
const Login = ()=>{
    return(
        <Container fluid className='gx-0'>
            <Row className='gx-0'>
                <Col>
                    <Header/>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;