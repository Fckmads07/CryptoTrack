import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import "./CryptoDetail.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function CryptoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer la crypto par son ID depuis FastAPI
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_BASE}/items/${id}`);
        if (!res.ok) throw new Error("Cryptomonnaie introuvable.");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <p className="status-msg">Chargement...</p>;
  if (error)   return <p className="status-msg error">⚠️ {error}</p>;

  const isPositive = Number(coin.change_24h) >= 0;
  const favorite = isFavorite(coin.id);

  return (
    <main className="detail-page">

      {/* Bouton retour */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Retour</button>

      {/* Propriété 1 : Image + Nom + Symbole */}
      <div className="detail-hero">
        <img src={coin.image} alt={coin.name} className="detail-logo" />
        <div>
          <h1 className="detail-name">{coin.name}</h1>
          <span className="detail-symbol">{coin.symbol}</span>
          <span className="detail-rank">Rang #{coin.rank}</span>
        </div>
        <button
          className={`detail-fav-btn ${favorite ? "active" : ""}`}
          onClick={() => toggleFavorite(coin)}
        >
          {favorite ? "★ Favori" : "☆ Ajouter"}
        </button>
      </div>

      {/* Propriété 2 : Prix + variation 24h */}
      <div className="price-section">
        <div className="detail-price">${Number(coin.price_usd).toFixed(2)}</div>
        <div className={`detail-change ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(Number(coin.change_24h)).toFixed(2)}% (24h)
        </div>
      </div>

      {/* Propriétés 3 à 7 */}
      <div className="stats-grid">

        {/* Propriété 3 : Market Cap */}
        <div className="stat-card">
          <span className="stat-card-label">Market Cap</span>
          <span className="stat-card-val">${(coin.market_cap_usd / 1e9).toFixed(2)}B</span>
        </div>

        {/* Propriété 4 : Volume 24h */}
        <div className="stat-card">
          <span className="stat-card-label">Volume 24h</span>
          <span className="stat-card-val">${(coin.volume_24h_usd / 1e9).toFixed(2)}B</span>
        </div>

        {/* Propriété 5 : ATH */}
        <div className="stat-card">
          <span className="stat-card-label">Plus haut historique (ATH)</span>
          <span className="stat-card-val">${Number(coin.ath_usd).toFixed(2)}</span>
        </div>

        {/* Propriété 6 : Supply */}
        <div className="stat-card">
          <span className="stat-card-label">Offre en circulation</span>
          <span className="stat-card-val">{(coin.circulating_supply / 1e6).toFixed(2)}M {coin.symbol}</span>
        </div>

        {/* Propriété 7 : Catégorie */}
        <div className="stat-card">
          <span className="stat-card-label">Catégorie</span>
          <span className="stat-card-val">{coin.category}</span>
        </div>

      </div>

      {/* Description */}
      {coin.description && (
        <div className="detail-description">
          <h2>À propos de {coin.name}</h2>
          <p>{coin.description}</p>
        </div>
      )}

    </main>
  );
}