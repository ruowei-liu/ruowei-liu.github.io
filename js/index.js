// 複製電子信箱
function copyEmail() {
  var emailElement = document.querySelector('.email');
  var email = emailElement.innerText;

  navigator.clipboard.writeText(email)
    .catch(function(error) {
      console.error('Unable to copy email:', error);
    });
}

// 技能輪播
$(document).ready(function() {
  var slides = $('.slideshow .slide');
  var currentSlideIndex = 0;

  function showNextSlide() {
    slides.eq(currentSlideIndex).animate({ top: '100%', opacity: 0 }, 500, function() {
      $(this).removeClass('active').css({ top: 0, opacity: 1, display: 'none' });
    });
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides.eq(currentSlideIndex).addClass('active').css({ top: '-100%', opacity: 0, display: 'block' }).animate({ top: 0, opacity: 1 }, 500);
  }

  function startSlideshow() {
    $('#slide1').addClass('active').css({ top: 0, opacity: 1, display: 'block' });
    setInterval(showNextSlide, 1500);

    // 調整 .slideshow 的高度為 34px
    if ($(window).width() <= 670) {
      $('.slideshow').css('height', '36px');
    }
  }

  startSlideshow();

  // 其他 JavaScript 部分
});

  
// top button
$(function () {
  $('body').append('<a href="#" id="fixedTop"><img src="./images/index/topbtn-arrow.svg" alt="top"></a>');
  let fixedTop = $('#fixedTop');
  fixedTop.on('click', function (e) {
    e.preventDefault(); // 阻止默认链接行为
    $('html, body').animate({ scrollTop: 0 }, 900); // 设置滚动到顶部的动画效果
  });
  $(window).on('load scroll resize', function () {
    let showTop = 100;
    let curScrollTop = $(window).scrollTop();
    if (curScrollTop > showTop) {
      fixedTop.fadeIn(800);
    } else {
      fixedTop.fadeOut(800);
    }
  });
});

// 影片播放
function playVideo(target) {
  var thumbnail = target.parentNode;
  var youtubeView = thumbnail.nextElementSibling;

  // 隱藏其他影片的預覽圖片和 YouTube 影片
  var allThumbnails = document.querySelectorAll('.thumbnail');
  var allYoutubeViews = document.querySelectorAll('.youtube-view');
  for (var i = 0; i < allThumbnails.length; i++) {
    allThumbnails[i].style.display = 'block';
    allYoutubeViews[i].style.display = 'none';
  }

  // 隱藏點擊的預覽圖片，顯示點擊的 YouTube 影片
  thumbnail.style.display = 'none';
  youtubeView.style.display = 'block';

  // 在影片區塊中的 iframe 中添加自動播放的參數
  var iframe = youtubeView.querySelector('iframe');
  iframe.src += '?autoplay=1';
}



// 首頁專案篩選
function filterProjects(skill) {
  // 獲取所有專案項目
  var projectItems = document.querySelectorAll('.project-item');

  // 如果技能為 null，則不進行篩選
  if (skill === null) {
    return;
  }

  // 顯示所有專案
  if (skill === 'all') {
    for (var i = 0; i < projectItems.length; i++) {
      projectItems[i].style.display = 'block';
    }
  } else {
    // 依技能篩選專案
    for (var i = 0; i < projectItems.length; i++) {
      var projectItem = projectItems[i];
      var skills = projectItem.classList;

      // 檢查專案的技能類別是否符合篩選條件
      if (skills.contains(skill)) {
        projectItem.style.display = 'block';
      } else {
        projectItem.style.display = 'none';
      }
    }
  }
}


// 專案頁面篩選按鈕
document.addEventListener('DOMContentLoaded', function() {
  // 獲取 URL 中的參數
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  // 執行專案篩選
  filterProjects(category);
});






