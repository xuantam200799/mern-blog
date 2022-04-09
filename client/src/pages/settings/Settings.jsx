import React, { useContext, useState } from "react";
import "./settings.css";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "../../components/formik/FormikControl";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";

const Settings = () => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().required("Required"),
    });
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const PF = "https://xuantam-mern-blog.herokuapp.com/images/";

    const handleSubmit = async (values) => {
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username: values.username,
            email: values.email,
            password: values.password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axiosInstance.post("/upload", data);
            } catch (err) {}
        }
        try {
            const res = await axiosInstance.put(
                "/users/" + user._id,
                updatedUser
            );
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    const handleDelete = async (e) => {
        window.confirm("chua lam chuc nang xoa");
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">
                        Update your account
                    </span>
                    <Link className="link" onClick={() => handleDelete()}>
                        <span className="settingsTitleDelete">
                            Delete account
                        </span>
                    </Link>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form className="settingsForm">
                                <label htmlFor="">Profile Picture</label>
                                <div className="settingsPP">
                                    <img
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : PF + user.profilePic
                                        }
                                        alt=""
                                    />
                                    <label htmlFor="fileInput">
                                        <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        style={{ display: "none" }}
                                        className="settingsPPInput"
                                        onChange={(e) =>
                                            setFile(e.target.files[0])
                                        }
                                    />
                                </div>

                                <FormikControl
                                    control="input"
                                    type="text"
                                    label="Username"
                                    name="username"
                                    placeholder={user.username}
                                    className="settingInput"
                                />
                                <FormikControl
                                    control="input"
                                    type="text"
                                    label="Email"
                                    name="email"
                                    placeholder={user.email}
                                    className="settingInput"
                                />
                                <FormikControl
                                    control="input"
                                    type="password"
                                    label="Password"
                                    name="password"
                                    placeholder="Enter your password..."
                                    className="settingInput"
                                />
                                <button
                                    type="submit"
                                    disabled={!formik.isValid}
                                    className="settingsSubmitButton"
                                >
                                    Update
                                </button>
                                {success && (
                                    <span
                                        style={{
                                            color: "green",
                                            textAlign: "center",
                                            marginTop: "20px",
                                        }}
                                    >
                                        Profile has been updated...
                                    </span>
                                )}
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <Sidebar />
        </div>
    );
};

export default Settings;
