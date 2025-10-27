import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  function goProductPage() {
    navigate("/products?q=skirts");
  }

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/about">go to About page</Link>
      <button onClick={() => goProductPage()}>go to product page</button>
    </div>
  );
};

export default Homepage;
