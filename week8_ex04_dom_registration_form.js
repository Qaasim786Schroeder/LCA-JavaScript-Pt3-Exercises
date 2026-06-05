// Task 2: Listen for the submit event on the registrationForm
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission (page reload)
    event.preventDefault();

    // Fetching input elements
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Fetching error message container elements
    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError",
    );
    const formMessage = document.getElementById("formMessage");

    // Task 3 & 4: Clear any previous error messages, styles, and success messages
    const inputs = [
      usernameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    ];
    const errors = [
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    ];

    errors.forEach((errorDiv) => (errorDiv.textContent = ""));
    inputs.forEach((inputEl) => (inputEl.style.border = "1px solid #ccc"));
    formMessage.textContent = "";
    formMessage.className = ""; // Remove success styling class

    // Validation tracking flag
    let isValid = true;

    // --- Task 3: Validation Checks ---

    // 1. Username Validation
    if (usernameInput.value.trim() === "") {
      usernameError.textContent = "Username cannot be empty.";
      usernameInput.style.border = "2px solid red";
      isValid = false;
    } else {
      usernameInput.style.border = "2px solid green";
    }

    // 2. Email Validation
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Email cannot be empty.";
      emailInput.style.border = "2px solid red";
      isValid = false;
    } else if (!emailInput.value.includes("@")) {
      emailError.textContent = 'Email must contain an "@" symbol.';
      emailInput.style.border = "2px solid red";
      isValid = false;
    } else {
      emailInput.style.border = "2px solid green";
    }

    // 3. Password Validation
    if (passwordInput.value.trim() === "") {
      passwordError.textContent = "Password cannot be empty.";
      passwordInput.style.border = "2px solid red";
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent =
        "Password must be at least 6 characters long.";
      passwordInput.style.border = "2px solid red";
      isValid = false;
    } else {
      passwordInput.style.border = "2px solid green";
    }

    // 4. Confirm Password Validation
    if (confirmPasswordInput.value.trim() === "") {
      confirmPasswordError.textContent = "Please confirm your password.";
      confirmPasswordInput.style.border = "2px solid red";
      isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match.";
      confirmPasswordInput.style.border = "2px solid red";
      isValid = false;
    } else {
      confirmPasswordInput.style.border = "2px solid green";
    }

    // --- Task 4: Success Action ---
    if (isValid) {
      // Display success message
      formMessage.textContent = "Registration successful!";
      formMessage.classList.add("success");

      // Log collected form data to the console
      console.log("--- Form Submission Data ---");
      console.log("Username:", usernameInput.value.trim());
      console.log("Email:", emailInput.value.trim());
    }
  });
