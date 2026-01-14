import { useState } from "react";

export default function Home() {
  /* ===============================
     STATE UTAMA
  =============================== */
  const [kategori, setKategori] = useState("Fashion");

  const [sceneModel, setSceneModel] = useState("Tanpa Model (Produk Sahaja)");

  const [latar, setLatar] = useState("");
  const [vibes, setVibes] = useState("");
  const [angle, setAngle] = useState("");
  const [ratio, setRatio] = useState("9:16");

  const [loading, setLoading] = useState(false);

  /* ===============================
     HANDLE AKHIR (BUKAN AI LAGI)
  =============================== */
  const handleGenerate = () => {
    setLoading(true);

    // simulasi proses (nanti baru sambung AI)
    setTimeout(() => {
      console.log("DATA PILIHAN USER:", {
        kategori,
        sceneModel,
        latar,
        vibes,
        angle,
        ratio,
      });
      setLoading(false);
      alert("Konten berjaya diracik (demo UI sahaja)");
    }, 2000);
  };

  return (
    <>
      <div className="app">
        <h1 className="title">✨ AI Product Studio</h1>

        {/* ===============================
            1. KATEGORI PRODUK
        =============================== */}
        <section className="card">
          <div className="card-header">
            <span className="step">1</span>
            <h2>Kategori Produk</h2>
          </div>

          <div className="grid-2">
            {["Fashion", "Aksesori", "F&B", "Lainnya"].map((item) => (
              <button
                key={item}
                className={`chip ${kategori === item ? "active" : ""}`}
                onClick={() => setKategori(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* ===============================
            2. PENGATURAN SCENE
        =============================== */}
        <section className="card">
          <div className="card-header">
            <span className="step">2</span>
            <h2>Pengaturan Scene</h2>
          </div>

          <select
            className="select"
            value={sceneModel}
            onChange={(e) => setSceneModel(e.target.value)}
          >
            <option>Tanpa Model (Produk Sahaja)</option>
            <option>Wanita Berhijab</option>
            <option>Wanita Non-Hijab</option>
            <option>Pria</option>
            <option>Anak Perempuan</option>
            <option>Anak Laki-laki</option>
          </select>
        </section>

        {/* ===============================
            3. STYLING
        =============================== */}
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
            <option value="">Pilih Latar</option>
            <option>Studio Foto Minimalis</option>
            <option>Jalanan Kota</option>
            <option>Kafe Outdoor</option>
            <option>Pantai</option>
            <option>Kantor (Office Style)</option>
          </select>

          <div style={{ height: 12 }} />

          <div className="grid-2">
            <select
              className="select"
              value={vibes}
              onChange={(e) => setVibes(e.target.value)}
            >
              <option value="">Pilih Vibes</option>
              <option>Aesthetic</option>
              <option>Minimalis</option>
              <option>Dreamy Pastel</option>
              <option>Modern Mewah</option>
              <option>Natural</option>
              <option>Serene & Calm</option>
            </select>

            <select
              className="select"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
            >
              <option value="">Pilih Angle</option>
              <option>Close Up</option>
              <option>Medium Shot</option>
              <option>Full Body / Wide</option>
              <option>High Angle</option>
              <option>Low Angle</option>
            </select>
          </div>

          <p className="label" style={{ marginTop: 16 }}>
            Ratio
          </p>

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
        </section>

        {/* ===============================
            BUTANG AKHIR
        =============================== */}
        <button
          className="magic-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "MERACIK KONTEN…" : "✨ MERACIK KONTEN"}
        </button>
      </div>

      {/* ===============================
          LOADING OVERLAY
      =============================== */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="magic-spinner"></div>
            <p className="loading-text">✨ Sedang meracik konten…</p>
          </div>
        </div>
      )}
    </>
  );
}
