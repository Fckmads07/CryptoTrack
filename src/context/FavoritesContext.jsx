import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const s = localStorage.getItem("crypto-favorites");
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("crypto-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (coin) => {
    setFavorites((prev) => [...prev, coin]);
  };

  const removeFavorite = (coin) => {
    setFavorites((prev) => prev.filter((p) => p.id !== coin.id));
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  const toggleFavorite = (coin) => {
    isFavorite(coin.id) ? removeFavorite(coin) : addFavorite(coin);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}