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

  const apiUrl = 'https://script.google.com/macros/s/AKfycbx180JZJpMPaW1V7YY0cG7zYulv6qMxMC0GPf4gP1H-RBuSmAiUG9XE3Af-od14eSb_PQ/exec'; // آدرس وب اپ شما
  
        let currentFolderId = "1A7r1NzGB8tZpc5l9xv_LEEJiWk6Gi96B"; // شناسه پوشه اصلی
		
		const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        
		
		sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });


      function uploadProjectZip() {
  const fileInput = document.getElementById("fileInput");
  const projectNameInput = document.getElementById("projectName");

  const file = fileInput.files[0];
  const projectName = projectNameInput.value.trim();

  if (!file || !projectName) {
    alert("فایل ZIP و نام پروژه الزامی است");
    return;
  }

  if (!file.name.toLowerCase().endsWith(".zip")) {
    alert("فقط فایل ZIP مجاز است");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = function () {
    const base64data = reader.result.split(",")[1];

    const formData = new FormData();
    formData.append("action", "uploadProjectZip");
    formData.append("fileData", base64data);
    formData.append("projectName", projectName);

    fetch(apiUrl, {
      method: "POST",
      body: formData
    })
      .then(res => res.text()) // ⬅️ مهم
      .then(text => {
        try {
          const data = JSON.parse(text);

          if (data.success) {
            alert("پروژه با موفقیت آپلود شد ✔️");
            currentFolderId = data.folderId;
            loadFileList();
            updateIframe(currentFolderId);
          } else {
            alert("خطا: " + data.error);
          }

        } catch (e) {
          // ⬅️ این همون حالتیه که آپلود انجام شده ولی response ناقصه
          console.warn("Invalid JSON response:", text);
          alert("آپلود انجام شد، اما پاسخ سرور ناقص بود");
          loadFileList();
        }
      })
      .catch(err => {
        console.error(err);
        alert("اتصال با سرور برقرار نشد، اما احتمالاً آپلود انجام شده");
        loadFileList();
      });
  };

  reader.readAsDataURL(file);
}


  // تابع برای رفرش کردن آیفریم
    function refreshIframe() {
        var iframe = document.getElementById('driveIframe');
        var src = iframe.src;
        iframe.src = ''; // ابتدا آیفریم را خالی می‌کنیم
        iframe.src = src; // دوباره آدرس قبلی را به آیفریم می‌دهیم
    }
	
        // ایجاد پوشه جدید
        function createFolder() {
            const folderName = document.getElementById("folderNameInput").value;
            if (folderName) {
                const formData = new FormData();
                formData.append('action', 'createFolder');
                formData.append('folderName', folderName);
                formData.append('folderId', currentFolderId);

                fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    alert("پوشه جدید با موفقیت ایجاد شد.");
                    loadFileList();
                })
                .catch(error => {
                    alert("خطا در ایجاد پوشه.");
                });
            } else {
                alert("لطفاً نام پوشه را وارد کنید.");
            }
        }

        // بارگذاری لیست فایل‌ها
 function loadFileList() {
	  console.log("LOAD LIST FOR:", currentFolderId); // 👈 همین‌جا
    const formData = new FormData();
    formData.append('action', 'getFileList');
    formData.append('folderId', currentFolderId); // 👈 مهم

    return fetch(apiUrl, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => displayFiles(data))
    .catch(() => alert('خطا در بارگذاری فایل‌ها.'));
}



        // نمایش لیست فایل‌ها و پوشه‌ها
// نمایش لیست فایل‌ها و پوشه‌ها (با نمایش و کپی ID)
function displayFiles(files) {
    const fileList = document.getElementById("fileList");
    const currentPath = document.getElementById("currentPath");
    fileList.innerHTML = ""; // پاک کردن محتوای قبلی

    // به‌روزرسانی مسیر جاری
    currentPath.textContent = "مسیر جاری: " + (files.path || "/");

    if (!files.items || files.items.length === 0) {
        fileList.innerHTML = "<p>هیچ فایلی یافت نشد.</p>";
        return;
    }

    files.items.forEach(file => {
        const div = document.createElement("div");
        div.style.borderBottom = "1px solid #ddd";
        div.style.padding = "8px 0";

        div.innerHTML = `
            <p>
                <strong>${file.isFolder ? "📁" : "🖼️"} ${file.name}</strong><br>

                <small style="color:#666">
                    ID:
                    <code id="file-id-${file.id}"
                          style="background:#f3f3f3;padding:2px 4px;border-radius:4px">
                        ${file.id}
                    </code>
                    <button onclick="copyFileId('${file.id}')"
                            style="margin-right:6px">
                        📋 کپی
                    </button>
                </small><br>

                ${file.size || ""} ${file.lastUpdated || ""}
            </p>

            ${
                file.isFolder
                    ? `
                        <button onclick="openFolder('${file.id}')">باز کردن پوشه</button>

                        <button onclick="deleteItem('${file.id}', true)">حذف</button>
                        <button onclick="renameItem('${file.id}', true)">تغییر نام</button>
                      `
                    : `
                        <button onclick="deleteItem('${file.id}', false)">حذف</button>
                        <button onclick="renameItem('${file.id}', false)">تغییر نام</button>
                        <button onclick="downloadFile('${file.id}')">دانلود</button>
                      `
            }
        `;

        fileList.appendChild(div);
    });
}


        // باز کردن پوشه
