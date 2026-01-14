import { useState } from "react";

export default function Home() {
  const [kategori, setKategori] = useState("Fashion");
  const [model, setModel] = useState("Tanpa Model (Produk Sahaja)");
  const [latar, setLatar] = useState("");
  const [vibes, setVibes] = useState("");
  const [angle, setAngle] = useState("");
  const [ratio, setRatio] = useState("9:16");

  const [loading, setLoading] = useState(false);
  const [hasilPrompt, setHasilPrompt] = useState("");

  // ================= GENERATE =================
  const handleGenerate = async () => {
    setLoading(true);
    setHasilPrompt("");

    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kategori,
          model,
          latar,
          vibes,
          angle,
          ratio,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ralat AI");
      }

      setHasilPrompt(data.prompt);
    } catch (err) {
      alert("❌ AI gagal menjana prompt");
    } finally {
      setLoading(false);
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
            {["Fashion", "Aksesori", "FNB", "Lainnya"].map((k) => (
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

        {/* STEP 3 */}
        <section className="card">
          <div className="card-header">
            <span className="step">3</span>
            <h2>Styling</h2>
          </div>

          <select className="select" onChange={(e) => setLatar(e.target.value)}>
            <option value="">Pilih Latar</option>
            <option>Studio Foto Minimalis</option>
            <option>Jalanan Kota</option>
            <option>Kafe Outdoor</option>
            <option>Pantai</option>
            <option>Kantor</option>
          </select>

          <div className="grid-2">
            <select className="select" onChange={(e) => setVibes(e.target.value)}>
              <option value="">Pilih Vibes</option>
              <option>Aesthetic</option>
              <option>Minimalis</option>
              <option>Dreamy Pastel</option>
              <option>Modern Mewah</option>
              <option>Natural</option>
            </select>

            <select className="select" onChange={(e) => setAngle(e.target.value)}>
              <option value="">Pilih Angle</option>
              <option>Close Up</option>
              <option>Medium Shot</option>
              <option>Full Body</option>
              <option>High Angle</option>
              <option>Low Angle</option>
            </select>
          </div>
        </section>

        {/* RATIO */}
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

        <button className="magic-btn" onClick={handleGenerate}>
          ✨ MERACIK KONTEN
        </button>

        {/* HASIL */}
        {hasilPrompt && (
          <div className="result-box">
            <h3>📄 Prompt AI</h3>
            <pre>{hasilPrompt}</pre>
          </div>
        )}
      </div>

      {/* LOADING UX */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="magic-spinner"></div>
            <p>AI sedang berfikir…</p>
          </div>
        </div>
      )}
    </>
  );
}
