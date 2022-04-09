import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/",
    // baseURL: "https://xuantam-mern-blog.herokuapp.com/api",
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // },
});
