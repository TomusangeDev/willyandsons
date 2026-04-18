function isLoggedIn() {
    const loggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
    const userExists = !!localStorage.getItem('user');
    return loggedInFlag && userExists;
}

async function fetchCartFromDatabase() {
    try {
        const response = await fetch('/onlineshop/api/get_cart.php');
        const data = await response.json();
        if (data.error) return [];
        
        return data.map(item => ({
            id: parseInt(item.product_id),
            name: item.name,
            price: parseFloat(item.price),
            image: item.image,
            desc: item.description || '',
            qty: parseInt(item.quantity)
        }));
    } catch (error) {
        console.error('Failed to fetch cart:', error);
        return [];
    }
}

async function addToCartDatabase(product, quantity) {
    try {
        const response = await fetch('/onlineshop/api/add_to_cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: parseInt(product.id),
                quantity: parseInt(quantity)
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Failed to add to cart:', error);
        return { success: false, error: error.message };
    }
}

async function removeFromCartDatabase(productId) {
    try {
        const response = await fetch('/onlineshop/api/remove_from_cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: parseInt(productId) })
        });
        return await response.json();
    } catch (error) {
        console.error('Failed to remove from cart:', error);
        return { success: false };
    }
}

async function updateQuantityDatabase(productId, change) {
    try {
        const response = await fetch('/onlineshop/api/update_cart_quantity.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                product_id: parseInt(productId), 
                change: parseInt(change) 
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Failed to update quantity:', error);
        return { success: false };
    }
}


export async function getCart() {
    if (isLoggedIn()) {
        return await fetchCartFromDatabase();
    } else {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
}

export async function addToCart(product, quantity = 1) {
    console.log('addToCart - isLoggedIn:', isLoggedIn());
    
    if (isLoggedIn()) {
        const result = await addToCartDatabase(product, quantity);
        if (result.success) {
            await updateCartCount();
            showNotification(`${product.name} added to cart!`, 'success');
        } else {
            showNotification(`Error: ${result.error || 'Could not add to cart'}`, 'danger');
        }
    } else {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find(item => item.id == product.id);
        
        if (existing) {
            existing.qty += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                desc: product.desc || '',
                qty: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        await updateCartCount();
        showNotification(`${product.name} added to cart!`, 'success');
    }
}

export async function removeFromCart(productId) {
    if (isLoggedIn()) {
        const result = await removeFromCartDatabase(productId);
        if (result.success) {
            await updateCartCount();
            showNotification(`Product removed from cart`, 'danger');
        }
    } else {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter(item => item.id != productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        await updateCartCount();
        showNotification(`Product removed from cart`, 'danger');
    }
}

export async function updateQuantity(productId, change) {
    if (isLoggedIn()) {
        const result = await updateQuantityDatabase(productId, change);
        if (result.success) {
            await updateCartCount();
        }
    } else {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const itemIndex = cart.findIndex(item => item.id == productId);
        
        if (itemIndex !== -1) {
            let newQty = cart[itemIndex].qty + change;
            if (newQty < 1) newQty = 1;
            if (newQty > 50) newQty = 50;
            cart[itemIndex].qty = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            await updateCartCount();
        }
    }
}

export async function updateCartCount() {
    const cart = await getCart();
    let total = 0;
    cart.forEach(item => total += item.qty);
    
    const counter = document.getElementById('cart-count');
    if (!counter) return;
    
    if (total === 0) {
        counter.style.display = 'none';
    } else {
        counter.style.display = 'inline-block';
        counter.textContent = total;
    }
    return total;
}


export async function updateButtonText() {
    const cart = await getCart();
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        const inCart = cart.some(item => item.id == btn.dataset.id);
        btn.textContent = inCart ? 'Undo Add' : 'Add to Cart';
        btn.classList.toggle('btn-danger', inCart);
        btn.classList.toggle('btn-primary', !inCart);
    });
}

export function attachCartEvents() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.removeEventListener('click', handleAddToCart);
        btn.addEventListener('click', handleAddToCart);
    });
}

async function handleAddToCart(event) {
    const btn = event.currentTarget;
    const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image,
        desc: btn.dataset.desc || ''
    };
    
    const cart = await getCart();
    const inCart = cart.some(item => item.id == product.id);
    
    if (inCart) {
        await removeFromCart(product.id);
        await updateButtonText();
    } else {
        await addToCart(product, 1);
        await updateButtonText();
    }
}

function showNotification(message, type = 'success') {
    const bgColor = type === 'success' ? '#28a745' : '#dc3545';
    const icon = type === 'success' ? 'check-circle-fill' : 'x-circle-fill';
    
    const notification = document.createElement('div');
    notification.className = 'position-fixed start-0 ms-2';
    notification.style.top = '70px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        <div class="toast shadow show" role="alert">
            <div class="toast-header" style="background: ${bgColor}; color: white;">
                <i class="bi bi-${icon} me-2"></i>
                <strong class="me-auto">${type === 'success' ? 'Success' : 'Removed'}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body text-dark bg-white">
                ${message}
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

export async function renderCartPage() {
    const cart = await getCart();
    const container = document.getElementById('cart-items');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 bg-white rounded shadow-sm">
                <i class="bi bi-cart-x" style="font-size: 64px; color: #ccc;"></i>
                <h4 class="mt-3 text-muted">Your cart is empty!</h4>
                <a href="/onlineshop/index.html" class="btn btn-primary mt-3">Continue Shopping</a>
            </div>
        `;
        const totalEl = document.getElementById('cart-total');
        if (totalEl) totalEl.textContent = '0';
        return;
    }

    let totalPrice = 0;
    container.innerHTML = '';

    cart.forEach(item => {
        const qty = Number(item.qty);
        const price = Number(item.price);
        const itemTotal = price * qty;
        totalPrice += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item d-flex align-items-center mb-3 p-3 border bg-white rounded shadow-sm';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
            <div class="flex-grow-1 ms-3">
                <strong class="fs-5">${escapeHtml(item.name)}</strong><br>
                <div class="mt-2">
                    <span class="text-primary fw-bold">UGX ${price.toLocaleString()}</span>
                    <span class="mx-2">x</span>
                    <span class="fw-bold" data-qty-id="${item.id}">${qty}</span>
                    <span class="mx-2">=</span>
                    <span class="text-success fw-bold">UGX ${itemTotal.toLocaleString()}</span>
                </div>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-secondary decrease-qty" data-id="${item.id}">−</button>
                    <button class="btn btn-sm btn-outline-secondary ms-1 increase-qty" data-id="${item.id}">+</button>
                    <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-id="${item.id}">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    const totalElement = document.getElementById('cart-total');
    if (totalElement) totalElement.textContent = totalPrice.toLocaleString();

    attachCartPageEvents();
}

function attachCartPageEvents() {
    document.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.removeEventListener('click', handleDecrease);
        btn.addEventListener('click', handleDecrease);
    });
    
    document.querySelectorAll('.increase-qty').forEach(btn => {
        btn.removeEventListener('click', handleIncrease);
        btn.addEventListener('click', handleIncrease);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.removeEventListener('click', handleRemove);
        btn.addEventListener('click', handleRemove);
    });
}

async function handleDecrease(e) {
    const id = e.currentTarget.dataset.id;
    await updateQuantity(id, -1);
    await renderCartPage();
}

async function handleIncrease(e) {
    const id = e.currentTarget.dataset.id;
    await updateQuantity(id, 1);
    await renderCartPage();
}

async function handleRemove(e) {
    const id = e.currentTarget.dataset.id;
    await removeFromCart(id);
    await renderCartPage();
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}