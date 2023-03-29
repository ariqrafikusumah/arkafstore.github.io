import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Freefire, GenshinImpact, Higgsdomino, MobileLegends, Pubgmobile, Valorant } from "./pages/order";
import { ApiGames, Bank, BannerSetting, Category, Dashboard, Ewallet, FreeFire, Genshinimpact, HiggsDomino, Mobilelegend, Popup, PubgMobile, Qris, ValorantAdmin, WhatsappSetting } from "./admin";
import { FooterBot, NavbarTop } from "./components";
import { Beranda, Daftarlayanan, NotFound, PLN, PrivacyPolicy, Pulsa, Tentang, TermsAndCondition, Voucher } from "./pages";
import { Login } from "./auth";

function App() {
  return (
    <Router>
      <NavbarTop />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/Terms" element={<TermsAndCondition />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Tentang" element={<Tentang />} />
        <Route path="/daftar-layanan" element={<Daftarlayanan />} />
        <Route path="/admin/whatsapp-setting" element={<WhatsappSetting />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/admin/banner-setting" element={<BannerSetting />} />
        <Route path="/admin/pop-up" element={<Popup />} />
        <Route path="/admin/qris" element={<Qris />} />
        <Route path="/admin/bank" element={<Bank />} />
        <Route path="/admin/e-wallet" element={<Ewallet />} />
        <Route path="/order/free-fire" element={<Freefire />} />
        <Route path="/admin/free-fire" element={<FreeFire />} />
        <Route path="/order/pubg-mobile" element={<Pubgmobile />} />
        <Route path="/admin/pubg-mobile" element={<PubgMobile />} />
        <Route path="/admin/higgs-domino" element={<HiggsDomino />} />
        <Route path="/order/higgs-domino" element={<Higgsdomino />} />
        <Route path="/admin/genshin-impact" element={<Genshinimpact />} />
        <Route path="/order/genshin-impact" element={<GenshinImpact />} />
        <Route path="/admin/dashboard-admin" element={<Dashboard />} />
        <Route path="/admin/category-game" element={<Category />} />
        <Route path="/admin/mobile-legend" element={<Mobilelegend />} />
        <Route path="/order/mobile-legends" element={<MobileLegends />} />
        <Route path="/order/valorant" element={<Valorant />} />
        <Route path="/admin/valorant" element={<ValorantAdmin />} />
        <Route path="/admin/api" element={<ApiGames />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/pulsa" element={<Pulsa />} />
        <Route path="/PLN" element={<PLN />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterBot />
    </Router>
  );
}

export default App;
