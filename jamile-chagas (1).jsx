import { useState } from "react";

// ╔══════════════════════════════════════════════════════════════════╗
// ║  CONFIGURAÇÕES — EDITE AQUI SEM MEXER NO RESTO DO CÓDIGO        ║
// ╚══════════════════════════════════════════════════════════════════╝
const CONFIG = {
  // WhatsApp — coloque o número com DDI+DDD, só números
  whatsapp: "5573981478539",

  // PIX / Dados bancários — aparece no modal de pagamento
  pix: {
    chave: "jamillechagas16@gmail.com",        // pode ser CPF, CNPJ, telefone ou e-mail
    tipo: "E-mail",
    titular: "Jamile Chagas",
    banco: "Nubank",
  },

  // Logins dos administradores
  admins: [
    { email: "jamile.chagas22@hotmail.com", senha: "jamile1231" },
    { email: "brenosalerno@hotmail.com",  senha: "Bcad1998"  },
  ],

  // Informações da loja
  loja: {
    nome: "Jamile Chagas Semi Joias",
    instagram: "https://instagram.com/jamilechagas",
    frete: "Frete grátis acima de R$ 200",
    prazo: "Entrega em 3 a 7 dias úteis",
  },
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║  PRODUTOS — Adicione, edite ou remova produtos aqui             ║
// ║                                                                  ║
// ║  Campos obrigatórios: id, sku, name, category, price, available ║
// ║  image: cole a URL da foto (use imgbb.com para hospedar grátis) ║
// ╚══════════════════════════════════════════════════════════════════╝
const PRODUCTS = [
  {
    id: 1,
    sku: "106601",
    name: "Brinco Esfera Lisa M",
    category: "brincos",
    price: 58,
    stock: 14,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85",
    material: "Folheado a ouro 18k",
    description: "Brinco esfera lisa médio, acabamento dourado fosco. Hipoalergênico, não escurece.",
    available: true,
    featured: false,
    novidade: false,
  },
  {
    id: 2,
    sku: "129508108",
    name: "Brinco Folheado Orgânico",
    category: "brincos",
    price: 65,
    stock: 8,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=85",
    material: "Folheado a ouro 18k",
    description: "Design orgânico contemporâneo. Peça leve e confortável para uso diário.",
    available: true,
    featured: true,
    novidade: true,
  },
  {
    id: 3,
    sku: "12958608",
    name: "Brinco Folheado Texturizado",
    category: "brincos",
    price: 60,
    stock: 2,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85",
    material: "Folheado a ouro 18k",
    description: "Textura exclusiva, sofisticado e delicado. Ideal para looks casuais e formais.",
    available: true,
    featured: false,
    novidade: false,
  },
  {
    id: 4,
    sku: "COL001",
    name: "Colar Veneziana Fina",
    category: "colares",
    price: 89,
    stock: 11,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85",
    material: "Folheado a ouro 18k",
    description: "Corrente veneziana delicada, 45cm com extensor de 5cm. Fecho lagosta.",
    available: true,
    featured: true,
    novidade: false,
  },
  {
    id: 5,
    sku: "COL002",
    name: "Colar Choker Pérolas",
    category: "colares",
    price: 120,
    stock: 6,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=85",
    material: "Pérola sintética + metal dourado",
    description: "Choker com pérolas naturais sintéticas. Peça delicada e elegante, 38cm.",
    available: true,
    featured: true,
    novidade: true,
  },
  {
    id: 6,
    sku: "PUL001",
    name: "Pulseira Elo Achatado",
    category: "pulseiras",
    price: 75,
    stock: 9,
    image: "https://images.unsplash.com/photo-1573408301185-9519f94815c5?w=600&q=85",
    material: "Folheado a ouro 18k",
    description: "Elo achatado elegante, fecho gaveta. 18cm + 2cm extensor.",
    available: true,
    featured: false,
    novidade: false,
  },
  {
    id: 7,
    sku: "ANE001",
    name: "Anel Solitário Cristal",
    category: "aneis",
    price: 95,
    stock: 0,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    material: "Folheado a ouro + zircônia AAAAA",
    description: "Solitário clássico com zircônia de alta pureza. Disponível nos tamanhos 15 ao 22.",
    available: false,
    featured: false,
    novidade: false,
  },
  {
    id: 8,
    sku: "KIT001",
    name: "Kit Trio Minimalista",
    category: "kits",
    price: 180,
    stock: 5,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85",
    material: "Folheado a ouro 18k",
    description: "Kit completo com brinco argola, colar veneziana e pulseira elo. Embalagem presente inclusa.",
    available: true,
    featured: true,
    novidade: false,
  },
];

// ─── ESTILOS ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #B8963E;
    --gold-light: #D4AF6A;
    --gold-pale: #F5EDD6;
    --cream: #FAFAF7;
    --white: #FFFFFF;
    --ink: #1A1A18;
    --ink-soft: #3D3D3A;
    --muted: #8A8A85;
    --border: #E8E4DC;
    --danger: #C0392B;
    --success: #2E7D5A;
    --ff-serif: 'Cormorant Garamond', Georgia, serif;
    --ff-sans: 'Jost', sans-serif;
    --shadow-sm: 0 1px 8px rgba(26,26,24,0.06);
    --shadow-md: 0 4px 20px rgba(26,26,24,0.1);
    --shadow-lg: 0 12px 40px rgba(26,26,24,0.15);
  }

  body { font-family: var(--ff-sans); background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }
  ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: var(--border); }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideUp  { from { transform:translateY(100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
  @keyframes bounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

  .fu  { animation: fadeUp  .38s ease both; }
  .fu2 { animation: fadeUp  .38s ease .08s both; }
  .fu3 { animation: fadeUp  .38s ease .16s both; }
  .fu4 { animation: fadeUp  .38s ease .24s both; }

  /* ── HEADER ── */
  .hdr {
    background: rgba(255,255,255,0.96);
    border-bottom: 1px solid var(--border);
    position: sticky; top:0; z-index:100;
    backdrop-filter: blur(16px);
  }
  .hdr-inner {
    display:flex; align-items:center; justify-content:space-between;
    padding: 12px 16px;
    max-width: 480px; margin: 0 auto;
  }
  .logo-wrap { text-align:center; cursor:default; }
  .logo-jc { font-family:var(--ff-serif); font-size:30px; color:var(--gold); font-weight:300; font-style:italic; line-height:1; letter-spacing:-1px; }
  .logo-rule { height:1px; background:linear-gradient(90deg,transparent,var(--gold-light),transparent); margin:3px auto; width:85%; }
  .logo-sub { font-family:var(--ff-serif); font-size:9.5px; letter-spacing:.38em; color:var(--ink); text-transform:uppercase; }
  .hdr-btn { background:none; border:none; cursor:pointer; color:var(--ink-soft); padding:8px; border-radius:10px; font-family:var(--ff-sans); font-size:12px; display:flex; align-items:center; gap:5px; transition:all .2s; }
  .hdr-btn:hover { color:var(--gold); background:var(--gold-pale); }

  /* ── BANNER ── */
  .banner {
    background: linear-gradient(135deg, var(--ink) 0%, #2a2a26 100%);
    padding: 10px 16px;
    text-align: center;
    font-family: var(--ff-sans);
    font-size: 11px;
    letter-spacing: .08em;
    color: var(--gold-light);
    text-transform: uppercase;
  }

  /* ── SEARCH ── */
  .srch-wrap { padding:14px 16px 8px; max-width:480px; margin:0 auto; }
  .srch-box {
    display:flex; align-items:center; gap:10px;
    background:var(--white); border:1.5px solid var(--border);
    border-radius:14px; padding:12px 16px;
    box-shadow:var(--shadow-sm); transition:all .2s;
  }
  .srch-box:focus-within { border-color:var(--gold-light); box-shadow:0 0 0 3px rgba(184,150,62,.1); }
  .srch-box input { border:none; outline:none; font-family:var(--ff-sans); font-size:14px; color:var(--ink); background:transparent; flex:1; }
  .srch-box input::placeholder { color:var(--muted); }

  /* ── CATEGORIAS ── */
  .cats { display:flex; gap:7px; padding:6px 16px 12px; overflow-x:auto; max-width:480px; margin:0 auto; scrollbar-width:none; }
  .cats::-webkit-scrollbar { display:none; }
  .pill {
    flex-shrink:0; padding:7px 15px; border-radius:20px;
    font-size:11px; font-family:var(--ff-sans); letter-spacing:.07em; text-transform:uppercase;
    border:1.5px solid var(--border); background:var(--white); color:var(--ink-soft);
    cursor:pointer; transition:all .2s; font-weight:500; white-space:nowrap;
  }
  .pill.on { background:var(--gold); color:var(--white); border-color:var(--gold); }
  .pill:hover:not(.on) { border-color:var(--gold-light); color:var(--gold); }

  /* ── FILTRO BAR ── */
  .fbar { display:flex; align-items:center; justify-content:space-between; padding:0 16px 10px; max-width:480px; margin:0 auto; }
  .fbar-count { font-size:11px; color:var(--muted); letter-spacing:.04em; }
  .vbtns { display:flex; gap:4px; }
  .vbtn { padding:6px 9px; border:1.5px solid var(--border); border-radius:8px; background:var(--white); cursor:pointer; color:var(--muted); font-size:15px; transition:all .2s; }
  .vbtn.on { color:var(--gold); border-color:var(--gold-light); background:var(--gold-pale); }

  /* ── DESTAQUE STRIP ── */
  .strip-title { font-family:var(--ff-serif); font-size:18px; font-weight:400; padding:4px 16px 10px; max-width:480px; margin:0 auto; color:var(--ink); display:flex; align-items:center; gap:8px; }
  .strip-title::after { content:''; flex:1; height:1px; background:var(--border); }

  /* ── CARD LISTA ── */
  .prod-list { padding:0 16px 100px; max-width:480px; margin:0 auto; display:flex; flex-direction:column; gap:10px; }
  .pcard {
    display:flex; background:var(--white); border-radius:18px; overflow:hidden;
    box-shadow:var(--shadow-sm); cursor:pointer; border:1.5px solid var(--border);
    transition:box-shadow .25s, transform .2s; animation:fadeUp .35s ease both;
    position:relative;
  }
  .pcard:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
  .pcard:active { transform:scale(.98); }
  .pcard-img { width:130px; flex-shrink:0; object-fit:cover; display:block; background:var(--gold-pale); }
  .pcard-body { padding:14px 14px; display:flex; flex-direction:column; justify-content:center; gap:3px; flex:1; }
  .pcard-sku { font-size:10px; color:var(--muted); letter-spacing:.06em; }
  .pcard-name { font-family:var(--ff-serif); font-size:16px; font-weight:500; color:var(--ink); line-height:1.3; }
  .pcard-price { font-size:18px; font-weight:600; color:var(--gold); margin-top:3px; }
  .pcard-badge { display:inline-block; font-size:9px; letter-spacing:.1em; text-transform:uppercase; padding:2px 8px; border-radius:10px; font-weight:600; align-self:flex-start; margin-top:5px; }
  .badge-out  { background:#FEE2E2; color:var(--danger); }
  .badge-low  { background:#FFF3CD; color:#856404; }
  .badge-new  { background:var(--gold-pale); color:var(--gold); }
  .badge-dest { background:#E8F5E9; color:var(--success); }
  .novo-dot { position:absolute; top:10px; right:10px; width:8px; height:8px; background:var(--gold); border-radius:50%; box-shadow:0 0 0 2px white; }

  /* ── CARD GRID ── */
  .prod-grid { padding:0 16px 100px; max-width:480px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .gcard { background:var(--white); border-radius:16px; overflow:hidden; box-shadow:var(--shadow-sm); cursor:pointer; border:1.5px solid var(--border); transition:all .25s; animation:fadeUp .35s ease both; }
  .gcard:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
  .gcard-img { width:100%; aspect-ratio:1; object-fit:cover; background:var(--gold-pale); }
  .gcard-body { padding:10px 12px 14px; }
  .gcard-name { font-family:var(--ff-serif); font-size:14px; font-weight:500; line-height:1.3; margin-bottom:4px; }
  .gcard-price { font-size:15px; font-weight:600; color:var(--gold); }

  /* ── MODAL PRODUTO ── */
  .overlay { position:fixed; inset:0; background:rgba(20,20,18,.6); z-index:200; display:flex; align-items:flex-end; justify-content:center; backdrop-filter:blur(6px); animation:fadeIn .2s ease; }
  .modal { background:var(--white); border-radius:26px 26px 0 0; width:100%; max-width:480px; max-height:92vh; overflow-y:auto; animation:slideUp .3s ease; padding-bottom:48px; }
  .modal-handle { width:38px; height:4px; background:var(--border); border-radius:2px; margin:14px auto 0; }
  .modal-imgs { position:relative; }
  .modal-img { width:100%; height:290px; object-fit:cover; display:block; }
  .modal-close { position:absolute; top:12px; right:12px; width:34px; height:34px; background:rgba(255,255,255,.92); border:none; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm); }
  .modal-body { padding:22px 20px 0; }
  .modal-sku { font-size:11px; color:var(--muted); letter-spacing:.06em; margin-bottom:4px; }
  .modal-name { font-family:var(--ff-serif); font-size:27px; font-weight:400; line-height:1.2; margin-bottom:6px; }
  .modal-price { font-size:28px; font-weight:600; color:var(--gold); margin-bottom:14px; }
  .modal-desc { font-size:14px; color:var(--ink-soft); line-height:1.75; margin-bottom:18px; }
  .modal-meta { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:22px; }
  .meta-box { background:var(--cream); border-radius:12px; padding:11px 14px; border:1px solid var(--border); }
  .meta-lbl { font-size:10px; color:var(--muted); letter-spacing:.06em; text-transform:uppercase; margin-bottom:3px; }
  .meta-val { font-size:13px; font-weight:500; color:var(--ink); }

  /* ── MODAL PAGAMENTO ── */
  .pix-box { background:var(--gold-pale); border:1.5px solid var(--gold-light); border-radius:14px; padding:16px; margin-bottom:14px; }
  .pix-title { font-family:var(--ff-serif); font-size:16px; margin-bottom:10px; color:var(--ink); }
  .pix-row { display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; }
  .pix-label { color:var(--muted); }
  .pix-val { font-weight:600; color:var(--ink); }
  .pix-key { font-size:15px; font-weight:700; color:var(--gold); word-break:break-all; margin-top:8px; padding:10px 14px; background:var(--white); border-radius:10px; border:1px dashed var(--gold-light); }
  .copy-btn { width:100%; padding:10px; background:var(--gold); color:var(--white); border:none; border-radius:10px; font-family:var(--ff-sans); font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; cursor:pointer; margin-top:10px; transition:all .2s; }
  .copy-btn:hover { background:var(--gold-light); }

  /* ── BOTÕES ── */
  .btn-gold { width:100%; padding:16px; background:var(--gold); color:var(--white); border:none; border-radius:14px; font-family:var(--ff-sans); font-size:13px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; cursor:pointer; transition:all .2s; }
  .btn-gold:hover { background:var(--gold-light); transform:translateY(-1px); box-shadow:0 6px 20px rgba(184,150,62,.3); }
  .btn-gold:active { transform:scale(.97); }
  .btn-ghost { width:100%; padding:14px; background:transparent; color:var(--ink-soft); border:1.5px solid var(--border); border-radius:14px; font-family:var(--ff-sans); font-size:13px; cursor:pointer; margin-top:10px; transition:all .2s; }
  .btn-ghost:hover { border-color:var(--gold-light); color:var(--gold); }
  .btn-wa { width:100%; padding:15px; background:#25D366; color:var(--white); border:none; border-radius:14px; font-family:var(--ff-sans); font-size:13px; font-weight:600; letter-spacing:.08em; cursor:pointer; margin-top:10px; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
  .btn-wa:hover { background:#1ebe5c; transform:translateY(-1px); }

  /* ── FABS ── */
  .fab-wa { position:fixed; bottom:24px; right:16px; width:54px; height:54px; background:#25D366; color:white; border:none; border-radius:50%; font-size:24px; cursor:pointer; box-shadow:0 4px 20px rgba(37,211,102,.4); display:flex; align-items:center; justify-content:center; z-index:150; transition:transform .2s; animation:bounce 2s ease infinite; }
  .fab-wa:hover { transform:scale(1.1); animation:none; }

  /* ── FOOTER ── */
  .footer { background:var(--ink); padding:32px 20px 40px; text-align:center; }
  .footer-logo { font-family:var(--ff-serif); font-size:22px; color:var(--gold-light); font-style:italic; margin-bottom:8px; }
  .footer-sub { font-size:11px; color:rgba(255,255,255,.35); letter-spacing:.1em; text-transform:uppercase; margin-bottom:20px; }
  .footer-links { display:flex; justify-content:center; gap:20px; margin-bottom:16px; }
  .footer-link { font-size:12px; color:rgba(255,255,255,.5); text-decoration:none; cursor:pointer; transition:color .2s; }
  .footer-link:hover { color:var(--gold-light); }
  .footer-copy { font-size:10px; color:rgba(255,255,255,.2); letter-spacing:.06em; }

  /* ── TOAST ── */
  .toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:var(--ink); color:var(--white); padding:12px 22px; border-radius:12px; font-size:13px; font-family:var(--ff-sans); z-index:999; box-shadow:var(--shadow-lg); animation:fadeUp .3s ease; white-space:nowrap; pointer-events:none; }

  /* ── LOGIN ── */
  .login-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; background:var(--ink); position:relative; overflow:hidden; }
  .login-glow { position:absolute; top:-20%; left:50%; transform:translateX(-50%); width:500px; height:500px; background:radial-gradient(circle, rgba(184,150,62,.18) 0%, transparent 70%); pointer-events:none; }
  .login-card { background:var(--white); border-radius:24px; padding:44px 40px; width:360px; position:relative; z-index:1; box-shadow:0 32px 80px rgba(0,0,0,.35); }
  .login-err { background:#FEE2E2; color:var(--danger); padding:11px 14px; border-radius:10px; font-size:13px; margin-bottom:16px; }

  /* ── ADMIN ── */
  .adm-layout { display:flex; min-height:100vh; }
  .adm-side { width:210px; background:var(--ink); flex-shrink:0; display:flex; flex-direction:column; padding:20px 0; position:sticky; top:0; height:100vh; }
  .adm-side-logo { padding:0 20px 20px; border-bottom:1px solid rgba(255,255,255,.07); margin-bottom:12px; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:11px 20px; font-size:13px; font-family:var(--ff-sans); color:rgba(255,255,255,.5); cursor:pointer; transition:all .2s; border-left:2px solid transparent; }
  .nav-item:hover { color:var(--white); background:rgba(255,255,255,.04); }
  .nav-item.on { color:var(--gold-light); background:rgba(184,150,62,.1); border-left-color:var(--gold-light); }
  .adm-main { flex:1; padding:32px; background:#F2F1ED; overflow-y:auto; }
  .adm-title { font-family:var(--ff-serif); font-size:26px; font-weight:400; color:var(--ink); margin-bottom:24px; }
  .adm-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:24px; }
  .adm-card { background:var(--white); border-radius:16px; padding:20px; box-shadow:var(--shadow-sm); border:1px solid var(--border); }
  .adm-lbl { font-size:10px; color:var(--muted); letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px; }
  .adm-val { font-size:22px; font-weight:700; color:var(--ink); }
  .adm-val.gold { color:var(--gold); }

  /* ── ADMIN TABLE ── */
  .tbl-wrap { background:var(--white); border-radius:16px; box-shadow:var(--shadow-sm); border:1px solid var(--border); overflow:hidden; margin-bottom:24px; }
  .tbl-head { padding:16px 20px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .tbl-title { font-family:var(--ff-serif); font-size:18px; }
  table { width:100%; border-collapse:collapse; }
  th { font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); font-weight:500; text-align:left; padding:10px 20px; background:var(--cream); border-bottom:1px solid var(--border); }
  td { padding:13px 20px; font-size:13px; color:var(--ink-soft); border-bottom:1px solid var(--border); }
  tr:last-child td { border-bottom:none; }
  tr:hover td { background:var(--cream); }
  .sbadge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; }
  .s-ok  { background:#D1FAE5; color:var(--success); }
  .s-low { background:#FFF3CD; color:#856404; }
  .s-out { background:#FEE2E2; color:var(--danger); }

  /* ── FORM ── */
  .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .fg { display:flex; flex-direction:column; gap:5px; }
  .fg.full { grid-column:1/-1; }
  .flbl { font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); font-weight:600; }
  .finput { padding:11px 14px; border:1.5px solid var(--border); border-radius:10px; font-family:var(--ff-sans); font-size:14px; color:var(--ink); background:var(--white); outline:none; transition:border-color .2s; width:100%; }
  .finput:focus { border-color:var(--gold-light); box-shadow:0 0 0 3px rgba(184,150,62,.1); }
  .upload-z { border:2px dashed var(--border); border-radius:14px; padding:28px; text-align:center; cursor:pointer; transition:all .2s; background:var(--cream); }
  .upload-z:hover { border-color:var(--gold-light); background:var(--gold-pale); }
  .margin-preview { background:var(--gold-pale); border-radius:12px; padding:14px 18px; margin:14px 0; display:flex; gap:28px; }
  .mp-lbl { font-size:10px; color:var(--muted); letter-spacing:.06em; text-transform:uppercase; margin-bottom:4px; }
  .mp-val { font-size:20px; font-weight:700; }

  @media (max-width:700px) {
    .adm-side { display:none; }
    .form-grid { grid-template-columns:1fr; }
    .adm-grid { grid-template-columns:1fr 1fr; }
  }
`;

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

function Logo({ small }) {
  return (
    <div className="logo-wrap">
      <div className="logo-jc" style={small ? { fontSize: 20 } : {}}>{small ? "JC" : "JC"}</div>
      <div className="logo-rule" />
      <div className="logo-sub" style={small ? { fontSize: 8 } : {}}>Jamile Chagas · Semi Joias</div>
    </div>
  );
}

// ─── LOJA ────────────────────────────────────────────────────────────────────
function Loja({ onAdmin }) {
  const [view, setView]       = useState("list");
  const [cat, setCat]         = useState("all");
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState(null);
  const [payModal, setPayModal] = useState(false);
  const [toast, setToast]     = useState("");
  const [copied, setCopied]   = useState(false);

  const cats = [
    { id: "all",       label: "Todos"     },
    { id: "novidades", label: "✦ Novidades" },
    { id: "destaque",  label: "Destaques" },
    { id: "brincos",   label: "Brincos"   },
    { id: "colares",   label: "Colares"   },
    { id: "pulseiras", label: "Pulseiras" },
    { id: "aneis",     label: "Anéis"     },
    { id: "kits",      label: "Kits"      },
  ];

  const filtered = PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.sku.includes(q) || p.category.includes(q);
    if (!matchSearch) return false;
    if (cat === "all")       return true;
    if (cat === "novidades") return p.novidade;
    if (cat === "destaque")  return p.featured;
    return p.category === cat;
  });

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(""), 2600); };

  const openWA = (p) => {
    const msg = encodeURIComponent(
      `Olá Jamile! 👋\nTenho interesse na peça:\n\n*${p.name}* (${p.sku})\nValor: ${fmt(p.price)}\n\nPoderia me ajudar?`
    );
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, "_blank");
  };

  const copyPix = () => {
    navigator.clipboard.writeText(CONFIG.pix.chave).catch(() => {});
    setCopied(true);
    showToast("✓ Chave PIX copiada!");
    setTimeout(() => setCopied(false), 3000);
  };

  const novidades   = PRODUCTS.filter(p => p.novidade && p.available);
  const destaques   = PRODUCTS.filter(p => p.featured && p.available && !p.novidade);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* BANNER */}
      <div className="banner">✦ {CONFIG.loja.frete} · {CONFIG.loja.prazo} ✦</div>

      {/* HEADER */}
      <header className="hdr">
        <div className="hdr-inner">
          <button className="hdr-btn" onClick={onAdmin}>⚙</button>
          <Logo />
          <a className="hdr-btn" href={CONFIG.loja.instagram} target="_blank" rel="noreferrer">
            <span style={{ fontSize: 16 }}>📷</span>
          </a>
        </div>
      </header>

      {/* SEARCH */}
      <div className="srch-wrap fu">
        <div className="srch-box">
          <span style={{ color: "var(--muted)" }}>🔍</span>
          <input placeholder="Buscar por nome ou código..." value={search} onChange={e => setSearch(e.target.value)} />
          {search && <span style={{ cursor: "pointer", color: "var(--muted)", fontSize: 14 }} onClick={() => setSearch("")}>✕</span>}
        </div>
      </div>

      {/* CATEGORIAS */}
      <div className="cats fu2">
        {cats.map(c => (
          <button key={c.id} className={`pill ${cat === c.id ? "on" : ""}`} onClick={() => setCat(c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      {/* FILTER BAR */}
      <div className="fbar fu3">
        <span className="fbar-count">{filtered.length} {filtered.length === 1 ? "peça" : "peças"}</span>
        <div className="vbtns">
          <button className={`vbtn ${view === "list" ? "on" : ""}`} onClick={() => setView("list")}>≡</button>
          <button className={`vbtn ${view === "grid" ? "on" : ""}`} onClick={() => setView("grid")}>⊞</button>
        </div>
      </div>

      {/* NOVIDADES STRIP */}
      {cat === "all" && novidades.length > 0 && !search && (
        <>
          <div className="strip-title fu4">✦ Novidades</div>
          {view === "list" ? (
            <div className="prod-list" style={{ paddingBottom: 0 }}>
              {novidades.map((p, i) => <PCard key={p.id} p={p} i={i} onClick={() => setSelected(p)} />)}
            </div>
          ) : (
            <div className="prod-grid" style={{ paddingBottom: 0 }}>
              {novidades.map((p, i) => <GCard key={p.id} p={p} i={i} onClick={() => setSelected(p)} />)}
            </div>
          )}
          {destaques.length > 0 && <div className="strip-title" style={{ marginTop: 16 }}>★ Destaques</div>}
        </>
      )}

      {/* PRODUCTS */}
      {view === "list" ? (
        <div className="prod-list">
          {(cat === "all" && !search ? [...destaques, ...filtered.filter(p => !p.novidade && !p.featured)] : filtered).map((p, i) => (
            <PCard key={p.id} p={p} i={i} onClick={() => setSelected(p)} />
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)", fontFamily: "var(--ff-serif)", fontSize: 18 }}>
              Nenhuma peça encontrada
            </div>
          )}
        </div>
      ) : (
        <div className="prod-grid">
          {filtered.map((p, i) => <GCard key={p.id} p={p} i={i} onClick={() => setSelected(p)} />)}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px 0", color: "var(--muted)", fontFamily: "var(--ff-serif)", fontSize: 18 }}>
              Nenhuma peça encontrada
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">JC</div>
        <div className="footer-sub">Jamile Chagas · Semi Joias</div>
        <div className="footer-links">
          <a className="footer-link" href={CONFIG.loja.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <span className="footer-link" onClick={() => window.open(`https://wa.me/${CONFIG.whatsapp}`, "_blank")}>WhatsApp</span>
        </div>
        <div className="footer-copy">© 2026 Jamile Chagas Semi Joias · Todos os direitos reservados</div>
      </footer>

      {/* MODAL PRODUTO */}
      {selected && (
        <div className="overlay" onClick={() => { setSelected(null); setPayModal(false); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-imgs">
              {selected.image
                ? <img className="modal-img" src={selected.image} alt={selected.name} />
                : <div className="modal-img" style={{ background: "var(--gold-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>💍</div>
              }
              <button className="modal-close" onClick={() => { setSelected(null); setPayModal(false); }}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-sku">Cód. {selected.sku}</div>
              <div className="modal-name">{selected.name}</div>
              <div className="modal-price">{fmt(selected.price)}</div>
              <div className="modal-desc">{selected.description}</div>
              <div className="modal-meta">
                <div className="meta-box">
                  <div className="meta-lbl">Material</div>
                  <div className="meta-val">{selected.material}</div>
                </div>
                <div className="meta-box">
                  <div className="meta-lbl">Disponibilidade</div>
                  <div className="meta-val" style={{ color: selected.available && selected.stock > 0 ? "var(--success)" : "var(--danger)" }}>
                    {selected.available && selected.stock > 0 ? `✓ Em estoque (${selected.stock} un.)` : "✕ Esgotado"}
                  </div>
                </div>
                <div className="meta-box">
                  <div className="meta-lbl">Prazo</div>
                  <div className="meta-val">{CONFIG.loja.prazo}</div>
                </div>
                <div className="meta-box">
                  <div className="meta-lbl">Frete</div>
                  <div className="meta-val">{CONFIG.loja.frete}</div>
                </div>
              </div>

              {/* PAGAMENTO VIA PIX */}
              {payModal && (
                <div className="pix-box">
                  <div className="pix-title">💳 Dados para Pagamento via PIX</div>
                  <div className="pix-row"><span className="pix-label">Titular</span><span className="pix-val">{CONFIG.pix.titular}</span></div>
                  <div className="pix-row"><span className="pix-label">Banco</span><span className="pix-val">{CONFIG.pix.banco}</span></div>
                  <div className="pix-row"><span className="pix-label">Tipo de Chave</span><span className="pix-val">{CONFIG.pix.tipo}</span></div>
                  <div className="pix-key">{CONFIG.pix.chave}</div>
                  <button className="copy-btn" onClick={copyPix}>
                    {copied ? "✓ Copiado!" : "📋 Copiar Chave PIX"}
                  </button>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, lineHeight: 1.6 }}>
                    Após o pagamento, envie o comprovante pelo WhatsApp para confirmar seu pedido.
                  </div>
                </div>
              )}

              {selected.available && selected.stock > 0 ? (
                <>
                  {!payModal && (
                    <button className="btn-gold" onClick={() => setPayModal(true)}>
                      💳 Ver Dados para Pagamento
                    </button>
                  )}
                  <button className="btn-wa" onClick={() => openWA(selected)}>
                    💬 Pedir via WhatsApp
                  </button>
                </>
              ) : (
                <>
                  <button className="btn-gold" style={{ background: "var(--muted)", cursor: "not-allowed" }} disabled>
                    Produto Esgotado
                  </button>
                  <button className="btn-wa" onClick={() => openWA(selected)}>
                    💬 Avisar quando chegar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FAB WHATSAPP */}
      <button className="fab-wa" onClick={() => window.open(`https://wa.me/${CONFIG.whatsapp}`, "_blank")} title="Falar no WhatsApp">
        💬
      </button>

      <Toast msg={toast} />
    </div>
  );
}

// ─── SUB-COMPONENTES ──────────────────────────────────────────────────────────
function PCard({ p, i, onClick }) {
  return (
    <div className="pcard" style={{ animationDelay: `${i * 0.04}s` }} onClick={onClick}>
      {p.novidade && <div className="novo-dot" />}
      {p.image
        ? <img className="pcard-img" src={p.image} alt={p.name} loading="lazy" />
        : <div className="pcard-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>💍</div>
      }
      <div className="pcard-body">
        <div className="pcard-sku">{p.sku}</div>
        <div className="pcard-name">{p.name}</div>
        <div className="pcard-price">{fmt(p.price)}</div>
        {!p.available || p.stock === 0
          ? <span className="pcard-badge badge-out">Esgotado</span>
          : p.stock <= 3
          ? <span className="pcard-badge badge-low">⚠ Últimas unidades</span>
          : p.novidade
          ? <span className="pcard-badge badge-new">✦ Novidade</span>
          : p.featured
          ? <span className="pcard-badge badge-dest">★ Destaque</span>
          : null
        }
      </div>
    </div>
  );
}

function GCard({ p, i, onClick }) {
  return (
    <div className="gcard" style={{ animationDelay: `${i * 0.04}s` }} onClick={onClick}>
      {p.image
        ? <img className="gcard-img" src={p.image} alt={p.name} loading="lazy" />
        : <div className="gcard-img" style={{ background: "var(--gold-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>💍</div>
      }
      <div className="gcard-body">
        <div className="pcard-sku">{p.sku}</div>
        <div className="gcard-name">{p.name}</div>
        <div className="gcard-price">{fmt(p.price)}</div>
      </div>
    </div>
  );
}

// ─── LOGIN ADMIN ──────────────────────────────────────────────────────────────
function Login({ onOk, onBack }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [err, setErr]     = useState("");

  const tentar = () => {
    const ok = CONFIG.admins.some(a => a.email === email && a.senha === senha);
    if (ok) onOk();
    else setErr("E-mail ou senha incorretos.");
  };

  return (
    <div className="login-wrap">
      <div className="login-glow" />
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Logo />
          <div style={{ fontFamily: "var(--ff-serif)", fontSize: 18, marginTop: 16, color: "var(--ink)" }}>Painel Administrativo</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Acesso restrito</div>
        </div>
        {err && <div className="login-err">{err}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="fg">
            <label className="flbl">E-mail</label>
            <input className="finput" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="fg">
            <label className="flbl">Senha</label>
            <input className="finput" type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === "Enter" && tentar()} />
          </div>
          <button className="btn-gold" onClick={tentar}>Entrar</button>
          <button className="btn-ghost" onClick={onBack} style={{ marginTop: 0 }}>← Voltar à Loja</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function Admin({ onBack }) {
  const [sec, setSec]         = useState("produtos");
  const [prods, setProds]     = useState(PRODUCTS);
  const [toast, setToast]     = useState("");
  const [novo, setNovo]       = useState({ name:"", sku:"", category:"brincos", price:"", cost:"", stock:"", material:"", description:"", available:true, featured:false, novidade:false, image:"" });

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const cadastrar = () => {
    if (!novo.name.trim() || !novo.price) { showToast("⚠ Preencha nome e preço."); return; }
    const p = { ...novo, id: Date.now(), price: +novo.price, cost: +novo.cost, stock: +novo.stock, sales: 0 };
    setProds(pp => [p, ...pp]);
    setNovo({ name:"", sku:"", category:"brincos", price:"", cost:"", stock:"", material:"", description:"", available:true, featured:false, novidade:false, image:"" });
    setSec("produtos");
    showToast("✓ Peça cadastrada!");
  };

  const ajusteStock = (id, delta) => setProds(pp => pp.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));

  const navs = [
    { id:"produtos",  icon:"◉", label:"Produtos"    },
    { id:"estoque",   icon:"◫", label:"Estoque"     },
    { id:"nova",      icon:"＋", label:"Nova Peça"   },
    { id:"config",    icon:"⚙", label:"Configurações"},
  ];

  return (
    <div className="adm-layout">
      <aside className="adm-side">
        <div className="adm-side-logo"><Logo small /></div>
        {navs.map(n => (
          <div key={n.id} className={`nav-item ${sec === n.id ? "on" : ""}`} onClick={() => setSec(n.id)}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}
          </div>
        ))}
        <div style={{ marginTop: "auto" }}>
          <div className="nav-item" onClick={onBack}><span>←</span> Ver Loja</div>
        </div>
      </aside>

      <main className="adm-main">

        {/* ── PRODUTOS ── */}
        {sec === "produtos" && (
          <div>
            <div className="adm-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Produtos
              <button className="btn-gold" style={{ width: "auto", padding: "10px 20px", fontSize: 13 }} onClick={() => setSec("nova")}>＋ Nova Peça</button>
            </div>
            <div className="adm-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              {[
                { lbl: "Total Produtos", val: prods.length },
                { lbl: "Disponíveis",    val: prods.filter(p => p.available && p.stock > 0).length },
                { lbl: "Estoque Baixo",  val: prods.filter(p => p.stock > 0 && p.stock <= 3).length },
                { lbl: "Esgotados",      val: prods.filter(p => p.stock === 0).length },
              ].map((c, i) => (
                <div key={i} className="adm-card">
                  <div className="adm-lbl">{c.lbl}</div>
                  <div className="adm-val">{c.val}</div>
                </div>
              ))}
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr>
                  <th>SKU</th><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Status</th>
                </tr></thead>
                <tbody>
                  {prods.map(p => (
                    <tr key={p.id}>
                      <td style={{ color: "var(--muted)", fontSize: 11 }}>{p.sku || "—"}</td>
                      <td style={{ fontFamily: "var(--ff-serif)", fontSize: 14, fontWeight: 500 }}>{p.name}</td>
                      <td style={{ textTransform: "capitalize", fontSize: 12 }}>{p.category}</td>
                      <td style={{ color: "var(--gold)", fontWeight: 600 }}>{fmt(p.price)}</td>
                      <td style={{ fontWeight: 600 }}>{p.stock}</td>
                      <td>
                        <span className={`sbadge ${p.stock === 0 ? "s-out" : p.stock <= 3 ? "s-low" : "s-ok"}`}>
                          {p.stock === 0 ? "Esgotado" : p.stock <= 3 ? "Baixo" : "OK"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ESTOQUE ── */}
        {sec === "estoque" && (
          <div>
            <div className="adm-title">Controle de Estoque</div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Produto</th><th>Categoria</th><th>Qtd Atual</th><th>Status</th><th>Ajuste Manual</th></tr></thead>
                <tbody>
                  {prods.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: "var(--ff-serif)", fontSize: 14 }}>{p.name}</td>
                      <td style={{ textTransform: "capitalize", fontSize: 12, color: "var(--muted)" }}>{p.category}</td>
                      <td style={{ fontWeight: 700, fontSize: 16 }}>{p.stock}</td>
                      <td><span className={`sbadge ${p.stock === 0 ? "s-out" : p.stock <= 3 ? "s-low" : "s-ok"}`}>{p.stock === 0 ? "Esgotado" : p.stock <= 3 ? "⚠ Baixo" : "✓ OK"}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <button style={{ width: 30, height: 30, border: "1.5px solid var(--border)", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 16, fontWeight: 700 }} onClick={() => ajusteStock(p.id, -1)}>−</button>
                          <span style={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>{p.stock}</span>
                          <button style={{ width: 30, height: 30, border: "1.5px solid var(--gold-light)", borderRadius: 8, background: "var(--gold-pale)", cursor: "pointer", fontSize: 16, fontWeight: 700, color: "var(--gold)" }} onClick={() => ajusteStock(p.id, 1)}>＋</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── NOVA PEÇA ── */}
        {sec === "nova" && (
          <div>
            <div className="adm-title">＋ Cadastrar Nova Peça</div>

            {/* UPLOAD */}
            <div className="adm-card" style={{ marginBottom: 20 }}>
              <div className="upload-z">
                <div style={{ fontSize: 36, marginBottom: 8 }}>📸</div>
                <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>Arraste as fotos aqui</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>JPG, PNG ou WEBP · Máx 5MB</div>
                <button style={{ padding: "8px 20px", background: "var(--gold)", color: "white", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "var(--ff-sans)", fontWeight: 600 }}>
                  Selecionar Foto
                </button>
              </div>
              <div className="fg" style={{ marginTop: 14 }}>
                <label className="flbl">Ou cole a URL da imagem (ex: do ImgBB)</label>
                <input className="finput" placeholder="https://i.ibb.co/..." value={novo.image} onChange={e => setNovo(n => ({ ...n, image: e.target.value }))} />
              </div>
              {novo.image && <img src={novo.image} alt="preview" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 10, marginTop: 10 }} onError={e => e.target.style.display="none"} />}
            </div>

            <div className="adm-card">
              <div className="form-grid">
                <div className="fg full">
                  <label className="flbl">Nome da Peça *</label>
                  <input className="finput" placeholder="Ex: Brinco Argola Dourada" value={novo.name} onChange={e => setNovo(n => ({ ...n, name: e.target.value }))} />
                </div>
                <div className="fg">
                  <label className="flbl">SKU / Código</label>
                  <input className="finput" placeholder="Ex: BRI-001" value={novo.sku} onChange={e => setNovo(n => ({ ...n, sku: e.target.value }))} />
                </div>
                <div className="fg">
                  <label className="flbl">Categoria</label>
                  <select className="finput" value={novo.category} onChange={e => setNovo(n => ({ ...n, category: e.target.value }))}>
                    <option value="brincos">Brincos</option>
                    <option value="colares">Colares</option>
                    <option value="pulseiras">Pulseiras</option>
                    <option value="aneis">Anéis</option>
                    <option value="kits">Kits</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="flbl">Preço de Venda (R$) *</label>
                  <input className="finput" type="number" placeholder="0,00" value={novo.price} onChange={e => setNovo(n => ({ ...n, price: e.target.value }))} />
                </div>
                <div className="fg">
                  <label className="flbl">Custo (R$)</label>
                  <input className="finput" type="number" placeholder="0,00" value={novo.cost} onChange={e => setNovo(n => ({ ...n, cost: e.target.value }))} />
                </div>
                <div className="fg">
                  <label className="flbl">Estoque Inicial</label>
                  <input className="finput" type="number" placeholder="0" value={novo.stock} onChange={e => setNovo(n => ({ ...n, stock: e.target.value }))} />
                </div>
                <div className="fg full">
                  <label className="flbl">Material</label>
                  <input className="finput" placeholder="Ex: Folheado a ouro 18k" value={novo.material} onChange={e => setNovo(n => ({ ...n, material: e.target.value }))} />
                </div>
                <div className="fg full">
                  <label className="flbl">Descrição</label>
                  <textarea className="finput" rows={3} placeholder="Descreva a peça..." value={novo.description} onChange={e => setNovo(n => ({ ...n, description: e.target.value }))} style={{ resize: "vertical" }} />
                </div>
                <div className="fg">
                  <label className="flbl">Marcar como Novidade?</label>
                  <select className="finput" value={novo.novidade ? "sim" : "nao"} onChange={e => setNovo(n => ({ ...n, novidade: e.target.value === "sim" }))}>
                    <option value="nao">Não</option>
                    <option value="sim">✦ Sim — aparece em Novidades</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="flbl">Marcar como Destaque?</label>
                  <select className="finput" value={novo.featured ? "sim" : "nao"} onChange={e => setNovo(n => ({ ...n, featured: e.target.value === "sim" }))}>
                    <option value="nao">Não</option>
                    <option value="sim">★ Sim — aparece em Destaques</option>
                  </select>
                </div>
              </div>

              {/* PREVIEW DE MARGEM */}
              {novo.price && novo.cost && +novo.price > 0 && (
                <div className="margin-preview">
                  <div>
                    <div className="mp-lbl">Margem</div>
                    <div className="mp-val" style={{ color: "var(--gold)" }}>
                      {((( +novo.price - +novo.cost) / +novo.price) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="mp-lbl">Lucro / Unidade</div>
                    <div className="mp-val" style={{ color: "var(--success)" }}>
                      {fmt(+novo.price - +novo.cost)}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button className="btn-gold" onClick={cadastrar} style={{ flex: 2 }}>✓ Cadastrar Peça</button>
                <button className="btn-ghost" onClick={() => setSec("produtos")} style={{ flex: 1, marginTop: 0 }}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* ── CONFIGURAÇÕES ── */}
        {sec === "config" && (
          <div>
            <div className="adm-title">Configurações da Loja</div>
            <div className="adm-card" style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "var(--ff-serif)", fontSize: 18, marginBottom: 16 }}>Como editar as configurações</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.8 }}>
                Todas as configurações ficam no bloco <code style={{ background: "var(--cream)", padding: "1px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 12 }}>CONFIG</code> no topo do arquivo <code style={{ background: "var(--cream)", padding: "1px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 12 }}>jamile-chagas.jsx</code>. Basta editar os valores e publicar novamente.
              </div>
            </div>

            {[
              { titulo: "WhatsApp atual", val: CONFIG.whatsapp, icon: "💬" },
              { titulo: "Chave PIX", val: `${CONFIG.pix.tipo}: ${CONFIG.pix.chave}`, icon: "💳" },
              { titulo: "Titular PIX", val: `${CONFIG.pix.titular} · ${CONFIG.pix.banco}`, icon: "🏦" },
              { titulo: "Instagram", val: CONFIG.loja.instagram, icon: "📷" },
              { titulo: "Admins cadastrados", val: CONFIG.admins.map(a => a.email).join(" · "), icon: "👤" },
            ].map((r, i) => (
              <div key={i} className="adm-card" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 24 }}>{r.icon}</span>
                <div>
                  <div className="adm-lbl">{r.titulo}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginTop: 2 }}>{r.val}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
      <Toast msg={toast} />
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("loja"); // loja | login | admin
  const [auth, setAuth]     = useState(false);

  return (
    <>
      <style>{css}</style>
      {screen === "loja"  && <Loja  onAdmin={() => auth ? setScreen("admin") : setScreen("login")} />}
      {screen === "login" && <Login onOk={() => { setAuth(true); setScreen("admin"); }} onBack={() => setScreen("loja")} />}
      {screen === "admin" && <Admin onBack={() => setScreen("loja")} />}
    </>
  );
}
