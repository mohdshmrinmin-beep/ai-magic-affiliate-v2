import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setResult(data.result || data.error);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>AI Magic Affiliate Studio</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Masukkan ayat produk..."
        style={{ width: "100%", height: 100 }}
      />

      <br /><br />

      <button onClick={generate} disabled={loading}>
        {loading ? "Menjana..." : "Generate Prompt"}
      </button>

      <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
        {result}
      </pre>
    </div>
  );
}
