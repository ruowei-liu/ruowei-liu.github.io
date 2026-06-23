/* =========================================================
   淺色版共用版面：導覽列 + 頁尾（極簡風）
   每頁載入這支即可，改連結/信箱只改這裡
   ========================================================= */
const SITE_NEW = {
  email: "vera83610942@gmail.com",
  line: "https://line.me/ti/p/~@208bjlaw",
  resume: "./Vera Resume.pdf",
  projects: "./index.html",
  about: "./about.html",
};

const navHTML = `
<header class="nav">
  <div class="nav-inner">
    <a href="${SITE_NEW.projects}" class="brand">Vera <span>· Designer</span></a>
    <nav class="nav-links" id="navLinks">
      <a href="${SITE_NEW.projects}">Projects</a>
      <a href="${SITE_NEW.about}">About</a>
      <a href="${SITE_NEW.line}" target="_blank" rel="noopener" class="nav-cta">Get in touch</a>
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="開啟選單" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<div class="nav-overlay" id="navOverlay"></div>`;

const footHTML = `
<footer class="foot">
  <div class="wrap">
    <p class="cta">想合作或聊聊？<br><a href="mailto:${SITE_NEW.email}">${SITE_NEW.email}</a></p>
    <div class="foot-row">
      <span>© <span id="yr"></span> Vera — Taipei, Taiwan</span>
      <span class="links">
        <a href="${SITE_NEW.about}">About</a>
        <a href="mailto:${SITE_NEW.email}">Email</a>
        <a href="${SITE_NEW.line}" target="_blank" rel="noopener">LINE</a>
      </span>
    </div>
  </div>
</footer>`;

document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", navHTML);
  document.body.insertAdjacentHTML("beforeend", footHTML);
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // 手機版漢堡選單
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");
  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle("open", open);
      if (overlay) overlay.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
    if (overlay) overlay.addEventListener("click", () => setOpen(false));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("resize", () => { if (window.innerWidth > 760) setOpen(false); });
  }

  // 募資頁 LP：依視窗寬度分配成 3 欄（桌機）/ 2 欄（手機），錯開有層次
  const lps = document.querySelectorAll(".proj-lp");
  const layoutLP = () => {
    const n = window.innerWidth <= 760 ? 2 : 3;
    lps.forEach((lp) => {
      if (!lp._imgs) lp._imgs = Array.from(lp.querySelectorAll("img"));
      if (lp._n === n) return;
      lp._n = n;
      lp.innerHTML = "";
      const cols = [];
      for (let i = 0; i < n; i++) {
        const c = document.createElement("div");
        c.className = "lp-col";
        lp.appendChild(c);
        cols.push(c);
      }
      const per = Math.ceil(lp._imgs.length / n);
      lp._imgs.forEach((img, i) => cols[Math.min(n - 1, Math.floor(i / per))].appendChild(img));
    });
  };
  if (lps.length) {
    layoutLP();
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(layoutLP, 150); });
  }
});
