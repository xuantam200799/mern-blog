import React from "react";
import "./badge.css";

const Badge = ({ size = "sm", children, color = "primary" }) => {
    return (
        <span className={`badge badge-${size} badge-${color}`}>{children}</span>
    );
};

export default Badge;
