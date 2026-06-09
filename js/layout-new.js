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
    <nav class="nav-links">
      <a href="${SITE_NEW.projects}">Projects</a>
      <a href="${SITE_NEW.about}">About</a>
      <a href="${SITE_NEW.line}" target="_blank" rel="noopener" class="nav-cta">Get in touch</a>
    </nav>
  </div>
</header>`;

const footHTML = `
<footer class="foot">
  <div class="wrap">
    <p class="cta">想合作或聊聊？<br><a href="${SITE_NEW.line}" target="_blank" rel="noopener">LINE 找我</a></p>
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
});
