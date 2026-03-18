   //mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const willyMobileNavbar = document.getElementById('willyMobileNavbar');

    //mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        openMenu.classList.toggle('d-none');
        closeMenu.classList.toggle('d-none');
        willyMobileNavbar.classList.toggle('show-mobile')
    });
    //clear search bar
    const $willySearchBar = document.getElementById('willy-search-bar');
    const $willyClearButton = document.getElementById('willy-clear-button');

    $willySearchBar.addEventListener('input', (event1) => {
        if (event1.target.value.trim() !== "") {
            $willyClearButton.classList.remove('d-none');
        } else {
            $willyClearButton.classList.add('d-none');
        }
    })

    $willyClearButton.addEventListener('click', () => {
        $willySearchBar.value = "";
        $willySearchBar.focus();
        $willyClearButton.classList.add('d-none');
    })
    //mobile search functionality
    const mobileWillySearch = document.getElementById('mobile-willy-search');
    const searchBoxMobile = document.getElementById('search-box-mobile');
    const removeMobSearch = document.getElementById('remove-mob-search');
    searchBoxMobile.addEventListener('click', () => {
        mobileWillySearch.classList.add('mobile-search-fn');
        searchBoxMobile.classList.add('remove-mob-search-ico');
    })
    //removw mobile swarch bar
    removeMobSearch.addEventListener('click', () => {
    searchBoxMobile.classList.remove('remove-mob-search-ico');
    mobileWillySearch.classList.remove('mobile-search-fn');
    
})
