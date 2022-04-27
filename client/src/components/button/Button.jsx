import React from "react";
import "./button.css";

const Button = () => {
    return <div>Button</div>;
};

export const IconButton = ({ onClick, iconName, className }) => {
    return (
        <button onClick={onClick} className={`btn btn-icon ${className}`}>
            <i className={`${iconName}`}></i>
        </button>
    );
};

export default Button;
