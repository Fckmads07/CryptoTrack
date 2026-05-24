import "./Footer.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <span className="footer-app">CryptoTrack</span>
                <span className="footer-sep">·</span>
                <span>API : <a href={`${API_BASE}/docs`} target="_blank" rel="noreferrer" className="footer-link">FastAPI personnalisée</a></span>
                <span className="footer-sep">·</span>
                <span>Développé par Madhav</span>
            </div>
        </footer>
    );
}
    