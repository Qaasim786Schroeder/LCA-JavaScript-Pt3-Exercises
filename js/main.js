// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // PART 1: Login Page Functionality
  // ==========================================
  const loginForm = document.getElementById("loginForm");
  const loginModal = document.getElementById("loginModal");
  const tryAgainBtn = document.getElementById("tryAgainBtn");

  // Event listener for form submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Stop the form from refreshing the page
      validateLogin();
    });
  }

  // Event listener to dismiss the modal
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener("click", dismissModal);
  }

  // Function to validate credentials
  function validateLogin() {
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const correctUsername = "admin";
    const correctPassword = "password123";

    if (
      usernameInput === correctUsername &&
      passwordInput === correctPassword
    ) {
      // Success: Redirect to home page
      window.location.href = "index.html";
    } else {
      // Bonus Challenge: Console log for debugging
      console.log("Invalid credentials");

      // Failure: Show error modal
      if (loginModal) {
        loginModal.style.display = "block";
      }
    }
  }

  // Function to hide the modal
  function dismissModal() {
    if (loginModal) {
      loginModal.style.display = "none";
    }
  }

  // ==========================================
  // PART 2: Home Page Navigation Toggle
  // ==========================================
  const menuToggleBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener("click", toggleNav);
  }

  // Function to toggle sidebar width
  function toggleNav() {
    if (sidebar.style.width === "250px") {
      sidebar.style.width = "0px";
    } else {
      sidebar.style.width = "250px";
    }
  }
});
