import DashHeader from '../../Components/DashHeader/DashHeader';
import './Dash.scss';
import Profile from '../Profile/Profile';
import { Container,Row,Col,Form,InputGroup,FormControl,Button } from 'react-bootstrap';

const Dash = ()=>{
    return (
        <Container fluid className='gx-0'>
            <Row className='gx-0'>
                <Col>
                    <DashHeader/>
                </Col>
            </Row>
            <Row>
                <Profile/>
            </Row>
        </Container>
    );
}

export default Dash;