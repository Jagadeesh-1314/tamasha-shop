import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Footer from "./Footer";
import Header from "./Header";

function PageTransition() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return (
        <div key={location.pathname} className="page-transition">
            <Header />
            <Routes location={location}>
                <Route path="/" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default PageTransition;
