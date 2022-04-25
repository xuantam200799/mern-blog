import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./write.css";
import { axiosInstance } from "../../services/api";

const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const { user } = useSelector((state) => state.user);

    const handleOnCheck = (e) => {
        let updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user.username,
            categories: checked,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axiosInstance.post("/upload", data);
            } catch (error) {}
        }
        try {
            const res = await axiosInstance.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {}
    };

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await axiosInstance.get("/categories");
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCats();
    }, []);

    return (
        <div className="write">
            {file && (
                <img
                    className="writeImg"
                    src={URL.createObjectURL(file)}
                    alt=""
                />
            )}
            <form className="writeForm" action="" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
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
                    <input
                        type="text"
                        name=""
                        placeholder="Title"
                        id=""
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    {categories.map((cat, i) => (
                        <div className="writeCheckbox" key={i}>
                            <input
                                type="checkbox"
                                name={cat.name}
                                id={`${cat.name}-label`}
                                value={cat.name}
                                onChange={(e) => handleOnCheck(e)}
                            />
                            <label
                                htmlFor={`${cat.name}-label`}
                                className="checkbox-label"
                            >
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="writeFormGroup">
                    <textarea
                        name=""
                        placeholder="Tell your storry..."
                        type="text"
                        className="writeInput writeText"
                        id=""
                        cols=""
                        rows=""
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Write;
