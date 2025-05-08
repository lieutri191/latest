document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutBtn = document.getElementById("logout-btn");

    // Hiển thị trạng thái đăng nhập
    if (loggedInUser) {
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        logoutBtn.style.display = "none";
    }

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.reload();
    });

    const productList = document.getElementById('products');

    products.forEach(p => {
        const item = document.createElement('div');
        item.className = 'product';
        item.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Giá: ${p.price.toLocaleString()} VND</p>
            <button onclick="viewDetail(${p.id})">Xem chi tiết</button>
            <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
        `;
        productList.appendChild(item);
    });

    // Gán vào window để dùng trong HTML
    window.viewDetail = function(id) {
        const product = products.find(p => p.id === id);
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "detail.html";
    };

    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    };
});
