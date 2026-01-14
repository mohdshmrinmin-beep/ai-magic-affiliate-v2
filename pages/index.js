import { useState } from "react";

export default function Home() {
  const [kategori, setKategori] = useState("Fashion");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {/* === UI ASAL KAU (JANGAN PADAM) === */}
      <div className="app">
        <h1 className="title">✨ AI Product Studio</h1>

        {/* 1. Upload Produk */}
        <section className="card">
          <div className="card-header">
            <span className="step">1</span>
            <h2>Upload Produk</h2>
            <span className="required">WAJIB</span>
          </div>

          <div className="upload-box">
            <div className="upload-icon">⬆️</div>
            <p>Klik atau drop foto produk di sini</p>
            <small>Format JPG, PNG (Max 5MB)</small>
          </div>

          <p className="label">Kategori Produk</p>

          <div className="grid-2">
            <button
              className={`chip ${kategori === "Fashion" ? "active" : ""}`}
              onClick={() => setKategori("Fashion")}
            >
              👕 Fashion
            </button>

            <button
              className={`chip ${kategori === "Aksesori" ? "active" : ""}`}
              onClick={() => setKategori("Aksesori")}
            >
              👜 Aksesori & Tas
            </button>

            <button
              className={`chip ${kategori === "FNB" ? "active" : ""}`}
              onClick={() => setKategori("FNB")}
            >
              ☕ F&B
            </button>

            <button
              className={`chip ${kategori === "Lainnya" ? "active" : ""}`}
              onClick={() => setKategori("Lainnya")}
            >
              📦 Lainnya
            </button>
          </div>
        </section>

        {/* === BUTTON ASAL + TAMBAH onClick === */}
        <button
          className="magic-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          ✨ GENERATE MAGIC
        </button>
      </div>

      {/* === OVERLAY LOADING (TAMBAH SAHAJA) === */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="magic-spinner"></div>
            <div className="loading-text">
              ✨ MAGIC SEDANG MENCIPTA…
            </div>
          </div>
        </div>
      )}
    </>
  );
}
