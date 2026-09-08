import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Footer from "./Footer";
import Header from "./Header";
import NotFound from "./NotFound";

function PageTransition() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchRequest, setSearchRequest] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    const handleSearchClick = () => {
        setSearchRequest((request) => request + 1);

        if (location.pathname !== "/") {
            navigate("/");
        }
    };

    return (
        <div key={location.pathname} className="page-transition">
            <Header onSearchClick={handleSearchClick} />
            <Routes location={location}>
                <Route
                    path="/"
                    element={<Products searchRequest={searchRequest} />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default PageTransition;
