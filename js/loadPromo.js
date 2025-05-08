document.addEventListener("DOMContentLoaded", () => {
    const promoContainer = document.getElementById('promotions-container');

    fetch('promo.html')  // Tải nội dung từ file promo.html
        .then(response => response.text())
        .then(data => {
            promoContainer.innerHTML = data; // Chèn nội dung vào phần promotions-container
        })
        .catch(error => console.error('Error loading promo content:', error));
});
