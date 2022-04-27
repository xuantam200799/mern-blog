import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { axiosInstance } from "../../services/api";
import { Link } from "react-router-dom";

import { IconButton } from "../button/Button";

const Sidebar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axiosInstance.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                    alt=""
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore
                    mollit amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <ul className="sidebarList">
                    {cats.map((cat) => (
                        <Link
                            to={`/?cat=${cat.name}`}
                            key={cat._id}
                            className="link"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <li className="sidebarListItem">{cat.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
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
            </div>
        </div>
    );
};

export default Sidebar;
