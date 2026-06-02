// DOM Element Selectors
const generateButton = document.getElementById("generateButton");
const resetButton = document.getElementById("resetButton");
const spellArea = document.getElementById("spellArea");
const ingredientsList = document
  .getElementById("ingredientsList")
  .getElementsByTagName("li");

let countdownTimer = null; // Tracks timer state to prevent overlaps

/**
 * Helper function to generate a random hex color string
 * @returns {string} Hex color (e.g., #A34E8F)
 */
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// "Generate Spell" Event Listener with Countdown
generateButton.addEventListener("click", () => {
  // Clear any active running countdown loops
  clearInterval(countdownTimer);

  let countdownValue = 3;
  spellArea.textContent = countdownValue;
  spellArea.style.backgroundColor = "transparent"; // Clean look while counting down

  // Setup 1-second interval sequence
  countdownTimer = setInterval(() => {
    countdownValue--;

    if (countdownValue > 0) {
      spellArea.textContent = countdownValue;
    } else {
      // Stop timer when countdown completes
      clearInterval(countdownTimer);

      // Randomly pick a spell item
      const randomIndex = Math.floor(Math.random() * ingredientsList.length);
      const chosenIngredient = ingredientsList[randomIndex].textContent;

      // Render text output and colorful magical canvas background
      spellArea.textContent = `✨ Casted Spell with: ${chosenIngredient}! ✨`;
      spellArea.style.backgroundColor = getRandomColor();
    }
  }, 1000);
});

// "Reset" Event Listener
resetButton.addEventListener("click", () => {
  clearInterval(countdownTimer); // Stop countdown if running midway
  spellArea.textContent = ""; // Clear display area text
  spellArea.style.backgroundColor = "transparent"; // Remove background color state
});
