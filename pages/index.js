import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState("Fashion");
  const [ratio, setRatio] = useState("9:16");

  return (
    <div className="app">
      <header className="header">
        <span className="logo">✨</span>
        <h1>AI Product Studio</h1>
      </header>

      {/* STEP 1 */}
      <section className="card">
        <div className="card-title">
          <span>1</span>
          <h2>Upload Produk</h2>
          <small>WAJIB</small>
        </div>

        <div className="upload-box">
          <p>Klik atau drop foto produk</p>
          <small>Format JPG, PNG, WebP</small>
        </div>

        <p className="label">Kategori Produk</p>
        <div className="category-grid">
          {["Fashion", "Aksesori & Tas", "F&B", "Lainnya"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* STEP 2 */}
      <section className="card">
        <div className="card-title">
          <span>2</span>
          <h2>Pengaturan Scene</h2>
        </div>

        <div className="tabs">
          <button className="active">Model AI</button>
          <button>Upload Sendiri</button>
        </div>

        <select>
          <option>Tanpa Model (Produk Sahaja)</option>
        </select>
      </section>

      {/* STEP 3 */}
      <section className="card">
        <div className="card-title">
          <span>3</span>
          <h2>Styling</h2>
        </div>

        <select>
          <option>Studio Foto Minimalis</option>
        </select>

        <div className="row">
          <select>
            <option>Aesthetic</option>
          </select>
          <select>
            <option>Pilih Angle (Default)</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Tambahkan detail prompt manual... (opsional)"
        />

        <p className="label">Ratio</p>
        <div className="ratio">
          {["9:16", "1:1", "3:4"].map((r) => (
            <button
              key={r}
              className={ratio === r ? "active" : ""}
              onClick={() => setRatio(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <button className="generate">
          ✨ GENERATE MAGIC
        </button>
      </section>
    </div>
  );
}
