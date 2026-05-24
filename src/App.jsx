// HashRouter au lieu de BrowserRouter : GitHub Pages ne sait pas reecrire
// les URL cote serveur, donc /liste ou /crypto/bitcoin renverraient un 404
// au reload. Avec HashRouter les routes deviennent /#/liste, /#/crypto/bitcoin
// et tout est gere cote client -> zero 404.
import { HashRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { FavoritesProvider } from "./context/FavoritesContext";
import Footer from "./Component/Footer/Footer";
import Home from "./Pages/Home/Home";
import CryptoList from "./Pages/CryptoList/CryptoList";
import Favorites from "./Pages/Favorites/Favorites";
import CryptoDetail from "./Pages/CryptoDetail/CryptoDetail";
import "./App.css";
import Header from "./Component/Header/Header";

export default function App() {
  return (
    <FavoritesProvider>
      <HashRouter>
        <div className="app-wrapper">
          <Header />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/liste" element={<CryptoList />} />
              <Route path="/favoris" element={<Favorites />} />
              {/* Route dynamique : acces aux details via l'ID de la crypto */}
              <Route path="/crypto/:id" element={<CryptoDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Analytics />
      </HashRouter>
    </FavoritesProvider>
  );
}
