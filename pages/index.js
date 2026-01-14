import { useState } from "react";

export default function Home() {
  const [kategori, setKategori] = useState("Fashion");
  const [sceneMode, setSceneMode] = useState("ai");
  const [model, setModel] = useState("Tanpa Model (Produk Sahaja)");
  const [latar, setLatar] = useState("");
  const [vibes, setVibes] = useState("");
  const [angle, setAngle] = useState("");
  const [ratio, setRatio] = useState("9:16");

  // 🔥 BAHARU
  const [affiliatePrompt, setAffiliatePrompt] = useState("");
  const [hasilPrompt, setHasilPrompt] = useState("");

  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setHasil(false);
    setHasilPrompt("");

    setTimeout(() => {
      setLoading(false);
      setHasil(true);

      // ✅ 5 PROMPT PROFESSIONAL (STYLE #4)
      const prompts = `
Berikut adalah 5 prompt imej profesional untuk AI image generator berdasarkan ayat "${affiliatePrompt}":

1. An elegant, cinematic composition featuring an elderly man selling fresh chickens at a traditional market, captured with soft natural lighting and shallow depth of field. The scene emphasizes authentic textures, warm tones, and a calm, trustworthy atmosphere suitable for premium food advertising.

2. A refined wide-angle scene showcasing an elderly chicken vendor in a lively marketplace, surrounded by neatly arranged goods and subtle background blur. Balanced lighting and realistic color grading create a clean, professional look ideal for commercial storytelling.

3. A high-detail, eye-level shot of an elderly man confidently presenting his chicken products, framed with symmetrical composition and gentle contrast. The environment feels organized and inviting, evoking authenticity and traditional craftsmanship.

4. An elegant high-angle perspective highlighting the orderly layout of a traditional chicken stall, where an elderly vendor carefully arranges his products. Soft diffused lighting and minimal visual clutter create a polished, modern aesthetic suitable for premium advertising.

5. A cinematic portrait-style scene of an elderly chicken seller in a calm market setting, using natural light, realistic shadows, and subtle background elements to convey trust, heritage, and product quality in a professional affiliate-ready visual.
      `;

      setHasilPrompt(prompts.trim());
    }, 3000);
  };

  return (
    <>
      <div className="app">
        <h1 className="title">✨ AI Magic Affiliate Studio</h1>

        {/* ================= 1. KATEGORI PRODUK ================= */}
        <section className="card">
          <div className="card-header">
            <span className="step">1</span>
            <h2>Kategori Produk</h2>
          </div>

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

        {/* ================= 2. PENGATURAN SCENE ================= */}
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

          <select className="select" value={model} onChange={(e) => setModel(e.target.value)}>
            <option>Tanpa Model (Produk Sahaja)</option>
            <option>Wanita Berhijab</option>
            <option>Wanita Non-Hijab</option>
            <option>Pria</option>
            <option>Anak Perempuan</option>
            <option>Anak Laki-laki</option>
          </select>
        </section>

        {/* ================= 3. STYLING ================= */}
        <section className="card">
          <div className="card-header">
            <span className="step">3</span>
            <h2>Styling</h2>
          </div>

          <select className="select" value={latar} onChange={(e) => setLatar(e.target.value)}>
            <option value="">Pilih Latar Scene</option>
            <option>Studio Foto Minimalis</option>
            <option>Jalanan Kota (Street Style)</option>
            <option>Kafe Outdoor</option>
            <option>Pantai</option>
            <option>Perpustakaan</option>
            <option>Arsitektur Modern</option>
          </select>

          <div className="grid-2">
            <select className="select" value={vibes} onChange={(e) => setVibes(e.target.value)}>
              <option value="">Pilih Vibes</option>
              <option>Aesthetic</option>
              <option>Minimalis</option>
              <option>Colorful</option>
              <option>Dreamy Pastel</option>
              <option>Modern Mewah</option>
              <option>Natural</option>
            </select>

            <select className="select" value={angle} onChange={(e) => setAngle(e.target.value)}>
              <option value="">Pilih Angle</option>
              <option>Close Up</option>
              <option>Medium Shot</option>
              <option>Full Body / Wide Shot</option>
              <option>High Angle</option>
              <option>Low Angle</option>
            </select>
          </div>
        </section>

        {/* ================= 4. AI AFFILIATE MAGIC PROMPT ================= */}
        <section className="card">
          <div className="card-header">
            <span className="step">4</span>
            <h2>🪄 AI Affiliate Magic Prompt</h2>
          </div>

          <textarea
            className="textarea"
            placeholder="Contoh: lelaki tua menjual ayam"
            value={affiliatePrompt}
            onChange={(e) => setAffiliatePrompt(e.target.value)}
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
        <button className="magic-btn" onClick={handleGenerate}>
          ✨ GENERATE MAGIC
        </button>

        {/* ================= HASIL PROMPT ================= */}
        {hasil && (
          <section className="card">
            <div className="card-header">
              <h2>✨ Hasil AI Affiliate Prompt</h2>
            </div>

            <pre className="result-text">{hasilPrompt}</pre>
          </section>
        )}
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="magic-spinner"></div>
            <div className="loading-text">✨ MAGIC SEDANG MENCIPTA…</div>
          </div>
        </div>
      )}
    </>
  );
}
