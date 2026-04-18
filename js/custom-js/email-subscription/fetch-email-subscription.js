async function loadEmailSubForm() {
    const emailSubscribe = document.getElementById('email-subscribe');
    if(!emailSubscribe) return;
    try{
        
    const emailFormFile = await fetch ('/onlineshop/shared-components/subscribe-to-our-email/email-subscription.html');
    const emailForm = await emailFormFile.text();
    
    emailSubscribe.innerHTML = emailForm;
    
    const emailSub = document.getElementById('email-sub');
    if (emailSub) { emailSub.addEventListener('submit', async (e) => {
    e.preventDefault();

        const isValid = await validateEmailInput();
        if (!isValid) return;

        const input = document.getElementById('input');
        const errorMsg = document.getElementById('error-msg');

        const result = await sendEmailToServer(input.value);
        console.log('Result: ', result);

        errorMsg.textContent = result.message;

        if (result.status === "success") {
            errorMsg.style.color = "green";
            errorMsg.style.padding = "10px 20px";
            errorMsg.style.background = "#e0f7ed";
            input.value = '';
        } else if (result.status === "info") {
            errorMsg.style.color = "blue";
            errorMsg.style.padding = "10px 20px";
            errorMsg.style.background = "#caeff7";
        } else {
            errorMsg.style.color = "red";
            errorMsg.style.padding = "10px 20px";
            errorMsg.style.background = "#ffe9eb";
        }
    });
    }

}  catch (error) {
    console.error('Failed to load Subscription Form:', error);
    loadEmailSubForm.innerHTML = '<div style="background:#dc3545;color:white;padding:10px;text-align:center;">Subscription form failed to load. Please refresh the page.</div>';
  }

}
function validateEmailInput() {
    const errorMsg = document.getElementById('error-msg');
    const input = document.getElementById('input');
        if (!input || !errorMsg) return;
    if (input.value.trim() === '') {
        errorMsg.textContent = 'Enter a valid email address';
        errorMsg.style.color = "red";
            errorMsg.style.padding = "10px 20px";
            errorMsg.style.background = "#ffe9eb";
        return false;        
    }
    errorMsg.textContent = '';
    return true;
}

async function sendEmailToServer(email) {
    const response = await fetch('/onlineshop/database/subscribe.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`
    });
    return await response.json();
}



if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadEmailSubForm);
} else {
  loadEmailSubForm();
}