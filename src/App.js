import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import PostDetails from "./post-details";
import CategoryList from "./category-list";

const App = () => {
  return (
    <Router>
           <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/category-list/:id" element={<CategoryList />} />
      </Routes>
    </Router>
  );
};

export default App;
