import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

import Badge from "../badge/Badge";

import { prefixImgURI } from "../../services/api";

const Post = ({ post }) => {
    return (
        <div className="post">
            {post.photo && (
                <Link to={`/post/${post._id}`} className="link">
                    <img
                        className="postImg"
                        src={prefixImgURI + post.photo}
                        alt=""
                    />
                </Link>
            )}
            <div className="postContent">
                <div className="postInfo">
                    <Link to={`/post/${post._id}`} className="link">
                        <span className="postTitle">{post.title}</span>
                    </Link>
                    <span className="postDate">{format(post.createdAt)}</span>
                    <div className="postCats">
                        {post.categories.map((cat, i) => (
                            <Link className="link" to={`/?cat=${cat}`} key={i}>
                                <Badge>{cat}</Badge>
                            </Link>
                        ))}
                    </div>
                </div>
                <p className="postDesc">{post.desc}</p>
            </div>
        </div>
    );
};

export default Post;
