import { useState } from "react";

export default function Home() {
  const [kategori, setKategori] = useState("Fashion");
  const [sceneMode, setSceneMode] = useState("ai");
  const [model, setModel] = useState("Tanpa Model (Produk Sahaja)");
  const [latar, setLatar] = useState("");
  const [vibes, setVibes] = useState("");
  const [angle, setAngle] = useState("");
  const [ratio, setRatio] = useState("9:16");
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setHasil(false);

    setTimeout(() => {
      setLoading(false);
      setHasil(true);
    }, 3000);
  };

  return (
    <>
      <div className="app">
        <h1 className="title">✨ AI Product Studio</h1>

        {/* ================= STEP 1 ================= */}
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
            {[
              ["Fashion", "👕 Fashion"],
              ["Aksesori", "👜 Aksesori & Tas"],
              ["FNB", "☕ F&B"],
              ["Lainnya", "📦 Lainnya"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`chip ${kategori === id ? "active" : ""}`}
                onClick={() => setKategori(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* ================= STEP 2 ================= */}
        <section className="card">
          <div className="card-header">
            <span className="step">2</span>
            <h2>Pengaturan Scene</h2>
          </div>

          <div className="toggle">
            <button
              className={`toggle-btn ${sceneMode === "ai" ? "active" : ""}`}
              onClick={() => setSceneMode("ai")}
            >
              Model AI
            </button>
            <button
              className={`toggle-btn ${sceneMode === "upload" ? "active" : ""}`}
              onClick={() => setSceneMode("upload")}
            >
              Upload Sendiri
            </button>
          </div>

          <select
            className="select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option>Tanpa Model (Produk Sahaja)</option>
            <option>Wanita Berhijab</option>
            <option>Wanita Non-Hijab</option>
            <option>Pria</option>
            <option>Anak Perempuan</option>
            <option>Anak Laki-laki</option>
          </select>
        </section>

        {/* ================= STEP 3 ================= */}
        <section className="card">
          <div className="card-header">
            <span className="step">3</span>
            <h2>Styling</h2>
          </div>

          <select
            className="select"
            value={latar}
            onChange={(e) => setLatar(e.target.value)}
          >
            <option value="">Pilih Latar Scene</option>
            <option>Studio Foto Minimalis</option>
            <option>Jalanan Kota (Street Style)</option>
            <option>Kafe Outdoor</option>
            <option>Pantai</option>
            <option>Kamar Tidur</option>
            <option>Perpustakaan</option>
            <option>Arsitektur Modern</option>
          </select>

          <div className="grid-2">
            <select
              className="select"
              value={vibes}
              onChange={(e) => setVibes(e.target.value)}
            >
              <option value="">Pilih Vibes</option>
              <option>Aesthetic</option>
              <option>Minimalis</option>
              <option>Colorful</option>
              <option>Dreamy Pastel</option>
              <option>Modern Mewah</option>
              <option>Natural</option>
            </select>

            <select
              className="select"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
            >
              <option value="">Pilih Angle</option>
              <option>Close Up</option>
              <option>Medium Shot</option>
              <option>Full Body / Wide Shot</option>
              <option>High Angle</option>
              <option>Low Angle</option>
            </select>
          </div>

          <input
            className="input"
            placeholder="Tambahkan detail prompt manual... (opsional)"
          />
        </section>

        {/* ================= RATIO ================= */}
        <p className="label">Ratio</p>
        <div className="grid-3">
          {["9:16", "1:1", "3:4"].map((r) => (
            <button
              key={r}
              className={`chip ${ratio === r ? "active" : ""}`}
              onClick={() => setRatio(r)}
            >
              {r}
            </button>
          ))}
        </div>

        {/* ================= GENERATE ================= */}
        <button
          className="magic-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          ✨ GENERATE MAGIC
        </button>

        {/* ================= HASIL ================= */}
        {hasil && (
          <section className="card">
            <div className="card-header">
              <h2>✨ Hasil Studio</h2>
              <button className="chip" onClick={handleGenerate}>
                🔁 Ulangi
              </button>
            </div>

            <div className="grid-2">
              <div className="result-box">AI Generated</div>
              <div className="result-box">AI Generated</div>
            </div>
          </section>
        )}
      </div>

      {/* ================= LOADING ================= */}
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
