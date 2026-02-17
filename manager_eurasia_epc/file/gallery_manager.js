const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const icon = sidebarToggle.querySelector('i'); // گرفتن آیکون داخل دکمه

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarToggle.classList.toggle('open'); // برای تغییر رنگ دکمه

  if (sidebar.classList.contains('open')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times'); // تغییر آیکون به ضربدر
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars'); // برگشت آیکون به همبرگر
  }
});


    const accordionButtons = document.querySelectorAll(".accordion button");
    accordionButtons.forEach(button => {
      button.addEventListener("click", function () {
        const panel = this.nextElementSibling;
        
        if (panel.classList.contains("open")) {
          panel.classList.remove("open");
        } else {
          document.querySelectorAll(".panel").forEach(p => p.classList.remove("open"));
          panel.classList.add("open");
        }
      });
    });


// تابع برای باز و بسته کردن پنل‌های آکاردئونی
function toggleAccordion(event) {
    const content = event.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}



const gasUrl =
  "https://script.google.com/macros/s/AKfycbzbULcU9FUvRF7djJjwrov79cwl-makG2Eq3PjmR5FiytBfLjO_EzDLp-Vx03YPPbvDMg/exec";

fetch(gasUrl)
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("accordionContainer");
    container.innerHTML = "";

    if (!Array.isArray(projects) || projects.length === 0) {
      container.textContent = "پروژه‌ای یافت نشد";
      return;
    }

    const fragment = document.createDocumentFragment();

    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";

      const safe = v => (v ? String(v) : "");
      const statusClass = safe(project.projectStatus).replace(/\s+/g, "-").toLowerCase();

      const images = [
        project.image1, project.image2, project.image3, project.image4, project.image5
      ].filter(Boolean);

      const sliderHTML = images.length
        ? images.map(id => `
            <div class="slider-item">
              <iframe data-src="https://drive.google.com/file/d/${id}/preview"
                loading="lazy" allowfullscreen></iframe>
            </div>`).join("")
        : "تصویری ثبت نشده";

      card.innerHTML = `
       <div class="card-header">
  <span class="card-title"></span>

  <div class="card-status-group">
    <span class="card-status status-${statusClass}"></span>
    <span class="card-publish"></span>
  </div>
</div>


        <div class="accordion-body" style="display:none">
          <div class="card-cover cover-wrapper">
  <button class="cover-fullscreen-btn" title="بزرگ‌نمایی">⛶</button>

  <iframe
    src="https://drive.google.com/file/d/${project.coverId}/preview"
    loading="lazy"
    allowfullscreen>
  </iframe>
</div>


          <div class="tabs">
            <button class="tab-btn active" data-tab="info">اطلاعات</button>
            <button class="tab-btn" data-tab="slider">اسلایدر</button>
            <button class="tab-btn" data-tab="link">اسناد پروژه</button>
          </div>

          <div class="tab-content active" data-tab-content="info">
		  <div class="countdown-timer"></div>

            <p><b>تاریخ ثبت:</b> ${safe(project.createdAt)}</p>
            <p><b>ایمیل سیستم ادمین:</b> ${safe(project.creatorEmail)}</p>
			<p><b>شناسه ادمین:</b> ${safe(project.publisherFormId)}</p>
            <p><b>دسته‌بندی:</b> ${safe(project.projectCategory)}</p>
            <p><b>بودجه:</b> ${safe(project.budget)}</p>
            <p><b>موقعیت:</b> ${safe(project.location)}</p>
			 <p><b>توضیحات:</b> ${safe(project.description)}</p>
            <p><b>شرکت ارائه‌دهنده:</b> ${safe(project.providerCompany)}</p>
            <p><b>شرکت واسط:</b> ${safe(project.middleCompany)}</p>
            <p><b>انقضاء:</b> ${safe(project.expireTime)}</p>
          </div>

          <div class="tab-content" data-tab-content="slider">
  <div class="project-slider-wrapper">
    <button class="slider-fullscreen-btn" title="بزرگ‌نمایی">⛶</button>
    <div class="project-slider">
      ${sliderHTML}
    </div>
  </div>
</div>


          <div class="tab-content" data-tab-content="link">
            ${project.linkpublish
              ? `<button class="fullscreen-btn" title="تمام صفحه" aria-label="تمام صفحه">
  ⛶
</button>

                 <iframe src="${project.linkpublish}" class="link-iframe"
                   loading="lazy" allowfullscreen></iframe>`
              : "لینکی ثبت نشده"}
          </div>

          <div class="project-footer">
            <small>Project ID: ${safe(project.projectId)}</small>
          </div>
        </div>
      `;

      card.querySelector(".card-title").textContent = safe(project.title);
      card.querySelector(".card-status").textContent = safe(project.projectStatus);
    const publishEl = card.querySelector(".card-publish");

if (publishEl) {
  const p = (project.publish || "").trim();

  if (p === "✅") {
    publishEl.textContent = "منتشر شده";
    publishEl.className = "card-publish publish-yes";
  } else if (p === "❌") {
    publishEl.textContent = "عدم انتشار";
    publishEl.className = "card-publish publish-no";
  } else {
    publishEl.textContent = "در انتظار انتشار";
    publishEl.className = "card-publish publish-pending";
  }
}


      const header = card.querySelector(".card-header");
      const body = card.querySelector(".accordion-body");
      header.addEventListener("click", () => {
  if (body.style.display === "block") {
    // بستن
    body.style.height = body.scrollHeight + "px";
    requestAnimationFrame(() => {
      body.style.height = "0px";
      body.style.opacity = "0";
    });
    setTimeout(() => {
      body.style.display = "none";
      body.style.height = "";
    }, 350);
    stopSlider(card);
  } else {
    // باز کردن
    body.style.display = "block";
    body.style.opacity = "0";
    body.style.height = "0px";
    requestAnimationFrame(() => {
      body.style.height = body.scrollHeight + "px";
      body.style.opacity = "1";
    });
    setTimeout(() => {
      body.style.height = "";
    }, 350);
  }
});


 const tabBtns = card.querySelectorAll(".tab-btn");
