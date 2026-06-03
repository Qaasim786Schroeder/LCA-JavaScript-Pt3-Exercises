// ==========================================
// Task 1: DOM Element Selection
// ==========================================
const profileCard = document.getElementById("profileCard");
const profileImage = document.getElementById("profileImage");
const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");

const updateNameBtn = document.getElementById("updateNameBtn");
const updateRoleBtn = document.getElementById("updateRoleBtn");
const toggleStatusBtn = document.getElementById("toggleStatusBtn");
const changeImageBtn = document.getElementById("changeImageBtn");

// ==========================================
// Task 2: Update Name and Role
// ==========================================

// Listen for click to update name
updateNameBtn.addEventListener("click", () => {
  const newName = prompt("Enter a new profile name:");
  // Check if user entered text and didn't just hit cancel or leave it empty
  if (newName && newName.trim() !== "") {
    profileName.textContent = newName.trim();
  }
});

// Listen for click to update role
updateRoleBtn.addEventListener("click", () => {
  const newRole = prompt("Enter a new profile role:");
  if (newRole && newRole.trim() !== "") {
    profileRole.textContent = newRole.trim();
  }
});

// ==========================================
// Task 3: Toggle Active Status
// ==========================================
toggleStatusBtn.addEventListener("click", () => {
  profileCard.classList.toggle("active-status");
});

// ==========================================
// Task 4: Change Profile Image (Bonus)
// ==========================================
changeImageBtn.addEventListener("click", () => {
  const newImageUrl = prompt(
    "Enter a new image URL:",
    "https://placehold.co/100x100",
  );
  if (newImageUrl && newImageUrl.trim() !== "") {
    profileImage.setAttribute("src", newImageUrl.trim());
  }
});
