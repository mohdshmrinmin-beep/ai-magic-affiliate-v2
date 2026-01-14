import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePrompt() {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ralat tidak diketahui");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError("Gagal hubungi server");
    }

    setLoading(false);
  }

  return (
    <main className="container">
      <h1>AI Magic Affiliate Studio</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Contoh: lelaki menjual jam pintar di pasar malam"
      />

      <button onClick={generatePrompt} disabled={loading}>
        {loading ? "Menjana..." : "Generate Prompt"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <pre className="result">
          {result}
        </pre>
      )}
    </main>
  );
}
