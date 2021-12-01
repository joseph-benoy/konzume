import { Container,Row,Col } from 'react-bootstrap';
import './Register.scss';
import Header from '../../Components/Header/Header';
import React from 'react';
const Register = ()=>{
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

export default Register;