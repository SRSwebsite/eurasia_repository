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

const scriptURL = "https://script.google.com/macros/s/AKfycbyscODMzAGfls3XwMdE0gO5-6AOnIs3ZbjU4PZEPfLUPka8maDsN-D2JqhaiwLqVGNy/exec";

function collectCheckboxValues() {
    var fixedText1 = "https://srswebsite.github.io/eurasia_repository/"; // متن ثابت اول
    var fixedText2 = "/index.html"; // متن ثابت دوم
    var variableText = document.getElementById("variableInput2").value; // متن متغیر از فیلد ورودی
    var finalText = fixedText1 + variableText + fixedText2; // ترکیب متن ثابت اول، متن متغیر و متن ثابت دوم
    // اضافه کردن متن‌های ثابت ویژه آلبوم
var fixedText3 = "https://srswebsite.github.io/eurasia_repository/"; // متن ثابت سوم
var fixedText4 = "/index.html"; // متن ثابت چهارم

// اضافه کردن فیلد نام آلبوم جدید
var albumName = document.getElementById("variableInput3").value; // نام پروژه جدید

var finalAlbumText = fixedText3 + albumName + fixedText4; // ترکیب آلبوم با متن ثابت

    // جمع‌آوری مقادیر چک باکس‌ها
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedOptions = Array.from(checkboxes).map(cb => cb.value).join(", "); // تبدیل به رشته

    // گرفتن مقادیر عنوان پروژه و مختصات
    var projectTitle = document.getElementById("projectTitle").value;
   var projectTitle_a = document.querySelector('input[name="projectTitle_a"]:checked')?.value || "";

    var projectTitle_b = document.getElementById("projectTitle_b").value;
    var projectTitle_c = document.getElementById("projectTitle_c").value;
    var projectTitle_d = document.getElementById("projectTitle_d").value;
	var projectTitle_e = document.getElementById("projectTitle_e").value;
	var projectTitle_f = document.getElementById("projectTitle_f").value;
	var projectTitle_g = document.getElementById("projectTitle_g").value;
	var projectTitle_h = document.getElementById("projectTitle_h").value;
	var projectTitle_i = document.getElementById("projectTitle_i").value;
	var projectTitle_j = document.getElementById("projectTitle_j").value;
	var projectTitle_k = document.getElementById("projectTitle_k").value;
	var projectTitle_l = document.getElementById("projectTitle_l").value;
    var projectCoordinates = document.getElementById("projectCoordinates").value;

   

    // قرار دادن متن نهایی و گزینه‌های انتخاب شده در فیلدهای مخفی
    document.getElementById("combinedText2").value = finalText;
    document.getElementById("categories").value = selectedOptions;

    // ساخت یک شیء FormData برای ارسال داده‌ها
    var formData = new FormData(document.getElementById("myForm"));
    formData.set('projectTitle', projectTitle);
    formData.set('projectTitle_a', projectTitle_a);
    formData.set('projectTitle_b', projectTitle_b);
    formData.set('projectTitle_c', projectTitle_c);
    formData.set('projectTitle_d', projectTitle_d);
	formData.set('projectTitle_e', projectTitle_e);
	formData.set('projectTitle_f', projectTitle_f);
	formData.set('projectTitle_g', projectTitle_g);
	formData.set('projectTitle_h', projectTitle_h);
	formData.set('projectTitle_i', projectTitle_i);
	formData.set('projectTitle_j', projectTitle_j);
	formData.set('projectTitle_k', projectTitle_k);
	formData.set('projectTitle_l', projectTitle_l);
    formData.set('projectCoordinates', projectCoordinates);
    formData.set('albumName', albumName); // اضافه کردن مقدار آلبوم به فرم دیتا
    formData.set('finalAlbumText', finalAlbumText); // اضافه کردن آدرس پروژه آلبوم

    // ارسال داده‌ها به GAS
    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => alert('فرم با موفقیت ارسال شد!'))
    .catch(error => console.error('Error:', error));
}


// افزودن رفتار به فرم
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").onsubmit = function(event) {
        event.preventDefault(); // جلوگیری از ارسال فرم به روش پیش‌فرض
        collectCheckboxValues(); // فقط یکبار ارسال از طریق fetch()
    };
});


document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;

        // Toggle the "show" class to trigger the animation
        content.classList.toggle('show');

        // Adjust the max-height dynamically based on content height
        if (content.classList.contains('show')) {
            content.style.maxHeight = content.scrollHeight + "px"; // تنظیم حداکثر ارتفاع به ارتفاع واقعی محتوا
        } else {
            content.style.maxHeight = null; // بازنشانی حداکثر ارتفاع
        }
    });
});
function loadSite() {
    var fixedText1 = "https://srswebsite.github.io/eurasia_repository/"; // متن ثابت اول
    var fixedText2 = "/index.html"; // متن ثابت دوم
    var variableText = document.getElementById("variableInput").value; // متن متغیر

    // ترکیب متن ثابت اول، متن متغیر و متن ثابت دوم
    var finalText = fixedText1 + variableText + fixedText2;

    // قرار دادن لینک کامل در فیلد مخفی
    document.getElementById("combinedText").value = finalText;

    // نمایش لینک کامل در آیفریم
    var siteFrame = document.getElementById("unique-siteFrame");
    siteFrame.src = finalText;
}
 function loadFixedLink() {
            var fixedLink = "map.html"; // لینک ثابت

            // نمایش لینک ثابت در آیفریم
            var siteFrame = document.getElementById("unique-siteFrame");
            siteFrame.src = fixedLink;
        }
		function loadInIframe(url) {
  const siteFrame = document.getElementById("unique-siteFrame");
  siteFrame.src = url;
}
