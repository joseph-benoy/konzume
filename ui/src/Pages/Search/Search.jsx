import { Col, Container, Form, Row,Button,Alert,ListGroup } from 'react-bootstrap';
import './Search.scss';
import React from 'react';
import axios from 'axios';
import { CaretDown, CaretUp, PencilSquare} from 'react-bootstrap-icons';
import qs from 'qs';
const Search = ()=>{
    const [search,setSearch] = React.useState("");
    const [error,setError] = React.useState("");
    const [purl,setPurl] = React.useState("");
    const [alertType,setAlert] = React.useState("light");
    const [krev,setKrev] = React.useState([]);
    const [url,setUrl] = React.useState("");
    const [img,setImg] = React.useState("");
    const [rating,setRating] = React.useState("");
    const [title,setTitle] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [reviews,setReviews] = React.useState([]);
    const [about,setAbout] = React.useState([]);
    const [flipReview,setFlip] = React.useState("");
    const [comment,setComment] = React.useState("");
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
                if(res.status===200){
                    try{
                        const params = qs.stringify({
                            name:res.data.productTitle,
                            url:res.data.productUrl
                        });
                        const save = await axios({
                            method: 'POST',
                            url: '/product/saveproduct',
                            data:params,
                            timeout:50000
                        });
                    }
                    catch(e){
                    }
                }
                await fetchReviews(res.data.productTitle,res.data.productUrl);
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
    const saveReview = React.useCallback(async()=>{
        try{
            const params = qs.stringify({
                name:title,
                url:url
            });
            const getProduct = await axios({
                method: 'POST',
                url: '/product/getproduct',
                data:params,
                timeout:50000
            });
            if(getProduct.status===200){
                try{
                    const params = qs.stringify({
                        uid:sessionStorage.getItem("uid"),
                        pid:getProduct.data.success[0].ID,
                        comment:comment
                    });
                    const saveRes = await axios({
                        method: 'POST',
                        url: '/review/new',
                        data:params,
                        timeout:50000,
                        headers: { 'content-type': 'application/x-www-form-urlencoded',
                            'Authorization':`Bearer ${sessionStorage.getItem("jwt")}`
                        }
                    });
                    setError("Posted your review!");
                    setAlert("success");
                    fetchReviews(title,url);
                }
                catch(e){
                    setError("Couldn't post your review!");
                    setAlert("danger");
                }
            }
        }
        catch(e){

        }
    });
    const fetchReviews = async(ptitle,purl)=>{
        try{
            const params = qs.stringify({
                name:ptitle,
                url:purl
            });
            const getProduct = await axios({
                method: 'POST',
                url: '/product/getproduct',
                data:params,
                timeout:50000
            });
            if(getProduct.status===200){
                try{
                    const params = qs.stringify({
                        pid:getProduct.data.success[0].ID
                    });
                    const getRes = await axios({
                        method: 'POST',
                        url: '/review/get',
                        data:params,
                        timeout:50000,
                        headers: { 'content-type': 'application/x-www-form-urlencoded',
                            'Authorization':`Bearer ${sessionStorage.getItem("jwt")}`
                        }
                    });
                    setKrev(getRes.data.success);
                    console.log(getRes.data.success);
                    getRes.data.success.map((rev)=>{
                        if(rev.UID==sessionStorage.getItem("uid")){
                            document.getElementById("newRev").style.display = "none";
                            document.getElementById("revs").style.display = "block";
                        }
                        else{
                            document.getElementById("newRev").style.display = "block";
                        }
                    });
                }
                catch(e){
                    setKrev([]);
                    document.getElementById("newRev").style.display = "block";
                    document.getElementById("revs").style.display = "none";
                }
            }
        }
        catch(e){

        }
    }
    const upvote = async(rid)=>{
        try{
            const params = qs.stringify({
                id:rid,
                uid:sessionStorage.getItem("uid"),
                type:1
            });
            await axios({
                method: 'POST',
                url: '/review/upvote',
                data:params,
                timeout:50000,
                headers: { 'content-type': 'application/x-www-form-urlencoded',
                    'Authorization':`Bearer ${sessionStorage.getItem("jwt")}`
                }
            });
            alert("Upvoted the review!");
            await submitSearch();
        }
        catch(e){
            alert("already upvoted");
        }
    }
    const downvote = async(rid)=>{
        try{
            const params = qs.stringify({
                id:rid,
                uid:sessionStorage.getItem("uid"),
                type:0
            });
            await axios({
                method: 'POST',
                url: '/review/downvote',
                data:params,
                timeout:50000,
                headers: { 'content-type': 'application/x-www-form-urlencoded',
                    'Authorization':`Bearer ${sessionStorage.getItem("jwt")}`
                }
            });
            alert("Downvoted the review!");
            await submitSearch();
        }
        catch(e){
            alert("already downvoted");
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
                    <Form.Control value={search} onChange={(e)=>{setSearch(e.target.value)}} type="search" size="large"  placeholder="Search the product name"/>
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
                            <h5 id="about">About</h5>
                            <ul>
                                {about.map((feature)=>(
                                    <li>{feature}</li>
                                ))}
                            </ul>
                            <h5 id="topRev">Top reviews from web</h5>
                            <ListGroup>
                                {reviews.map((rev)=>(
                                    <ListGroup.Item>{rev.replaceAll("<br/>"," ")}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="newRev">
                            <h5>Your review</h5>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" onChange={(e)=>{setComment(e.target.value)}} rows={3} placeholder='enter your honest views of the product here'/>
                            </Form.Group>
                            <Button variant="dark" onClick={saveReview} id="postBtn"><PencilSquare/>Post</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="revs">
                                    <h5>Reviews from Konzume users</h5>
                                    <ListGroup>
                                        {
                                            krev.map((rev)=>(
                                                <>
                                                    <ListGroup.Item>
                                                        <Container>
                                                            <Row>
                                                                <Col lg={1}>
                                                                    <Row>
                                                                        <Col lg={6}>
                                                                            <Button variant="link" onClick={()=>upvote(rev.ID)}><CaretUp/><br/>{rev.UPS}</Button>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                    <Col lg={6}>
                                                                            <Button variant="link"  onClick={()=>downvote(rev.ID)}><CaretDown/><br/>-{rev.DOWNS}</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col lg={11} style={{paddingTop:"2rem"}}>
                                                                    <Row>
                                                                        <Col className="profileName">
                                                                            {rev.FNAME+" "+rev.LNAME}
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col>
                                                                            {rev.COMMENT}
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </ListGroup.Item>
                                                </>
                                            ))
                                        }
                                    </ListGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;