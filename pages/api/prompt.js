// pages/api/prompt.js

export default async function handler(req, res) {
  // Hanya benarkan POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Kaedah tidak dibenarkan. Guna POST sahaja."
    });
  }

  const { prompt } = req.body;

  // Validasi input
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({
      error: "Prompt kosong. Sila masukkan ayat."
    });
  }

  // Pastikan API key wujud
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "API key Gemini tidak dijumpai. Sila semak Vercel Environment Variables."
    });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Tugas anda:
Berdasarkan ayat ini: "${prompt}"

Hasilkan 5 PROMPT GAMBAR berbeza untuk AI image generator.

Keperluan:
- Setiap prompt sudut kamera berbeza
- Gaya profesional & estetik
- Sesuai untuk iklan / video pendek (8–10 saat)
- Ayat penuh dalam Bahasa English
- Fokus produk, pencahayaan, suasana, dan komposisi

Format jawapan:
1. ...
2. ...
3. ...
4. ...
5. ...
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const hasil =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!hasil) {
      return res.status(500).json({
        error: "Gemini tidak memulangkan sebarang jawapan."
      });
    }

    return res.status(200).json({
      berjaya: true,
      result: hasil
    });
  } catch (err) {
    return res.status(500).json({
      error: "Ralat semasa memanggil API Gemini.",
      detail: err.message
    });
  }
}
