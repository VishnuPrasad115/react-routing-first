import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles/productList.css';

const BASE_URL = 'http://localhost:5000';

var ReqUrl=BASE_URL + '/ecomm/api/v1/products';
function ProductList() {
	const [categoryList, ] = useState([]);
	const [productList, setProductList] = useState([]);
	const [currentCategory, setCurrentCategory] = useState('');
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(-1);
	const [searchQuery, setSearchQuery] = useState('');
	// const [ReqUrl, setReqUrl] = useState('');
	const {categoryId} = useParams()
	
	
	useEffect(() => {
		const data = {
			token: localStorage.getItem("token")
		};
		
		if (categoryId) {
			setCurrentCategory(categoryId);
			data.categoryId = categoryId;
		}
			if(data.categoryId)
				ReqUrl = BASE_URL + '/ecomm/api/v1/categories/'+data.categoryId+'/products';
			else
				ReqUrl=BASE_URL + '/ecomm/api/v1/products';

		fetchProducts(data);
	}, [categoryId]);

	const searchProduct = (e) => {
		setSearchQuery(e.target.value);
		const data = {
			name: e.target.value,
			token: localStorage.getItem("token")
		};

		if (currentCategory) {
			data.categoryId = currentCategory;
		}

		fetchProducts(data);
	}

	const fetchProducts = (data) => {
		axios.get(ReqUrl, {
			params: data
		})
            .then(response=>{
				setProductList(response.data);                
            }).catch(function (error) {
				console.log(error);
		});
	}

	const updateCategory = (categoryId) => {
		setCurrentCategory(categoryId);
		const data = {
			categoryId,
			token: localStorage.getItem("token")
		};
		fetchProducts(data);
	}

	const updateMinPrice = (e) => {
		setMinPrice(e.target.value);
		filterProduct(e.target.value, maxPrice, searchQuery);
	}

	const updateMaxPrice = (e) => {
		setMaxPrice(e.target.value);
		filterProduct(minPrice, e.target.value, searchQuery);
	}

	const filterProduct = (minPrice, maxPrice, searchQuery) => {
		const data = {
			name: searchQuery,
			minCost:minPrice,
			maxCost:maxPrice,
			token: localStorage.getItem("token")
		};

		if (currentCategory) {
			data.categoryId = currentCategory;
		}

		fetchProducts(data);
	}

	const clearFilter = () => {
		window.location.reload(true);
	}

	return (
		<div id="productListPage">
			<div className="container">
				<div className="row">
					<h2 className="product-list-title text-center">All Products</h2>
					<div className="product-list-wrapper d-flex flex-row">
						<div className="product-list-sidebar d-flex flex-column">
							<div className="sidebar-title">Search</div>
							<div className="sidebar-search form-group">
								<input type="text" placeholder="Search by name" className="form-control" onChange={searchProduct} />
							</div>
							<div className="sidebar-title fw-bold">Categories</div>
							<div>
								{
									categoryList.map((category) => (
										<Link onClick={() => updateCategory(category.id)} key={category.id} className={"d-flex text-decoration-none " + (category.id === currentCategory ? 'active' : undefined)} to={"/products?categoryId=" + category.id}>{category.name}</Link>
									))
								}
							</div>
							<div className="sidebar-title">Filter by Price</div>
							<div className="price-filter">
								<div className="price-filter-select d-flex flex-row justify-content-between">
									<div className="form-group">
										<select className="form-select" onChange={updateMinPrice}>
											<option value="0">0</option>
											<option value="1000">1000</option>
											<option value="2000">2000</option>
											<option value="5000">5000</option>
											<option value="10000">10000</option>
											<option value="20000">20000</option>
											<option value="50000">50000</option>
										</select>
									</div>
									<div className="form-group">
										<select className="form-select" onChange={updateMaxPrice}>
											<option value="1000">1000</option>
											<option value="2000">2000</option>
											<option value="5000">5000</option>
											<option value="10000">10000</option>
											<option value="20000">20000</option>
											<option value="50000">50000</option>
											<option value="100000">100000+</option>
										</select>
									</div>
								</div>
								<div className="price-filter-title d-flex flex-row justify-content-between">
									<div>Min Price</div>
									<div>Max Price</div>
								</div>
							</div>
							<div className="btn btn-primary clear-filter" onClick={clearFilter}> Clear All Filters</div>
						</div>
						<div className="product-list-box">
							{
								productList.map((product) => (
									<Link key={product.id} className="product-item text-decoration-none d-inline-block" to={"/home/product/" + product.id + "/details"}>
										<div className="product-img">
											<img alt="alt" src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
										</div>
										<div className="product-name text-center">{product.name}</div>
										<div className="product-price text-center">??? {product.cost}</div>
										<div className="product-description text-center">{product.description}</div>
										
									</Link>
								))
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductList;
