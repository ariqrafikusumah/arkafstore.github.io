import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda";
import NavbarTop from "./components/NavbarTop";
import FooterBot from "./components/FooterBot";
import NotFound from "./pages/NotFound";
import Dashboard from "./admin/Dashboard";
import FreeFire from "./admin/Freefire";
import Mobilelegend from "./admin/Mobilelegend";
import Mobilelegends from "./pages/order/Mobilelegends";
import Category from "./admin/Category";
import Login from "./admin/Login";
import Freefire from "./pages/order/Freefire";

function App() {
  return (
    <Router>
      <NavbarTop />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/order/free-fire" element={<Freefire />} />
        <Route path="/admin/free-fire" element={<FreeFire/>} />
        <Route path="/admin/dashboard-admin" element={<Dashboard />} />
        <Route path="/admin/category-game" element={<Category />} />
        <Route path="/admin/mobile-legend" element={<Mobilelegend />} />
        <Route path="/order/mobile-legends" element={<Mobilelegends />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterBot />
    </Router>
  );
}

export default App;
