import { axiosInstance } from "./api";
import TokenService from "./token.service";

const register = (username, email, password) => {
    return axiosInstance.post("/auth/register", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axiosInstance.post("/auth/login", {
        username,
        password,
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    // logout,
    getCurrentUser,
};
export default AuthService;
