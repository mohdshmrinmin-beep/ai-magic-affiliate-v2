export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method tidak dibenarkan" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt kosong" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai-product-studio.vercel.app",
        "X-Title": "AI Product Studio"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp",
        messages: [
          {
            role: "system",
            content: "Anda ialah AI visual director profesional untuk iklan dan konten media sosial."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    const result =
      data?.choices?.[0]?.message?.content || "AI gagal menjana hasil.";

    res.status(200).json({ result });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
