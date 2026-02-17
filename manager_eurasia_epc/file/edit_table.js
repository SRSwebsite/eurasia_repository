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



const scriptURL = "https://script.google.com/macros/s/AKfycbzNyhRtoe9fx4V2pA4Q2Rz81doJet_BO_DZTaR5DVRH5l1VyNptNjtahUQf6Odf8diejw/exec";

document.getElementById("loadBtn").addEventListener("click", () => {
  const rowId = document.getElementById("rowId").value;
  const colId = document.getElementById("colId").value;

  fetch(`${scriptURL}?action=read&rowId=${rowId}&colId=${colId}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("cellContent").value = data;
    })
    .catch(err => {
      alert("خطا در خواندن سلول");
      console.error(err);
    });
});

document.getElementById("editCellForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const rowId = document.getElementById("rowId").value;
  const colId = document.getElementById("colId").value;
  const content = document.getElementById("cellContent").value;

  const formData = new FormData();
  formData.append("action", "write");
  formData.append("rowId", rowId);
  formData.append("colId", colId);
  formData.append("content", content);

  fetch(scriptURL, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(response => {
      alert("تغییرات ذخیره شد.");
    })
    .catch(error => {
      alert("خطا در ذخیره‌سازی.");
      console.error(error);
    });
});
document.getElementById("deleteBtn").addEventListener("click", () => {
  const rowId = document.getElementById("deleteRowId").value;
  if (!rowId || isNaN(rowId)) {
    alert("لطفاً شماره ردیف معتبر وارد کنید.");
    return;
  }

  if (!confirm("آیا مطمئن هستید که می‌خواهید این ردیف را حذف کنید؟ این عملیات قابل بازگشت نیست.")) {
    return;
  }

  fetch(`${scriptURL}?action=deleteRow&rowId=${rowId}`, {
    method: "GET"
  })
    .then(res => res.text())
    .then(data => {
      if (data === "OK") {
        alert("ردیف با موفقیت حذف شد.");
      } else {
        alert("خطا در حذف ردیف: " + data);
      }
    })
    .catch(err => {
      alert("خطا در ارتباط با سرور.");
      console.error(err);
    });
});

const statusSelector = document.getElementById("statusSelector");
  const statusPreview = document.getElementById("statusPreview");
  const cellContent = document.getElementById("cellContent");

  // نمایش وضعیت انتخاب‌شده
  statusSelector.addEventListener("change", function () {
    statusPreview.textContent = this.value;
  });

  // چسباندن وضعیت به cellContent
  function pasteStatus() {
    if (statusSelector.value) {
      cellContent.value = statusSelector.value;
    }
  }