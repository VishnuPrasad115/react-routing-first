import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const BASE_URL = "http://localhost:5000";

function Landing() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const data = {
      token: localStorage.getItem("token"),
    };

    axios.get(BASE_URL + "/ecomm/api/v1/categories/", data).then((response) => {
      setCategoryList(response.data);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="home-title text-center">Welcome to Ecommerce</h2>
          <div className="category-list d-flex flex-row justify-content-center align-items-center">
            <div className="category-item rounded-3 d-flex justify-content-center align-items-center">
              <Link
                className="text-decoration-none text-white"
                to={"/home/products"}
              >
                All Products
              </Link>
            </div>
            {categoryList.map((category) => (
              <div
                key={category.id}
                className="category-item rounded-3 d-flex justify-content-center align-items-center"
              >
                <Link
                  to={`/home/products/${category.id}`}
                  className="text-decoration-none text-white"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="category-title text-center">
            Select a category to start shopping
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
