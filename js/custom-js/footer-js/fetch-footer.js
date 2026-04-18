async function loadIndexFooter() {
    const indexFooter = document.getElementById('index-footer');
    if (!indexFooter) return;

    try {

        const indexFooterFile = await fetch ('/onlineshop/shared-components/footer/footer.html');
        const indexFooterPrint = await indexFooterFile.text();

        indexFooter.innerHTML = indexFooterPrint;
        
    } catch (error) {
    console.error('Failed to load footer:', error);
    indexFooter.innerHTML = '<div style="background:#dc3545;color:white;padding:10px;text-align:center;">Footer failed to load. Please refresh the page.</div>';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadIndexFooter);
} else {
  loadIndexFooter();
}