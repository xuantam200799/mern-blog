import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

import "./singlePost.css";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

const SinglePost = () => {
    const PF = "https://xuantam-mern-blog.herokuapp.com/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const { user } = useContext(Context);

    const [updateMode, setUpdateMode] = useState(false);
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            const res = await axiosInstance.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
        window.scrollTo(0, 0);
    }, [path]);

    const handleChangeCats = (e) => {
        const cats = e.target.value.split(",");
        setCats(cats);
    };

    const handleDelete = async (e) => {
        try {
            if (window.confirm("Do you want to delete this post?") === true) {
                await axiosInstance.delete(`/posts/${post._id}`, {
                    data: { username: user.username },
                });
                window.location.replace("/");
            }
        } catch (error) {}
    };

    const handleUpdate = async () => {
        const updatePost = {
            title,
            desc,
            username: user.username,
            categories: cats,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatePost.photo = filename;
            try {
                await axiosInstance.post("/upload", data);
            } catch (error) {}
        }
        try {
            await axiosInstance.put(`/posts/${post._id}`, updatePost);
            setUpdateMode(false);
        } catch (err) {}
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img
                        src={PF + post.photo}
                        alt=""
                        className="singlePostImg"
                    />
                )}
                {updateMode ? (
                    <div className="singlePostTitleWrapper">
                        <div className="singlePostTitleFileWrapper">
                            <label htmlFor="fileInput">
                                <i className="writeIcon fa-solid fa-plus"></i>
                            </label>
                            <input
                                type="file"
                                name=""
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <input
                            type="text"
                            value={title}
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon fa-solid fa-pen-to-square"
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i
                                    className="singlePostIcon fa-solid fa-trash-can"
                                    onClick={handleDelete}
                                ></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {format(post.createdAt)}
                    </span>
                </div>
                {updateMode ? (
                    <input
                        type="text"
                        value={cats}
                        placeholder="music,history,health"
                        className="singlePostCatsInput"
                        onChange={(e) => handleChangeCats(e)}
                    />
                ) : (
                    <div className="singlePostCats">
                        {post.categories === undefined
                            ? ""
                            : post.categories.map((cat, i) => (
                                  <Link
                                      to={`/?cat=${cat}`}
                                      key={i}
                                      className="link"
                                  >
                                      <li className="singlePostCatsItem">
                                          {cat}
                                      </li>
                                  </Link>
                              ))}
                    </div>
                )}
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        rows="15"
                    />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}
                {updateMode && (
                    <div className="singlePostButtonContainer">
                        <button
                            className="singlePostButton"
                            onClick={() => setUpdateMode(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="singlePostButton"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
