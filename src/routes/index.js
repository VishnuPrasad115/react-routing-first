import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../pages/ProductList";
import AccountDetails from "../pages/AccountDetails";
import Landing from "../pages/Landing";
const AppRoutes = () => (
  <Routes>
    <Route
      path=""
      element={
        <Suspense fallback={<div className="loader"></div>}>
          <Login />
        </Suspense>
      }
    />
    <Route
      path="home"
      element={
        <Suspense fallback={<div className="loader"></div>}>
          <Home />
        </Suspense>
      }
    >
      <Route
        path=""
        element={
          <Suspense fallback={<div className="loader"></div>}>
            <Landing />
          </Suspense>
        }
      />
      <Route
        path="account"
        element={
          <Suspense fallback={<div className="loader"></div>}>
            <AccountDetails />
          </Suspense>
        }
      />
      <Route
        path="cart"
        element={
          <Suspense fallback={<div className="loader"></div>}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="checkout"
        element={
          <Suspense fallback={<div className="loader"></div>}>
            <Checkout />
          </Suspense>
        }
      />
    <Route
        path="products"
        element={
          <Suspense fallback={<div className="loader"></div>}>
            <ProductList />
          </Suspense>
        }
      />
      <Route
        path="products/:categoryId"
        element={
          <Suspense fallback={<div className="loader"></div>}>
            <ProductList />
          </Suspense>
        }
      />
      <Route
        path="product/:productId/details"
        element={
          <Suspense fallback={<div className="loader"></div>}>
            <ProductDetails />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);
export default AppRoutes;
