import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "../../components/formik/FormikControl";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

const Login = () => {
    const initialValues = {
        username: "",
        password: "",
    };
    const validationSchema = Yup.object({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    });

    const { dispatch } = useContext(Context);
    const [error, setError] = useState({});

    const handleSubmit = async (values) => {
        setError({});
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axiosInstance.post("/auth/login", {
                username: values.username,
                password: values.password,
            });

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            setError(err.response);
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form className="loginForm">
                            <FormikControl
                                control="input"
                                type="text"
                                label="Username"
                                name="username"
                                placeholder="Enter your username..."
                                className="loginInput"
                            />
                            <FormikControl
                                control="input"
                                type="password"
                                label="Password"
                                name="password"
                                placeholder="Enter your password..."
                                className="loginInput"
                            />
                            <button
                                type="submit"
                                disabled={!formik.isValid}
                                className="loginButton"
                            >
                                Login
                            </button>
                        </Form>
                    );
                }}
            </Formik>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
            {error && (
                <span
                    style={{
                        color: "red",
                        marginTop: "8px",
                    }}
                >
                    {error.data}
                </span>
            )}
        </div>
    );
};

export default Login;
