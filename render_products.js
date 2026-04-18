function escapeHtml(str) {
    if (!str) return '';
    return str 
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function renderProducts(products, containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`container ${containerId} not found`);
        return;
    }

    container.innerHTML = '';

    let productsToRender = products;
    if (limit && limit > 0) {
        productsToRender = products.slice(0, limit);
    }

    productsToRender.forEach(product => {
        let tagClass = 'bg-success';
        if (product.tag === 'Trending') tagClass = 'bg-warning text-dark';
        if (product.tag === '50% OFF') tagClass = 'bg-danger';

        let priceHtml = `<p class="card-text fw-semibold pt-2"><sup>UGX</sup> ${Number(product.price).toLocaleString()}</p>`;
        if (product.discount && product.discount > 0) {
            const oldPrice = product.old_price || (product.price / (1 - product.discount/100));
            priceHtml = `
                <p class="card-text fw-semibold pt-2">
                    <del><sup>UGX</sup> ${Number(oldPrice).toLocaleString()}</del><br>
                    <sup>UGX</sup> ${Number(product.price).toLocaleString()}
                </p>
            `;
        }

        const productHtml = `
            <div class="col-6 col-md-3">
                <div class="card product-card h-100 text-center">
                    <a href="/onlineshop/product-view.html?id=${product.id}" class="text-decoration-none text-dark">
                        <div class="position-relative">
                            <img src="${product.image || '/onlineshop/assets/images/placeholder.jpg'}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: contain;">
                            <span class="badge ${tagClass} text-light product-tag position-absolute top-0 start-0 m-2">${product.tag || ''}</span>
                        </div>
                    </a>
                    <div class="card-body">
                        <a href="/onlineshop/product-view.html?id=${product.id}" class="text-decoration-none text-dark">
                            <h5 class="card-title">${escapeHtml(product.name)}</h5>
                        </a>
                        <div class="product-desc-wrapper border-top">
                            <a href="/onlineshop/product-view.html?id=${product.id}" class="text-decoration-none text-dark">
                                <p class="product-desc">${escapeHtml((product.description || '').substring(0, 100))}...</p>
                            </a>
                            <a href="/onlineshop/product-view.html?id=${product.id}" class="more-link">More</a>
                        </div>
                        ${priceHtml}
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <button class="add-to-cart btn btn-primary btn-sm"
                                data-id="${product.id}"
                                data-name="${escapeHtml(product.name)}"
                                data-price="${product.price}"
                                data-image="${product.image || ''}"
                                data-desc="${escapeHtml(product.description || '')}">
                                Add to Cart
                            </button>
                            <button class="btn btn-outline-danger btn-sm favorite-btn">
                                <i class="bi bi-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += productHtml;
    });
}