// List of slogans to rotate
const slogans = [
  "Nourish. Move. Thrive",
  "Eat Healthy, Live Better",
  "Your Body Deserves the Best",
  "Wellness Starts with You",
  "Fuel Your Body, Feed Your Soul",
];

// Get the slogan element
const sloganElement = document.getElementById("slogan");

// Start at the first slogan
let sloganIndex = 0;

// Function to change slogan every 3 seconds
function rotateSlogan() {
  sloganIndex = (sloganIndex + 1) % slogans.length; // loop back to 0
  sloganElement.textContent = slogans[sloganIndex];
}

// Run the slogan rotator
setInterval(rotateSlogan, 3000);


// HEALTH TIP OF THE DAY


// List of health tips (can expand as you want)
const healthTips = [
  "Drink at least 8 glasses of water today!",
  "Take a 10-minute walk after meals.",
  "Eat more green vegetables for better digestion.",
  "Sleep at least 7-8 hours to recharge your body.",
  "Stretch for 5 minutes every morning.",
  "Practice mindfulness to reduce stress.",
];

// Get today's date to pick tip (changes daily)
const today = new Date().getDate(); // 1-31
const tipIndex = today % healthTips.length;

// Insert tip into the page
document.getElementById("dailyTip").textContent = healthTips[tipIndex];


// NEWSLETTER SUBSCRIPTION


// Get newsletter form and input
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("newsletterEmail");
const newsletterMsg = document.getElementById("newsletterMsg");

// Add event listener for form submission
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  const email = emailInput.value.trim(); // get email and remove whitespace

  // Basic email validation
  if (email && email.includes("@")) {
    // Store email in localStorage
    localStorage.setItem("newsletterEmail", email);

    // Confirmation message to user
    newsletterMsg.textContent = "Thank you for subscribing!";

    // Clear input field
    emailInput.value = "";
  } else {
    newsletterMsg.textContent = "Please enter a valid email address.";
  }
});


// HAMBURGER MENU (MOBILE)


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
