// 1 Get references to important elements from the HTML
const form = document.getElementById("feedbackForm"); // The feedback form
const confirmation = document.getElementById("confirmation"); // The paragraph to show messages
const accordionHeaders = document.querySelectorAll(".accordion-header"); // All FAQ headers

// 2️ Add an event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the page from refreshing

  // Get values from the form fields
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.querySelector("textarea").value.trim();

 
  // FORM VALIDATION


  // Check if all fields are filled
  if (!name || !email || !message) {
    confirmation.textContent = "All fields are required!";
    confirmation.style.color = "red";
    return; // Stop the function here
  }

  // Simple email format validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!email.match(emailPattern)) {
    confirmation.textContent = "Please enter a valid email address!";
    confirmation.style.color = "red";
    return;
  }


  // SAVE FEEDBACK TO LOCALSTORAGE


  // Create a feedback object with data
  const feedback = {
    name: name,
    email: email,
    message: message,
    date: new Date().toLocaleString(), // Save current date & time
  };

  // Get old feedbacks from localStorage (if any)
  let storedFeedback = JSON.parse(localStorage.getItem("feedback")) || [];

  // Add new feedback to the array
  storedFeedback.push(feedback);

  // Save updated array back to localStorage
  localStorage.setItem("feedback", JSON.stringify(storedFeedback));


  // SHOW CONFIRMATION MESSAGE

  confirmation.textContent = "Thank you! Your feedback has been submitted.";
  confirmation.style.color = "green";

  // Clear the form
  form.reset();
});

// 3️⃣ FAQ ACCORDION FUNCTIONALITY
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling; // The answer section

    // Toggle display on click
    if (body.style.display === "block") {
      body.style.display = "none"; // Hide if open
    } else {
      body.style.display = "block"; // Show if hidden
    }
  });
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
