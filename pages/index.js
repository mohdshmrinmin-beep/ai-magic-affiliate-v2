import { useState } from "react";

export default function Home() {
  /* ===============================
     STATE
  =============================== */
  const [kategori, setKategori] = useState("Fashion");
  const [sceneModel, setSceneModel] = useState("Tanpa Model (Produk Sahaja)");
  const [latar, setLatar] = useState("");
  const [vibes, setVibes] = useState("");
  const [angle, setAngle] = useState("");
  const [ratio, setRatio] = useState("9:16");

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [error, setError] = useState("");

  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  /* UX MAHAL */
  const thinkingTexts = [
    "AI sedang menganalisis produk…",
    "Menentukan gaya visual terbaik…",
    "Merangka prompt profesional…",
    "Menjana imej AI berkualiti tinggi…",
  ];
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  /* ===============================
     GENERATE PROMPT (GEMINI)
  =============================== */
  const handleGeneratePrompt = async () => {
    setLoading(true);
    setAiResult("");
    setError("");
    setSelectedPrompt("");
    setImageUrl("");
    setThinkingIndex(0);
    setProgress(0);

    const textInterval = setInterval(() => {
      setThinkingIndex((i) =>
        i < thinkingTexts.length - 1 ? i + 1 : i
      );
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p));
    }, 400);

    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kategori,
          sceneModel,
          latar,
          vibes,
          angle,
          ratio,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.result) {
        throw new Error(data.error || "Gagal menjana prompt AI");
      }

      setProgress(100);
      setAiResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      setTimeout(() => setLoading(false), 600);
    }
  };

  /* ===============================
     GENERATE IMAGE (POLLING STABIL)
  =============================== */
  const handleGenerateImage = async () => {
    if (!selectedPrompt) return;

    setImageLoading(true);
    setImageUrl("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: selectedPrompt }),
      });

      const data = await res.json();

      if (!res.ok || !data.image) {
        throw new Error(data.error || "Imej AI gagal dijana");
      }

      setImageUrl(data.image);
    } catch (err) {
      alert(err.message);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <>
      <div className="app">
        <h1 className="title">✨ AI Product Studio</h1>

        {/* STEP 1 */}
        <section className="card">
          <div className="card-header">
            <span className="step">1</span>
            <h2>Kategori Produk</h2>
          </div>
          <div className="grid-2">
            {["Fashion", "Aksesori", "F&B", "Lainnya"].map((k) => (
              <button
                key={k}
                className={`chip ${kategori === k ? "active" : ""}`}
                onClick={() => setKategori(k)}
              >
                {k}
              </button>
            ))}
          </div>
        </section>

        {/* STEP 2 */}
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
          </select>
        </section>

        {/* STEP 3 */}
        <section className="card">
          <div className="card-header">
            <span className="step">3</span>
            <h2>Styling</h2>
          </div>

          <select className="select" onChange={(e) => setLatar(e.target.value)}>
            <option value="">Pilih Latar</option>
            <option>Studio Foto</option>
            <option>Kafe Outdoor</option>
            <option>Pantai</option>
          </select>

          <div className="grid-2" style={{ marginTop: 12 }}>
            <select className="select" onChange={(e) => setVibes(e.target.value)}>
              <option value="">Pilih Vibes</option>
              <option>Aesthetic</option>
              <option>Minimalis</option>
              <option>Eksklusif</option>
            </select>

            <select className="select" onChange={(e) => setAngle(e.target.value)}>
              <option value="">Pilih Angle</option>
              <option>Close Up</option>
              <option>Wide Shot</option>
              <option>POV</option>
            </select>
          </div>

          <p className="label" style={{ marginTop: 16 }}>Ratio</p>
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

        {/* GENERATE PROMPT */}
        <button className="magic-btn" onClick={handleGeneratePrompt}>
          ✨ MERACIK KONTEN
        </button>

        {/* PROMPT RESULT */}
        {aiResult && (
          <section className="card">
            <h2>📄 Pilih Prompt</h2>
            {aiResult
              .split("\n")
              .filter((l) => /^\d\./.test(l))
              .map((p, i) => (
                <button
                  key={i}
                  className={`chip ${selectedPrompt === p ? "active" : ""}`}
                  style={{ marginBottom: 8 }}
                  onClick={() => setSelectedPrompt(p)}
                >
                  {p}
                </button>
              ))}
          </section>
        )}

        {/* GENERATE IMAGE */}
        {selectedPrompt && (
          <button className="magic-btn" onClick={handleGenerateImage}>
            🎨 Jana Gambar AI
          </button>
        )}

        {imageLoading && <p>⏳ Menjana imej AI…</p>}

        {imageUrl && (
          <section className="card">
            <h2>🖼️ Hasil Imej AI</h2>
            <img
              src={imageUrl}
              alt="AI Result"
              style={{ width: "100%", borderRadius: 16 }}
            />
          </section>
        )}

        {error && <p style={{ color: "red" }}>❌ {error}</p>}
      </div>

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="magic-spinner"></div>
            <p className="loading-text">
              ✨ {thinkingTexts[thinkingIndex]}
            </p>
            <div style={{
              marginTop: 12,
              height: 8,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 999,
            }}>
              <div style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg,#ec4899,#8b5cf6)",
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
