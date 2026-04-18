const API_BASE = '/onlineshop/api';

export async function getAllProducts() {
    try {
        const response = await fetch(`${API_BASE}/products.php`);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
}

export async function getProductsByType(type) {
    const products = await getAllProducts();
    return products.filter(p => p.type === type);
}

export async function getNewProducts() {
    return getProductsByType('new');
}

export async function getTrendingProducts() {
    return getProductsByType('trending');
}

export async function getDiscountedProducts() {
    return getProductsByType('discounted');
}

export async function getStudentProducts() {
    return getProductsByType('student');
}

export async function getOfficeProducts() {
    return getProductsByType('office');
}

export async function getBusinessProducts() {
    return getProductsByType('business');
}

export async function getProductById(id) {
    try {
        const response = await fetch(`${API_BASE}/product.php?id=${id}`);
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
}