const tabContents = card.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();

    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");

    const t = card.querySelector(
      `.tab-content[data-tab-content="${btn.dataset.tab}"]`
    );
    if (t) t.classList.add("active");

    if (btn.dataset.tab === "slider") {
      startSlider(card);
    } else {
      stopSlider(card);
    }
  });
});

/* ===== Fullscreen لینک ===== */
const fsBtn = card.querySelector(".fullscreen-btn");
const linkIframe = card.querySelector(".link-iframe");

if (fsBtn && linkIframe) {
  fsBtn.addEventListener("click", e => {
    e.stopPropagation();

    if (linkIframe.requestFullscreen) {
      linkIframe.requestFullscreen();
    } else if (linkIframe.webkitRequestFullscreen) {
      linkIframe.webkitRequestFullscreen();
    } else {
      window.open(project.linkpublish, "_blank");
    }
  });
}

/* ===== Fullscreen اسلایدر (روی iframe اسلاید فعال) ===== */
const fsSliderBtn = card.querySelector(".slider-fullscreen-btn");

if (fsSliderBtn) {
  fsSliderBtn.addEventListener("click", e => {
    e.stopPropagation();

    // iframe اسلاید فعال
    const activeIframe = card.querySelector(
      ".slider-item.active iframe"
    );

    if (!activeIframe) return;

    if (activeIframe.requestFullscreen) {
      activeIframe.requestFullscreen();
    } else if (activeIframe.webkitRequestFullscreen) {
      activeIframe.webkitRequestFullscreen();
    }
  });
}

/* ===== Fullscreen کاور ===== */
const coverFsBtn = card.querySelector(".cover-fullscreen-btn");
const coverIframe = card.querySelector(".card-cover iframe");

if (coverFsBtn && coverIframe) {
  coverFsBtn.addEventListener("click", e => {
    e.stopPropagation();

    if (coverIframe.requestFullscreen) {
      coverIframe.requestFullscreen();
    } else if (coverIframe.webkitRequestFullscreen) {
      coverIframe.webkitRequestFullscreen();
    }
  });
}
// ===== Countdown تایمر انقضا =====
console.log("EXPIRE:", project.expireTime);

initCountdown(card, project.createdAt, project.expireTime);



// ===== Append Card =====
fragment.appendChild(card);
});


container.appendChild(fragment);
})
.catch(() => {
  document.getElementById("accordionContainer").textContent =
    "خطا در دریافت اطلاعات";
});



function startSlider(card) {
  if (card.sliderInterval) return;
  const slides = card.querySelectorAll(".slider-item");
  if (!slides.length) return;
  let current = 0;
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === 0);
    const f = s.querySelector("iframe");
    if (f && f.dataset.src) { f.src = f.dataset.src; delete f.dataset.src; }
  });
  card.sliderInterval = setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3000);
}

function stopSlider(card) {
  if (card.sliderInterval) {
    clearInterval(card.sliderInterval);
    card.sliderInterval = null;
  }
}





function initCountdown(card, createdAt, expireDays) {
  const el = card.querySelector(".countdown-timer");
  if (!el) return;

  const createdDate = new Date(createdAt);
  const days = Number(expireDays);

  if (isNaN(createdDate) || isNaN(days)) {
    el.textContent = "⛔ Invalid date";
    return;
  }

  const expireDate =
    new Date(createdDate.getTime() + days * 86400000);

  function update() {
    const now = new Date();
    let diff = expireDate - now;

    if (diff <= 0) {
      el.className = "countdown-timer expired";
      el.textContent = "⛔ Deadline passed";
      return;
    }

    const d = Math.floor(diff / 86400000);
    diff %= 86400000;
    const h = Math.floor(diff / 3600000);
    diff %= 3600000;
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (diff < 6 * 60 * 60 * 1000) {
      el.className = "countdown-timer urgent";
    } else {
      el.className = "countdown-timer active";
    }

    el.textContent = `⏳ ${d}d ${h}h ${m}m ${s}s remaining`;
  }

  update();
  setInterval(update, 1000);
}








function initSearch() {
  const input = document.getElementById("projectSearch");
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    renderSearchResults(query);
  });
}

function renderSearchResults(query) {
  const container = document.getElementById("accordionContainer");
  container.innerHTML = "";

  const filtered = projectsCache.filter(p => {
    return [
      p.title,
      p.projectCategory,
      p.location,
      p.projectStatus,
      p.providerCompany,
      p.middleCompany
    ]
      .filter(Boolean)
      .some(v => String(v).toLowerCase().includes(query));
  });

  if (!filtered.length) {
    container.textContent = "نتیجه‌ای یافت نشد";
    return;
  }

  filtered.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}
const searchInput = document.getElementById("projectSearch");
const searchBtn = document.getElementById("searchBtn");

function filterByTitle() {
  const query = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
    card.style.display = title.includes(query) ? "" : "none";
  });
}

searchBtn.addEventListener("click", filterByTitle);

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") filterByTitle();
});



