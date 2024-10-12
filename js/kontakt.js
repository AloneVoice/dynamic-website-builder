const form = document.getElementById('message_form')

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch('includes/send_message.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Wiadomość została wysłana');
        } else {
            alert('Błąd przy wysyłaniu wiadomości: ' + data.message);
        }
    })
    .catch(error => console.error('Błąd:', error));
})