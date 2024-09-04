import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorContextProvider from "./context/AuthorContextProvider";
import Register from "./components/auth/Register";

function App() {
  return (
    <AuthorContextProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer />
    </Router>
    </AuthorContextProvider>
  );
}

export default App;
