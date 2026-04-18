async function loadWillyandSonsPartners() {
    const willyandSonsPartners = document.getElementById('partners');
    if (!willyandSonsPartners) return;

        try {
            const willyandSonsPartnersFile = await fetch ('/onlineshop/shared-components/partners/partners.html');
            const willyandSonsPartnersPrint = await willyandSonsPartnersFile.text();
            willyandSonsPartners.innerHTML = willyandSonsPartnersPrint;

            const partnersSwiper = new Swiper('.partners-swiper-unique', {
            slidesPerView: 5,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            speed: 2000,
            breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 15 },
                576: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 25 },
                992: { slidesPerView: 5, spaceBetween: 30 },
                },
            });
        
    } catch (error) {
    console.error('Failed to load footer:', error);
    willyandSonsPartners.innerHTML = '<div style="background:#dc3545;color:white;padding:10px;text-align:center;">Partners failed to load. Please refresh the page.</div>';
  }

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadWillyandSonsPartners);
} else {
  loadWillyandSonsPartners();
}