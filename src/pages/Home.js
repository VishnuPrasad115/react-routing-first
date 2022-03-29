import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/home.css";


function Home() {
  const [username, setUsername] = useState("User");

  const logoutFn = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <div id="homePage">
      <div id="header">
        <div className="container">
          <div className="row">
            <div className="header-wrapper d-flex justify-content-between">
              <div className="logo d-inline-block">
                <Link className="text-decoration-none" to={"/home"}>
                  Ecommerce
                </Link>
              </div>
              <div className="user-actions d-flex flex-row">
                <Link className="text-decoration-none" to={"/home/account"}>Account</Link>
                <Link className="text-decoration-none" to={"/home/cart"}>
                  Cart
                </Link>
                <div className="user-intro">Hi {username}</div>
                <div className="logout-btn" onClick={logoutFn}>
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
