// import { getBusinessProducts } from './products_data';
import { getNewProducts, getTrendingProducts, getDiscountedProducts, getStudentProducts, getOfficeProducts, getBusinessProducts } from '/onlineshop/products_data.js';
import { renderProducts } from '/onlineshop/render_products.js';
import { updateCartCount, updateButtonText, attachCartEvents } from '/onlineshop/shopping-cart/cart-functionality/cart_core.js';

async function loadProducts() {
    console.log('Loading products...');
    // Load New Products
    const newProducts = await getNewProducts();
    renderProducts(newProducts, 'new-products-container', 6);
    // Load Trending Products
    const trendingProducts = await getTrendingProducts();
    renderProducts(trendingProducts, 'trending-products-container', 4);
    // Load Discounted Products
    const discountedProducts = await getDiscountedProducts();
    renderProducts(discountedProducts, 'discounted-products-container', 6);
    // load student products
    const studentProducts = await getStudentProducts();
    renderProducts(studentProducts, 'student-products-container');
    // //load office products
    const officeProducts = await getOfficeProducts();
    renderProducts(officeProducts, 'office-products-container');
    // //load business products
    const businessProducts = await getBusinessProducts();
    renderProducts(businessProducts, 'business-products-container');
    
    console.log('All products loaded!');

    attachCartEvents();
    updateButtonText();
}

function waitNavbarAndUpdate() {
    const checkNavbar = setInterval(() => {
        const counter = document.getElementById("cart-count");
        if (counter) {
            clearInterval(checkNavbar);
            updateCartCount();
        }
    }, 50);

    setTimeout(() => {
        clearInterval(checkNavbar);
        updateCartCount();
    }, 3000);
}
async function init() {
    await loadProducts();
    

    waitNavbarAndUpdate();
    
    console.log('Initialization complete');
}

init();

async function syncUserCart() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return;
    
    try {
        const response = await fetch('/onlineshop/api/get_cart.php');
        const serverCart = await response.json();
        
        if (serverCart && !serverCart.error && serverCart.length > 0) {
            const localCart = serverCart.map(item => ({
                id: item.product_id,
                name: item.name,
                price: parseFloat(item.price),
                image: item.image,
                qty: item.quantity
            }));
            localStorage.setItem('cart', JSON.stringify(localCart));
            updateCartCount();
        }
    } catch (error) {
        console.error('Failed to sync user cart:', error);
    }
}

syncUserCart();


async function loadNavbar() {
    try {
        const response = await fetch('/onlineshop/shared-components/navbar/navbar.html');
        const html = await response.text();
        document.getElementById('navigationBar').innerHTML = html;
        

        setTimeout(() => {
        updateNavbarAuth();
        }, 100);
        
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

function updateNavbarAuth() {
    console.log('looking for elements...');
    console.log('guest-view:', document.getElementById('guest-view'));
    console.log('user-view:', document.getElementById('user-view'));
    console.log('user-name-display:', document.getElementById('user-name-display'));

    const guestView = document.getElementById('guest-view');
    const userView = document.getElementById('user-view');
    const userNameDisplay = document.getElementById('user-name-display');
    
    // Check if elements exist
    if (!guestView || !userView || !userNameDisplay) {
        console.log('Navbar auth elements not found - check IDs in navbar.html');
        return;
    }
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    console.log('isLoggedIn:', isLoggedIn);
    console.log('User name:', user.name);
    
    if (isLoggedIn && user.name) {
        console.log('Showing user view');
        guestView.style.display = 'none';
        userView.style.display = 'block';
        userNameDisplay.textContent = user.name;
    } else {
        console.log('Showing guest view');
        guestView.style.display = 'block';
        userView.style.display = 'none';
    }
}

loadNavbar();
