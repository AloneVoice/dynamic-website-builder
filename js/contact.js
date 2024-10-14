if (typeof form === "undefined") {
  const form = document.getElementById("message_form");
  const alert = document.getElementById("messageAlert");
  const alertText = alert.querySelector("h2");
  const alertClose = alert.querySelector("span");

  let formSubmitted = false; // Flaga oznaczająca, czy formularz został kliknięty

  // Funkcja walidacji dla poszczególnych pól
  const validateField = (field, condition, errorMessage) => {
    const errorSpan = field.nextElementSibling;
    if (condition) {
      errorSpan.textContent = "";
      return true;
    } else {
      if (formSubmitted) {
        errorSpan.textContent = errorMessage;
      }
      return false;
    }
  };

  // Funkcja walidacji całego formularza
  const validateForm = () => {
    let isValid = true;

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    // Walidacja pola Name
    isValid =
      validateField(
        name,
        name.value.trim().length >= 3,
        "Name must be at least 3 characters."
      ) && isValid;

    // Walidacja pola Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid =
      validateField(
        email,
        emailPattern.test(email.value.trim()),
        "Please enter a valid email address."
      ) && isValid;

    // Walidacja pola Message
    isValid =
      validateField(
        message,
        message.value.trim().length >= 10,
        "Message must be at least 10 characters."
      ) && isValid;

    return isValid;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formSubmitted = true; // Oznacz, że formularz został kliknięty
    if (validateForm()) {
      const formData = new FormData(form);

      fetch("includes/send_message.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alertText.textContent = "Wiadomość została wysłana.";
            alert.classList.remove("hide");
            form.reset()
          } else {
            alertText.textContent = `Błąd przy wysyłaniu wiadomości: ${data.message}`;
            alert.classList.remove("hide");
          }
        })
        .catch((error) => console.error("Błąd:", error));
    }
  });

  // Walidacja w czasie rzeczywistym per pole
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      // Sprawdzaj walidację dla każdego pola
      if (formSubmitted) {
        if (field.id === "name") {
          validateField(
            field,
            field.value.trim().length >= 3,
            "Name must be at least 3 characters."
          );
        } else if (field.id === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          validateField(
            field,
            emailPattern.test(field.value.trim()),
            "Please enter a valid email address."
          );
        } else if (field.id === "message") {
          validateField(
            field,
            field.value.trim().length >= 10,
            "Message must be at least 10 characters."
          );
        }
      }
    });
  });
  alertClose.addEventListener("click", ()=> {
    alert.classList.add('hide')
  })
}
