import { Col, Container, Form, Row,Button,Alert } from 'react-bootstrap';
import './Search.scss';
import React from 'react';
import axios from 'axios';
const Search = ()=>{
    const [search,setSearch] = React.useState("");
    const [productTitle,setTitle] = React.useState("");
    const [productUrl,setUrl] = React.useState("");
    const [productPrice,setPrice] = React.useState("");
    const [productImg,setImg] = React.useState("");
    const [error,setError] = React.useState("");
    const [alertType,setAlert] = React.useState("light");
    const submitSearch = async()=>{
        if(search!=''){
            try{
                setError("Searching for "+search+"...");
                setAlert("info");
                const res = await axios({
                    method: 'GET',
                    url: '/product/searchproduct',
                    params:{
                        p:search
                    },
                    timeout:50000
                });
                console.log(res.data);
                setTitle(res.data.productTitle);
                setUrl(res.data.productUrl);
                setImg(res.data.imgUrl);
                setPrice(res.data.price);
                document.getElementById('search-image').style.display = "none";
                document.getElementById('productSummary').style.display = "block";
                setError("");
                setAlert("light");
            }
            catch(e){
                setError("Couldn't  find the product!");
                setAlert("danger");
            }
        }
        else{
            document.getElementById('search-image').style.display = "block";
            document.getElementById('productSummary').style.display = "none";
            setError("Search field can't be empty");
            setAlert("danger");
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
                <Col id="productSummary">
                    <Row>
                        <Col>
                            <h4>{productTitle}</h4>
                            <h5>{productPrice}</h5>
                            <img src={productImg} alt='product-img' id="productImg"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="dark" id="checkoutBtn">checkout</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alert variant={alertType} id="search-alert">{error}</Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;