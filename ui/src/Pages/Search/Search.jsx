import { Col, Container, Form, Row,Button,Alert } from 'react-bootstrap';
import './Search.scss';
import React from 'react';
import axios from 'axios';
import ProductView from './productView/productView';
const Search = ()=>{
    const [search,setSearch] = React.useState("");
    const [error,setError] = React.useState("");
    const [purl,setPurl] = React.useState("");
    const [alertType,setAlert] = React.useState("light");



    const [url,setUrl] = React.useState("");
    const [img,setImg] = React.useState("");
    const [rating,setRating] = React.useState("");
    const [title,setTitle] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [reviews,setReviews] = React.useState([]);
    const [about,setAbout] = React.useState([]);
    const [flipReview,setFlip] = React.useState("");
    const submitSearch = async()=>{
        if(search!=''){
            try{
                setError("Searching for "+search+"...");
                setAlert("info");
                const res = await axios({
                    method: 'GET',
                    url: '/product/amazonproductdetails',
                    params:{
                        purl:search
                    },
                    timeout:50000
                });
                try{
                    const flip = await axios({
                        method: 'GET',
                        url: '/product/getflipkart',
                        params:{
                            p:search
                        },
                        timeout:50000
                    });
                    if(flip.data.productRating!==""){
                        setFlip(flip.data.productRating);
                    }
                    else{
                        setFlip("Nill");
                    }
                }
                catch(e){
                    setFlip("Nill");
                }
                setUrl(res.data.productUrl);
                setTitle(res.data.productTitle);
                setAbout(res.data.productAbout);
                setPrice(res.data.productPrice);
                setImg(res.data.productImgUrl);
                setRating(res.data.productRating);
                setReviews(res.data.productReviews);
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
                <Col>
                    <Alert variant={alertType} id="search-alert">{error}</Alert>
                </Col>
            </Row>
            <Row>
                <Col lg={5} id="search-image">
                    <img src="search-image.png" alt="search-image" id="search-image" fluid/>
                </Col>
                <Col id="productSummary">
                    <Row>
                        <Col>
                            <h4>{title}</h4>
                            <h6>{price}</h6>
                            <img src={img} alt='product-img' id="productImg"/>
                            <h5>Ratings</h5>
                            <ul>
                                <li>Amazon : {rating}</li>
                                <li>Flipkart : {flipReview}</li>
                            </ul>
                            <h5>About</h5>
                            <ul>
                                {about.map((feature)=>(
                                    <li>{feature}</li>
                                ))}
                            </ul>
                            <h5>Top reviews from web</h5>
                            <ul>
                                {reviews.map((rev)=>(
                                    <li>{rev.replaceAll("<br/>"," ")}</li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;