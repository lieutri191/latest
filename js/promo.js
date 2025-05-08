// promo.js
window.onload = function() {
  // Kiểm tra xem người dùng đã đóng banner chưa và thời gian đã qua 5p chưa
  const lastClosedTime = localStorage.getItem('promoBannerClosedTime');
  const currentTime = new Date().getTime();

  if (lastClosedTime && (currentTime - lastClosedTime < 300000)) {
    // Nếu đã đóng trong vòng 5 phút, không hiển thị banner
    return;
  }

  // Đợi 3 giây trước khi hiển thị banner khuyến mãi
  setTimeout(function() {
    // Lấy nội dung của promo.html và chèn vào trang chính
    fetch('promo.html')
      .then(response => response.text())
      .then(data => {
        const promoContainer = document.querySelector('#promo-container');
        promoContainer.innerHTML = data;
        const promoBanner = document.querySelector('.promo-banner');
        promoBanner.style.display = 'block';

        // Thêm sự kiện đóng banner khi người dùng nhấn nút "Đóng"
        const closeButton = promoBanner.querySelector('.promo-close-btn');
        closeButton.addEventListener('click', function() {
          promoBanner.style.display = 'none';
          // Lưu thời gian người dùng đóng banner vào localStorage
          localStorage.setItem('promoBannerClosedTime', currentTime);
        });

        // Thêm sự kiện để "Đóng và không hiển thị lại trong 5 phút"
        const hideAgainButton = promoBanner.querySelector('.promo-hide-again-btn');
        hideAgainButton.addEventListener('click', function() {
          promoBanner.style.display = 'none';
          // Lưu thời gian người dùng đóng banner vào localStorage và không hiển thị lại trong 5 phút
          localStorage.setItem('promoBannerClosedTime', currentTime);
        });
      });
  }, 3000); // 3 giây
};
