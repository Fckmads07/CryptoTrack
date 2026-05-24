import { useState, useEffect } from "react";
import CryptoCard from "../../Component/CryptoCard/CryptoCard";
import "./CryptoList.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function CryptoList() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les cryptos depuis l'API FastAPI
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/items?search=${search}`);
        if (!res.ok) throw new Error("Lancez le serveur : python main.py");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Attendre 300ms avant d'appeler l'API pour éviter trop de requêtes
    const timer = setTimeout(fetchCoins, 300);
    return () => clearTimeout(timer);
  }, [search]); // Se relance chaque fois que search change

  return (
    <main className="list-page">

      {/* Titre + barre de recherche */}
      <div className="list-header">
        <h1 className="list-title">Marché crypto</h1>
        <input
          type="text"
          placeholder="Rechercher une crypto..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Chargement */}
      {loading && <p className="status-msg">Chargement...</p>}

      {/* Erreur */}
      {error && <p className="status-msg error">⚠️ {error}</p>}

      {/* Liste de cartes */}
      {!loading && !error && (
        <div className="coins-grid">
          {coins.length === 0 ? (
            <p className="status-msg">Aucun résultat pour « {search} »</p>
          ) : (
            coins.map((coin) => (
              <CryptoCard key={coin.id} coin={coin} />
            ))
          )}
        </div>
      )}

    </main>
  );
}