let folderHistory = []; // بالای فایل اضافه کن

// باز کردن پوشه
function openFolder(folderId) {
    console.log("OPEN FOLDER:", folderId);
    folderHistory.push(currentFolderId);
    currentFolderId = folderId;
    loadFileList().then(() => updateIframe(currentFolderId));
}




        // حذف فایل یا پوشه
        function deleteItem(itemId, isFolder) {
            const formData = new FormData();
            formData.append('action', isFolder ? 'deleteFolder' : 'deleteFile');
            formData.append('itemId', itemId);

            fetch(apiUrl, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                alert(isFolder ? "پوشه با موفقیت حذف شد." : "فایل با موفقیت حذف شد.");
                loadFileList();
            })
            .catch(error => {
                alert('خطا در حذف آیتم.');
            });
        }
	function renameItem(itemId, isFolder) {
    const newName = prompt("نام جدید را وارد کنید:");
    if (newName) {
        const formData = new FormData();
        formData.append('action', 'renameItem');
        formData.append('itemId', itemId);
        formData.append('newName', newName);
        formData.append('isFolder', isFolder);

        fetch(apiUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("نام با موفقیت تغییر یافت.");
                loadFileList();
            } else {
                alert("خطا در تغییر نام: " + data.error);
            }
        })
        .catch(error => {
            alert("خطای شبکه هنگام تغییر نام.");
        });
    }
}
function downloadFile(fileId) {
    const formData = new FormData();
    formData.append('action', 'getFileUrl');
    formData.append('fileId', fileId);

    fetch(apiUrl, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // هدایت کاربر به لینک دانلود
            window.open(data.url, '_blank');
        } else {
            alert("خطا در دریافت لینک دانلود: " + data.error);
        }
    })
    .catch(error => {
        alert("خطای شبکه هنگام دریافت لینک دانلود.");
    });
}


        // بارگذاری لیست فایل‌ها هنگام بارگذاری صفحه
        loadFileList();
		function copyFileId(id) {
  navigator.clipboard.writeText(id)
    .then(() => {
      alert("آیدی فایل کپی شد ✔️");
    })
    .catch(() => {
      alert("خطا در کپی آیدی");
    });
}
function updateIframe(folderId) {
    const iframe = document.getElementById('driveIframe');
    iframe.src = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;
}
function goBackFolder() {
    if (folderHistory.length === 0) return;
    currentFolderId = folderHistory.pop();
    loadFileList().then(() => updateIframe(currentFolderId));
}
function publishToGithub() {
  const folderIdInput = document.getElementById("publishFolderId");
  const resultBox = document.getElementById("publishResult");

  const folderId = folderIdInput.value.trim();

  if (!folderId) {
    alert("لطفاً آیدی پوشه را وارد کنید");
    return;
  }

  resultBox.style.color = "black";
  resultBox.textContent = "⏳ درحال انتشار لطفا منتظر بمانید...";

  const formData = new FormData();
  formData.append("action", "publishToGithub");
  formData.append("folderId", folderId);

  fetch(apiUrl, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        resultBox.style.color = "green";
        resultBox.innerHTML = `
          ✅ پروژه با موفقیت منتشر شد<br>
          🔗 <a href="${data.url}" target="_blank">${data.url}</a>
        `;
      } else {
        resultBox.style.color = "red";
        resultBox.textContent = "❌ خطا: " + data.error;
      }
    })
    .catch(err => {
      console.error(err);
      resultBox.style.color = "red";
      resultBox.textContent = "❌ خطای ارتباط با سرور";
    });
}
