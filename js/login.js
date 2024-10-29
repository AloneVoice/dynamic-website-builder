document.getElementById('login_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const message = document.getElementById('login-message');
    
    // Walidacja emaila i hasła
    if (!email.includes('@') || password.length < 6) {
        message.textContent = "Please enter a valid email and a password of at least 6 characters.";
        return;
    }
    
    const formData = new FormData(e.target);
    const response = await fetch('includes/login.php', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();

    if (result.success) {
        message.textContent = "Login successful! Redirecting...";
        setTimeout(() => window.location.href = 'home', 1500);
    } else {
        message.textContent = "Invalid email or password. Please try again.";
    }
});
