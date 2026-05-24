import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import CryptoCard from "../../Component/CryptoCard/CryptoCard";
import "./Favorites.css";

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <main className="fav-page">
      <h1 className="fav-title">Mes Favoris</h1>

      {/* Liste vide */}
      {favorites.length === 0 ? (
        <div className="fav-empty">
          <p>Vous n'avez aucun favori pour l'instant.</p>
          <button onClick={() => navigate("/liste")}>Voir le marché</button>
        </div>
      ) : (
        <div className="coins-grid">
          {favorites.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </main>
  );
}