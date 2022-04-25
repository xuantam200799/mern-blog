import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./topbar.css";

import { prefixImgURI } from "../../services/api";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Topbar = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = (e) => {
        dispatch(logout());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fa-brands fa-facebook-square"></i>
                <i className="topIcon fa-brands fa-twitter-square"></i>
                <i className="topIcon fa-brands fa-pinterest-square"></i>
                <i className="topIcon fa-brands fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <div className="topList">
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
                        <img
                            className="topImg"
                            src={prefixImgURI + user.profilePic}
                            alt=""
                        />
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
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    );
};

export default Topbar;
