"use client";
import { useState, useEffect } from "react";

// ── COOKING BLOCKS (3 blocks only) ──
const BLOCKS = [
  { id: 1, title: "Foundations", dates: "Feb 8-14", description: "Broths + Phase 1 Healing Foods", purpose: "Kelly Week 1", color: "amber" },
  { id: 2, title: "Hearty Meals", dates: "Feb 15-19", description: "Phase 2 First Round: Soups, Curries, Dals", purpose: "Both Kelly + Jonny", color: "orange" },
  { id: 3, title: "Iron, Protein & Breakfast", dates: "Feb 23-28", description: "Phase 2 Second Round: Beef, Breakfast, Snacks", purpose: "Both", color: "red" },
];

// ── SHOPPING LISTS ──
const SHOPPING = {
  costco: [{ item: "Chest freezer (14 cu ft)", note: "Buy soon" }],
  equipment: [
    "Souper Cubes 2-cup x4 (~$80)",
    "Souper Cubes 1-cup x2 (~$34)",
    "Souper Cubes 1/2-cup x1 (~$15)",
    "Souper Cubes 2-TB x1 (~$15)",
    "Gallon freezer bags 4+ boxes (doubled for sharing)",
    "Quart freezer bags 4+ boxes",
    "Pink Sharpie or tape (Kelly bags)",
    "Blue Sharpie or tape (Jonny bags)",
    "Green Sharpie or tape (Shared bags)",
    "Parchment paper for wrapping cubes",
  ],
  asianMarket: [
    {
      category: "Proteins",
      items: ["Chicken feet 3 lbs", "Silkie chicken 1 small"],
    },
    {
      category: "Produce",
      items: ["Fresh turmeric 4 oz", "Fresh ginger 1 large hand", "Green onions 2 bunches"],
    },
    {
      category: "Dried Goods",
      items: [
        "Dried miyeok (wakame) 2 oz",
        "Goji berries 8 oz",
        "Red dates (jujubes) 12 oz",
        "Dried shiitake 8 oz",
        "Kombu 4 oz",
        "Dried longan 8 oz",
        "Black sesame seeds 8 oz",
      ],
    },
    {
      category: "Pantry",
      items: ["Toasted sesame oil", "White pepper", "Miso paste", "Fish sauce (Red Boat)", "Coconut aminos"],
    },
    {
      category: "TCM Herbs",
      items: ["Astragalus root powder", "Angelica root powder"],
    },
    {
      category: "Curry",
      items: ["Japanese curry roux blocks (S&B Golden Curry mild)"],
    },
  ],
  butcher: [
    {
      category: "Block 1",
      items: ["Whole chickens x3", "Beef marrow bones 3-4 lbs", "Oxtail 2-3 lbs", "Beef brisket 1 lb (for miyeokguk)"],
    },
    {
      category: "Block 2",
      items: ["Chicken thighs bone-in 6 lbs (butter chicken + pot pie + chicken noodle)", "Italian sausage 1 lb (frittatas)"],
    },
    {
      category: "Block 3",
      items: [
        "Ground beef 6 lbs (bolognese + chili + meatballs + beef stews)",
        "Chicken livers 8 oz (hidden liver)",
        "Beef chuck 4 lbs (stews)",
        "Bacon 1 lb (quiche)",
        "Short ribs or stew beef 2 lbs",
        "Salmon fillets or canned salmon",
      ],
    },
  ],
  tradersJoes: [
    {
      category: "Block 1 Critical",
      items: ["Jasmine/basmati rice big bag", "Red lentils 1 lb", "Kabocha squash 2"],
    },
    {
      category: "Lactation Essentials",
      items: [
        "Brewer's yeast",
        "Ground flaxseed",
        "Fennel seeds",
        "Raw almonds",
        "Rolled oats large",
        "Nut butter",
        "Dark chocolate chips",
        "Honey",
        "Chia seeds",
        "Walnuts raw",
        "Pumpkin seeds raw",
        "Fenugreek ground",
      ],
    },
    {
      category: "Iron & Omega-3 Pantry",
      items: ["Nettle tea bags", "Dried apricots unsulfured", "Medjool dates", "Canned sardines x4"],
    },
    {
      category: "Soups & Curries",
      items: [
        "Crushed tomatoes (San Marzano) x6",
        "Tomato paste x3",
        "Coconut milk x8",
        "Dried black beans",
        "Dried chickpeas",
        "Yellow lentils 1 lb",
        "Chicken stock backup",
        "Peanut butter (rendang)",
      ],
    },
    {
      category: "Breakfast & Comfort",
      items: [
        "Steel cut oats",
        "Eggs 5+ dozen",
        "Cottage cheese",
        "Gruyere",
        "Sharp cheddar",
        "Cream",
        "Puff pastry (pot pie)",
        "Lasagna noodles",
        "Breadcrumbs",
        "Dijon mustard",
      ],
    },
    {
      category: "Baking",
      items: ["Baking soda + powder", "Buttermilk", "Flour"],
    },
  ],
};

