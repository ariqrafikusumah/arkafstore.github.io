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
import TermsAndCondition from "./pages/TermAndCondition";
import Tentang from "./pages/Tentang";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Qris from "./admin/Qris";
import 'react-bootstrap';
import Bank from "./admin/Bank";
import Ewallet from "./admin/Ewallet";

function App() {
  return (
    <Router>
      <NavbarTop />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/Terms" element={<TermsAndCondition />} />
        <Route path="/Tentang" element={<Tentang />} />
        <Route path="/Tentang" element={<Login />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/qris" element={<Qris />} />
        <Route path="/admin/bank" element={<Bank />} />
        <Route path="/admin/e-wallet" element={<Ewallet />} />
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
