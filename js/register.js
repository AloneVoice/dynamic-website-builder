document.getElementById('register_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirm_password.value.trim();
    const message = document.getElementById('register-message');
    
    // Walidacja danych
    if (!email.includes('@')) {
        message.textContent = "Please enter a valid email.";
        return;
    }
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }
    
    const formData = new FormData(e.target);
    const response = await fetch('includes/register.php', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();

    if (result.success) {
        message.textContent = "Registration successful! Check your email to activate your account.";
    } else {
        message.textContent = "Registration failed. Please try again.";
    }
});
