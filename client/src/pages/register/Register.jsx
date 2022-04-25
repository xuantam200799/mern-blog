import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "../../components/formik/FormikControl";
import AuthService from "../../services/auth.service";

const Register = () => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    };
    const validationSchema = Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string().required("Required"),
        passwordConfirmation: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
    const [error, setError] = useState({});

    const handleSubmit = async (values) => {
        setError({});
        try {
            const res = await AuthService.register(
                values.username,
                values.email,
                values.password
            );
            res.data && window.location.replace("/login");
        } catch (error) {
            setError(error.response);
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form className="registerForm">
                            <FormikControl
                                control="input"
                                type="text"
                                label="Username"
                                name="username"
                                placeholder="Enter your username..."
                                className="registerInput"
                            />
                            <FormikControl
                                control="input"
                                type="text"
                                label="Email"
                                name="email"
                                placeholder="Enter your email..."
                                className="registerInput"
                            />
                            <FormikControl
                                control="input"
                                type="password"
                                label="Password"
                                name="password"
                                placeholder="Enter your password..."
                                className="registerInput"
                            />
                            <FormikControl
                                control="input"
                                type="password"
                                label="Confirm password"
                                name="passwordConfirmation"
                                placeholder="Confirm password..."
                                className="registerInput"
                            />
                            <button
                                type="submit"
                                // disabled={!formik.isValid}
                                className="registerButton"
                            >
                                Register
                            </button>
                        </Form>
                    );
                }}
            </Formik>

            <button className="registerLoginButton">
                <Link className="link" to="/login">
                    Login
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

export default Register;
