import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import "./CryptoCard.css";

export default function CryptoCard({ coin }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(coin.id);
  const isPositive = Number(coin.change_24h) >= 0;

  return (
    <div className="crypto-card" onClick={() => navigate(`/crypto/${coin.id}`)}>

     
      <div className="card-header">
        <img src={coin.image} alt={coin.name} className="coin-logo" />
        <div>
          <h3 className="coin-name">{coin.name}</h3>
          <span className="coin-symbol">{coin.symbol}</span>
        </div>

       
        <button
          className={`fav-btn ${favorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(coin);
          }}
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>

      {/* Prix */}
      <div className="card-price">${Number(coin.price_usd).toFixed(2)}</div>

      {/* Variation 24h */}
      <div className={`card-change ${isPositive ? "positive" : "negative"}`}>
        {isPositive ? "▲" : "▼"} {Math.abs(Number(coin.change_24h)).toFixed(2)}% (24h)
      </div>

      {/* Market cap */}
      <div className="card-footer">
        <span className="stat-label">Market Cap</span>
        <span className="stat-val">${(coin.market_cap_usd / 1e9).toFixed(2)}B</span>
      </div>

    </div>
  );
}