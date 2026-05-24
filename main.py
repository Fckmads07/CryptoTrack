import csv
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permet à React (localhost:5173 en dev, GitHub Pages en prod) de parler à FastAPI.
# allow_origins="*" est tolérant — pour durcir, remplace par la liste exacte :
# ["http://localhost:5173", "https://TON_USERNAME.github.io"]
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Chemin absolu vers MOCK_DATA.csv — indispensable sur PythonAnywhere
# où le cwd n'est pas forcément le dossier du projet.
CSV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "MOCK_DATA.csv")


def get_csv_data():
    """Lire le fichier CSV et retourner la liste des cryptos."""
    try:
        with open(CSV_PATH, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            items = []
            for row in reader:
                # Convertir les nombres (le CSV lit tout comme du texte)
                row["price_usd"] = float(row["price_usd"])
                row["market_cap_usd"] = float(row["market_cap_usd"])
                row["volume_24h_usd"] = float(row["volume_24h_usd"])
                row["change_24h"] = float(row["change_24h"])
                row["change_7d"] = float(row["change_7d"])
                row["ath_usd"] = float(row["ath_usd"])
                row["circulating_supply"] = float(row["circulating_supply"])
                row["rank"] = int(row["rank"])
                row["max_supply"] = float(row["max_supply"]) if row["max_supply"] else None
                items.append(row)
            return items
    except FileNotFoundError:
        return None


@app.get("/items")
async def read_items(search: str = ""):
    """Retourner toutes les cryptos, avec recherche optionnelle par nom ou symbole."""
    data = get_csv_data()
    if data is None:
        raise HTTPException(status_code=404, detail="Fichier MOCK_DATA.csv introuvable")

    # Filtrer par nom ou symbole si une recherche est fournie
    if search:
        data = [item for item in data if search.lower() in item["name"].lower()
                or search.lower() in item["symbol"].lower()]

    return data


@app.get("/items/{item_id}")
async def read_item(item_id: str):
    """Retourner une seule crypto par son ID (ex: /items/bitcoin)."""
    data = get_csv_data()
    if data is None:
        raise HTTPException(status_code=404, detail="Fichier MOCK_DATA.csv introuvable")

    item = next((i for i in data if i["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Crypto introuvable")
    return item


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)