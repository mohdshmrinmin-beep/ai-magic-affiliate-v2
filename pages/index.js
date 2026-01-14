export default function Home() {
  return (
    <div className="app">
      <h1 className="title">✨ AI Product Studio</h1>

      {/* 1. Upload Produk */}
      <section className="card">
        <div className="card-header">
          <span className="step">1</span>
          <h2>Upload Produk</h2>
          <span className="required">WAJIB</span>
        </div>

        <div className="upload-box">
          <div className="upload-icon">⬆️</div>
          <p>Klik atau drop foto di sini</p>
          <small>Format JPG, PNG (Max 5MB)</small>
        </div>

        <p className="label">Kategori Produk</p>
        <div className="grid-2">
          <button className="chip active">👕 Fashion</button>
          <button className="chip">👜 Aksesori & Tas</button>
          <button className="chip">☕ F&B</button>
          <button className="chip">📦 Lainnya</button>
        </div>
      </section>

      {/* 2. Pengaturan Scene */}
      <section className="card">
        <div className="card-header">
          <span className="step">2</span>
          <h2>Pengaturan Scene</h2>
        </div>

        <div className="toggle">
          <button className="toggle-btn active">Model AI</button>
          <button className="toggle-btn">Upload Sendiri</button>
        </div>

        <select className="select">
          <option>Tanpa Model (Produk Sahaja)</option>
          <option>Wanita Berhijab</option>
          <option>Wanita Non-Hijab</option>
          <option>Pria</option>
          <option>Anak Perempuan</option>
          <option>Anak Laki-laki</option>
        </select>
      </section>

      {/* 3. Styling */}
      <section className="card">
        <div className="card-header">
          <span className="step">3</span>
          <h2>Styling</h2>
        </div>

        <select className="select">
          <option>Pilih Latar Scene</option>
          <option>Studio Foto Minimalis</option>
          <option>Jalanan Kota (Street Style)</option>
          <option>Kafe Outdoor</option>
          <option>Pantai</option>
          <option>Kantor (Office Style)</option>
        </select>

        <div className="grid-2">
          <select className="select">
            <option>Pilih Vibes</option>
            <option>Aesthetic</option>
            <option>Minimalis</option>
            <option>Modern Mewah</option>
            <option>Cozy / Hangat</option>
          </select>

          <select className="select">
            <option>Pilih Angle</option>
            <option>Close Up</option>
            <option>Medium Shot</option>
            <option>Full Body / Wide Shot</option>
          </select>
        </div>

        <input
          className="input"
          placeholder="Tambahkan detail prompt manual... (opsional)"
        />

        <p className="label">Ratio</p>
        <div className="grid-3">
          <button className="ratio active">9:16</button>
          <button className="ratio">1:1</button>
          <button className="ratio">3:4</button>
        </div>

        <button className="cta">✨ GENERATE MAGIC</button>
      </section>

      {/* Hasil */}
      <section className="card">
        <div className="card-header">
          <h2>✨ Hasil Studio</h2>
          <button className="small-btn">🔄 Ulangi</button>
        </div>

        <div className="grid-2">
          <div className="result-box">AI Generated</div>
          <div className="result-box">AI Generated</div>
        </div>
      </section>
    </div>
  );
}