// ── RECIPES ──
const RECIPES = [
  // ─── BLOCK 1: Foundations ───
  {
    id: 1,
    name: "Chicken Bone Broth",
    category: "Foundations",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["collagen", "base"],
    ingredients: [
      "2-3 chicken carcasses (from roasted chickens)",
      "Remaining chicken feet",
      "2 onions quartered",
      "4 carrots chopped",
      "4 celery stalks",
      "1 head garlic halved",
      "2 tbsp ACV",
      "1 tbsp peppercorns",
      "Thyme, parsley, bay leaves",
      "Cold water to max line",
    ],
    instructions: [
      "Add carcasses + feet to Instant Pot",
      "Cover with cold water to max line, add vinegar",
      "ROUND 1 (Premium Sipping Broth): HIGH pressure 2-3 hrs, natural release",
      "Strain through fine mesh. This is your best broth — golden, wiggly, for sipping postpartum",
      "ROUND 2 (Cooking Broth): Return same bones to IP, fresh water to max line",
      "HIGH pressure 2 hrs, natural release",
      "Strain. Use this batch for soups, congee, stews, cooking",
      "Cool both batches, skim fat if desired",
    ],
    yield: "Round 1: ~10-12 cups premium. Round 2: ~10-12 cups cooking.",
    freezing: "KELLY bags. Label ROUND 1 and ROUND 2 separately. Freeze 2-cup + 1-cup portions. Round 1 should jiggle like jelly.",
  },
  {
    id: 2,
    name: "Beef Bone Broth",
    category: "Foundations",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["collagen", "iron"],
    ingredients: [
      "3-4 lbs beef marrow bones (cut crosswise)",
      "2-3 lbs oxtail",
      "2 onions",
      "4 carrots",
      "4 celery",
      "1 head garlic",
      "2 tbsp tomato paste",
      "2 tbsp ACV",
      "Peppercorns, thyme, bay",
    ],
    instructions: [
      "CRITICAL: Roast bones 425F 30-40 min until deeply browned",
      "Transfer to Instant Pot, deglaze roasting pan, add to pot",
      "Add veggies, aromatics, vinegar, paste, cold water to max",
      "ROUND 1 (Premium): HIGH pressure 3 hrs, natural release",
      "Strain — this is the good stuff for sipping",
      "KEEP THE OXTAIL MEAT: Shred it back into the broth or set aside for congee/miyeokguk topping",
      "ROUND 2 (Cooking): Same bones, fresh water, HIGH 2 hrs",
      "Strain — use for stews, soups, cooking bases",
    ],
    yield: "Round 1: ~8-10 cups. Round 2: ~8-10 cups.",
    freezing: "KELLY bags. Label rounds separately. Freeze 2-cup + 1-cup portions. Need 8 total batches across all 3 blocks.",
    note: "IMPORTANT: Keep the oxtail meat! Shred it back into the broth or set aside for congee/miyeokguk topping.",
  },
  {
    id: 3,
    name: "Golden Broth",
    category: "Foundations",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["warming", "tonic"],
    ingredients: [
      "8 cups ROUND 1 chicken broth",
      "3\" fresh turmeric (or 1 tbsp ground)",
      "2\" fresh ginger",
      "2 tbsp ghee",
      "1/2 tsp black pepper (activates curcumin)",
      "Salt",
    ],
    instructions: [
      "Combine broth, turmeric, ginger",
      "Gentle simmer 15-20 min",
      "Strain through fine mesh (removes ginger + turmeric solids)",
      "Stir in ghee + black pepper, season",
    ],
    yield: "~8 cups",
    freezing: "KELLY bags. Freeze 2-cup portions. Sip warm as healing tonic. Need 3 batches total.",
  },
  {
    id: 51,
    name: "Black Silkie Chicken Tonic (Wu Ji Tang)",
    category: "Foundations",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["TCM", "tonic", "blood-building"],
    ingredients: [
      "1 small black silkie chicken, whole (cleaned)",
      "Remaining chicken feet (3-5 pieces)",
      "8-10 red jujubes, rinsed",
      "2 tbsp goji berries",
      "2 tbsp dried longan",
      "3\" fresh ginger, sliced",
      "4-5 dried shiitake (optional)",
      "Cold water to cover",
      "Salt",
      "1 tsp astragalus powder (added last 15 min)",
      "1/2 tsp angelica root powder (added last 15 min)",
    ],
    instructions: [
      "Blanch silkie chicken 2-3 min, rinse (removes impurities)",
      "Blanch chicken feet same way",
      "Place in Instant Pot with jujubes, goji, longan, ginger, shiitakes",
      "Cover with cold water (8-10 cups)",
      "IP: HIGH pressure 45 min, natural release 15 min",
      "OR STOVE: Gentle simmer 2-3 hrs",
      "Last 15 min: stir in astragalus + angelica powders",
      "Season with salt. Should be deeply golden-brown",
      "Shred the silkie meat and serve in the broth — the meat is the medicine",
    ],
    yield: "~6-8 cups + shredded meat",
    freezing: "KELLY bags. Freeze 1-cup portions for Week 1.",
    note: "TCM postpartum tonic. Jujubes rebuild blood, goji nourish yin, longan calms the spirit, astragalus strengthens qi, angelica moves blood. Shred the silkie meat and eat it with the broth — the meat is the medicine.",
  },
  {
    id: 60,
    name: "Jujube Goji Ginger Tea",
    category: "Foundations",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["TCM", "beverage", "blood-building"],
    ingredients: [
      "10-12 red jujubes (sliced)",
      "2 tbsp goji berries",
      "3\" fresh ginger sliced",
      "8 cups water",
      "Optional: 1 tbsp honey",
    ],
    instructions: [
      "Slice jujubes to expose flesh",
      "Combine jujubes, goji, ginger, water in pot",
      "Bring to boil, reduce to gentle simmer 20-25 min",
      "Strain or leave fruit in (your choice — fruit is edible and nourishing)",
      "Add honey if desired",
    ],
    yield: "~8 cups",
    freezing: "Freeze 1-cup Souper Cube portions. Reheat on stove or pour hot water over frozen cube.",
    note: "Classic TCM postpartum blood-building tea. Jujubes rebuild blood, goji nourish yin, ginger warms the center. Make alongside your broths — zero effort.",
  },
  {
    id: 57,
    name: "Miyeokguk (Korean Seaweed & Beef Soup)",
    category: "Soups",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["Korean", "postpartum", "mineral-rich"],
    lactation: true,
    ingredients: [
      "1 oz dried miyeok (wakame seaweed)",
      "8 oz beef brisket sliced thin",
      "1 tbsp toasted sesame oil",
      "1 tbsp soy sauce/coconut aminos",
      "2 cloves garlic, minced",
      "8 cups beef bone broth",
      "Salt",
    ],
    instructions: [
      "Soak dried miyeok in cold water 30 min, drain, cut into 2\" pieces (it expands a lot)",
      "Brown beef in sesame oil until cooked",
      "Add garlic 30 sec",
      "Add rehydrated seaweed, stir 2-3 min",
      "Add broth and soy sauce",
      "Simmer 30-40 min until seaweed is silky",
      "Season with salt",
    ],
    yield: "~8-10 cups",
    freezing: "KELLY bags. Freeze 2-cup portions. Reheat gently, add splash of broth.",
    note: "Korean postpartum essential. The beef makes this a complete, protein-rich meal — don't skip it. Rich in iodine, calcium, iron.",
  },
  {
    id: 8,
    name: "Chicken Ginger Congee",
    category: "Soups",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["gentle", "warming"],
    ingredients: [
      "2 cups jasmine rice",
      "12 cups ROUND 2 chicken broth",
      "4 cups water",
      "3\" ginger sliced",
      "8-10 jujubes (sliced)",
      "1 tbsp goji berries",
      "2-3 cups shredded chicken",
      "2 tbsp sesame oil",
      "Salt",
    ],
    instructions: [
      "Rinse rice until clear",
      "Combine rice, broth, water, ginger, jujubes, goji",
      "Boil then low simmer 1.5-2 hrs, stir occasionally",
      "Stir in chicken + sesame oil",
      "Season",
    ],
    yield: "~12 two-cup portions. Need 2 batches (14 servings needed).",
    freezing: "KELLY bags. Thickens when frozen — add broth when reheating.",
    toppings: "Soft-boiled egg, shredded chicken (from broth-making), ginger-scallion oil, sesame seeds, coconut aminos, pumpkin seeds, black sesame seeds, sliced jujubes, goji berries",
  },
  {
    id: 61,
    name: "Sweet Congee",
    category: "Soups",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["gentle", "warming"],
    ingredients: [
      "1 cup jasmine rice",
      "8 cups water",
      "8-10 red jujubes (sliced)",
      "2 tbsp goji berries",
      "1 tbsp black sesame seeds (toasted, ground)",
      "2\" fresh ginger sliced",
      "2 tbsp honey or brown sugar",
      "1 can coconut milk",
      "Pinch of salt",
    ],
    instructions: [
      "Rinse rice",
      "Combine rice, water, jujubes, goji, ginger",
      "Boil then low simmer 1.5 hrs, stir occasionally",
      "Stir in coconut milk, honey, ground black sesame",
      "Season with salt",
    ],
    yield: "~10 portions",
    freezing: "Freeze in Souper Cubes. Thickens when frozen — add water/milk when reheating.",
    note: "Nourishing breakfast bowl. Jujubes + goji + black sesame are all traditional TCM blood-builders.",
  },
  {
    id: 62,
    name: "Warm Rice Pudding",
    category: "Soups",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["comfort", "warming"],
    ingredients: [
      "1 cup jasmine rice",
      "4 cups whole milk",
      "1 can coconut milk",
      "6-8 jujubes (sliced)",
      "1 tbsp goji berries",
      "1 tbsp black sesame seeds (toasted)",
      "3 tbsp honey or maple syrup",
      "1 tsp cinnamon",
      "1/2 tsp cardamom",
      "Pinch salt",
      "1 tsp vanilla",
    ],
    instructions: [
      "Combine rice, milk, coconut milk in heavy pot",
      "Bring to gentle boil, reduce to lowest simmer",
      "Add jujubes, goji",
      "Stir frequently 35-45 min until thick and creamy",
      "Stir in honey, spices, vanilla",
      "Top with black sesame",
    ],
    yield: "~8 portions",
    freezing: "Freeze in Souper Cubes. Add splash of milk when reheating.",
    note: "Comfort food meets TCM blood-builders. Warming, nourishing, easy to digest.",
  },
  {
    id: 9,
    name: "Carrot Ginger Soup",
    category: "Soups",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["gentle", "warming"],
    ingredients: [
      "2 lbs carrots",
      "1 onion",
      "4 cloves garlic",
      "3\" ginger",
      "6 cups Round 2 broth",
      "1 can coconut milk",
      "2 tbsp ghee",
      "1 tsp cumin",
    ],
    instructions: [
      "Saute onion in ghee 5-7 min",
      "Add garlic, ginger 1 min",
      "Add carrots, cumin, broth",
      "Simmer 25-30 min until carrots are very tender",
      "Blend smooth, stir in coconut milk",
    ],
    yield: "~10 two-cup portions",
    freezing: "KELLY bags. Freezes beautifully.",
  },
  {
    id: 11,
    name: "Kabocha & Red Lentil Soup",
    category: "Soups",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["gentle", "warming"],
    ingredients: [
      "2 kabocha squash (~4 lbs)",
      "1 cup red lentils",
      "1 onion",
      "4 garlic",
      "2\" ginger",
      "6 cups broth",
      "1 can coconut milk",
      "2 tbsp ghee",
      "Curry powder, cumin, turmeric",
    ],
    instructions: [
      "Roast squash cut-side down 400F 45 min",
      "Scoop flesh",
      "Saute onion, add garlic/ginger/spices",
      "Add squash, lentils, broth",
      "Simmer 20-25 min",
      "Blend, stir in coconut milk",
    ],
    yield: "~10 two-cup portions",
    freezing: "KELLY bags. May thicken — add broth when reheating.",
  },
  {
    id: 6,
    name: "Ginger-Scallion Oil",
    category: "Foundations",
    phase: 1,
    track: "shared",
    kellyWeek: 1,
    tags: ["garnish", "warming"],
    ingredients: [
      "1 cup neutral oil (grapeseed or vegetable)",
      "8 green onions (scallions), chopped",
      "4\" fresh ginger, minced",
      "1 tbsp white pepper",
      "1 tsp salt",
    ],
    instructions: [
      "Heat oil until just warm (not hot)",
      "Pour over ginger + scallions + white pepper in a bowl",
      "Add salt, stir well",
      "Cool slightly before storing",
    ],
    yield: "~1 cup",
    freezing: "Refrigerate in glass jar. Lasts 1-2 weeks. Drizzle on congee, eggs, soup.",
    note: "This is your daily seasoning. Make it fresh, keep it in the fridge. A spoonful transforms bland congee.",
  },
  {
    id: 52,
    name: "Lactation Oatmeal Cups",
    category: "Snacks",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["lactation", "snack"],
    lactation: true,
    ingredients: [
      "2 cups rolled oats",
      "4 tbsp brewer's yeast",
      "4 tbsp ground flaxseed",
      "2 tbsp chia seeds",
      "1/4 cup honey",
      "1/4 cup nut butter",
      "1 tsp vanilla",
      "1/4 tsp salt",
      "Optional: dark chocolate chips, dried fruit",
    ],
    instructions: [
      "Mix all dry ingredients: oats, brewer's yeast, flax, chia",
      "Mix wet: honey, nut butter, vanilla",
      "Combine wet and dry, fold in chocolate chips or fruit if using",
      "Press into greased muffin tin",
      "Bake 350F 15-18 min until set and golden",
      "Cool in tin 5 min, pop out",
    ],
    yield: "~12 cups",
    freezing: "Freeze in freezer bags or glass container. Reheat in toaster oven 8-10 min.",
    note: "SNACK, not breakfast. The lactation trifecta: brewer's yeast + flaxseed + oats. Reheat in toaster oven for best results, drizzle with honey.",
  },
  {
    id: 53,
    name: "Lactation Bites",
    category: "Snacks",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["lactation", "snack"],
    lactation: true,
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup peanut or almond butter",
      "1/4 cup honey",
      "2 tbsp brewer's yeast",
      "2 tbsp ground flaxseed",
      "2 tbsp chia seeds",
      "1 tbsp dark chocolate chips",
      "1/4 tsp salt",
      "1 tsp vanilla",
    ],
    instructions: [
      "Mix all ingredients in bowl",
      "Roll into 1-inch balls",
      "Refrigerate 30 min before freezing",
    ],
    yield: "~30 bites",
    freezing: "Freeze in layers on sheet, then bag. Grab 2-3 for a snack. Eat directly from freezer or let sit 5 min.",
    note: "No-bake lactation snack. Brewer's yeast + flax + chia = milk supply boost.",
  },

  // ─── BLOCK 2: Hearty Meals & Phase 2 ───
  {
    id: 19,
    name: "Butter Chicken",
    category: "Curries",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["curry", "warming"],
    ingredients: [
      "2 lbs chicken thighs bone-in",
      "1 cup plain yogurt",
      "2 tbsp garam masala (for marinade)",
      "28 oz crushed tomatoes",
      "1 cup cream",
      "4 tbsp butter",
      "1 large onion, diced",
      "6 garlic cloves, minced",
      "2\" ginger, minced",
      "2 tsp garam masala",
      "1 tsp turmeric",
      "1 tsp cumin",
      "Salt, pepper",
    ],
    instructions: [
      "Marinate chicken in yogurt + 2 tbsp garam masala for 2-4 hours or overnight",
      "Heat 2 tbsp butter in large pan, brown chicken pieces, set aside",
      "Add remaining butter, saute onion until golden (8-10 min)",
      "Add garlic, ginger, saute 1 min",
      "Add garam masala, turmeric, cumin, cook 1 min",
      "Add crushed tomatoes, bring to simmer",
      "Return chicken, simmer 20 min until cooked through",
      "Stir in cream, simmer 5 min",
      "Season with salt and pepper",
    ],
    yield: "~10 portions per batch. Need 2 batches (20 portions total).",
    freezing: "SHARED bags (split between Kelly + Jonny). Freeze in portions. Serve over frozen rice.",
  },
  {
    id: 26,
    name: "Coconut Lentil Dal",
    category: "Dals",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["dal", "vegetarian", "warming"],
    ingredients: [
      "1 cup red lentils",
      "1 can coconut milk",
      "4 cups water or vegetable broth",
      "1 onion, diced",
      "4 garlic cloves, minced",
      "2\" ginger, minced",
      "2 tbsp ghee",
      "1 tsp cumin seeds",
      "1 tsp turmeric",
      "1/2 tsp coriander",
      "1 can diced tomatoes (optional)",
      "Salt, lime juice",
    ],
    instructions: [
      "Rinse lentils",
      "Heat ghee, add cumin seeds until they pop",
      "Add onion, saute until golden",
      "Add garlic, ginger, cook 1 min",
      "Add turmeric, coriander, cook 30 sec",
      "Add lentils, water, tomatoes if using",
      "Bring to boil, reduce to simmer 20-25 min until lentils break down",
      "Stir in coconut milk",
      "Simmer 5 min, season with salt and lime",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Serve over rice.",
  },
  {
    id: 27,
    name: "Tadka Dal",
    category: "Dals",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["dal", "vegetarian"],
    ingredients: [
      "1 cup yellow lentils (or red lentils)",
      "4 cups water or broth",
      "1 onion, diced",
      "4 garlic cloves, minced",
      "2\" ginger, minced",
      "3 tbsp ghee",
      "1 tbsp cumin seeds",
      "1 tsp turmeric",
      "1/2 tsp coriander",
      "1/4 tsp cayenne",
      "1 can diced tomatoes",
      "Fresh cilantro",
      "Salt, lime",
    ],
    instructions: [
      "Rinse lentils, add to pot with water",
      "Bring to boil, reduce to simmer 20 min until tender",
      "Heat 2 tbsp ghee in separate pan, add cumin seeds until they pop",
      "Add onion, saute until golden",
      "Add garlic, ginger, cook 1 min",
      "Add turmeric, coriander, cayenne, cook 30 sec",
      "Pour this mixture into the cooked lentils",
      "Add tomatoes, simmer 10 min",
      "Heat remaining 1 tbsp ghee in small pan until bubbling, serve as garnish drizzle (tadka)",
      "Season with salt, lime, cilantro",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Serve with rice.",
  },
  {
    id: 63,
    name: "Kitchari",
    category: "Dals",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["ayurvedic", "warming"],
    ingredients: [
      "1 cup basmati rice",
      "1 cup yellow mung dal (or red lentils)",
      "2 tbsp ghee",
      "1 tsp cumin seeds",
      "1 tsp mustard seeds",
      "1 tsp turmeric",
      "1 tsp coriander",
      "1/2 tsp ginger powder",
      "8 cups water or broth",
      "Salt",
      "Squeeze of lemon",
    ],
    instructions: [
      "Rinse rice and dal together until water runs clear",
      "Heat ghee, add cumin and mustard seeds until they pop",
      "Add turmeric, coriander, ginger",
      "Add rice, dal, and water",
      "Bring to boil, reduce to simmer 30-40 min until porridge-like consistency",
      "Season with salt and lemon",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Reheat with splash of water/broth. Serve as is.",
    note: "The Ayurvedic gold standard for postpartum recovery. Gentle, warming, deeply nourishing. Easy to digest.",
  },
  {
    id: 12,
    name: "Black Bean Soup",
    category: "Soups",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["soup", "vegetarian"],
    ingredients: [
      "2 cups dried black beans (or 3 cans, drained)",
      "8 cups vegetable or chicken broth",
      "1 large onion, diced",
      "4 garlic cloves, minced",
      "2 carrots, diced",
      "1 can diced tomatoes",
      "2 tbsp tomato paste",
      "2 tbsp olive oil",
      "2 tsp cumin",
      "1 tsp smoked paprika",
      "Bay leaf",
      "Salt, pepper, lime",
    ],
    instructions: [
      "If using dried beans, soak overnight, drain",
      "Heat olive oil, saute onion until translucent",
      "Add garlic, carrots, tomato paste, cook 2 min",
      "Add beans, broth, tomatoes, cumin, paprika, bay leaf",
      "Bring to boil, reduce to simmer 1.5-2 hrs until beans are very tender (or 30 min if canned)",
      "Mash some beans against side of pot to thicken",
      "Season with salt, pepper, lime",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Thick and hearty.",
  },
  {
    id: 14,
    name: "Minestrone",
    category: "Soups",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["soup", "vegetarian"],
    ingredients: [
      "2 tbsp olive oil",
      "1 large onion, diced",
      "4 garlic cloves, minced",
      "3 carrots, diced",
      "3 celery stalks, diced",
      "2 zucchini, diced",
      "1 cup diced tomatoes (canned)",
      "6 cups vegetable broth",
      "1 can white beans",
      "2 cups fresh spinach",
      "2 bay leaves",
      "1 tsp Italian seasoning",
      "Salt, pepper",
      "Pasta (add fresh when serving)",
    ],
    instructions: [
      "Heat olive oil, saute onion, garlic, carrots, celery 5 min",
      "Add zucchini, cook 2 min",
      "Add tomatoes (with juice), broth, beans, bay leaves, Italian seasoning",
      "Bring to boil, reduce to simmer 20 min until vegetables are tender",
      "Add spinach, cook 2 min until wilted",
      "Season with salt, pepper",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Freeze base without pasta. Add fresh pasta when reheating.",
  },
  {
    id: 13,
    name: "Chicken Noodle Soup",
    category: "Soups",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["soup", "comfort"],
    ingredients: [
      "2 tbsp olive oil",
      "1 lb chicken thighs, diced",
      "1 large onion, diced",
      "4 garlic cloves, minced",
      "4 carrots, sliced",
      "3 celery stalks, sliced",
      "8 cups chicken broth",
      "2 bay leaves",
      "1 tsp thyme",
      "Salt, pepper",
      "Egg noodles (add fresh when serving)",
      "Fresh parsley",
    ],
    instructions: [
      "Heat olive oil, brown chicken pieces, set aside",
      "Saute onion, garlic, carrots, celery 5 min",
      "Add broth, bay leaves, thyme, return chicken",
      "Simmer 25 min until chicken is cooked through and vegetables are tender",
      "Season with salt, pepper",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Freeze without noodles. Cook noodles fresh when serving.",
  },
  {
    id: 64,
    name: "Japanese Curry",
    category: "Curries",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["curry", "comfort"],
    ingredients: [
      "2 lbs chicken thighs (cubed)",
      "2 onions (sliced thin)",
      "3 carrots (chunked)",
      "2 potatoes (cubed)",
      "1 box Japanese curry roux (S&B Golden Curry, mild)",
      "4 cups water or chicken broth",
      "1 tbsp oil",
    ],
    instructions: [
      "Brown chicken in oil, set aside",
      "Saute onions until deeply golden (10 min)",
      "Add carrots, potatoes, stir 2 min",
      "Add water/broth, bring to boil",
      "Simmer 15 min until vegetables are tender",
      "Turn off heat, break in curry roux blocks, stir until dissolved",
      "Return chicken, simmer 10 min until thick",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Serve over frozen rice.",
    note: "Japanese comfort food. The roux blocks make this foolproof. Mild and warming.",
  },
  {
    id: 65,
    name: "Chickpea Coconut Curry",
    category: "Curries",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["curry", "vegetarian"],
    ingredients: [
      "2 cans chickpeas (drained)",
      "1 can coconut milk",
      "14 oz diced tomatoes",
      "1 onion",
      "4 garlic cloves",
      "2\" ginger",
      "2 tbsp curry powder",
      "1 tsp turmeric",
      "1 tsp cumin",
      "2 cups spinach",
      "2 tbsp ghee",
      "Salt, lime",
    ],
    instructions: [
      "Saute onion in ghee until golden",
      "Add garlic, ginger, spices 1 min",
      "Add tomatoes, simmer 5 min",
      "Add chickpeas + coconut milk",
      "Simmer 20 min",
      "Add spinach last 2 min",
      "Season with salt and lime",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags.",
    note: "Plant-based iron + protein. The spinach wilts into nothing but adds iron.",
  },
  {
    id: 66,
    name: "White Chicken Chili",
    category: "Chilis",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["chili", "warming"],
    ingredients: [
      "2 lbs chicken thighs (cubed)",
      "2 cans white beans (drained)",
      "2 cans diced green chiles",
      "1 onion",
      "4 garlic cloves",
      "4 cups chicken broth",
      "1 tsp cumin",
      "1 tsp oregano",
      "1/2 cup sour cream or cream",
      "Lime, cilantro",
    ],
    instructions: [
      "Brown chicken, set aside",
      "Saute onion, garlic",
      "Add cumin, oregano",
      "Add broth, beans, chiles",
      "Return chicken",
      "Simmer 25 min",
      "Mash some beans for creaminess",
      "Stir in cream",
      "Season with lime and cilantro",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags.",
  },
  {
    id: 67,
    name: "Lasagna",
    category: "Comfort",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["comfort", "italian"],
    ingredients: [
      "1 lb lasagna noodles",
      "2 lbs ricotta",
      "2 cups mozzarella",
      "1 cup Parmesan",
      "2 eggs",
      "28 oz crushed tomatoes",
      "2 cups marinara or crushed tomatoes",
      "Fresh basil",
      "Salt, pepper, nutmeg",
    ],
    instructions: [
      "Cook noodles 2 min less than package instructions",
      "Mix ricotta, eggs, half the Parmesan, nutmeg, salt",
      "Layer in 9x13 pan: sauce, noodles, ricotta mix, mozzarella",
      "Repeat layers 3 times, ending with sauce + cheese",
      "Bake 375F covered 25 min, uncovered 15 min until bubbly",
    ],
    yield: "~8 portions per lasagna. Make 1 lasagna (need ~7 servings total).",
    freezing: "SHARED bags. Freeze before or after baking. Thaw and bake 350F 30 min if frozen.",
    note: "Classic comfort. Can be made with store-bought marinara to save time.",
  },
  {
    id: 43,
    name: "Frozen Rice (Batch 1)",
    category: "Bases",
    phase: 2,
    track: "shared",
    kellyWeek: 1,
    tags: ["base", "staple"],
    ingredients: [
      "2 cups jasmine or basmati rice",
      "3.5 cups water",
      "1 tsp salt",
    ],
    instructions: [
      "Rinse rice until water runs clear",
      "Combine rice, water, salt in pot or rice cooker",
      "Bring to boil, reduce to simmer, cover 15 min",
      "Fluff, cool slightly",
      "Portion into freezer bags or containers",
    ],
    yield: "~12 one-cup portions",
    freezing: "Freeze flat in bags (stacks easily). Reheat in saucepan with splash of water or microwave 3 min with cover.",
  },
  {
    id: 54,
    name: "Lactation Savory Muffins",
    category: "Snacks",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["lactation", "snack"],
    lactation: true,
    ingredients: [
      "2 cups flour",
      "2 tsp baking powder",
      "1/2 tsp salt",
      "2 tbsp brewer's yeast",
      "3 tbsp ground flaxseed",
      "1/3 cup melted butter or oil",
      "2 eggs",
      "1 cup milk or buttermilk",
      "1 cup sharp cheddar (grated)",
      "1 cup spinach (chopped)",
      "1/4 cup sun-dried tomatoes (chopped)",
      "Optional: fresh herbs",
    ],
    instructions: [
      "Preheat 375F",
      "Whisk dry: flour, baking powder, salt, brewer's yeast, flax",
      "Whisk wet: butter, eggs, milk",
      "Combine wet and dry, fold in cheese, spinach, tomatoes",
      "Fill greased muffin tin 2/3 full",
      "Bake 18-20 min until golden and set",
    ],
    yield: "~14 muffins",
    freezing: "Freeze in freezer bags. Reheat in toaster oven 8 min.",
    note: "Savory lactation muffin. Brewer's yeast + flax + greens.",
  },
  {
    id: 55,
    name: "Egg Bites",
    category: "Breakfast",
    phase: 1,
    track: "shared",
    kellyWeek: 1,
    tags: ["breakfast", "protein"],
    ingredients: [
      "12 eggs",
      "1/2 cup milk or cream",
      "1 cup cheese (cheddar or combination)",
      "Optional fillings: cooked bacon pieces, sauteed spinach, diced peppers, diced ham",
      "Salt, pepper",
    ],
    instructions: [
      "Preheat 375F",
      "Whisk eggs, milk, salt, pepper",
      "Oil or butter silicone muffin molds",
      "Add optional fillings to each mold",
      "Pour egg mixture to fill",
      "Top with cheese",
      "Bake 15-18 min until set and lightly golden",
      "Cool 5 min, pop out",
    ],
    yield: "12 bites per batch. Need 4 batches (48 bites total, 16 servings of 3).",
    freezing: "Freeze in layer on sheet, then bag. Reheat toaster oven 350F 8-10 min. Not microwave if possible.",
  },

  // ─── BLOCK 3: Phase 2 Continued + Breakfasts ───
  {
    id: 22,
    name: "Bolognese (Hidden Liver)",
    category: "Sauces",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["iron", "hidden-liver"],
    ingredients: [
      "2 lbs ground beef",
      "8 oz chicken livers",
      "2 tbsp olive oil",
      "1 large onion, finely diced",
      "4 garlic cloves, minced",
      "2 tbsp tomato paste",
      "28 oz crushed tomatoes",
      "1/2 cup red wine",
      "2 tbsp balsamic vinegar",
      "1 tbsp honey",
      "2 tsp Italian seasoning",
      "Salt, pepper",
    ],
    instructions: [
      "Puree chicken livers until smooth liquid consistency",
      "Brown ground beef in olive oil, breaking apart",
      "Add onion, saute 5 min until golden",
      "Add garlic, cook 30 sec",
      "Add tomato paste, cook 2 min",
      "Add liver puree, stir well to combine (this is 10% liver, undetectable)",
      "Add crushed tomatoes, red wine, balsamic, honey, herbs",
      "Simmer 25-30 min, stirring occasionally",
      "Season with salt and pepper",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags. Serve over pasta or rice.",
    note: "Liver is puréed to liquid, 10% ratio, mixed in with ground beef. Strong flavors (wine, tomato, herbs) mask completely. Undetectable iron boost.",
  },
  {
    id: 17,
    name: "Beef Chili (Hidden Liver)",
    category: "Chilis",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["chili", "iron", "hidden-liver"],
    ingredients: [
      "2 lbs ground beef",
      "8 oz chicken livers",
      "1 tbsp olive oil",
      "1 large onion, diced",
      "4 garlic cloves, minced",
      "2 tbsp chili powder",
      "1 tbsp cumin",
      "1 tbsp smoked paprika",
      "28 oz crushed tomatoes",
      "2 cans kidney beans (drained)",
      "1 can black beans (drained)",
      "2 tbsp tomato paste",
      "1 tbsp cocoa powder (secret!)",
      "Salt, pepper",
    ],
    instructions: [
      "Puree chicken livers until smooth",
      "Brown ground beef in olive oil, breaking apart",
      "Add onion, saute 5 min",
      "Add garlic, cook 30 sec",
      "Add chili powder, cumin, paprika, cook 1 min",
      "Add tomato paste, cook 1 min",
      "Add liver puree, stir well",
      "Add crushed tomatoes, beans, cocoa powder",
      "Simmer 25-30 min, stirring occasionally",
      "Season with salt and pepper",
    ],
    yield: "~12 portions",
    freezing: "SHARED bags.",
    note: "Hidden liver — chicken livers pur\u00e9ed to liquid, 10% ratio mixed with ground beef. Cocoa deepens flavor. Completely undetectable.",
  },
  {
    id: 40,
    name: "Meatballs (Hidden Liver)",
    category: "Proteins",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["iron", "hidden-liver"],
    ingredients: [
      "2 lbs ground beef",
      "8 oz chicken livers",
      "1 onion, finely minced",
      "4 garlic cloves, minced",
      "1 cup breadcrumbs",
      "2 eggs",
      "1/4 cup milk",
      "2 tbsp tomato paste",
      "2 tsp Italian seasoning",
      "Salt, pepper",
      "2 tbsp olive oil",
    ],
    instructions: [
      "Puree chicken livers until smooth",
      "Combine ground beef, liver puree, onion, garlic, breadcrumbs, eggs, milk, tomato paste, herbs",
      "Mix gently (don't overwork)",
      "Roll into 1.5\" balls",
      "Heat olive oil, brown meatballs in batches on all sides (don't fully cook)",
      "Transfer to baking sheet, bake 350F 12-15 min until cooked through",
    ],
    yield: "~30 meatballs",
    freezing: "SHARED bags. Add to minestrone, chicken noodle soup, or eat standalone with marinara.",
    note: "Hidden liver — chicken livers pur\u00e9ed to liquid, 10% ratio mixed with ground beef. Italian seasoning + tomato paste mask completely. Undetectable.",
  },
  {
    id: 68,
    name: "Beef & Sweet Potato Stew",
    category: "Stews",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["stew", "warming"],
    ingredients: [
      "2 lbs beef chuck (cubed)",
      "2 large sweet potatoes (cubed)",
      "1 onion",
      "4 garlic cloves",
      "2 cups beef broth",
      "14 oz diced tomatoes",
      "2 tbsp tomato paste",
      "1 tsp cumin",
      "1 tsp smoked paprika",
      "1 tsp cinnamon",
      "2 tbsp olive oil",
      "Salt, pepper",
    ],
    instructions: [
      "Brown beef in batches in olive oil, set aside",
      "Saute onion, garlic",
      "Add spices, tomato paste 2 min",
      "Add tomatoes, broth, return beef",
      "Simmer 1.5 hrs",
      "Add sweet potatoes last 30 min until tender",
      "Season with salt and pepper",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags.",
    note: "Iron-rich and naturally sweet. The cinnamon + cumin + paprika give it warmth.",
  },
  {
    id: 69,
    name: "Moroccan Beef & Chickpea Stew",
    category: "Stews",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["stew", "warming"],
    ingredients: [
      "2 lbs beef chuck (cubed)",
      "1 can chickpeas",
      "14 oz diced tomatoes",
      "1 onion",
      "4 garlic cloves",
      "2 cups beef broth",
      "2 tsp cumin",
      "1 tsp cinnamon",
      "1 tsp turmeric",
      "1 tsp ginger",
      "1/2 tsp cayenne (optional)",
      "2 tbsp olive oil",
      "Cilantro, lemon",
    ],
    instructions: [
      "Brown beef in batches in olive oil, set aside",
      "Saute onion, garlic",
      "Add all spices 1 min",
      "Add tomatoes, broth, return beef",
      "Simmer 1.5-2 hrs",
      "Add chickpeas last 20 min",
      "Season with lemon, garnish cilantro",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags.",
  },
  {
    id: 70,
    name: "Beef Rendang",
    category: "Stews",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["stew", "indonesian"],
    ingredients: [
      "2 lbs beef chuck (cubed)",
      "2 cans coconut milk",
      "1 stalk lemongrass (bruised)",
      "4 kaffir lime leaves (or lime zest)",
      "1 onion",
      "6 garlic cloves",
      "2\" ginger",
      "2\" galangal (or more ginger)",
      "2 tbsp chili paste or 4 dried chilies (mild)",
      "1 tsp turmeric",
      "1 tbsp tamarind paste",
      "2 tbsp peanut butter or ground peanuts",
      "2 tbsp oil",
      "Salt, sugar",
    ],
    instructions: [
      "Blend onion, garlic, ginger, galangal, chili paste into paste",
      "Fry paste in oil until fragrant 5 min",
      "Add coconut milk, lemongrass, lime leaves",
      "Add beef",
      "Bring to boil, reduce to low simmer",
      "Cook 2-3 hrs, stirring occasionally, until sauce is thick and dark and coats the beef",
      "Season with tamarind, salt, sugar",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags.",
    note: "Indonesian braised beef. Low and slow until the coconut milk caramelizes. Rich, warming, deeply flavorful.",
  },
  {
    id: 71,
    name: "Beef & Barley Stew",
    category: "Stews",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["stew", "comfort"],
    ingredients: [
      "2 lbs beef chuck (cubed)",
      "1 cup pearl barley",
      "2 onions",
      "4 carrots",
      "4 celery stalks",
      "4 garlic cloves",
      "6 cups beef broth",
      "2 tbsp tomato paste",
      "Thyme, bay leaf",
      "2 tbsp olive oil",
      "Salt, pepper",
    ],
    instructions: [
      "Brown beef in batches in olive oil, set aside",
      "Saute onions, carrots, celery",
      "Add garlic, tomato paste 2 min",
      "Return beef, add broth, barley, herbs",
      "Simmer 1.5-2 hrs until barley is tender and beef is falling apart",
      "Season with salt and pepper",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags.",
    note: "Old-fashioned comfort. The barley makes it hearty and thickens the broth.",
  },
  {
    id: 32,
    name: "Chicken Pot Pie Filling",
    category: "Comfort",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["comfort", "filling"],
    ingredients: [
      "1.5 lbs chicken thighs (cubed)",
      "4 tbsp butter",
      "1 onion, diced",
      "3 carrots, diced",
      "2 celery stalks, diced",
      "4 oz mushrooms, sliced",
      "3 tbsp flour",
      "2 cups chicken broth",
      "1/2 cup cream or milk",
      "1 tsp thyme",
      "Salt, pepper",
    ],
    instructions: [
      "Brown chicken in butter, set aside",
      "Saute onion, carrots, celery 5 min",
      "Add mushrooms, cook 3 min",
      "Dust with flour, stir well",
      "Add broth, cream, thyme",
      "Return chicken, simmer 15 min until thick",
      "Season with salt and pepper",
    ],
    yield: "~8 portions",
    freezing: "SHARED bags. Thaw, pour into ramekin, top with puff pastry, 400F 20-25 min.",
  },
  {
    id: 35,
    name: "Salmon Patties + Rice + Warm Greens",
    category: "Proteins",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["omega-3", "lactation"],
    lactation: true,
    ingredients: [
      "14.75 oz canned salmon (or fresh fillets, cooked, flaked)",
      "1 cup breadcrumbs",
      "2 eggs",
      "1/4 cup milk",
      "2 tbsp Dijon mustard",
      "1 tbsp lemon juice",
      "Salt, pepper",
      "2 tbsp olive oil",
    ],
    instructions: [
      "Drain salmon, remove any bones or skin (bones are fine if canned)",
      "Combine salmon, breadcrumbs, eggs, milk, mustard, lemon juice, salt, pepper",
      "Form into patties (about 8)",
      "Heat olive oil, brown patties 4-5 min each side until golden",
    ],
    yield: "~8 patties (4 servings of 2)",
    freezing: "SHARED bags. Serve with frozen rice + sauteed greens (spinach, kale).",
    note: "Omega-3 supports lactation + baby's brain development.",
  },
  {
    id: 45,
    name: "Mashed Sweet Potatoes",
    category: "Bases",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["base", "side"],
    ingredients: [
      "3 lbs sweet potatoes",
      "3 tbsp butter",
      "1/4 cup milk",
      "1 tsp cinnamon",
      "Salt, pepper",
    ],
    instructions: [
      "Peel, cube sweet potatoes",
      "Boil until very tender (15-20 min)",
      "Drain well",
      "Mash with butter, milk, cinnamon, salt, pepper",
    ],
    yield: "~8 portions",
    freezing: "SHARED bags.",
  },
  {
    id: 72,
    name: "Steel-Cut Oatmeal Bowls",
    category: "Breakfast",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["breakfast", "warming"],
    ingredients: [
      "4 cups steel-cut oats",
      "12 cups water or milk",
      "2 tbsp butter",
      "1 tsp cinnamon",
      "Pinch salt",
      "Toppings: honey, nuts, berries (fresh when serving)",
    ],
    instructions: [
      "Bring liquid to boil with butter, salt",
      "Add oats, reduce to simmer",
      "Cook 25-30 min, stirring occasionally, until thick and creamy",
      "Stir in cinnamon",
    ],
    yield: "~12 portions per batch. Need 2 batches (24 total, 15 eaten).",
    freezing: "Freeze in Souper Cubes. Reheat with splash of milk.",
    note: "Hearty breakfast base. Top with whatever's in the pantry — honey, walnuts, berries.",
  },
  {
    id: 73,
    name: "Frittata (Sausage + Pepper)",
    category: "Breakfast",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["breakfast", "protein"],
    ingredients: [
      "8 eggs",
      "1/2 cup milk/cream",
      "8 oz Italian sausage (cooked, crumbled)",
      "1 red bell pepper (diced)",
      "1/2 onion (diced)",
      "1 cup shredded cheese (cheddar or gruyere)",
      "2 tbsp olive oil",
      "Salt, pepper, fresh herbs",
    ],
    instructions: [
      "Cook sausage, crumble, set aside",
      "Saute pepper and onion",
      "Whisk eggs + milk",
      "Divide sausage, peppers, onion into greased muffin tins",
      "Pour egg mixture, sprinkle cheese",
      "Bake 375F 15-18 min until set and golden",
    ],
    yield: "12 mini frittatas per batch. Need 2 batches (24 frittatas total, 12 servings of 2). 10 eaten.",
    freezing: "Freeze on sheet, then bag. Reheat toaster oven 350F 8-10 min.",
  },
  {
    id: 74,
    name: "Frittata (Broccoli + Cheddar)",
    category: "Breakfast",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["breakfast", "protein"],
    ingredients: [
      "8 eggs",
      "1/2 cup milk/cream",
      "2 cups broccoli florets (blanched, chopped)",
      "1.5 cups sharp cheddar",
      "2 tbsp olive oil",
      "Salt, pepper, pinch nutmeg",
    ],
    instructions: [
      "Blanch broccoli 2 min, chop small",
      "Whisk eggs + milk",
      "Divide broccoli into greased muffin tins",
      "Pour egg mixture, sprinkle cheddar",
      "Bake 375F 15-18 min until set and golden",
    ],
    yield: "12 mini frittatas per batch. Need 2 batches.",
    freezing: "Freeze on sheet, then bag. Reheat toaster oven 350F 8-10 min.",
  },
  {
    id: 75,
    name: "Quiche Lorraine (Bacon + Gruyère)",
    category: "Breakfast",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["breakfast", "comfort"],
    ingredients: [
      "1 pie crust (store-bought)",
      "6 slices bacon (cooked, crumbled)",
      "1.5 cups gruyère (shredded)",
      "4 eggs",
      "1 cup cream",
      "1/2 cup milk",
      "Nutmeg, salt, pepper",
    ],
    instructions: [
      "Blind-bake crust 375F 10 min",
      "Layer bacon + gruyère in crust",
      "Whisk eggs, cream, milk, nutmeg, salt",
      "Pour over",
      "Bake 350F 35-40 min until set and golden",
      "Cool before slicing",
    ],
    yield: "8 slices per quiche. Need 3 quiches (24 slices total, 12 servings of 2). 10 eaten.",
    freezing: "SHARED bags. Freeze slices, reheat in toaster oven.",
    note: "The only quiche you need. Bacon + gruyère is classic Lorraine. Freeze slices, reheat in toaster oven.",
  },
  {
    id: 76,
    name: "Burrito Bowls",
    category: "Comfort",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["comfort", "bowl"],
    ingredients: [
      "2 lbs ground beef or chicken",
      "2 cans black beans (drained)",
      "2 cups rice (cooked)",
      "1 onion",
      "4 garlic cloves",
      "2 tsp cumin",
      "1 tsp chili powder",
      "1 tsp smoked paprika",
      "1 cup salsa",
      "1 cup cheese",
      "Salt, lime",
    ],
    instructions: [
      "Brown meat with onion, garlic, spices",
      "Add beans, salsa, stir until heated",
      "Combine with rice",
      "Portion into containers",
      "Top with cheese",
    ],
    yield: "~10 portions",
    freezing: "SHARED bags.",
    note: "NOT burritos (tortillas get mushy frozen). Bowl format heats perfectly.",
  },
  {
    id: 77,
    name: "Baked Oatmeal Bars",
    category: "Snacks",
    phase: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["snack", "lactation"],
    lactation: true,
    ingredients: [
      "3 cups rolled oats",
      "1/2 cup maple syrup",
      "1/3 cup melted butter or coconut oil",
      "2 eggs",
      "1 cup milk",
      "1 tsp vanilla",
      "1 tsp cinnamon",
      "1/2 tsp baking powder",
      "Pinch salt",
      "1/2 cup mix-ins (chocolate chips, dried fruit, nuts)",
    ],
    instructions: [
      "Mix wet: eggs, milk, maple syrup, butter, vanilla",
      "Mix dry: oats, cinnamon, baking powder, salt",
      "Combine",
      "Fold in mix-ins",
      "Pour into greased 9x13 pan",
      "Bake 350F 30-35 min until golden and set",
      "Cool, cut into bars",
    ],
    yield: "~12 bars per batch. Need 2 batches.",
    freezing: "Wrap individually in parchment. Toaster oven to reheat.",
    note: "SNACK. Cut into bars, wrap individually in parchment. Toaster oven to reheat.",
  },
];

// ── DAILY GUIDE ──
const DAILY_GUIDE = [
  {
    day: 1,
    meals: [
      { time: "Morning", meal: "Congee + Egg (reheat congee, top with soft-boiled egg + ginger-scallion oil + black sesame)" },
      { time: "Mid-AM", meal: "Beef Broth 2-cup (saucepan, gentle heat)" },
      { time: "Lunch", meal: "Miyeokguk (saucepan, the beef is IN there)" },
      { time: "Afternoon", meal: "Lactation Bites x2 + Jujube Goji Ginger Tea 1-cup" },
      { time: "Dinner", meal: "Carrot Ginger Soup" },
      { time: "Evening", meal: "Golden Broth 1-cup" },
    ],
  },
  {
    day: 2,
    meals: [
      { time: "Morning", meal: "Egg Bites x3 (toaster oven 8 min)" },
      { time: "Mid-AM", meal: "Chicken Broth 2-cup" },
      { time: "Lunch", meal: "Kabocha & Red Lentil Soup" },
      { time: "Afternoon", meal: "Oatmeal Cup (snack) + Silkie Tonic 1-cup (eat the meat!)" },
      { time: "Dinner", meal: "Congee (savory) with shredded chicken" },
      { time: "Evening", meal: "Beef Broth 1-cup" },
    ],
  },
  {
    day: 3,
    meals: [
      { time: "Morning", meal: "Sweet Congee (jujubes + goji + black sesame already in it)" },
      { time: "Mid-AM", meal: "Golden Broth 2-cup" },
      { time: "Lunch", meal: "Carrot Ginger Soup" },
      { time: "Afternoon", meal: "Lactation Bites x2 + Beef Broth 1-cup" },
      { time: "Dinner", meal: "Miyeokguk" },
      { time: "Evening", meal: "Chicken Broth 1-cup" },
    ],
  },
  {
    day: 4,
    meals: [
      { time: "Morning", meal: "Warm Rice Pudding" },
      { time: "Mid-AM", meal: "Beef Broth 2-cup" },
      { time: "Lunch", meal: "Kabocha & Red Lentil Soup" },
      { time: "Afternoon", meal: "Baked Oatmeal bar + Jujube Tea 1-cup" },
      { time: "Dinner", meal: "Congee + Egg" },
      { time: "Evening", meal: "Golden Broth 1-cup" },
    ],
  },
  {
    day: 5,
    meals: [
      { time: "Morning", meal: "Egg Bites x3" },
      { time: "Mid-AM", meal: "Chicken Broth 2-cup" },
      { time: "Lunch", meal: "Congee (savory) with shredded chicken" },
      { time: "Afternoon", meal: "Lactation Bites x2 + Silkie Tonic 1-cup" },
      { time: "Dinner", meal: "Carrot Ginger Soup" },
      { time: "Evening", meal: "Beef Broth 1-cup" },
    ],
  },
  {
    day: 6,
    meals: [
      { time: "Morning", meal: "Congee + Egg" },
      { time: "Mid-AM", meal: "Beef Broth 2-cup" },
      { time: "Lunch", meal: "Sweet Congee" },
      { time: "Afternoon", meal: "Oatmeal Cup + Golden Broth 1-cup" },
      { time: "Dinner", meal: "Kabocha & Red Lentil Soup" },
      { time: "Evening", meal: "Chicken Broth 1-cup" },
    ],
  },
  {
    day: 7,
    meals: [
      { time: "Morning", meal: "Congee + Egg" },
      { time: "Mid-AM", meal: "Golden Broth 2-cup" },
      { time: "Lunch", meal: "Miyeokguk" },
      { time: "Afternoon", meal: "Lactation Bites x2 + Jujube Tea 1-cup" },
      { time: "Dinner", meal: "Congee (savory) with shredded chicken" },
      { time: "Evening", meal: "Beef Broth 1-cup" },
    ],
  },
  {
    day: 8,
    meals: [
      { time: "Morning", meal: "Congee + Egg" },
      { time: "Lunch", meal: "Butter Chicken + Rice (both eat)" },
      { time: "Dinner", meal: "Bolognese (both eat)" },
    ],
  },
  {
    day: 9,
    meals: [
      { time: "Morning", meal: "Egg Bites x3" },
      { time: "Lunch", meal: "Coconut Lentil Dal + Rice (both)" },
      { time: "Dinner", meal: "Lasagna (both)" },
    ],
  },
  {
    day: 10,
    meals: [
      { time: "Morning", meal: "Warm Rice Pudding" },
      { time: "Lunch", meal: "Miyeokguk (Kelly comfort)" },
      { time: "Dinner", meal: "Kitchari (both)" },
    ],
  },
  {
    day: 11,
    meals: [
      { time: "Morning", meal: "Frittata (broccoli) x2" },
      { time: "Lunch", meal: "Black Bean Soup (both)" },
      { time: "Dinner", meal: "Beef Rendang + Rice (both)" },
    ],
  },
  {
    day: 12,
    meals: [
      { time: "Morning", meal: "Congee + Egg" },
      { time: "Lunch", meal: "Chicken Noodle Soup (both)" },
      { time: "Dinner", meal: "Moroccan Beef & Chickpea (both)" },
    ],
  },
  {
    day: 13,
    meals: [
      { time: "Morning", meal: "Sweet Congee" },
      { time: "Lunch", meal: "Minestrone + Meatballs (both)" },
      { time: "Dinner", meal: "White Chicken Chili (both)" },
    ],
  },
  {
    day: 14,
    meals: [
      { time: "Morning", meal: "Egg Bites x3" },
      { time: "Lunch", meal: "Kabocha Soup (Kelly) / Japanese Curry (Jonny)" },
      { time: "Dinner", meal: "Beef & Barley Stew (both)" },
    ],
  },
];

// ── MAIN COMPONENT ──
export default function MealPrep() {
  const [currentTab, setCurrentTab] = useState("Daily Guide");
  const [recipeNotes, setRecipeNotes] = useState({});
  const [recipeStatus, setRecipeStatus] = useState({});
  const [globalNotes, setGlobalNotes] = useState("");
  const [freezerInventory, setFreezerInventory] = useState({});

  const TABS = ["Daily Guide", "Overview", "Shopping", "Block 1", "Block 2", "Block 3", "Recipes", "Freezer"];

  useEffect(() => {
    const saved = localStorage.getItem("mealprep-v3");
    if (saved) {
      const data = JSON.parse(saved);
      setRecipeNotes(data.notes || {});
      setRecipeStatus(data.status || {});
      setGlobalNotes(data.globalNotes || "");
      setFreezerInventory(data.freezer || {});
    }
  }, []);

  useEffect(() => {
    const toSave = {
      notes: recipeNotes,
      status: recipeStatus,
      globalNotes,
      freezer: freezerInventory,
    };
    localStorage.setItem("mealprep-v3", JSON.stringify(toSave));
  }, [recipeNotes, recipeStatus, globalNotes, freezerInventory]);

  const cycleStatus = (id) => {
    setRecipeStatus((prev) => {
      const current = prev[id] || "todo";
      const next = current === "todo" ? "progress" : current === "progress" ? "done" : "todo";
      return { ...prev, [id]: next };
    });
  };

  const StatusBtn = ({ id }) => {
    const status = recipeStatus[id] || "todo";
    const colors = {
      todo: "bg-gray-200 text-gray-700",
      progress: "bg-yellow-200 text-yellow-700",
      done: "bg-green-200 text-green-700",
    };
    const labels = { todo: "To Do", progress: "In Progress", done: "Done" };
    return (
      <button
        onClick={() => cycleStatus(id)}
        className={`px-3 py-1 rounded text-sm font-medium ${colors[status]}`}
      >
        {labels[status]}
      </button>
    );
  };

  const ProgressBar = ({ blockId }) => {
    const blockRecipes = RECIPES.filter((r) => {
      if (blockId === 1) return r.phase === 1;
      if (blockId === 2) return r.phase === 2 && r.id !== 2 && r.id !== 3 && r.id !== 51;
      if (blockId === 3) return r.phase === 2 && r.id !== 2 && r.id !== 3 && r.id !== 51;
      return false;
    });
    const done = blockRecipes.filter((r) => recipeStatus[r.id] === "done").length;
    const pct = blockRecipes.length > 0 ? Math.round((done / blockRecipes.length) * 100) : 0;
    return (
      <div className="mt-2 bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
      </div>
    );
  };

  const RecipeCard = ({ recipe }) => {
    const st = recipeStatus[recipe.id] || "todo";
    const cardBg = st === "done" ? "border-emerald-200 bg-emerald-50/30" : st === "progress" ? "border-amber-200 bg-amber-50/20" : "border-gray-300 bg-white";
    return (
      <div className={`border rounded p-4 mb-4 ${cardBg}`}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-lg">{recipe.name}</h4>
            <p className="text-gray-600 text-sm">{recipe.tags.join(" • ")}</p>
          </div>
          <StatusBtn id={recipe.id} />
        </div>

        {recipe.yield && (
          <p className="text-gray-600 text-sm mb-2">
            <strong>Yield:</strong> {recipe.yield}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-3">
          <div>
            <h5 className="font-semibold text-gray-700 mb-1">Ingredients</h5>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-1">Instructions</h5>
            <ol className="text-sm text-gray-600 list-decimal list-inside">
              {recipe.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.freezing && (
          <p className="text-gray-600 text-sm mb-2">
            <strong>Freezing:</strong> {recipe.freezing}
          </p>
        )}

        {recipe.note && (
          <div className="bg-blue-50 border-l-4 border-blue-300 p-2 mb-3">
            <p className="text-sm text-gray-700">{recipe.note}</p>
          </div>
        )}

        <textarea
          className="w-full border border-gray-300 rounded p-2 text-sm"
          placeholder="Add notes about this recipe..."
          value={recipeNotes[recipe.id] || ""}
          onChange={(e) => setRecipeNotes({ ...recipeNotes, [recipe.id]: e.target.value })}
          rows="2"
        />
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center">Meal Prep Tracker</h1>
      <p className="text-center text-gray-600 mb-6">Phase 1 + 2 Recovery Foods for Kelly & Jonny</p>

      {/* TABS */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              currentTab === tab ? "bg-blue-500 text-white" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DAILY GUIDE TAB */}
      {currentTab === "Daily Guide" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Daily Meal Guide (14 Days)</h2>
            <p className="text-gray-600 mb-4">
              Week 1: Kelly Phase 1 recovery (broths, congee, simple soups, silkie tonic). Jujube tea throughout.
              Broth schedule: AM 2-cup + PM 1-cup + Eve 1-cup = 4 cups/day.
            </p>
            <p className="text-gray-600 mb-4">
              Week 2: Kelly transitions to Phase 2 lunches/dinners. Most lunches and dinners are aligned — heat the same thing for both.
              Broth schedule: 1-cup AM + 1-cup Eve = 2 cups/day.
            </p>
            {DAILY_GUIDE.map((dayGuide) => (
              <div key={dayGuide.day} className="mb-4 border-b pb-4">
                <h3 className="font-bold text-lg mb-2">Day {dayGuide.day}</h3>
                {dayGuide.meals.map((meal, i) => (
                  <p key={i} className="text-gray-700">
                    <strong>{meal.time}:</strong> {meal.meal}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {currentTab === "Overview" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Recovery Overview</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Phase Descriptions</h3>
              <div className="space-y-3">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3">
                  <h4 className="font-semibold text-gray-700">Phase 1 (Week 1): Gentle Recovery</h4>
                  <p className="text-gray-600 text-sm">
                    Broths, congee, simple soups, silkie tonic, eggs. Jujube tea. All warm. Broth schedule: AM 2-cup + PM 1-cup + Eve 1-cup = 4 cups/day.
                  </p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-3">
                  <h4 className="font-semibold text-gray-700">Phase 2 (Weeks 2-3): Rebuilding</h4>
                  <p className="text-gray-600 text-sm">
                    Curries, dals, stews, soups. Iron-rich beef dishes with hidden liver. Aligned meals. Broth schedule: 1-cup AM + 1-cup Eve = 2 cups/day.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Guiding Philosophy</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• <strong>42 days for 42 years:</strong> Recovery in first 6 weeks shapes long-term health</li>
                <li>• <strong>Warming foods:</strong> Ginger, turmeric, cumin, cinnamon. No cold/raw early on.</li>
                <li>• <strong>Wiggly broth:</strong> High collagen from chicken feet. 8 batches beef + 3 chicken + 3 golden + 1 silkie</li>
                <li>• <strong>Protein at every meal:</strong> Eggs from Day 1, beef in miyeokguk, silkie meat in tonic, shredded chicken on congee</li>
                <li>• <strong>Hidden liver:</strong> In bolognese, chili, meatballs. 10% ratio, puréed. Undetectable.</li>
                <li>• <strong>TCM blood-builders:</strong> Jujubes, goji berries, black sesame in congee + tea. Astragalus + angelica in silkie tonic.</li>
                <li>• <strong>Ayurvedic nourishment:</strong> Kitchari, ghee, warming spices. Gentle on digestion.</li>
                <li>• <strong>Lactation support:</strong> Brewer&apos;s yeast, flaxseed, chia, fennel, oats, omega-3</li>
                <li>• <strong>Iron + omega-3 pantry:</strong> Nettle tea daily, pumpkin seeds, dried apricots, dates, walnuts, sardines</li>
                <li>• <strong>Aligned meals from Week 2:</strong> Heat the same thing for both. Less work, more connection.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Global Notes</h3>
              <textarea
                className="w-full border border-gray-300 rounded p-3 text-sm"
                placeholder="Add notes about the overall plan, substitutions, timing, etc."
                value={globalNotes}
                onChange={(e) => setGlobalNotes(e.target.value)}
                rows="4"
              />
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING TAB */}
      {currentTab === "Shopping" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Shopping Lists</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Equipment (Freeze Setup)</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                {SHOPPING.equipment.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Asian Market</h3>
              {SHOPPING.asianMarket.map((section) => (
                <div key={section.category} className="mb-4">
                  <h4 className="font-semibold text-gray-700">{section.category}</h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    {section.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Butcher</h3>
              {SHOPPING.butcher.map((section) => (
                <div key={section.category} className="mb-4">
                  <h4 className="font-semibold text-gray-700">{section.category}</h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    {section.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Trader Joe&apos;s / Grocery</h3>
              {SHOPPING.tradersJoes.map((section) => (
                <div key={section.category} className="mb-4">
                  <h4 className="font-semibold text-gray-700">{section.category}</h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    {section.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BLOCK TABS */}
      {TABS.slice(3, 6).map((blockName, idx) => {
        const blockId = idx + 1;
        const block = BLOCKS[idx];
        const blockRecipes = RECIPES.filter((r) => {
          if (blockId === 1) return r.phase === 1;
          if (blockId === 2) return r.phase === 2 && ![2, 3, 51].includes(r.id);
          if (blockId === 3) return r.phase === 2 && ![2, 3, 51].includes(r.id);
          return false;
        });

        return (
          currentTab === blockName && (
            <div key={blockId} className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className={`bg-${block.color}-100 border-l-4 border-${block.color}-500 p-4 mb-4`}>
                  <h2 className="text-2xl font-bold">{block.title}</h2>
                  <p className="text-gray-600">{block.dates} — {block.description}</p>
                  <p className="text-gray-600 text-sm">Cooking for: {block.purpose}</p>
                </div>

                <ProgressBar blockId={blockId} />

                {blockRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )
        );
      })}

      {/* RECIPES TAB (All recipes in one view) */}
      {currentTab === "Recipes" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">All Recipes</h2>
            {RECIPES.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* FREEZER TAB */}
      {currentTab === "Freezer" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Freezer Guide & Inventory</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Reheating Guide</h3>
              <div className="bg-blue-50 border-l-4 border-blue-300 p-3 mb-3">
                <h4 className="font-semibold text-gray-700">Broths & Soups</h4>
                <p className="text-gray-600 text-sm">Thaw in fridge or gently warm in saucepan over low heat. Add splash of water if too thick.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-300 p-3 mb-3">
                <h4 className="font-semibold text-gray-700">Congee & Rice Pudding</h4>
                <p className="text-gray-600 text-sm">Thaws thick — add water/milk when reheating. Gentle simmer or microwave with cover.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-300 p-3 mb-3">
                <h4 className="font-semibold text-gray-700">Curries & Stews</h4>
                <p className="text-gray-600 text-sm">Reheat gently in saucepan or microwave. Serve with frozen rice (reheat separately).</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-300 p-3 mb-3">
                <h4 className="font-semibold text-gray-700">Jujube Tea</h4>
                <p className="text-gray-600 text-sm">Frozen cube into saucepan with splash of water, gentle heat. Or pour boiling water over cube in a mug.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-300 p-3 mb-3">
                <h4 className="font-semibold text-gray-700">Egg Bites / Frittata / Quiche</h4>
                <p className="text-gray-600 text-sm">Toaster oven 350F 8-12 min. Not microwave if you can help it.</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Fresh Weekly (Grocery)</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Fresh eggs (back-up for quick breakfasts)</li>
                <li>• Fresh produce: greens for sauteing, herbs for garnish</li>
                <li>• Milk, cream, butter</li>
                <li>• Fresh fruit when in season (top congee, oatmeal)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Iron & TCM Pantry (Thawed as needed)</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Jujubes, goji berries, black sesame seeds (in congee/tea)</li>
                <li>• Nettle tea (brew fresh daily)</li>
                <li>• Dried apricots, dates, pumpkin seeds, walnuts (snack)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Freezer Inventory Tracker</h3>
              <div className="space-y-2">
                {[
                  "Chicken Bone Broth (Round 1)",
                  "Chicken Bone Broth (Round 2)",
                  "Beef Bone Broth",
                  "Golden Broth",
                  "Silkie Tonic",
                  "Congee",
                  "Curries",
                  "Soups",
                  "Stews",
                  "Breakfast (Frittatas, Quiches, Egg Bites)",
                  "Rice",
                  "Other",
                ].map((item) => (
                  <div key={item} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={freezerInventory[item] || false}
                      onChange={(e) =>
                        setFreezerInventory({
                          ...freezerInventory,
                          [item]: e.target.checked,
                        })
                      }
                    />
                    <label className="text-gray-700">{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center text-gray-600 text-sm mt-12 py-4 border-t">
        <p>Made with love for Kelly, Jonny & baby Miller</p>
      </div>
    </div>
  );
}
