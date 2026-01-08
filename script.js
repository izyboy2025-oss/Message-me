// Updated with your new credentials
const BOT_TOKEN = '7698861947:AAHD_0sTzjMlHpW3sFPDEHUMv8-srBmR2k8';
const CHAT_ID = '7906406053';

const msgInput = document.getElementById('msg');
const charCount = document.getElementById('charCount');
const errorMsg = document.getElementById('error-msg');

// Update character counter in real-time
msgInput.addEventListener('input', () => {
    charCount.innerText = msgInput.value.length;
    if (msgInput.value.trim().length > 0) {
        errorMsg.style.display = 'none';
    }
});

async function sendSecret() {
    const text = msgInput.value.trim();
    const name = document.getElementById('userName').value.trim() || "Anonymous";
    const btn = document.getElementById('sendBtn');

    if (!text) {
        errorMsg.style.display = 'block';
        return;
    }

    // Visual feedback for the user
    btn.disabled = true;
    btn.innerText = "Securing...";

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `🔮 *New Secret Drop!*\n\n*From:* ${name}\n*Message:* "${text}"`,
                parse_mode: "Markdown"
            })
        });

        if (response.ok) {
            // Hides the input form
            document.getElementById('form-ui').style.display = 'none';
            
            // Shows the success state
            document.getElementById('success-state').style.display = 'block';
            
            // HIDES THE FOOTER (WhatsApp link) on success
            const footer = document.getElementById('footer-section');
            if(footer) {
                footer.style.display = 'none';
            }
        } else {
            throw new Error('Telegram API error');
        }
    } catch (error) {
        // Reset button if there is an error
        btn.disabled = false;
        btn.innerText = "Send Message";
        alert("Transmission error. Please check your connection.");
    }
}
