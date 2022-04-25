import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updateStart: (state) => {
            state = { ...state };
            state.isFetching = true;
        },
        updateSuccess: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            state.isFetching = false;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        updateFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.user = null;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateStart,
    updateSuccess,
    updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
