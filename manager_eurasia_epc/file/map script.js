// آرایه برای ذخیره مارکرها و انتخاب مارکر
        var markers = [];
        var selectedMarker = null;
        var map;

        // تابع برای ایجاد نقشه
        function initMap() {
            // ایجاد نقشه
            map = L.map('map').setView([30.2855, 57.0768], 18);  // مختصات کرمان

            // اضافه کردن Tile Layer از OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // اضافه کردن رویداد کلیک بر روی نقشه برای اضافه کردن مارکر جدید
            map.on('click', function(e) {
                // موقعیت جدید مارکر (طول و عرض جغرافیایی)
                var lat = e.latlng.lat;
                var lon = e.latlng.lng;

                // اضافه کردن مارکر به نقشه
                var marker = L.marker([lat, lon]).addTo(map);

                // ذخیره مارکر در آرایه
                markers.push(marker);

                // افزودن رویداد انتخاب مارکر
                marker.on('click', function() {
                    // اگر مارکر انتخاب شود، آن را ذخیره می‌کنیم
                    if (selectedMarker) {
                        selectedMarker.setIcon(L.icon({iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'})); // برگرداندن آیکون پیش‌فرض
                    }
                    selectedMarker = marker;  // انتخاب مارکر
                    selectedMarker.setIcon(L.icon({iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png'}));  // تغییر آیکون برای نشان دادن انتخاب مارکر

                    // نمایش طول و عرض جغرافیایی در صفحه
                    document.getElementById('coordinates').innerText = lat.toFixed(4) + ", " + lon.toFixed(4);

                    // فعال کردن دکمه حذف و کپی
                    document.getElementById('deleteBtn').disabled = false;
                    document.getElementById('copyBtn').disabled = false;
                });

                // نمایش موقعیت هر مارکر به صورت متن در کادر
                document.getElementById('coordinates').innerText = lat.toFixed(4) + ", " + lon.toFixed(4);
            });

            // رویداد کلیک روی دکمه حذف
            document.getElementById('deleteBtn').addEventListener('click', function() {
                if (selectedMarker) {
                    // حذف مارکر انتخاب شده از نقشه
                    map.removeLayer(selectedMarker);
                    // حذف مارکر از آرایه
                    var index = markers.indexOf(selectedMarker);
                    if (index > -1) {
                        markers.splice(index, 1);
                    }

                    // غیرفعال کردن دکمه حذف
                    document.getElementById('deleteBtn').disabled = true;
                    selectedMarker = null;
                    document.getElementById('coordinates').innerText = "مارکری انتخاب نشده است.";
                }
            });

            // رویداد کلیک روی دکمه نمایش موقعیت کاربر
            document.getElementById('showUserLocationBtn').addEventListener('click', function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var lat = position.coords.latitude;  // عرض جغرافیایی
                        var lon = position.coords.longitude; // طول جغرافیایی

                        // تنظیم مرکز نقشه بر اساس موقعیت مکانی
                        map.setView([lat, lon], 13);

                        // اضافه کردن مارکر به موقعیت کاربر
                        var userMarker = L.marker([lat, lon]).addTo(map);

                        // نمایش طول و عرض جغرافیایی در صفحه به صورت دقیق
                        document.getElementById('coordinates').innerText = lat.toFixed(4) + ", " + lon.toFixed(4);
                    });
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            });

            // رویداد کلیک روی دکمه کپی موقعیت
            document.getElementById('copyBtn').addEventListener('click', function() {
                // گرفتن موقعیت از کادر
                var coordinatesText = document.getElementById('coordinates').innerText;

                // استفاده از API کپی به کلیپ‌بورد
                navigator.clipboard.writeText(coordinatesText).then(function() {
                    alert("موقعیت به کلیپ‌بورد کپی شد!");
                }).catch(function(error) {
                    alert("خطا در کپی کردن موقعیت: " + error);
                });
            });
        }

        // بارگذاری نقشه
        window.onload = initMap;
		
		