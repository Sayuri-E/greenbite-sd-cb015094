// --- STEP 1: Select the form and results section ---
const form = document.getElementById("calcForm"); // Our calculator form
const resultsDiv = document.getElementById("results"); // Div where results are shown

// --- STEP 2: Select result elements where values will be displayed ---
const bmrSpan = document.getElementById("bmr"); // <span> for BMR value
const tdeeSpan = document.getElementById("tdee"); // <span> for TDEE value
const carbsSpan = document.getElementById("carbs"); // <span> for Carbs (g)
const proteinSpan = document.getElementById("protein"); // <span> for Protein (g)
const fatSpan = document.getElementById("fat"); // <span> for Fat (g)

// --- STEP 3: Select progress bars for macros ---
const carbBar = document.getElementById("carbBar");
const proteinBar = document.getElementById("proteinBar");
const fatBar = document.getElementById("fatBar");

// --- STEP 4: Add event listener for form submission ---
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop page from reloading when clicking "Calculate"

  // --- STEP 5: Get user input values from form ---
  const age = parseInt(form.age.value); // Age in years
  const gender = form.gender.value; // Male or Female
  const height = parseFloat(form.height.value); // Height in cm
  const weight = parseFloat(form.weight.value); // Weight in kg
  const activity = parseFloat(form.activity.value); // Activity multiplier

  // --- STEP 6: Calculate BMR (Basal Metabolic Rate) ---
  let bmr;
  if (gender === "male") {
    // Formula for males
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    // Formula for females
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // --- STEP 7: Calculate TDEE (Total Daily Energy Expenditure) ---
  const tdee = bmr * activity; // BMR multiplied by activity factor

  // --- STEP 8: Calculate Macronutrients in grams ---
  // Carbs: 50% of TDEE, 4 kcal per gram
  const carbs = (tdee * 0.5) / 4;
  // Protein: 20% of TDEE, 4 kcal per gram
  const protein = (tdee * 0.2) / 4;
  // Fat: 30% of TDEE, 9 kcal per gram
  const fat = (tdee * 0.3) / 9;

  // --- STEP 9: Display the results on the page ---
  resultsDiv.style.display = "block"; // Show results section
  bmrSpan.textContent = bmr.toFixed(0); // Round to nearest whole number
  tdeeSpan.textContent = tdee.toFixed(0);
  carbsSpan.textContent = carbs.toFixed(0);
  proteinSpan.textContent = protein.toFixed(0);
  fatSpan.textContent = fat.toFixed(0);

  // --- STEP 10: Animate Progress Bars ---
  // These widths represent the macro ratio (50%, 20%, 30%)
  carbBar.style.width = "0%";
  proteinBar.style.width = "0%";
  fatBar.style.width = "0%";
});

setTimeout(() => {
  carbBar.style.width = "50%"; // Carbs = 50%
  proteinBar.style.width = "20%"; // Protein = 20%
  fatBar.style.width = "30%"; // Fat = 30%
}, 100);

// ==========================
// HAMBURGER MENU (MOBILE)
// ==========================

// Get hamburger icon and nav menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

// Toggle mobile nav on click
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Optional: close menu when a link is clicked (mobile friendly)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});
