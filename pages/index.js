import { useState, useEffect } from "react";

export default function Home() {
  // ===============================
  // STATE UTAMA
  // ===============================
  const [kategori, setKategori] = useState("Fashion");
  const [model, setModel] = useState("Tanpa Model (Produk Sahaja)");
  const [latar, setLatar] = useState("Jalanan Kota");
  const [vibes, setVibes] = useState("Aesthetic");
  const [angle, setAngle] = useState("Full Body");
  const [ratio, setRatio] = useState("9:16");

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [promptList, setPromptList] = useState([]);
  const [activePrompt, setActivePrompt] = useState("");

  // ===============================
  // UX MAHAL – AI SEDANG BERFIKIR
  // ===============================
  const loadingSteps = [
    "AI sedang menganalisis produk…",
    "Menentukan gaya visual terbaik…",
    "Meracik sudut kamera & komposisi…",
    "Menjana prompt profesional…",
  ];

  useEffect(() => {
    if (!loading) return;

    let index = 0;
    setLoadingText(loadingSteps[0]);

    const interval = setInterval(() => {
      index = (index + 1) % loadingSteps.length;
      setLoadingText(loadingSteps[index]);
    }, 800);

    return () => clearInterval(interval);
  }, [loading]);

  // ===============================
  // GENERATE PROMPT (OPENROUTER)
  // ===============================
  const handleGenerate = async () => {
    setLoading(true);
    setPromptList([]);
    setActivePrompt("");

    const promptAI = `
Berdasarkan maklumat berikut:

Kategori produk: ${kategori}
Jenis model: ${model}
Latar lokasi: ${latar}
Gaya visual: ${vibes}
Sudut kamera: ${angle}
Nisbah gambar: ${ratio}

Tugasan:
Hasilkan 5 PROMPT GAMBAR profesional untuk AI image generator.

Syarat:
- Bahasa English
- Setiap prompt berbeza angle / komposisi
- Gaya iklan premium & realistik
- Sesuai untuk konten jualan & video pendek
- Jangan beri penjelasan
- Format bernombor 1 hingga 5
`.trim();

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptAI }),
      });

      const data = await res.json();

      const list =
        data?.result
          ?.split("\n")
          .filter((l) => l.trim().match(/^\d\./))
          .map((l) => l.replace(/^\d\.\s*/, "")) || [];

      setPromptList(list);
      setActivePrompt(list[0] || "");
    } catch (err) {
      alert("❌ Ralat semasa menjana prompt AI");
    }

    setLoading(false);
  };

  // ===============================
  // UI
  // ===============================
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
          </select>
        </section>

        {/* STEP 3 */}
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
            <option>Jalanan Kota</option>
            <option>Studio Minimalis</option>
            <option>Kafe Outdoor</option>
            <option>Kantor</option>
          </select>

          <div className="grid-2" style={{ marginTop: 12 }}>
            <select
              className="select"
              value={vibes}
              onChange={(e) => setVibes(e.target.value)}
            >
              <option>Aesthetic</option>
              <option>Minimalis</option>
              <option>Vintage</option>
              <option>Modern Mewah</option>
            </select>

            <select
              className="select"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
            >
              <option>Close Up</option>
              <option>Medium Shot</option>
              <option>Full Body</option>
              <option>High Angle</option>
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

        {/* BUTANG UTAMA */}
        <button
          className="magic-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          ✨ MERACIK KONTEN
        </button>

        {/* HASIL PROMPT */}
        {promptList.length > 0 && (
          <section className="card">
            <h3>📄 Pilih Prompt AI</h3>

            {promptList.map((text, i) => (
              <div
                key={i}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 10,
                  border:
                    activePrompt === text
                      ? "2px solid #8b5cf6"
                      : "1px solid #e5e7eb",
                  background:
                    activePrompt === text ? "#f5f3ff" : "#fff",
                }}
                onClick={() => setActivePrompt(text)}
              >
                <strong>Prompt {i + 1}</strong>
                <p style={{ fontSize: 14, marginTop: 6 }}>{text}</p>

                <button
                  className="chip"
                  style={{ marginTop: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(text);
                  }}
                >
                  📋 Salin Prompt
                </button>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="magic-spinner"></div>
            <p className="loading-text">{loadingText}</p>
          </div>
        </div>
      )}
    </>
  );
}
