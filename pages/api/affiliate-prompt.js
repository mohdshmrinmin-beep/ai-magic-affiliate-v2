export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: "Prompt kosong" });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a professional AI prompt engineer.

Based on this simple input:
"${prompt}"

Generate EXACTLY 5 different image/video prompts for an AI generator.

RULES (VERY IMPORTANT):
- Language: English only
- Each prompt must use a DIFFERENT camera angle
- Professional, cinematic, advertising quality
- Suitable for affiliate ads, POV content, or short 8-second video
- High detail, realistic lighting, clear subject focus
- Do NOT explain anything
- Do NOT add titles
- Output ONLY numbered prompts

Camera angle order:
1. Medium close-up
2. Wide angle
3. High angle
4. Low angle
5. Eye-level / POV

Output format:
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
        }),
      }
    );

    const data = await response.json();

    const text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;

    if (!text) {
      return res.status(500).json({
        error: "Gemini tidak pulangkan sebarang teks",
      });
    }

    return res.status(200).json({ result: text });
  } catch (error) {
    return res.status(500).json({
      error: "Ralat server",
      detail: error.message,
    });
  }
}
