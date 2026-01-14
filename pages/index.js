import { useState } from "react";
import "../styles/home.css";

export default function Home() {
  const [category, setCategory] = useState("Fashion");
  const [ratio, setRatio] = useState("9:16");

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>✨ AI PRODUCT STUDIO</h1>
      </header>

      {/* Step 1 */}
      <section className="card">
        <h2>1️⃣ Upload Produk</h2>

        <div className="upload-box">
          <p>Klik atau drop foto produk</p>
          <small>Format: JPG, PNG, WebP</small>
        </div>

        <div className="category">
          <button
            className={category === "Fashion" ? "active" : ""}
            onClick={() => setCategory("Fashion")}
          >
            👕 Fashion
          </button>
          <button
            className={category === "Aksesori" ? "active" : ""}
            onClick={() => setCategory("Aksesori")}
          >
            👜 Aksesori & Tas
          </button>
          <button
            className={category === "F&B" ? "active" : ""}
            onClick={() => setCategory("F&B")}
          >
            🍔 F&B
          </button>
          <button
            className={category === "Lain" ? "active" : ""}
            onClick={() => setCategory("Lain")}
          >
            📦 Lainnya
          </button>
        </div>
      </section>

      {/* Step 2 */}
      <section className="card">
        <h2>2️⃣ Pengaturan Scene</h2>

        <select className="select">
          <option>Tanpa Model (Produk Sahaja)</option>
          <option>Model AI</option>
          <option>Upload Model Sendiri</option>
        </select>
      </section>

      {/* Step 3 */}
      <section className="card">
        <h2>3️⃣ Styling</h2>

        <select className="select">
          <option>Studio Foto Minimalis</option>
          <option>Lifestyle</option>
          <option>Outdoor</option>
        </select>

        <select className="select">
          <option>Aesthetic</option>
          <option>Clean</option>
          <option>Luxury</option>
        </select>

        <div className="ratio">
          <button
            className={ratio === "9:16" ? "active" : ""}
            onClick={() => setRatio("9:16")}
          >
            📱 9:16
          </button>
          <button
            className={ratio === "1:1" ? "active" : ""}
            onClick={() => setRatio("1:1")}
          >
            ⬜ 1:1
          </button>
          <button
            className={ratio === "3:4" ? "active" : ""}
            onClick={() => setRatio("3:4")}
          >
            🖼️ 3:4
          </button>
        </div>
      </section>

      {/* Button */}
      <button className="generate">
        ✨ GENERATE MAGIC
      </button>
    </div>
  );
}
