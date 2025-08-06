import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Homepage from "./page/homepage.jsx";
import About from "./page/about.jsx";
import ProductPage from "./ProductPage.jsx";
import ProductDetailPage from "./ProductDetailPage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import UserPage from "./page/UserPage.jsx";

function App() {
    const [authenticate, setAuthenticate] = useState(true);
    const PrivateRoute = () => {
        return authenticate == true ? <UserPage /> : <Navigate to="/login" />;
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route
                        path="/products/:id"
                        element={<ProductDetailPage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/user" element={<PrivateRoute />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
