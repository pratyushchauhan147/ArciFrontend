import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import FloorPlanGeneratorPage from "../Pages/Generator";
const AppRoute = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gen" element={<FloorPlanGeneratorPage/>} />
    </Routes>
  </Router>
);

export default AppRoute;