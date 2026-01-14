export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method tidak dibenarkan" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt kosong" });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `Hasilkan 5 prompt gambar untuk iklan produk:\n${prompt}` }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({ result: text });
  } catch (e) {
    return res.status(500).json({ error: "Ralat server" });
  }
}
