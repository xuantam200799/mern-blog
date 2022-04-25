import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "../../components/formik/FormikControl";
import AuthService from "../../services/auth.service";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const initialValues = {
        username: "",
        password: "",
    };
    const validationSchema = Yup.object({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
    });

    const dispatch = useDispatch();
    const [error, setError] = useState({});

    const handleSubmit = async (values) => {
        setError({});
        dispatch(loginStart());
        try {
            const res = await AuthService.login(
                values.username,
                values.password
            );

            dispatch(loginSuccess(res.data));
        } catch (err) {
            dispatch(loginFailure());
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
            <p
                style={{
                    marginTop: "8px",
                }}
            >
                If you don't have a account?{" "}
                <Link to="/register" className="link" style={{ color: "teal" }}>
                    register
                </Link>{" "}
                here!
            </p>
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
