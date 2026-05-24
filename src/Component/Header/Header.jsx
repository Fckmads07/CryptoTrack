import { NavLink } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import "./Header.css";

export default function Header() {
    const { favorites } = useFavorites();

    return (
        <nav className ="navbar">
            <NavLink to="/" className="navbar-brand">
                <span className="brand-logo">₿</span>
                <span className="brand-text">CryptoTrack</span>
            </NavLink>  

            <ul className="navbar-links">
                <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/liste" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Marché
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favoris" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Favoris
                        {favorites.length > 0 && (
                            <span className="badge">{favorites.length}</span>
                        )}
                    </NavLink>
                </li>
            </ul>
        </nav>      

    );
}