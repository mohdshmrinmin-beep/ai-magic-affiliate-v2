import { useState } from "react";

export default function Home() {
  // ================= STATE UTAMA =================
  const [kategori, setKategori] = useState("Fashion");
  const [sceneMode, setSceneMode] = useState("ai");
  const [model, setModel] = useState("Tanpa Model (Produk Sahaja)");
  const [latar, setLatar] = useState("");
  const [vibes, setVibes] = useState("");
  const [angle, setAngle] = useState("");
  const [ratio, setRatio] = useState("9:16");

  // ================= AI AFFILIATE PROMPT =================
  const [affiliateInput, setAffiliateInput] = useState("");
  const [affiliateResult, setAffiliateResult] = useState("");

  // ================= UI STATE =================
  const [loadingStudio, setLoadingStudio] = useState(false);
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [hasilStudio, setHasilStudio] = useState(false);

  // ================= GENERATE STUDIO =================
  const handleGenerateStudio = () => {
    setLoadingStudio(true);
    setHasilStudio(false);

    setTimeout(() => {
      setLoadingStudio(false);
      setHasilStudio(true);
    }, 3000);
  };

  // ================= GENERATE AI AFFILIATE PROMPT =================
  const handleGeneratePrompt = () => {
    if (!affiliateInput) return;

    setLoadingPrompt(true);
    setAffiliateResult("");

    setTimeout(() => {
      const output = `
Berikut adalah 5 prompt imej profesional untuk AI image generator berdasarkan ayat "${affiliateInput}":

1. An elegant cinematic scene featuring ${affiliateInput}, captured with soft natural lighting, realistic textures, and shallow depth of field. The composition feels premium, authentic, and suitable for high-converting affiliate visuals.

2. A clean wide-angle commercial shot of ${affiliateInput}, presented in a well-organized environment with balanced lighting and realistic color grading, perfect for marketplace or product storytelling.

3. A professional eye-level composition highlighting ${affiliateInput}, using natural shadows, subtle background blur, and a calm aesthetic that builds trust and visual clarity.

4. An elegant high-angle shot focusing on composition and structure, where ${affiliateInput} is presented in a clean, minimal, and modern environment suitable for premium advertising.

5. A cinematic portrait-style visual of ${affiliateInput}, using realistic lighting, natural tones, and refined framing to convey authenticity, quality, and strong affiliate appeal.
      `;

      setAffiliateResult(output.trim());
      setLoadingPrompt(false);
    }, 2000);
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
            <option>Jalanan Kota</option>
            <option>Kafe Outdoor</option>
            <option>Pantai</option>
            <option>Arsitektur Modern</option>
          </select>

          <div className="grid-2">
            <select className="select" value={vibes} onChange={(e) => setVibes(e.target.value)}>
              <option value="">Pilih Vibes</option>
              <option>Aesthetic</option>
              <option>Minimalis</option>
              <option>Natural</option>
              <option>Modern Mewah</option>
            </select>

            <select className="select" value={angle} onChange={(e) => setAngle(e.target.value)}>
              <option value="">Pilih Angle</option>
              <option>Close Up</option>
              <option>Medium Shot</option>
              <option>Wide Shot</option>
            </select>
          </div>
        </section>

        {/* ================= GENERATE STUDIO ================= */}
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

        <button className="magic-btn" onClick={handleGenerateStudio}>
          ✨ GENERATE MAGIC
        </button>

        {hasilStudio && (
          <section className="card">
            <div className="card-header">
              <h2>✨ Hasil Studio</h2>
            </div>
            <div className="grid-2">
              <div className="result-box">AI Generated</div>
              <div className="result-box">AI Generated</div>
            </div>
          </section>
        )}

        {/* ================= 4. AI AFFILIATE MAGIC PROMPT ================= */}
        <section className="card">
          <div className="card-header">
            <span className="step">4</span>
            <h2>🪄 AI Affiliate Magic Prompt</h2>
          </div>

          <textarea
            className="textarea"
            placeholder="Contoh: lelaki tua menjual ayam"
            value={affiliateInput}
            onChange={(e) => setAffiliateInput(e.target.value)}
          />

          <button className="magic-btn secondary" onClick={handleGeneratePrompt}>
            🪄 GENERATE PROMPT
          </button>

          {affiliateResult && (
            <pre className="result-text">{affiliateResult}</pre>
          )}
        </section>
      </div>

      {/* ================= LOADING ================= */}
      {(loadingStudio || loadingPrompt) && (
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
