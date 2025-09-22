// Form where the user chooses body part + equipment
const workoutForm = document.getElementById("workoutForm");

// Section where generated workout plan is shown
const planSection = document.getElementById("plan");
const exerciseList = document.getElementById("exerciseList");
const startWorkoutBtn = document.getElementById("startWorkout");

// Timer section
const timerSection = document.getElementById("timerSection");
const currentExercise = document.getElementById("currentExercise");
const timerEl = document.getElementById("timer");
const nextExerciseBtn = document.getElementById("nextExercise");

// These are grouped by body part and equipment
// Each category has multiple exercises

const exercises = {
  full: {
    none: ["Burpees", "Jumping Jacks", "Mountain Climbers"],
    dumbbells: ["Dumbbell Thrusters", "Renegade Rows", "Clean and Press"],
    band: ["Band Squats", "Band Rows", "Band Press"],
  },
  upper: {
    none: ["Push-ups", "Tricep Dips", "Arm Circles"],
    dumbbells: ["Bicep Curls", "Shoulder Press", "Lateral Raises"],
    band: ["Band Bicep Curls", "Band Pull Aparts", "Band Chest Press"],
  },
  lower: {
    none: ["Squats", "Lunges", "High Knees"],
    dumbbells: ["Weighted Squats", "Deadlifts", "Step-ups"],
    band: ["Band Glute Bridges", "Band Side Steps", "Band Squats"],
  },
  core: {
    none: ["Plank", "Sit-ups", "Bicycle Crunches"],
    dumbbells: ["Russian Twists", "Dumbbell Side Bends", "Weighted Sit-ups"],
    band: ["Band Woodchoppers", "Band Pallof Press", "Band Side Crunch"],
  },
};

let generatedWorkout = []; // holds the selected exercises
let currentIndex = 0; // which exercise we are on
let countdown; // the timer interval (so we can stop it)

//  WHEN USER SUBMITS THE FORM

workoutForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page from refreshing

  // Get user’s selections
  const bodyPart = document.getElementById("bodypart").value;
  const equipment = document.getElementById("equipment").value;

  // Pick 3 random exercises based on selection
  generatedWorkout = pickRandomExercises(exercises[bodyPart][equipment], 3);

  // Clear old list before adding new
  exerciseList.innerHTML = "";

  // Show each exercise as a list item
  for (let i = 0; i < generatedWorkout.length; i++) {
    const li = document.createElement("li");
    li.textContent = generatedWorkout[i];
    exerciseList.appendChild(li);
  }

  // Show workout plan, hide timer section
  planSection.classList.remove("hidden");
  timerSection.classList.add("hidden");

  // Reset index
  currentIndex = 0;
});

// START WORKOUT BUTTON

startWorkoutBtn.addEventListener("click", function () {
  // Hide the plan, show timer
  planSection.classList.add("hidden");
  timerSection.classList.remove("hidden");

  // Start first exercise
  startExercise();
});

//  NEXT EXERCISE BUTTON

nextExerciseBtn.addEventListener("click", function () {
  // If there are more exercises left
  if (currentIndex < generatedWorkout.length - 1) {
    currentIndex++; // move to next exercise
    startExercise(); // start timer again
  } else {
    // If no more exercises left
    currentExercise.textContent = "Workout Complete!";
    timerEl.textContent = "";
    nextExerciseBtn.style.display = "none"; // hide button
  }
});

//  START AN EXERCISE + TIMER

function startExercise() {
  let timeLeft = 30; // each exercise = 30 seconds

  // Show exercise name
  currentExercise.textContent = generatedWorkout[currentIndex];

  // Show starting time
  timerEl.textContent = timeLeft;

  // Make sure "Next" button is visible
  nextExerciseBtn.style.display = "inline-block";

  // Clear any old timer before starting new
  clearInterval(countdown);

  // Run countdown every 1 second
  countdown = setInterval(function () {
    timeLeft--; // reduce by 1
    timerEl.textContent = timeLeft;

    // When timer hits 0, move to next exercise
    if (timeLeft <= 0) {
      clearInterval(countdown); // stop timer
      nextExerciseBtn.click(); // simulate clicking next
    }
  }, 1000);
}

// STEP 8: HELPER FUNCTION

// Picks "count" random exercises from the given list
// Makes sure we don’t repeat the same exercise twice

function pickRandomExercises(list, count) {
  const result = []; // final chosen exercises
  const usedIndexes = []; // to track which ones already picked

  while (result.length < count && result.length < list.length) {
    const randomIndex = Math.floor(Math.random() * list.length);

    if (!usedIndexes.includes(randomIndex)) {
      usedIndexes.push(randomIndex);
      result.push(list[randomIndex]);
    }
  }

  return result;
}


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
