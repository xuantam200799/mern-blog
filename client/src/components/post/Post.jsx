import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Post = ({ post }) => {
    const PF = "https://xuantam-mern-blog.herokuapp.com/images/";
    return (
        <div className="post">
            {post.photo && (
                <Link to={`/post/${post._id}`} className="link">
                    <img className="postImg" src={PF + post.photo} alt="" />
                </Link>
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((cat, i) => (
                        <span className="postCat" key={i}>
                            {cat.name}
                        </span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>
    );
};

export default Post;
