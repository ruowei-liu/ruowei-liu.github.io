/* =========================================================
   首頁與專案頁互動：輪播 / 回頂按鈕 / 影片 / 作品篩選
   原生 JavaScript，不再依賴 jQuery
   ========================================================= */

// ---------- 影片播放（被 HTML 內的 onclick 呼叫，需為全域） ----------
function playVideo(target) {
  const thumbnail = target.parentNode;
  const youtubeView = thumbnail.nextElementSibling;

  document.querySelectorAll(".thumbnail").forEach((t) => (t.style.display = "block"));
  document.querySelectorAll(".youtube-view").forEach((v) => (v.style.display = "none"));

  thumbnail.style.display = "none";
  youtubeView.style.display = "block";

  const iframe = youtubeView.querySelector("iframe");
  if (iframe && !iframe.src.includes("autoplay")) {
    iframe.src += (iframe.src.includes("?") ? "&" : "?") + "autoplay=1";
  }
}

// ---------- 首頁作品篩選（被 HTML 內的 onclick 呼叫，需為全域） ----------
function filterProjects(skill) {
  if (skill === null) return;
  const items = document.querySelectorAll(".project-item");
  items.forEach((item) => {
    const show = skill === "all" || item.classList.contains(skill);
    item.style.display = show ? "block" : "none";
  });
}

// ---------- 跑馬燈輪播 ----------
function initSlideshow() {
  const slides = document.querySelectorAll(".slideshow .slide");
  if (slides.length < 2) return;

  let idx = 0;
  slides.forEach((s, i) => {
    s.style.opacity = i === 0 ? "1" : "0";
    s.classList.toggle("active", i === 0);
  });

  setInterval(() => {
    const current = slides[idx];
    const next = slides[(idx + 1) % slides.length];

    current.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(60%)", opacity: 0 },
      ],
      { duration: 450, easing: "ease", fill: "forwards" }
    );
    current.classList.remove("active");

    next.style.opacity = "0";
    next.animate(
      [
        { transform: "translateY(-60%)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      { duration: 450, easing: "ease", fill: "forwards" }
    );
    next.classList.add("active");

    idx = (idx + 1) % slides.length;
  }, 1800);
}

// ---------- 回到頂部按鈕 ----------
function initTopButton() {
  const btn = document.createElement("a");
  btn.href = "#";
  btn.id = "fixedTop";
  btn.setAttribute("aria-label", "回到頂部");
  btn.innerHTML = '<img src="./images/index/topbtn-arrow.svg" alt="top">';
  btn.style.display = "none";
  document.body.appendChild(btn);

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const toggle = () => {
    btn.style.display = window.scrollY > 100 ? "block" : "none";
  };
  window.addEventListener("scroll", toggle, { passive: true });
  window.addEventListener("load", toggle);
}

// ---------- 啟動 ----------
document.addEventListener("DOMContentLoaded", () => {
  initSlideshow();
  initTopButton();

  // 從網址參數套用作品分類（例：index.html?category=uiux）
  const category = new URLSearchParams(window.location.search).get("category");
  filterProjects(category);
});
