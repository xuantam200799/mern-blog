import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./topbar.css";

import { IconButton } from "../button/Button";

import { prefixImgURI } from "../../services/api";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Topbar = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [toggle, setToggle] = useState(false);

    const handleLogout = (e) => {
        dispatch(logout());
    };

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    window.addEventListener("scroll", toggleVisible);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="top">
            <div className="topLeft">
                <IconButton
                    className="facebook"
                    iconName="fa-brands fa-facebook-square"
                />
                <IconButton
                    className="twitter"
                    iconName="fa-brands fa-twitter-square"
                />
                <IconButton
                    className="pinterest"
                    iconName="fa-brands fa-pinterest-square"
                />
                <IconButton
                    className="instagram"
                    iconName="fa-brands fa-instagram-square"
                />
            </div>
            <div className="topCenter">
                <button className="toggle" onClick={() => setToggle(!toggle)}>
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div className={`topList responsive ${toggle ? "active" : ""}`}>
                    <Link className="link" to="/">
                        <li className="topListItem">HOME</li>
                    </Link>
                    <li
                        className={`topListItem ${
                            location.pathname === "/about" && "active"
                        }`}
                    >
                        ABOUT
                    </li>
                    <li
                        className={`topListItem ${
                            location.pathname === "/contact" && "active"
                        }`}
                    >
                        CONTACT
                    </li>
                    <Link className="link" to="/write">
                        <li
                            className={`topListItem ${
                                location.pathname === "/write" && "active"
                            }`}
                        >
                            WRITE
                        </li>
                    </Link>
                    {user && (
                        <>
                            <Link
                                className="link"
                                to={`/?user=${user.username}`}
                            >
                                <li
                                    className={`topListItem ${
                                        location.search ===
                                            `?user=${user.username}` && "active"
                                    }`}
                                >
                                    MY POSTS
                                </li>
                            </Link>
                            <li className="topListItem" onClick={handleLogout}>
                                LOGOUT
                            </li>
                        </>
                    )}
                </div>
            </div>
            <div className="topRight">
                {user ? (
                    <Link className="link" to="/settings">
                        <div
                            className={`account ${
                                location.pathname === "/settings"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <img
                                className="accountTopImg"
                                src={prefixImgURI + user.profilePic}
                                alt=""
                            />
                            <span className="accountInfo">{user.username}</span>
                        </div>
                    </Link>
                ) : (
                    <ul className="topList">
                        <Link className="link" to="/login">
                            <li
                                className={`topListItem ${
                                    location.pathname === "/login" && "active"
                                }`}
                            >
                                LOGIN
                            </li>
                        </Link>
                        <Link className="link" to="/register">
                            <li
                                className={`topListItem ${
                                    location.pathname === "/register" &&
                                    "active"
                                }`}
                            >
                                REGISTER
                            </li>
                        </Link>
                    </ul>
                )}
                <div className="search">
                    <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <button
                className="scrollToTopbtn"
                onClick={() => window.scrollTo(0, 0)}
                style={{ display: visible ? "block" : "none" }}
            >
                <i class="fa-solid fa-arrow-up"></i>
            </button>
        </div>
    );
};

export default Topbar;
