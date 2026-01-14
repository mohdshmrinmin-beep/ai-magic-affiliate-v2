export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method tidak dibenarkan" });
  }

  try {
    const {
      kategori,
      model,
      latar,
      vibes,
      angle,
      ratio,
    } = req.body;

    if (!kategori || !latar || !vibes || !angle) {
      return res.status(400).json({
        error: "Data tidak lengkap",
      });
    }

    // ===== PROMPT AUTO DIRACIK OLEH AI =====
    const prompt = `
Gambar produk kategori ${kategori}.
Model: ${model}.
Lokasi: ${latar}.
Gaya visual: ${vibes}.
Sudut kamera: ${angle}.
Nisbah gambar: ${ratio}.
Pencahayaan profesional, sharp focus, realistic, konten jualan premium, sesuai untuk media sosial.
`.trim();

    // (sementara: return prompt terus)
    // nanti kau boleh sambung ke Gemini / OpenAI / Replicate
    return res.status(200).json({
      success: true,
      prompt,
    });
  } catch (err) {
    return res.status(500).json({
      error: "AI gagal menjana prompt",
    });
  }
}
