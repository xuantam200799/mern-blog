import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const BASE_URL ="https://xuantam-mern-blog.herokuapp.com/api"
const currentUser = JSON.parse(localStorage.getItem("user"));
const TOKEN = currentUser?.token;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // },
});

export const prefixImgURI = "http://localhost:5000/images/";
// export const prefixImgURI = "https://xuantam-mern-blog.herokuapp.com/images/";
