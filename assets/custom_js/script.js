//mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const willyMobileNavbar = document.getElementById('willyMobileNavbar')

//mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        openMenu.classList.toggle('d-none');
        closeMenu.classList.toggle('d-none');
        willyMobileNavbar.classList.toggle('show-mobile')
    });
