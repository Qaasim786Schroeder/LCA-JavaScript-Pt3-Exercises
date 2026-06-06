State Arrays Management
let developers = [];
let currentFilterQuery = "";

// Dynamic DOM Interface Selectors
const gridContainer = document.getElementById("grid-container");
const tableContainer = document.getElementById("table-container");
const tableBody = document.getElementById("table-body");
const devCountBadge = document.getElementById("dev-count");
const searchInput = document.getElementById("search-input");
const btnGrid = document.getElementById("btn-grid");
const btnTable = document.getElementById("btn-table");
const addDevForm = document.getElementById("add-developer-form");

// Initialization Orchestrator
document.addEventListener("DOMContentLoaded", () => {
  fetchDevelopers();
  setupEventListeners();
});

// JSON Loader Engine (FIXED PATH TO STEP OUT OF JS FOLDER)
async function fetchDevelopers() {
  try {
    const response = await fetch("../developers.json");
    if (!response.ok) throw new Error("Data retrieval pipeline error.");
    developers = await response.json();
  } catch (error) {
    console.error("Critical JSON loading fail state handler triggered:", error);
  }
  render();
}

// Global Re-render Orchestration Engine
function render() {
  const filtered = developers.filter((dev) => {
    const query = currentFilterQuery.toLowerCase();
    return (
      dev.name.toLowerCase().includes(query) ||
      dev.role.toLowerCase().includes(query) ||
      dev.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  });

  // Sync Count Display Component Live
  devCountBadge.textContent = filtered.length;

  renderGridView(filtered);
  renderTableView(filtered);
}

// Layout Mode Render: Grid Cards System
function renderGridView(data) {
  gridContainer.innerHTML = "";
  if (data.length === 0) {
    gridContainer.innerHTML = `<div class="col-12 text-center my-5 text-muted"><i class="bi bi-exclamation-triangle fs-2 d-block mb-2"></i>No matching developer records found.</div>`;
    return;
  }

  data.forEach((dev) => {
    const cardCol = document.createElement("div");
    cardCol.className = "col";

    const badgeHTML = dev.availableForHire
      ? `<span class="badge bg-success shadow-sm">Available for Hire</span>`
      : `<span class="badge bg-secondary">Unavailable</span>`;

    const skillsHTML = dev.skills
      .map(
        (s) => `<span class="badge bg-dark skill-badge me-1 mb-1">${s}</span>`,
      )
      .join("");

    cardCol.innerHTML = `
            <div class="card h-100 shadow-sm border-0 text-center bg-white developer-card p-3">
                <div class="d-flex justify-content-center my-2">
                    <img src="${dev.avatar}" class="avatar-img shadow-sm" alt="${dev.name}">
                </div>
                <div class="card-body p-2 d-flex flex-column h-100">
                    <h5 class="card-title mb-1 fw-bold text-dark">${dev.name}</h5>
                    <p class="text-primary small mb-1 fw-semibold">${dev.role}</p>
                    <p class="text-muted small mb-3"><i class="bi bi-geo-alt-fill text-danger"></i> ${dev.location}</p>
                    <div class="mb-4 flex-grow-1">${skillsHTML}</div>
                    <div class="mb-3">${badgeHTML}</div>
                    <button class="btn btn-sm btn-outline-secondary w-100 toggle-badge-btn mt-auto" data-id="${dev.id}">
                        <i class="bi bi-arrow-repeat"></i> Toggle Status
                    </button>
                </div>
            </div>
        `;
    gridContainer.appendChild(cardCol);
  });
}

// Layout Mode Render: Direct Inline Table Layout Row Injection
function renderTableView(data) {
  tableBody.innerHTML = "";
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4"><i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>No matching developer records found.</td></tr>`;
    return;
  }

  data.forEach((dev) => {
    const tr = document.createElement("tr");
    const badgeHTML = dev.availableForHire
      ? `<span class="badge bg-success px-2 py-1">Available</span>`
      : `<span class="badge bg-secondary px-2 py-1">Unavailable</span>`;

    tr.innerHTML = `
            <td class="ps-3"><img src="${dev.avatar}" class="table-avatar border" alt=""></td>
            <td class="fw-bold text-dark">${dev.name}</td>
            <td class="text-secondary small fw-medium">${dev.role}</td>
            <td class="text-muted small"><i class="bi bi-geo-alt"></i> ${dev.location}</td>
            <td>${dev.skills.map((s) => `<span class="badge bg-dark me-1 small">${s}</span>`).join("")}</td>
            <td>${badgeHTML}</td>
            <td class="text-center">
                <button class="btn btn-outline-secondary btn-sm toggle-badge-btn px-2 py-0" data-id="${dev.id}">
                    <i class="bi bi-arrow-repeat"></i> Toggle
                </button>
            </td>
        `;
    tableBody.appendChild(tr);
  });
}

// Global Event Registration Interlock
function setupEventListeners() {
  // Search Controller Event Input Binding
  searchInput.addEventListener("input", (e) => {
    currentFilterQuery = e.target.value;
    render();
  });

  // Grid System Interface Switch Click Handler
  btnGrid.addEventListener("click", () => {
    btnGrid.classList.add("active");
    btnTable.classList.remove("active");
    gridContainer.classList.remove("d-none");
    tableContainer.classList.add("d-none");
  });

  // Table Matrix Interface Switch Click Handler
  btnTable.addEventListener("click", () => {
    btnTable.classList.add("active");
    btnGrid.classList.remove("active");
    gridContainer.classList.add("d-none");
    tableContainer.classList.remove("d-none");
  });

  // Availability Toggle Badge Event Delegation Hook
  document.addEventListener("click", (e) => {
    if (e.target && e.target.closest(".toggle-badge-btn")) {
      const targetBtn = e.target.closest(".toggle-badge-btn");
      const devId = parseInt(targetBtn.getAttribute("data-id"));
      toggleDeveloperAvailability(devId);
    }
  });

  // Modal Form Appends Data Submittals Handler Logic
  addDevForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!addDevForm.checkValidity()) {
      e.stopPropagation();
      addDevForm.classList.add("was-validated");
      return;
    }

    // Process Values from form input
    const nameInput = document.getElementById("dev-name").value.trim();
    const roleInput = document.getElementById("dev-role").value.trim();
    const locationInput = document.getElementById("dev-location").value.trim();
    const skillsInput = document
      .getElementById("dev-skills")
      .value.split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    const availableInput = document.getElementById("dev-available").checked;

    // Construct unique payload
    const newDeveloper = {
      id: Date.now(),
      name: nameInput,
      role: roleInput,
      skills: skillsInput,
      avatar: "https://placehold.co/100x100/7F7F7F/ffffff",
      availableForHire: availableInput,
      location: locationInput,
    };

    // Prepend object up to state data, then refresh view
    developers.unshift(newDeveloper);
    render();

    // Dismiss Modal Window Actions cleanly
    addDevForm.reset();
    addDevForm.classList.remove("was-validated");
    const modalEl = document.getElementById("addDevModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
  });
}

// Toggle availability business state modifier function
function toggleDeveloperAvailability(id) {
  developers = developers.map((dev) => {
    if (dev.id === id) {
      return { ...dev, availableForHire: !dev.availableForHire };
    }
    return dev;
  });
  render();
}
