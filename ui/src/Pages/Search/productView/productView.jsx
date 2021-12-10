import React from 'react';
import './productView.scss';
import axios from 'axios';
const ProductView = ({purl})=>{
    const [url,setUrl] = React.useState("");
    const [img,setImg] = React.useState("");
    const [rating,setRating] = React.useState("");
    const [title,setTitle] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [reviews,setReviews] = React.useState([]);
    const [about,setAbout] = React.useState([]);
    const [error,setError] = React.useState("");
    const [alertType,setAlert] = React.useState("light");
    React.useEffect(async()=>{
        try{
            const res = await axios({
                method: 'GET',
                url: '/product/amazonproductdetails',
                params:{
                    purl:purl
                },
                timeout:50000
            });
            setUrl(res.data.productUrl);
            setTitle(res.data.productTitle);
            setAbout(res.data.productAbout);
            setPrice(res.data.productPrice);
            setImg(res.data.productImgUrl);
            setRating(res.data.productRating);
            setReviews(res.data.productReviews);
        }
        catch(e){
            setError("Couldn't fetch product details");
            setAlert("danger");
        }
    },[]);
    return(
        <h1>{title}</h1>
    );
}
export default ProductView;