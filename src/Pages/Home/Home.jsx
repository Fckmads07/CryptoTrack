import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">

      {/* SVG filters — required for the button blur effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="unopaq">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 9 0" />
          </filter>
          <filter id="unopaq2">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 0" />
          </filter>
          <filter id="unopaq3">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 0" />
          </filter>
        </defs>
      </svg>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">API personnalisée · FastAPI + CSV</div>
          <h1 className="hero-title">
            Suivez le marché<br />
            <span className="hero-accent">crypto en direct</span>
          </h1>
          <p className="hero-desc">
            CryptoTrack vous permet de consulter, rechercher et organiser
            30 cryptomonnaies provenant de notre API FastAPI personnalisée.
            Filtrez par catégorie, explorez les détails et sauvegardez vos favoris.
          </p>

          <div className="hero-actions">

            {/* Bouton Voir le marché */}
            <div className="button-container">
              <button className="real-button" onClick={() => navigate("/liste")} />
              <div>
                <div className="button-border">
                  <div className="button">
                    <span>Voir le marché</span>
                    <div className="backdrop" />
                    <div className="spin spin-blur"><div /></div>
                    <div className="spin spin-intense"><div /></div>
                    <div className="spin spin-inside"><div /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton Mes favoris */}
            <div className="button-container">
              <button className="real-button" onClick={() => navigate("/favoris")} />
              <div>
                <div className="button-border">
                  <div className="button">
                    <span>Mes favoris</span>
                    <div className="backdrop" />
                    <div className="spin spin-blur"><div /></div>
                    <div className="spin spin-intense"><div /></div>
                    <div className="spin spin-inside"><div /></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="hero-visual">
          <div className="coin-float coin-btc">
            <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin" />
            <span>BTC</span>
          </div>
          <div className="coin-float coin-eth">
            <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" alt="Ethereum" />
            <span>ETH</span>
          </div>
          <div className="coin-float coin-sol">
            <img src="https://assets.coingecko.com/coins/images/4128/large/solana.png" alt="Solana" />
            <span>SOL</span>
          </div>
          <div className="hero-ring" />
          <div className="hero-ring ring2" />
        </div>
      </section>

      <section className="features">
        <div className="features-grid">

          <div className="feature">
            <span className="feature-icon">🔍</span>
            <h3 className="feature-title">Recherche Avancée</h3>
            <p className="feature-desc">
              Trouvez facilement les cryptomonnaies qui vous intéressent avec notre moteur de recherche puissant.
            </p>
          </div>

          <div className="feature">
            <span className="feature-icon">📊</span>
            <h3 className="feature-title">Recherche rapide</h3>
            <p className="feature-desc">Trouvez n'importe quelle crypto par nom ou symbole instantanément.</p>
          </div>

          <div className="feature">
            <span className="feature-icon">❤️</span>
            <h3 className="feature-title">Filtres avancés</h3>
            <p className="feature-desc">Filtrez par catégorie (DeFi, Layer 1, Meme, etc.) et triez par prix ou market cap.</p>
          </div>

          <div className="feature">
            <span className="feature-icon">⚡</span>
            <h3 className="feature-title">Détails complets</h3>
            <p className="feature-desc">Prix, market cap, volume, ATH, supply et description pour chaque crypto.</p>
          </div>

          <div className="feature">
            <span className="feature-icon">⭐</span>
            <h3 className="feature-title">Favoris persistants</h3>
            <p className="feature-desc">Vos favoris sont sauvegardés localement et disponibles à chaque visite.</p>
          </div>

        </div>
      </section>

    </main>
  );
}