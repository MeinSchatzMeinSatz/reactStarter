import "./App.css";
import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import ProductDetail from "./page/ProductDetail.jsx";
import Login from "./page/Login.jsx";
import ProductAll from "./page/ProductAll.jsx";
import Navbar from "./component/Navbar.jsx";

// 1. 전체상품페이지, 로그인, 상품상세페이지
// 1-1. 네비게이션 바 만들기 - 디자인 천천히

// 2. 전체 상품페이지에서는 전체 상품을 볼 수 있다.
// 3. 로그인 버튼을 누르면 로그인 페이지가 나온다.
// 4. 상품 디테일을 눌렀으나, 로그인이 안되었을 경우에는 로그인 페이지가 먼저 나온다.
// 5. 로그인이 되어있을 경우에는 상품 디테일을 볼 수 있다.
// 6. 로그아웃 버튼을 클릭하면 로그아웃이 된다.
// 7. 로그아웃이 되면 상품 디테일페이지를 볼수없다. 다시 로그인페이지가 보인다.
// 8. 로그인을 하면 로그아웃이 보이고 로그아웃을 하면 로그인이 보인다.
// 9. 상품 검색을 할 수 있다.

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductAll />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
