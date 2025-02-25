document.addEventListener("DOMContentLoaded", function () {
  // Sélection des champs de mot de passe et de l'icône
  const passwordFields = document.querySelectorAll(".password_div");

  passwordFields.forEach((div) => {
    const passwordInput = div.querySelector(".password_input");
    const eyeIcon = div.querySelector("i");

    // Afficher/Masquer le mot de passe au clic sur l'œil
    eyeIcon.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        passwordInput.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });

  // Sélectionner tous les formulaires
  const forms = document.querySelectorAll(".form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêcher la soumission du formulaire

      const emailInput = form.querySelector(".email_input");
      const passwordInput = form.querySelector(".password_input");
      let isValid = true;

      // Effacer les anciens messages d'erreur
      form.querySelectorAll(".error-message").forEach((el) => el.remove());

      // Vérification de l'email
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, "L'email est invalide");
        isValid = false;
      }

      // Vérification du mot de passe
      if (!validatePassword(passwordInput.value)) {
        showError(
          passwordInput,
          "Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre"
        );
        isValid = false;
      }

      // Si tout est valide, soumettre le formulaire
      if (isValid) {
        alert("Formulaire soumis avec succès !");
        form.submit();
      }
    });
  });

  // Fonction pour valider un email avec une regex
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  // Fonction pour valider un mot de passe (au moins 8 caractères, une lettre et un chiffre)
  function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  }

  // Fonction pour afficher un message d'erreur sous le champ
  function showError(input, message) {
    // Vérifier si un message d'erreur existe déjà pour éviter les doublons
    if (
      input.nextElementSibling &&
      input.nextElementSibling.classList.contains("error-message")
    ) {
      return;
    }

    const errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    errorElement.style.color = "red";
    errorElement.style.fontSize = "12px";
    errorElement.textContent = message;

    // Ajouter le message après l'input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }
});
