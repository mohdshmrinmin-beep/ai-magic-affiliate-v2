import { useState } from "react";

export default function Home() {
  const [affiliatePrompt, setAffiliatePrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [promptResult, setPromptResult] = useState("");
  const [promptError, setPromptError] = useState("");

  async function handleGeneratePrompt() {
    if (!affiliatePrompt.trim()) {
      setPromptError("Sila masukkan ayat ringkas dahulu.");
      return;
    }

    setLoadingPrompt(true);
    setPromptResult("");
    setPromptError("");

    try {
      const res = await fetch("/api/affiliate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: affiliatePrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.result) {
        throw new Error(data.error || "AI gagal menjana prompt.");
      }

      setPromptResult(data.result);
    } catch (err) {
      setPromptError(err.message);
    } finally {
      setLoadingPrompt(false);
    }
  }

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
          <button className="chip active">Fashion</button>
          <button className="chip">Aksesori</button>
          <button className="chip">F&B</button>
          <button className="chip">Lainnya</button>
        </div>
      </section>

      {/* ================= STEP 2 ================= */}
      <section className="card">
        <div className="card-header">
          <span className="step">2</span>
          <h2>Pengaturan Scene</h2>
        </div>
        <select className="select">
          <option>Tanpa Model (Produk Sahaja)</option>
          <option>Wanita</option>
          <option>Lelaki</option>
        </select>
      </section>

      {/* ================= STEP 3 ================= */}
      <section className="card">
        <div className="card-header">
          <span className="step">3</span>
          <h2>Styling</h2>
        </div>
        <select className="select">
          <option>Pilih Latar</option>
          <option>Studio</option>
          <option>Outdoor</option>
        </select>

        <div className="grid-2">
          <select className="select">
            <option>Pilih Vibes</option>
            <option>Aesthetic</option>
            <option>Minimal</option>
          </select>
          <select className="select">
            <option>Pilih Angle</option>
            <option>Close-up</option>
            <option>Wide</option>
          </select>
        </div>

        <p className="label">Ratio</p>
        <div className="grid-3">
          <button className="chip active">9:16</button>
          <button className="chip">1:1</button>
          <button className="chip">3:4</button>
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
          placeholder="Contoh: wanita jual jam rosak"
          value={affiliatePrompt}
          onChange={(e) => setAffiliatePrompt(e.target.value)}
        />

        <button
          className="magic-btn"
          onClick={handleGeneratePrompt}
          disabled={loadingPrompt}
        >
          {loadingPrompt ? "AI SEDANG MENJANA..." : "✨ GENERATE PROMPT"}
        </button>

        {promptError && (
          <div className="prompt-result" style={{ background: "#7f1d1d" }}>
            {promptError}
          </div>
        )}

        {promptResult && (
          <div className="prompt-result">{promptResult}</div>
        )}
      </section>
    </div>
  );
}
