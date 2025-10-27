import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./page/Homepage";
import About from "./page/About";
import ProductPage from "./page/ProductPage";
import ProductDetail from "./page/ProductDetail";
import LoginPage from "./page/LoginPage";
import UserPage from "./page/UserPage";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const PrivateRoute = () => {
    return authenticated ? <UserPage /> : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<PrivateRoute />} />
      </Routes>
    </>
  );
}

export default App;
