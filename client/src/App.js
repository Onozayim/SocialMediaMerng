import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MenuBar from "./Components/MenuBar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SinglePost from "./Pages/SinglePost";

import { AuthContext } from "./context/auth";

function App() {
  const context = useContext(AuthContext);
  return (
    <BrowserRouter>
      <React.Fragment>
        <Container>
          <MenuBar />
          <Routes>
            {context.user ? (
              <Route path="/login" element={<Navigate replace to="/" />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {context.user ? (
              <Route path="/posts/:postId" element={<SinglePost />} />
            ) : (
              <Route path="/posts/:postId" element={<Login />} />
            )}
            {context.user ? (
              <Route path="/register" element={<Navigate replace to="/" />} />
            ) : (
              <Route path="/register" element={<Register />} />
            )}
            {!context.user ? (
              <Route path="/" element={<Navigate replace to="login" />} />
            ) : (
              <Route path="/" element={<Home />} />
            )}
          </Routes>
        </Container>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
