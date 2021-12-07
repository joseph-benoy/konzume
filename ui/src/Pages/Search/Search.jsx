import { Col, Container, Form, Row,Button } from 'react-bootstrap';
import './Search.scss';
const Search = ()=>{
    return(
        <Container fluid>
            <Row>
                <Col>
                    <h2>Search</h2>
                </Col>
            </Row>
            <Row id="search-bar">
                <Col lg={11}>
                    <Form.Control size="large" type="text" placeholder="Search the product name"/>
                </Col>
                <Col lg={1}>
                    <Button variant="dark">Search</Button>
                </Col>
            </Row>
            <Row>
                <Col lg={5}>
                    <img src="search-image.png" alt="search-image" id="search-image" fluid/>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;