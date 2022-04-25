import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateStart,
    updateSuccess,
    updateFailure,
    logout,
} from "../../redux/userSlice";
import "./settings.css";
import { axiosInstance } from "../../services/api";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "../../components/formik/FormikControl";
import Sidebar from "../../components/sidebar/Sidebar";
import { prefixImgURI } from "../../services/api";

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

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        dispatch(updateStart());
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
            dispatch(updateSuccess(res.data));
        } catch (err) {
            dispatch(updateFailure());
        }
    };

    const handleDelete = async (e) => {
        if (window.confirm("ban co muon xoa tai khoan k?") === true) {
            try {
                await axiosInstance.delete(`/users/${user._id}`, {
                    data: { userId: user._id },
                });
                dispatch(logout());
            } catch (err) {}
        }
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
                                                : prefixImgURI + user.profilePic
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
