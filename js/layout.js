/* =========================================================
   共用版面：header + footer
   只要改這支檔案，全站 13 頁的選單與頁尾就一起更新
   ========================================================= */

// 想改聯絡信箱、社群連結，改這裡就好
const SITE = {
  email: "vera83610942@gmail.com",
  behance: "https://www.behance.net/ruowei2020da6c",
  linkedin: "https://www.linkedin.com/in/vera-liu-8b979a27a",
  line: "https://line.me/ti/p/~@208bjlaw",
  resume: "./Vera Resume.pdf",
};

const headerHTML = `
<header>
  <h3 class="en-3">If you have any questions or want to collaborate, just shoot me an email!</h3>
  <h3 class="en-3">Contact me.</h3>
  <img src="./images/index/herader-arrow.svg" alt="arrow" width="20" height="12">
  <h3 class="en-3 email">${SITE.email}</h3>
  <h4 class="en-4"><a href="#" id="copyEmailBtn">Copy</a></h4>

  <div class="meun">
    <input type="checkbox" id="active">
    <label for="active" class="menu-btn" aria-label="開啟選單"><span></span></label>
    <label for="active" class="close"></label>
    <div class="wrapper">
      <ul>
        <li><img src="./images/index/meun-symbol.svg" alt=""><a href="./index.html">Projects</a></li>
        <li><img src="./images/index/meun-symbol.svg" alt=""><a href="./about.html">About</a></li>
        <li><img src="./images/index/meun-symbol.svg" alt=""><a href="${SITE.resume}" target="_blank" rel="noopener">Resume</a></li>
        <li><img src="./images/index/meun-symbol.svg" alt=""><a href="${SITE.behance}" target="_blank" rel="noopener">Behance</a></li>
      </ul>
    </div>
  </div>
</header>`;

const footerHTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <h3 class="en-3">Vera Liu</h3>
      <p class="en-4">Designer &amp; Front-end Developer, based in Taipei.</p>
    </div>
    <nav class="footer-nav" aria-label="footer">
      <a class="en-4" href="./index.html">Projects</a>
      <a class="en-4" href="./about.html">About</a>
      <a class="en-4" href="${SITE.resume}" target="_blank" rel="noopener">Resume</a>
    </nav>
    <div class="footer-social">
      <a href="${SITE.behance}" target="_blank" rel="noopener" class="en-4">Behance</a>
      <a href="${SITE.linkedin}" target="_blank" rel="noopener" class="en-4">LinkedIn</a>
      <a href="mailto:${SITE.email}" class="en-4">Email</a>
    </div>
  </div>
  <p class="footer-copy en-4">© <span id="footer-year"></span> Vera Liu. All rights reserved.</p>
</footer>`;

document.addEventListener("DOMContentLoaded", () => {
  // 注入 header（固定在最上方）
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  // 注入 footer（放在最後）
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  // 自動年份
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 複製信箱
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard
        .writeText(SITE.email)
        .then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = original), 1500);
        })
        .catch((err) => console.error("無法複製信箱：", err));
    });
  }

  // 點選單連結後自動收合選單
  const activeToggle = document.getElementById("active");
  document.querySelectorAll(".wrapper a").forEach((link) => {
    link.addEventListener("click", () => {
      if (activeToggle) activeToggle.checked = false;
    });
  });
});
