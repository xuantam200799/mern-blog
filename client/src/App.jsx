import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import TopBar from "./components/topbar/TopBar";
import Homepage from "./pages/homepage/Homepage";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./app.css";

function App() {
    const user = useSelector((state) => state.user.user);

    return (
        <Router>
            <TopBar />
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/posts">
                    <Homepage />
                </Route>
                <Route path="/register">
                    {user ? <Homepage /> : <Register />}
                </Route>
                <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
                <Route path="/post/:id">
                    <Single />
                </Route>
                <Route path="/write">{user ? <Write /> : <Login />}</Route>
                <Route path="/settings">
                    {user ? <Settings /> : <Login />}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
