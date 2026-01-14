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
        <import { useState } from "react";

export default function Home() {
  // ===== STEP 4 SAHAJA =====
  const [idea, setIdea] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [resultPrompt, setResultPrompt] = useState("");

  const generateAffiliatePrompt = async () => {
    if (!idea.trim()) return;

    setLoadingPrompt(true);
    setResultPrompt("");

    try {
      const res = await fetch("/api/affiliate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      if (data.result) {
        setResultPrompt(data.result);
      } else {
        setResultPrompt("AI gagal menjana prompt.");
      }
    } catch (e) {
      setResultPrompt("Ralat sambungan API.");
    }

    setLoadingPrompt(false);
  };

  return (
    <div className="app">
      <h1 className="title">✨ AI Product Studio</h1>

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

        <button
          className="magic-btn"
          onClick={generateAffiliatePrompt}
          disabled={loadingPrompt}
        >
          {loadingPrompt
            ? "✨ MAGIC SEDANG MENCIPTA…"
            : "✨ GENERATE PROMPT"}
        </button>

        {resultPrompt && (
          <pre className="prompt-result">{resultPrompt}</pre>
        )}
      </section>
    </div>
  );
}
