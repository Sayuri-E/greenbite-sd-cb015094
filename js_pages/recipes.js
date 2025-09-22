document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");
  const recipeSections = document.querySelectorAll(".container-recipe");

  // ---------- SEARCH & FILTER ----------
  const normalize = (s) =>
    (s || "").toLowerCase().trim().replace(/\s+/g, " ").replace(/s$/, ""); // fixes Dessert vs Desserts, Snacks vs Snack

  function filterRecipes() {
    const searchTerm = normalize(searchInput.value);
    const selectedCatNorm = normalize(categorySelect.value);

    recipeSections.forEach((section) => {
      const sectionTitle = section.querySelector("h2")?.textContent || "";
      const sectionCatNorm = normalize(sectionTitle);
      const recipeCards = section.querySelectorAll(".recipe-card");

      let anyVisible = false;

      recipeCards.forEach((card) => {
        const name = normalize(card.querySelector("p")?.textContent || "");
        const matchesSearch = !searchTerm || name.includes(searchTerm);
        const matchesCategory =
          selectedCatNorm === "all" || sectionCatNorm === selectedCatNorm;

        const show = matchesSearch && matchesCategory;
        card.style.display = show ? "flex" : "none";
        anyVisible ||= show;
      });

      section.style.display = anyVisible ? "flex" : "none";
    });
  }

  searchInput.addEventListener("input", filterRecipes);
  categorySelect.addEventListener("change", filterRecipes);
  filterRecipes(); // run once on load

  const recipeData = {
    // -------------------- BREAKFAST --------------------
    "blueberry-and-banana-muffin": {
      title: "Blueberry and Banana Muffin",
      ingredients: [
        "2 ripe bananas, mashed",
        "1 cup blueberries (fresh or frozen)",
        "1½ cups whole-wheat flour",
        "1 tsp baking powder",
        "½ tsp baking soda",
        "¼ tsp salt",
        "1 egg",
        "¼ cup olive oil (or melted butter)",
        "¼ cup honey or maple syrup",
        "1 tsp vanilla extract",
      ],
      steps: [
        "Preheat oven to 180°C. Line a 12-cup muffin tin.",
        "Whisk banana, egg, oil, honey, and vanilla in a bowl.",
        "In another bowl, combine flour, baking powder, baking soda, and salt.",
        "Fold dry ingredients into wet until just combined. Gently fold in blueberries.",
        "Divide batter among cups and bake 18–22 minutes until a skewer comes out clean.",
        "Cool 10 minutes in tin, then transfer to a rack.",
      ],
      nutrition: {
        "Serving Size": "1 muffin",
        Calories: "180 kcal",
        Protein: "4 g",
        Carbs: "28 g",
        Fat: "6 g",
        Fiber: "3 g",
      },
    },

    "breakfast-burrito": {
      title: "Breakfast Burrito",
      ingredients: [
        "2 eggs, beaten",
        "1 small whole-wheat tortilla",
        "¼ cup black beans, rinsed",
        "2 tbsp grated cheese",
        "2 tbsp salsa",
        "¼ avocado, sliced",
        "1 tsp olive oil",
        "Salt and pepper",
      ],
      steps: [
        "Scramble eggs in oil; season.",
        "Warm tortilla in a dry pan 20–30 seconds each side.",
        "Layer beans, eggs, cheese, salsa, and avocado down center.",
        "Fold in sides and roll tightly.",
        "Toast seam-side down 1 minute to seal; serve.",
      ],
      nutrition: {
        "Serving Size": "1 burrito",
        Calories: "320 kcal",
        Protein: "16 g",
        Carbs: "30 g",
        Fat: "14 g",
        Fiber: "7 g",
      },
    },

    "oats-with-chia-seeds-and-berries": {
      title: "Oats with chia seeds and berries",
      ingredients: [
        "½ cup rolled oats",
        "1 tbsp chia seeds",
        "¾ cup milk or alt milk",
        "½ cup mixed berries",
        "1 tsp honey or maple syrup",
        "Pinch of cinnamon",
      ],
      steps: [
        "Combine oats, chia, and milk; rest 10 minutes (or overnight).",
        "Stir to loosen; add more milk if needed.",
        "Top with berries, drizzle honey, and sprinkle cinnamon.",
        "Serve chilled or warmed.",
      ],
      nutrition: {
        "Serving Size": "1 bowl",
        Calories: "260 kcal",
        Protein: "8 g",
        Carbs: "42 g",
        Fat: "6 g",
        Fiber: "9 g",
      },
    },

    "winter-fruit-salad": {
      title: "Winter Fruit Salad",
      ingredients: [
        "1 orange, segmented",
        "1 apple, diced",
        "1 pear, diced",
        "½ cup pomegranate arils",
        "1 tsp poppy seeds",
        "1 tbsp lemon or orange juice",
        "1 tsp honey",
      ],
      steps: [
        "Whisk juice, honey, and poppy seeds.",
        "Combine fruit in a bowl.",
        "Toss with dressing and chill 15 minutes.",
        "Serve cold.",
      ],
      nutrition: {
        "Serving Size": "1 cup",
        Calories: "120 kcal",
        Protein: "1 g",
        Carbs: "30 g",
        Fat: "0 g",
        Fiber: "4 g",
      },
    },

    // -------------------- LUNCH --------------------
    "chicken-pizza-naan": {
      title: "Chicken Pizza Naan",
      ingredients: [
        "1 naan flatbread",
        "¼ cup BBQ or tomato sauce",
        "½ cup cooked shredded chicken",
        "¼ cup mozzarella",
        "2 tbsp red onion, thinly sliced",
        "Fresh coriander (optional)",
      ],
      steps: [
        "Preheat oven to 220°C; place naan on tray.",
        "Spread sauce, then top with chicken, onion, and cheese.",
        "Bake 8–10 minutes until cheese bubbles.",
        "Garnish with coriander and slice.",
      ],
      nutrition: {
        "Serving Size": "1 naan pizza",
        Calories: "420 kcal",
        Protein: "28 g",
        Carbs: "46 g",
        Fat: "14 g",
        Fiber: "3 g",
      },
    },

    falafel: {
      title: "Falafel",
      ingredients: [
        "1 can (400 g) chickpeas, drained",
        "¼ cup onion, chopped",
        "2 garlic cloves",
        "¼ cup fresh parsley",
        "1 tsp cumin",
        "½ tsp coriander",
        "½ tsp baking powder",
        "2–3 tbsp flour",
        "Salt and pepper",
        "Olive oil spray or 2 tbsp oil for pan",
      ],
      steps: [
        "Pulse chickpeas, onion, garlic, herbs, and spices to a coarse paste.",
        "Mix in baking powder and flour to a scoopable texture; chill 20 minutes.",
        "Form small patties or balls.",
        "Pan-fry in a little oil or air-fry at 200°C for 10–12 minutes, flipping once.",
        "Serve with tahini or yogurt sauce.",
      ],
      nutrition: {
        "Serving Size": "3 falafel",
        Calories: "240 kcal",
        Protein: "10 g",
        Carbs: "30 g",
        Fat: "9 g",
        Fiber: "8 g",
      },
    },

    "egg-shakshuka": {
      title: "Egg shakshuka",
      ingredients: [
        "1 tbsp olive oil",
        "½ onion, diced",
        "1 bell pepper, diced",
        "2 garlic cloves, minced",
        "1 tsp paprika",
        "½ tsp cumin",
        "1 can (400 g) crushed tomatoes",
        "2–3 eggs",
        "Salt and pepper",
        "Parsley (for garnish)",
      ],
      steps: [
        "Sauté onion and pepper in oil 5 minutes.",
        "Add garlic and spices; cook 1 minute.",
        "Pour in tomatoes; simmer 8–10 minutes to thicken. Season.",
        "Make wells and crack in eggs; cover and cook to desired doneness (4–6 minutes).",
        "Garnish with parsley; serve with bread.",
      ],
      nutrition: {
        "Serving Size": "1 portion (with 2 eggs)",
        Calories: "280 kcal",
        Protein: "15 g",
        Carbs: "22 g",
        Fat: "15 g",
        Fiber: "6 g",
      },
    },

    "salmon-and-courgette-bagels": {
      title: "Salmon and courgette bagels",
      ingredients: [
        "1 whole-grain bagel, split and toasted",
        "80 g smoked or cooked salmon",
        "½ small courgette (zucchini), ribboned",
        "2 tbsp cream cheese or Greek yogurt",
        "1 tsp lemon juice",
        "Black pepper and dill",
      ],
      steps: [
        "Mix cream cheese with lemon and pepper.",
        "Spread on both bagel halves.",
        "Layer courgette ribbons and salmon.",
        "Top with dill; assemble and serve.",
      ],
      nutrition: {
        "Serving Size": "1 bagel sandwich",
        Calories: "390 kcal",
        Protein: "24 g",
        Carbs: "48 g",
        Fat: "12 g",
        Fiber: "6 g",
      },
    },

    // -------------------- DINNER --------------------
    "mac-and-cheese-with-tomatoes": {
      title: "Mac and Cheese with Tomatoes",
      ingredients: [
        "120 g macaroni",
        "1 tsp olive oil",
        "1 tbsp flour",
        "½ cup milk",
        "⅓ cup grated cheddar",
        "½ cup cherry tomatoes, halved",
        "Salt and pepper",
      ],
      steps: [
        "Cook macaroni in salted water; drain.",
        "In pan, heat oil and whisk in flour 30 seconds.",
        "Gradually add milk; simmer to thicken. Stir in cheese; season.",
        "Combine pasta with sauce and tomatoes.",
        "Optional: Bake 8 minutes at 200°C for a golden top.",
      ],
      nutrition: {
        "Serving Size": "1 plate",
        Calories: "410 kcal",
        Protein: "17 g",
        Carbs: "55 g",
        Fat: "14 g",
        Fiber: "3 g",
      },
    },

    "veggie-spaghetti": {
      title: "Veggie spaghetti",
      ingredients: [
        "100 g spaghetti",
        "1 tbsp olive oil",
        "1 small zucchini, diced",
        "1 small carrot, grated",
        "½ cup mushrooms, sliced",
        "1 garlic clove, minced",
        "1 cup passata or crushed tomatoes",
        "Salt, pepper, basil",
      ],
      steps: [
        "Cook spaghetti to al dente; reserve ¼ cup pasta water.",
        "Sauté zucchini, carrot, and mushrooms in oil 5 minutes.",
        "Add garlic 30 seconds; stir in tomatoes; simmer 5–7 minutes.",
        "Season and toss with spaghetti, adding pasta water if needed.",
        "Finish with basil.",
      ],
      nutrition: {
        "Serving Size": "1 bowl",
        Calories: "380 kcal",
        Protein: "12 g",
        Carbs: "66 g",
        Fat: "9 g",
        Fiber: "8 g",
      },
    },

    "turkey-burgers": {
      title: "Turkey burgers",
      ingredients: [
        "250 g lean ground turkey",
        "¼ small onion, grated",
        "1 garlic clove, minced",
        "1 tbsp breadcrumbs or oat flour",
        "½ tsp paprika",
        "Salt and pepper",
        "1 tsp olive oil",
        "1 whole-grain bun, lettuce, tomato (to serve)",
      ],
      steps: [
        "Mix turkey, onion, garlic, breadcrumbs, paprika, salt, and pepper.",
        "Form 2 patties; chill 10 minutes.",
        "Pan-sear with oil 4–5 minutes per side until cooked through.",
        "Serve on bun with lettuce and tomato.",
      ],
      nutrition: {
        "Serving Size": "1 burger with bun",
        Calories: "420 kcal",
        Protein: "33 g",
        Carbs: "35 g",
        Fat: "14 g",
        Fiber: "4 g",
      },
    },

    "sweet-and-sour-chicken": {
      title: "Sweet and sour chicken",
      ingredients: [
        "250 g chicken breast, cubed",
        "1 tbsp cornstarch",
        "1 tbsp oil",
        "1 bell pepper, chunks",
        "½ onion, chunks",
        "½ cup pineapple chunks (with a little juice)",
        "3 tbsp ketchup",
        "1 tbsp soy sauce",
        "1 tbsp rice vinegar",
        "1 tsp honey",
      ],
      steps: [
        "Toss chicken with cornstarch; season with salt and pepper.",
        "Stir-fry chicken in oil until lightly browned; remove.",
        "Sauté pepper and onion 2–3 minutes.",
        "Whisk ketchup, soy, vinegar, honey, and 2–3 tbsp pineapple juice.",
        "Return chicken with pineapple; pour sauce and simmer 2–3 minutes until glossy.",
        "Serve with rice.",
      ],
      nutrition: {
        "Serving Size": "1 portion (no rice)",
        Calories: "330 kcal",
        Protein: "27 g",
        Carbs: "26 g",
        Fat: "11 g",
        Fiber: "2 g",
      },
    },

    // -------------------- DESSERTS --------------------
    "chocolate-zucchini-bread": {
      title: "Chocolate Zucchini Bread",
      ingredients: [
        "1½ cups grated zucchini (squeezed dry)",
        "1 cup whole-wheat flour",
        "¼ cup cocoa powder",
        "½ tsp baking soda",
        "1 tsp baking powder",
        "¼ tsp salt",
        "2 eggs",
        "⅓ cup olive oil",
        "⅓ cup brown sugar or honey",
        "½ tsp vanilla",
      ],
      steps: [
        "Preheat oven to 175°C; line a loaf tin.",
        "Whisk eggs, oil, sugar, and vanilla.",
        "Combine flour, cocoa, baking powder, baking soda, and salt.",
        "Fold dry into wet; stir in zucchini.",
        "Bake 40–50 minutes until a skewer comes out clean; cool before slicing.",
      ],
      nutrition: {
        "Serving Size": "1 slice (1/12 loaf)",
        Calories: "190 kcal",
        Protein: "4 g",
        Carbs: "22 g",
        Fat: "10 g",
        Fiber: "3 g",
      },
    },

    "coconut-cookies": {
      title: "Coconut Cookies",
      ingredients: [
        "1 cup desiccated coconut",
        "¾ cup flour",
        "⅓ cup sugar",
        "½ tsp baking powder",
        "Pinch of salt",
        "1 egg",
        "¼ cup melted butter or coconut oil",
        "½ tsp vanilla",
      ],
      steps: [
        "Preheat oven to 180°C; line a tray.",
        "Mix dry ingredients in a bowl.",
        "Whisk egg with butter and vanilla; stir into dry to form dough.",
        "Scoop tablespoon mounds; flatten slightly.",
        "Bake 10–12 minutes until edges are golden; cool on rack.",
      ],
      nutrition: {
        "Serving Size": "1 cookie",
        Calories: "120 kcal",
        Protein: "2 g",
        Carbs: "12 g",
        Fat: "7 g",
        Fiber: "2 g",
      },
    },

    "strawberry-yogurt-bark": {
      title: "Strawberry Yogurt Bark",
      ingredients: [
        "1 cup Greek yogurt",
        "1–2 tsp honey",
        "½ cup sliced strawberries",
        "1 tbsp chopped nuts or seeds",
      ],
      steps: [
        "Line a tray with baking paper.",
        "Mix yogurt with honey; spread 0.5–1 cm thick.",
        "Scatter strawberries and nuts.",
        "Freeze 2 hours; break into pieces and serve.",
      ],
      nutrition: {
        "Serving Size": "1 piece (~1/8 tray)",
        Calories: "80 kcal",
        Protein: "6 g",
        Carbs: "8 g",
        Fat: "3 g",
        Fiber: "1 g",
      },
    },

    "blackberry-cobbler": {
      title: "Blackberry Cobbler",
      ingredients: [
        "3 cups blackberries (fresh or frozen)",
        "2 tbsp sugar or honey",
        "1 tsp lemon juice",
        "1 cup flour",
        "1 tsp baking powder",
        "¼ tsp salt",
        "2 tbsp cold butter, cubed",
        "½ cup milk",
      ],
      steps: [
        "Preheat oven to 190°C. Toss berries with sugar and lemon; place in small baking dish.",
        "Combine flour, baking powder, and salt; rub in butter to crumbs.",
        "Stir in milk to make a thick batter; dollop over berries.",
        "Bake 25–30 minutes until golden and bubbling. Rest 10 minutes.",
      ],
      nutrition: {
        "Serving Size": "1 portion (1/6 pan)",
        Calories: "220 kcal",
        Protein: "4 g",
        Carbs: "38 g",
        Fat: "6 g",
        Fiber: "5 g",
      },
    },

    // -------------------- SNACKS --------------------
    "apple-apricot-and-sultana-squares": {
      title: "Apple, apricot and sultana squares",
      ingredients: [
        "1 cup rolled oats",
        "½ cup whole-wheat flour",
        "¼ cup honey",
        "¼ cup melted butter or coconut oil",
        "1 apple, grated",
        "¼ cup chopped dried apricots",
        "¼ cup sultanas",
        "Pinch of cinnamon and salt",
      ],
      steps: [
        "Preheat oven to 175°C; line a small square tin.",
        "Stir oats, flour, cinnamon, and salt.",
        "Mix honey and butter; fold into dry with apple, apricots, and sultanas.",
        "Press into tin; bake 18–22 minutes until set and lightly golden.",
        "Cool completely before slicing into squares.",
      ],
      nutrition: {
        "Serving Size": "1 square (1/12 pan)",
        Calories: "150 kcal",
        Protein: "3 g",
        Carbs: "22 g",
        Fat: "5 g",
        Fiber: "3 g",
      },
    },

    "banana-ice-cream": {
      title: "Banana ice cream",
      ingredients: [
        "2 ripe bananas, sliced and frozen",
        "2 tbsp milk or alt milk",
        "½ tsp vanilla",
        "Pinch of salt",
      ],
      steps: [
        "Blend frozen banana with milk, vanilla, and salt until creamy.",
        "Serve soft immediately or freeze 30–60 minutes for a firmer scoop.",
      ],
      nutrition: {
        "Serving Size": "1 cup",
        Calories: "200 kcal",
        Protein: "3 g",
        Carbs: "51 g",
        Fat: "1 g",
        Fiber: "6 g",
      },
    },

    "pizza-crumpets": {
      title: "Pizza crumpets",
      ingredients: [
        "2 crumpets",
        "2 tbsp pizza or tomato sauce",
        "¼ cup grated mozzarella",
        "Toppings of choice (olive, capsicum, corn, etc.)",
        "Oregano",
      ],
      steps: [
        "Toast crumpets lightly.",
        "Spread sauce; add cheese and toppings.",
        "Grill or air-fry 3–5 minutes until cheese melts.",
        "Sprinkle oregano; serve.",
      ],
      nutrition: {
        "Serving Size": "2 topped crumpets",
        Calories: "300 kcal",
        Protein: "12 g",
        Carbs: "40 g",
        Fat: "10 g",
        Fiber: "3 g",
      },
    },

    "sweet-potato-chips-with-salsa": {
      title: "Sweet potato chips with salsa",
      ingredients: [
        "1 large sweet potato, thinly sliced",
        "1 tbsp olive oil",
        "Salt and pepper",
        "½ cup tomato salsa (store-bought or homemade)",
      ],
      steps: [
        "Preheat oven to 200°C. Toss slices with oil, salt, and pepper.",
        "Arrange on a lined tray; bake 18–22 minutes, flipping once, until crisp at edges.",
        "Serve with salsa for dipping.",
      ],
      nutrition: {
        "Serving Size": "1 serving",
        Calories: "220 kcal",
        Protein: "3 g",
        Carbs: "36 g",
        Fat: "7 g",
        Fiber: "6 g",
      },
    },
  };

  const slugify = (s) =>
    (s || "")
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // ---------- MODAL ----------
  function ensureModalRoot() {
    let root = document.getElementById("recipe-modal-root");
    if (root) return root;

    root = document.createElement("div");
    root.id = "recipe-modal-root";
    root.innerHTML = `
      <div class="rb-overlay" data-close="1" tabindex="-1" style="
        position: fixed; inset: 0; background: rgba(0,0,0,.45);
        display:none; align-items:center; justify-content:center; z-index: 9999;">
        <div class="rb-modal" role="dialog" aria-modal="true" aria-labelledby="rb-modal-title" style="
          width: min(720px, 92vw); max-height: 90vh; overflow:auto;
          background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.25);">
          <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #eee;">
            <h3 id="rb-modal-title" style="margin:0; font-size:20px;">Recipe</h3>
            <button type="button" class="rb-close" aria-label="Close" style="
              border:none; background:transparent; font-size:24px; cursor:pointer; line-height:1;">×</button>
          </div>
          <div id="rb-modal-content" style="padding: 16px 20px;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    // Close handlers
    root.querySelector(".rb-close").addEventListener("click", closeModal);
    root.querySelector(".rb-overlay").addEventListener("click", (e) => {
      if (e.target.dataset.close) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    return root;
  }

  function openModal(recipe) {
    const root = ensureModalRoot();
    const overlay = root.querySelector(".rb-overlay");
    const titleEl = root.querySelector("#rb-modal-title");
    const contentEl = root.querySelector("#rb-modal-content");

    titleEl.textContent = recipe.title;

    // Ingredients (ul)
    const ingredientsHtml = `
      <h4>Ingredients</h4>
      <ul>
        ${recipe.ingredients.map((it) => `<li>${it}</li>`).join("")}
      </ul>
    `;

    // Steps (ol)
    const stepsHtml = `
      <h4>Steps</h4>
      <ol>
        ${recipe.steps.map((st) => `<li>${st}</li>`).join("")}
      </ol>
    `;

    // Nutrition (table)
    const nutritionRows = Object.entries(recipe.nutrition)
      .map(
        ([
          k,
          v,
        ]) => `<tr><th style="text-align:left; padding:8px; border-bottom:1px solid #eee;">${k}</th>
                      <td style="padding:8px; border-bottom:1px solid #eee;">${v}</td></tr>`
      )
      .join("");

    const nutritionHtml = `
      <h4>Nutrition</h4>
      <table style="width:100%; border-collapse:collapse;">
        <tbody>
          ${nutritionRows}
        </tbody>
      </table>
    `;

    contentEl.innerHTML = `
      ${ingredientsHtml}
      ${stepsHtml}
      ${nutritionHtml}
    `;

    overlay.style.display = "flex";
    root.querySelector(".rb-close").focus();
  }

  function closeModal() {
    const root = document.getElementById("recipe-modal-root");
    if (root) root.querySelector(".rb-overlay").style.display = "none";
  }

  // ---------- CLICK HANDLERS ----------
  function attachRecipeOpenHandlers() {
    const cards = document.querySelectorAll(".recipe-card");
    cards.forEach((card) => {
      const title = card.querySelector("p")?.textContent?.trim();
      if (!title) return;

      const key = slugify(title);
      card.style.cursor = "pointer";

      card.addEventListener("click", (e) => {
        e.preventDefault();
        const data = recipeData[key];
        if (data) {
          openModal(data);
        } else {
          // fallback
          openModal({
            title,
            ingredients: ["Recipe details coming soon."],
            steps: ["We’re still prepping this one."],
            nutrition: { Info: "TBD" },
          });
          console.warn(`No recipeData found for key: ${key}`);
        }
      });
    });
  }

  attachRecipeOpenHandlers();
});

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
