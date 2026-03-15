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

    // search bar
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

    //tablet search bar
    const $willyTabletSearchBar = document.getElementById('willy-tablet-search-bar');
    const $willyTabletClearButton = document.getElementById('willy-tablet-clear-button');

        $willyTabletSearchBar.addEventListener('input', (event2) => {
        if (event2.target.value.trim() !== "") {
            $willyTabletClearButton.classList.remove('d-none');
        } else {
            $willyTabletClearButton.classList.add('d-none');
        }
    })

    $willyTabletClearButton.addEventListener('click', () => {
        $willyTabletSearchBar.value = "";
        $willyTabletSearchBar.focus();
        $willyTabletClearButton.classList.add('d-none');
    })