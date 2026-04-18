async function loadNavbar() {
  const navigationBar = document.getElementById('navigationBar');
  if (!navigationBar) return;

  try {
    const loadNavbarFile = await fetch('/onlineshop/shared-components/navbar/navbar.html');
    
    if (!loadNavbarFile.ok) {
      throw new Error(`HTTP ${loadNavbarFile.status}: Navbar not found`);
    }

    const navigationBarPrint = await loadNavbarFile.text();
    navigationBar.innerHTML = navigationBarPrint;
    
    attachNavbarEventListeners();
    
  } catch (error) {
    console.error('Failed to load navbar:', error);
    navigationBar.innerHTML = '<div style="background:#dc3545;color:white;padding:10px;text-align:center;">Navbar failed to load. Please refresh the page.</div>';
  }
}


function attachNavbarEventListeners() {
  // Get all elements
  const mobileToggle = document.getElementById('mobileToggle');
  const openMenu = document.getElementById('open-menu');
  const closeMenu = document.getElementById('close-menu');
  const mobileMenuList = document.getElementById('mobileMenuList');
  const productsMenu = document.getElementById('productsMenu');
  const businessMenu = document.getElementById('businessMenu');
  const productsBtn = document.getElementById('productsBtn');
  const businessBtn = document.getElementById('businessBtn');
  const backBtns = document.querySelectorAll('.back-buttons');
  const subMenus = document.querySelectorAll('.submenu');
  
  // Products submenu buttons
  const showLaptops = document.getElementById('showLaptops');
  const laptopsMenu = document.getElementById('laptopsMenu');
  const showComputers = document.getElementById('showComputers');
  const computersMenu = document.getElementById('computersMenu');
  const showPrinters = document.getElementById('showPrinters');
  const printersMenu = document.getElementById('printersMenu');
  const showSmartHome = document.getElementById('showSmartHome');
  const smartHomeMenu = document.getElementById('smartHomeMenu');
  const showPhones = document.getElementById('showPhones');
  const phonesMenu = document.getElementById('phonesMenu');
  const showCamera = document.getElementById('showCamera');
  const cameraMenu = document.getElementById('cameraMenu');
  const showAudio = document.getElementById('showAudio');
  const audioMenu = document.getElementById('audioMenu');
  const showOfficeEquipments = document.getElementById('showOfficeEquipments');
  const officeEquipmentsMenu = document.getElementById('officeEquipmentsMenu');
  const showVideoGame = document.getElementById('showVideoGame');
  const videoGamesMenu = document.getElementById('videoGamesMenu');
  const showNetwork = document.getElementById('showNetwork');
  const internetMenu = document.getElementById('internetMenu');
  const showPower = document.getElementById('showPower');
  const powerMenu = document.getElementById('powerMenu');
  const showHeadphones = document.getElementById('showHeadphones');
  const headphonesMenu = document.getElementById('headphonesMenu');
  const showTelevision = document.getElementById('showTelevision');
  const televisionMenu = document.getElementById('televisionMenu');
  const showVpn = document.getElementById('show-vpn');
  const vpnMenu = document.getElementById('vpn-menu');
  const productBackBtn = document.querySelectorAll('.product-back-btn');

  //business hub
  const industryMenu = document.getElementById('industryMenu');
  const trainingMenu = document.getElementById('trainingMenu');
  const resourceMenu = document.getElementById('resourceMenu');
  const partnerStory = document.getElementById('partnerStory');
  const updateMenu = document.getElementById('updateMenu');
  const storyMenu = document.getElementById('storyMenu');
  const saleMenu = document.getElementById('saleMenu');
  const regMenu = document.getElementById('regMenu');
  const guideMenu = document.getElementById('guideMenu');
  const enterpriseMenu = document.getElementById('enterpriseMenu');
  const softwareMenu = document.getElementById('softwareMenu');

  const industryView = document.getElementById('industryView');
  const trainingView = document.getElementById('trainingView');
  const resourceView = document.getElementById('resourceView');
  const partnerView = document.getElementById('partnerView');
  const updateView = document.getElementById('update-view');
  const successView = document.getElementById('success-view');
  const saleView = document.getElementById('sale-view');
  const regView = document.getElementById('reg-view');
  const guideView = document.getElementById('guide-view');
  const enterpriseView = document.getElementById('enterpriseView')
  const softwareView = document.getElementById('softwareView');



  // Early returns for critical elements
  if (!mobileToggle || !mobileMenuList || !openMenu || !closeMenu) return;
  if (!productsBtn || !productsMenu) return;
  if (!businessBtn || !businessMenu) return;
  
  const hasLaptopElements = showLaptops && laptopsMenu;
  const hasComputerElements = showComputers && computersMenu;
  const hasPrinterElements = showPrinters && printersMenu;
  const hasSmartHomeElements = showSmartHome && smartHomeMenu;
  const hasPhoneElements = showPhones && phonesMenu;
  const hasCameraElements = showCamera && cameraMenu;
  const hasAudioElements = showAudio && audioMenu;
  const hasOfficeElements = showOfficeEquipments && officeEquipmentsMenu;
  const hasVideoGameElements = showVideoGame && videoGamesMenu;
  const hasNetworkElements = showNetwork && internetMenu;
  const hasPowerElements = showPower && powerMenu;
  const hasHeadphoneElements = showHeadphones && headphonesMenu;
  const hasTelevisionElements = showTelevision && televisionMenu;
  const hasVpnElements = showVpn && vpnMenu;
  // business hub
  const hasIndustryElement = industryMenu && industryView;
  const hasTrainElement = trainingMenu && trainingView;
  const hasResourceElement = resourceMenu && resourceView;
  const hasPartnerStryElement = partnerStory && partnerView;
  const hasUpdateElement = updateMenu && updateView;
  const hasStoryElement = storyMenu && successView;
  const hasSaleElement = saleMenu && saleView;
  const hasRegElement = regMenu && regView;
  const hasGuideElement = guideMenu && guideView;
  const hasEnterpriseElement = enterpriseMenu && enterpriseView;
  const hasSoftElement = softwareMenu && softwareView;


  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileMenuList.classList.contains('show-mobile');
    if (isOpen) {
      mobileMenuList.classList.remove('show-mobile');
      mobileMenuList.classList.remove('menu-exit');
      subMenus.forEach(sub => sub?.classList.remove('show-mobile'));
      openMenu.classList.remove('d-none');
      closeMenu.classList.add('d-none');
      takeBackToSubmenu();
    } else {
      goBack();
      mobileMenuList.classList.add('show-mobile');
      openMenu.classList.add('d-none');
      closeMenu.classList.remove('d-none');
    }
  });

  // Products button
  productsBtn.addEventListener('click', () => {
    mobileMenuList.classList.add('menu-exit');
    productsMenu.classList.add('show-mobile');
  });

  // Business button
  businessBtn.addEventListener('click', () => {
    mobileMenuList.classList.add('menu-exit');
    businessMenu.classList.add('show-mobile');
  });

  
  if (hasLaptopElements) showLaptops.addEventListener('click', () => laptopsMenu.classList.add('show-mobile'));
  if (hasComputerElements) showComputers.addEventListener('click', () => computersMenu.classList.add('show-mobile'));
  if (hasPrinterElements) showPrinters.addEventListener('click', () => printersMenu.classList.add('show-mobile'));
  if (hasSmartHomeElements) showSmartHome.addEventListener('click', () => smartHomeMenu.classList.add('show-mobile'));
  if (hasPhoneElements) showPhones.addEventListener('click', () => phonesMenu.classList.add('show-mobile'));
  if (hasCameraElements) showCamera.addEventListener('click', () => cameraMenu.classList.add('show-mobile'));
  if (hasAudioElements) showAudio.addEventListener('click', () => audioMenu.classList.add('show-mobile'));
  if (hasOfficeElements) showOfficeEquipments.addEventListener('click', () => officeEquipmentsMenu.classList.add('show-mobile'));
  if (hasVideoGameElements) showVideoGame.addEventListener('click', () => videoGamesMenu.classList.add('show-mobile'));
  if (hasNetworkElements) showNetwork.addEventListener('click', () => internetMenu.classList.add('show-mobile'));
  if (hasPowerElements) showPower.addEventListener('click', () => powerMenu.classList.add('show-mobile'));
  if (hasHeadphoneElements) showHeadphones.addEventListener('click', () => headphonesMenu.classList.add('show-mobile'));
  if (hasTelevisionElements) showTelevision.addEventListener('click', () => televisionMenu.classList.add('show-mobile'));
  if (hasVpnElements) showVpn.addEventListener('click', () => vpnMenu.classList.add('show-mobile'));
  // business hub
  if (hasIndustryElement) industryMenu.addEventListener('click', () => industryView.classList.add('show-mobile'));
  if (hasTrainElement) trainingMenu.addEventListener('click', () => trainingView.classList.add('show-mobile'));
  if (hasResourceElement) resourceMenu.addEventListener('click', () => resourceView.classList.add('show-mobile'));
  if (hasPartnerStryElement) partnerStory.addEventListener('click', () => partnerView.classList.add('show-mobile'));
  if (hasUpdateElement) updateMenu.addEventListener('click', () => updateView.classList.add('show-mobile'));
  if (hasStoryElement) storyMenu.addEventListener('click', () => successView.classList.add('show-mobile'));
  if (hasSaleElement) saleMenu.addEventListener('click', () => saleView.classList.add('show-mobile'));
  if (hasRegElement) regMenu.addEventListener('click', () => regView.classList.add('show-mobile'));
  if (hasGuideElement) guideMenu.addEventListener('click', () => guideView.classList.add('show-mobile'));
  if (hasEnterpriseElement) enterpriseMenu.addEventListener('click', () => enterpriseView.classList.add('show-mobile'));
  if (hasSoftElement) softwareMenu.addEventListener('click', () => softwareView.classList.add('show-mobile'));

  // Back buttons
  if (backBtns && backBtns.length > 0) {
    backBtns.forEach(goBackBtn => {
      goBackBtn.addEventListener('click', goBack);
    });
  }

  // Product back buttons
  if (productBackBtn && productBackBtn.length > 0) {
    productBackBtn.forEach(backToSubmenu => {
      backToSubmenu.addEventListener('click', takeBackToSubmenu);
    });
  }

  
  function goBack() {
    if (mobileMenuList) mobileMenuList.classList.remove('menu-exit');
    if (productsMenu) productsMenu.classList.remove('show-mobile');
    if (businessMenu) businessMenu.classList.remove('show-mobile');
  }

  function takeBackToSubmenu() {
    if (hasLaptopElements) laptopsMenu.classList.remove('show-mobile');
    if (hasComputerElements) computersMenu.classList.remove('show-mobile');
    if (hasPrinterElements) printersMenu.classList.remove('show-mobile');
    if (hasSmartHomeElements) smartHomeMenu.classList.remove('show-mobile');
    if (hasPhoneElements) phonesMenu.classList.remove('show-mobile');
    if (hasCameraElements) cameraMenu.classList.remove('show-mobile');
    if (hasAudioElements) audioMenu.classList.remove('show-mobile');
    if (hasOfficeElements) officeEquipmentsMenu.classList.remove('show-mobile');
    if (hasVideoGameElements) videoGamesMenu.classList.remove('show-mobile');
    if (hasNetworkElements) internetMenu.classList.remove('show-mobile');
    if (hasPowerElements) powerMenu.classList.remove('show-mobile');
    if (hasHeadphoneElements) headphonesMenu.classList.remove('show-mobile');
    if (hasTelevisionElements) televisionMenu.classList.remove('show-mobile');
    if (hasVpnElements) vpnMenu.classList.remove('show-mobile');
    // business hub
    if (hasIndustryElement) industryView.classList.remove('show-mobile');
    if (hasTrainElement) trainingView.classList.remove('show-mobile');
    if (hasResourceElement) resourceView.classList.remove('show-mobile');
    if (hasPartnerStryElement) partnerView.classList.remove('show-mobile');
    if (hasUpdateElement) updateView.classList.remove('show-mobile');
    if (hasStoryElement) successView.classList.remove('show-mobile');
    if (hasSaleElement) saleView.classList.remove('show-mobile');
    if (hasRegElement) regView.classList.remove('show-mobile');
    if (hasGuideElement) guideView.classList.remove('show-mobile');
    if (hasEnterpriseElement) enterpriseView.classList.remove('show-mobile');
    if (hasSoftElement) softwareView.classList.remove('show-mobile');
  }
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
  loadNavbar();
}