import wixLocation from 'wix-location';

$w.onReady(function () {

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --dark-navy: #0B2A58;
    --blue-start: #4A90E2;
    --blue-end: #2962FF;
    --text-dark: #1A1A1A;
    --text-grey: #666666;
    --border-light: #EAEAEA;
  }
  body { font-family: 'Inter', sans-serif; background: #fff; color: var(--text-dark); }

  /* HERO */
  .hero {
    background-color: var(--dark-navy);
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
  }
  .glass-container {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 24px;
    padding: 4rem;
    max-width: 900px;
    width: 100%;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  .hero-heading {
    font-weight: 800;
    font-size: 48px;
    line-height: 1.15;
    color: #fff;
    letter-spacing: -0.5px;
    margin-bottom: 20px;
  }
  .hero-subtext {
    font-weight: 400;
    font-size: 18px;
    color: #c8d6e8;
    margin-bottom: 32px;
    line-height: 1.7;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    padding: 16px 40px;
    background: linear-gradient(135deg, var(--blue-start), var(--blue-end));
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.5px;
    border-radius: 50px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(41,98,255,0.30);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(41,98,255,0.40); }

  /* SERVICES */
  .services-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: -80px;
    position: relative;
    z-index: 10;
  }
  .service-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid var(--border-light);
    padding: 24px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  }
  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.10);
    border-color: var(--blue-start);
  }
  .card-icon { margin-bottom: 16px; }
  .card-title { font-weight: 700; font-size: 18px; color: var(--text-dark); line-height: 1.3; margin-bottom: 6px; }
  .card-subtitle { font-weight: 600; font-size: 14px; color: var(--text-grey); margin-bottom: 12px; }
  .card-divider { border: none; border-top: 1px solid var(--border-light); margin-bottom: 12px; }
  .card-body { font-weight: 400; font-size: 14px; color: var(--text-grey); line-height: 1.6; }

  /* TRUST */
  .trust-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 24px;
    display: flex;
    align-items: center;
    gap: 60px;
  }
  .trust-left, .trust-right { flex: 1; }
  .trust-heading { font-weight: 700; font-size: 24px; color: var(--text-dark); margin-bottom: 20px; letter-spacing: 0.5px; }
  .stats-row { display: flex; gap: 40px; }
  .stat { display: flex; flex-direction: column; gap: 4px; }
  .stat-number { font-weight: 800; font-size: 48px; color: var(--dark-navy); line-height: 1; }
  .stat-label { font-weight: 400; font-size: 14px; color: var(--text-grey); }
  .logo-gallery { display: flex; justify-content: space-between; align-items: center; gap: 24px; }
  .placeholder-logo { font-weight: 800; font-size: 22px; color: #d0d5dd; letter-spacing: 2px; text-transform: uppercase; }

  @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 768px) {
    .hero-heading { font-size: 32px; }
    .glass-container { padding: 2.5rem 1.5rem; }
    .services-grid { grid-template-columns: 1fr; margin-top: -40px; }
    .trust-section { flex-direction: column; gap: 40px; }
  }
</style>
</head>
<body>

  <!-- HERO -->
  <section class="hero">
    <div class="glass-container">
      <h1 class="hero-heading">STOP THE STRESS: YOUR HUMAN SUPPLY CHAIN SOLUTIONS PARTNER.</h1>
      <p class="hero-subtext">Complexity handled. Budgets respected. Let's fix your critical networks, person-to-person.</p>
      <button class="btn" onclick="window.parent.postMessage({action:'navigate',url:'/contact-us'},'*')">FIX MY SUPPLY CHAIN NOW</button>
    </div>
  </section>

  <!-- SERVICE CARDS -->
  <section class="services-section">
    <div class="services-grid">
      <div class="service-card">
        <svg class="card-icon" width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="32" height="32" rx="8" stroke="#4A90E2" stroke-width="2"/><path d="M12 20h16M20 12v16" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/></svg>
        <h3 class="card-title">UNIFY Fragmented Operations</h3>
        <p class="card-subtitle">Supply Chain &amp; Logistics</p>
        <hr class="card-divider"/>
        <p class="card-body">&bull; Unlock cost savings and centralized control.</p>
      </div>
      <div class="service-card">
        <svg class="card-icon" width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#4A90E2" stroke-width="2"/><path d="M14 20l4 4 8-8" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h3 class="card-title">STREAMLINE Project Delivery</h3>
        <p class="card-subtitle">Contractor Management</p>
        <hr class="card-divider"/>
        <p class="card-body">&bull; Deliver on-time, on-budget infrastructure.</p>
      </div>
      <div class="service-card">
        <svg class="card-icon" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 20h6l4-8 4 16 4-8h6" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <h3 class="card-title">INTEGRATE Legacy Systems</h3>
        <p class="card-subtitle">TroerConnect</p>
        <hr class="card-divider"/>
        <p class="card-body">&bull; Unify your data for real-time visibility.</p>
      </div>
      <div class="service-card">
        <svg class="card-icon" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 6v8M20 26v8M6 20h8M26 20h8" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/><circle cx="20" cy="20" r="5" stroke="#4A90E2" stroke-width="2"/></svg>
        <h3 class="card-title">ANTICIPATE Future Risks</h3>
        <p class="card-subtitle">TroerTrack</p>
        <hr class="card-divider"/>
        <p class="card-body">&bull; Build a resilient and proactive network.</p>
      </div>
    </div>
  </section>

  <!-- TRUST & RESULTS -->
  <section class="trust-section">
    <div class="trust-left">
      <h2 class="trust-heading">RESULTS &amp; TRUST</h2>
      <div class="stats-row">
        <div class="stat">
          <span class="stat-number">30%</span>
          <p class="stat-label">Efficiency Gain</p>
        </div>
        <div class="stat">
          <span class="stat-number">99.8%</span>
          <p class="stat-label">On-Time Delivery</p>
        </div>
      </div>
    </div>
    <div class="trust-right">
      <div class="logo-gallery">
        <span class="placeholder-logo">SYNCORP</span>
        <span class="placeholder-logo">ALICON</span>
        <span class="placeholder-logo">GLOBEX</span>
      </div>
    </div>
  </section>

</body>
</html>`;

    $w('#htmlComponent').src = "data:text/html;charset=utf-8," + encodeURIComponent(html);

    // Handle navigation from buttons inside the iFrame
    $w('#htmlComponent').onMessage((event) => {
        if (event.data.action === 'navigate') {
            wixLocation.to(event.data.url);
        }
    });

});
