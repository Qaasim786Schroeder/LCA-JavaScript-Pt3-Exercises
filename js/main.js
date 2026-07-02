// =========================================================================
// PART 1: LOGIN PAGE FUNCTIONALITY
// =========================================================================

// Get references to login elements
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorModal = document.getElementById("loginModal");
const tryAgainBtn = document.getElementById("tryAgainBtn");

/**
 * Validates the admin credentials and redirects or triggers the error modal.
 */
function validateLogin(event) {
  event.preventDefault(); // Prevents the form from refreshing the page

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Check credentials against assignment rules
  if (username === "admin" && password === "password123") {
    window.location.href = "index.html";
  } else {
    console.log("Invalid credentials");
    if (errorModal) {
      errorModal.style.display = "block"; // Show the error modal
    }
  }
}

/**
 * Hides the error modal when the user dismisses it.
 */
function dismissModal() {
  if (errorModal) {
    errorModal.style.display = "none"; // Hide the error modal
  }
}

// Attach Login Event Listeners safely if elements are present on current page
if (loginForm) {
  loginForm.addEventListener("submit", validateLogin);
}
if (tryAgainBtn) {
  tryAgainBtn.addEventListener("click", dismissModal);
}

// =========================================================================
// PART 2: HOME PAGE NAVIGATION TOGGLE
// =========================================================================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

/**
 * Toggles the visibility of the sidebar menu using a CSS class.
 */
function toggleNav() {
  if (sidebar) {
    sidebar.classList.toggle("collapsed");
  }
}

// Attach Navigation Event Listener safely if elements are present on current page
if (menuToggle) {
  menuToggle.addEventListener("click", toggleNav);
}
