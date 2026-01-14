import { useState } from "react";

export default function Home() {
  /* ================= STEP 1–3 STATE ================= */
  const [kategori, setKategori] = useState("Fashion");
  const [sceneMode, setSceneMode] = useState("ai");
  const [model, setModel] = useState("Tanpa Model (Produk Sahaja)");
  const [latar, setLatar] = useState("");
  const [vibes, setVibes] = useState("");
  const [angle, setAngle] = useState("");
  const [ratio, setRatio] = useState("9:16");

  /* ================= STEP 4 STATE ================= */
  const [idea, setIdea] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [resultPrompt, setResultPrompt] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const [loadingImage, setLoadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  /* ================= STEP 4: GEMINI ================= */
  const generateAffiliatePrompt = async () => {
    if (!idea.trim()) return;

    setLoadingPrompt(true);
    setResultPrompt("");
    setSelectedPrompt("");
    setImageUrl("");

    try {
      const res = await fetch("/api/affiliate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();
      setResultPrompt(data.result || "AI gagal menjana prompt.");
    } catch {
      setResultPrompt("Ralat sambungan API Gemini.");
    }

    setLoadingPrompt(false);
  };

  /* ================= STEP 4: IMAGE ================= */
  const generateImage = async () => {
    if (!selectedPrompt) return;

    setLoadingImage(true);
    setImageUrl("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: selectedPrompt }),
      });

      const data = await res.json();

      if (data?.result?.urls?.get) {
        setTimeout(async () => {
          const poll = await fetch(data.result.urls.get, {
            headers: {
              Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_TOKEN}`,
            },
          });

          const final = await poll.json();
          setImageUrl(final?.output?.[0] || "");
          setLoadingImage(false);
        }, 5000);
      } else {
        setLoadingImage(false);
      }
    } catch {
      setLoadingImage(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">✨ AI Product Studio</h1>

      {/* ================= STEP 1 ================= */}
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

      {/* ================= STEP 2 ================= */}
      <section className="card">
        <div className="card-header">
          <span className="step">2</span>
          <h2>Pengaturan Scene</h2>
        </div>

        <div className="grid-2">
          <button
            className={`chip ${sceneMode === "ai" ? "active" : ""}`}
            onClick={() => setSceneMode("ai")}
          >
            Model AI
          </button>
          <button
            className={`chip ${sceneMode === "upload" ? "active" : ""}`}
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
        </select>
      </section>

      {/* ================= STEP 3 ================= */}
      <section className="card">
        <div className="card-header">
          <span className="step">3</span>
          <h2>Styling</h2>
        </div>

        <select className="select" value={latar} onChange={(e) => setLatar(e.target.value)}>
          <option value="">Pilih Latar</option>
          <option>Studio</option>
          <option>Jalanan Kota</option>
          <option>Kafe</option>
          <option>Pantai</option>
        </select>

        <div className="grid-2">
          <select className="select" value={vibes} onChange={(e) => setVibes(e.target.value)}>
            <option value="">Pilih Vibes</option>
            <option>Aesthetic</option>
            <option>Minimalis</option>
            <option>Natural</option>
          </select>

          <select className="select" value={angle} onChange={(e) => setAngle(e.target.value)}>
            <option value="">Pilih Angle</option>
            <option>Close Up</option>
            <option>Wide Shot</option>
            <option>High Angle</option>
          </select>
        </div>

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
      </section>

      {/* ================= STEP 4 ================= */}
      <section className="card">
        <div className="card-header">
          <span className="step">4</span>
          <h2>AI Affiliate Magic Prompt</h2>
        </div>

        <textarea
          className="textarea"
          placeholder="Contoh: lelaki tua menjual ayam"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        <button className="magic-btn" onClick={generateAffiliatePrompt}>
          ✨ GENERATE PROMPT
        </button>

        {resultPrompt && (
          <>
            <pre className="prompt-result">{resultPrompt}</pre>

            {resultPrompt
              .split("\n")
              .filter((l) => l.match(/^\d\./))
              .map((l, i) => (
                <button
                  key={i}
                  className={`chip ${selectedPrompt === l ? "active" : ""}`}
                  onClick={() => setSelectedPrompt(l)}
                >
                  Gunakan Prompt {i + 1}
                </button>
              ))}
          </>
        )}

        {selectedPrompt && (
          <button className="magic-btn" onClick={generateImage}>
            🎨 GENERATE IMAGE
          </button>
        )}

        {loadingImage && <p>⏳ Menjana gambar AI…</p>}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="AI Result"
            style={{ width: "100%", marginTop: 16, borderRadius: 16 }}
          />
        )}
      </section>
    </div>
  );
}
