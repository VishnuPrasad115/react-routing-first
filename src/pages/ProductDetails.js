import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles/productDetails.css';

const BASE_URL = 'http://localhost:5000';

function ProductDetails() {
    const [productDetails, setProductDetails] = useState({});
    const {productId} = useParams()
    useEffect(() => {
        console.log(productId)
        const data = {
            id:productId,
            // userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        };
        axios.get(BASE_URL + '/ecomm/api/v1/products/'+productId, {
            params: data
        })
            .then(response=>{
                setProductDetails(response.data);             
            }).catch(function (error) {
                console.log(error);
        });
        
    }, [productId]);

    const addToCart = () => {
        const cartId=localStorage.getItem("cartId");
        const data = {
            productIds:[productId],
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            id:cartId
        };

        axios.get(BASE_URL + "/ecomm/api/v1/carts/"+cartId , {
            headers: {
                'x-access-token':  localStorage.getItem("token")
              }
            
        }).then(response=>{
            response.data.productsSelected.forEach(element => {
                data.productIds.push(element.id)
            }); 
            axios.put(BASE_URL + '/ecomm/api/v1/carts/'+cartId,data,{
                headers: {
                    'x-access-token': localStorage.getItem("token")
                  }
                
            }
            )
                .then(function (response) {
                    const newProductDetails = { ...productDetails };
                    newProductDetails.addedToCart = 1;
                    setProductDetails(newProductDetails)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }).catch(function(error){
            console.log(error);
        });


        
        
    }

    return (
        <div id="productDetailsPage">
            <div className="container">
                <div className="row">
                    <div className="product-details-wrapper d-flex flex-row">
                        <div className="product-img d-flex">
                            <div>
                                <img alt="alt" src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
                            </div>
                        </div>
                        <div className="product-details-box d-flex flex-column">
                            <div className="product-name">{productDetails.name}</div>
                            <div className="product-price fw-bold">??? {productDetails.cost}</div>
                            <div className="product-description">
                                <div className="product-description-title fw-bold">Description</div>
                                <div className="product-description-data">{productDetails.description}</div>
                            </div>
                            {
                                productDetails && productDetails.addedToCart === 1 ? (
                                    <Link
                                        className="product-details-action btn btn-primary text-decoration-none"
                                        to={"/cart"}
                                    >
                                        Go To Cart
                                    </Link>
                                ) : (
                                    <div className="product-details-action btn btn-primary text-decoration-none" onClick={addToCart}>Add To Cart</div>
                                )
                            }
                            <div className="add-to-cart-error-msg text-danger"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;