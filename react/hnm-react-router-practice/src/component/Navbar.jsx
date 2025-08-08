import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const menuList = [
        "여성",
        "Divided",
        "남성",
        "신생아/유아",
        "아동",
        "H&M Home",
        "Sale",
        "지속가능성",
    ];
    return (
        <div>
            <div>
                <div className="login-button">
                    <FontAwesomeIcon icon={faUser} />
                    <div>로그인</div>
                </div>
            </div>
            <div className="logo-box">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1418px-H%26M-Logo.svg.png"
                    alt="h&m 이미지"
                />
            </div>
            <div className="menu-area">
                <ul className="menu-list">
                    {menuList.map((menu) => (
                        <li>{menu}</li>
                    ))}
                </ul>

                <div className="input-box">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="드레스" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
