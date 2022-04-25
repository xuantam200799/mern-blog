import axios from "axios";
import TokenService from "./token.service";

const BASE_URL = "http://localhost:5000/api/";
// const BASE_URL ="https://xuantam-mern-blog.herokuapp.com/api"

export const prefixImgURI = "http://localhost:5000/images/";
// export const prefixImgURI = "https://xuantam-mern-blog.herokuapp.com/images/";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
        if (token) {
            config.headers["x_authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/register" && err.response) {
            if (err.response.status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await axiosInstance.post("/auth/refresh", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });
                    const { accessToken } = rs.data;
                    TokenService.updateLocalAccessToken(accessToken);
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
