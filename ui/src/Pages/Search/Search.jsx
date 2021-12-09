import { Col, Container, Form, Row,Button } from 'react-bootstrap';
import './Search.scss';
import React from 'react';
import axios from 'axios';
const Search = ()=>{
    const [search,setSearch] = React.useState("");
    const submitSearch = async()=>{
        if(search!=''){
            try{
                const res = await axios({
                    method: 'GET',
                    url: '/product/searchproduct',
                    params:{
                        p:search
                    }
                });
                console.log(res.data);
                document.getElementById('search-image').style.display = "none";
            }
            catch(e){
                console.log(e.response.data);
            }
        }
        else{

        }
    }
    return(
        <Container fluid>
            <Row>
                <Col>
                    <h2>Search</h2>
                </Col>
            </Row>
            <Row id="search-bar">
                <Col lg={11}>
                    <Form.Control value={search} onChange={(e)=>{setSearch(e.target.value)}} type="search" size="large" type="text" placeholder="Search the product name"/>
                </Col>
                <Col lg={1}>
                    <Button onClick={submitSearch} variant="dark">Search</Button>
                </Col>
            </Row>
            <Row>
                <Col lg={5} id="search-image">
                    <img src="search-image.png" alt="search-image" id="search-image" fluid/>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;