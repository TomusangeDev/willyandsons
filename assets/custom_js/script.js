//mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileNavBar = document.getElementById('mobileNavBar');

//products toggle
const productsToggle = document.getElementById('productsToggle');
const productsItems = document.getElementById('productsItems');
const productItemOpen = document.getElementById('productItemOpen');
const productItemClose = document.getElementById('productItemClose');
    
//business hub toggle
const businessHubItemsToggle = document.getElementById('businessHubItemsToggle');
const businessHubItems = document.getElementById('businessHubItems');
const businessItemOpen = document.getElementById('businessItemOpen');
const businessItemClose = document.getElementById('businessItemClose');

//mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        openMenu.classList.toggle('d-none');
        closeMenu.classList.toggle('d-none');
        mobileNavBar.classList.toggle('open-nav');
    });

//products toggle
productsToggle.addEventListener('click', () => {
    productsItems.classList.toggle('show-product-menu-items');
    productItemOpen.classList.toggle('d-none');
    productItemClose.classList.toggle('d-none');
    if (productsItems.style.maxHeight) {
        productsItems.style.maxHeight = null;
    } else {
        productsItems.style.maxHeight = productsItems.scrollHeight + "px";
        businessHubItems.style.maxHeight = null;
        businessItemOpen.classList.remove('d-none');
        businessItemClose.classList.add('d-none');
    }
})

//business hub
businessHubItemsToggle.addEventListener('click', () => {
    businessHubItems.classList.toggle('show-product-menu-items');
    businessItemOpen.classList.toggle('d-none');
    businessItemClose.classList.toggle('d-none');
    if (businessHubItems.style.maxHeight) {
        businessHubItems.style.maxHeight = null;
    } else {
        businessHubItems.style.maxHeight = businessHubItems.scrollHeight + "px";
        productsItems.style.maxHeight = null;
        productItemClose.classList.add('d-none');
        productItemOpen.classList.remove('d-none');
    }
})