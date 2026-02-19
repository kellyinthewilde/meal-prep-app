"use client";
import { useState, useEffect } from "react";

// ── COOKING BLOCKS (3 blocks only) ──
const BLOCKS = [
  { id: 1, title: "Foundations", dates: "Feb 8-14", description: "Broths + Phase 1 Healing Foods", purpose: "Kelly Week 1", color: "amber" },
  { id: 2, title: "Hearty Meals + Sweets", dates: "Feb 18-25", description: "Soups, Curries, Dals, Sweet Bowls, Snack Balls", purpose: "Both Kelly + Jonny", color: "orange" },
  { id: 3, title: "Iron, Protein & Breakfast", dates: "Post-Birth", description: "Beef Stews, Hidden Liver, Breakfast Prep — Jonny handles when ready", purpose: "Jonny cooks", color: "red" },
];

// ── COOK PLAN (phased cooking order) ──
const COOK_PLAN = [
  {
    id: "A",
    title: "Fridge Prep",
    when: "Now",
    description: "No freezer needed. Balls, bites, and pantry prep while waiting for 3rd freezer.",
    bgClass: "bg-violet-50",
    borderClass: "border-violet-200",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-800",
    recipes: [
      { id: 53, note: "No-bake. All 3 batches at once \u2014 45 min total." },
      { id: 80, note: "No-bake. All 3 batches. Food processor + roll." },
      { id: 81, note: "No-bake. All 3 batches. Mix + roll." },
      { id: 82, note: "No-bake. Both batches. Food processor + roll." },
      { id: 52, note: "Oven 18 min per batch. All 3 batches — same tin, just reload." },
      { id: 6, note: "15 min. Fridge jar, lasts 2 weeks." },
      { id: 60, note: "Stove 25 min simmer. Both batches. Drink from fridge." },
    ],
  },
  {
    id: "B",
    title: "Broth + Soups",
    when: "Once freezer opens",
    description: "Run IPs on broth while soups simmer on the stove.",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-200",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    recipes: [
      { id: 51, note: "DONE" },
      { id: 2, note: "Big IP \u2014 3 hrs hands-off. Last R1 batch." },
      { id: 1, note: "Small IP \u2014 2.5 hrs hands-off. Last R1 batch." },
      { id: 3, note: "Stove 20 min. Uses chicken broth as base." },
      { id: 57, note: "Stove 40 min. Eat the beef." },
      { id: 8, note: "Stove 20 min active + 1.5 hr simmer. Batch 2." },
      { id: 9, note: "Stove 30 min. Blend smooth. Batch 2." },
      { id: 11, note: "Roast squash 45 min, then stove 25 min. Both batches." },
    ],
  },
  {
    id: "C",
    title: "Sweet + Breakfast",
    when: "Days 4-5",
    description: "Congees, sweet soups, and egg prep.",
    bgClass: "bg-rose-50",
    borderClass: "border-rose-200",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    recipes: [
      { id: 61, note: "DONE" },
      { id: 78, note: "Stove 20 min + 1.5 hr simmer. Both batches." },
      { id: 62, note: "Stove 45 min. Comfort food." },
      { id: 79, note: "Stove 30 min. Both batches. Mug-drinkable." },
      { id: 55, note: "Oven 18 min per batch. All 4 batches." },
    ],
  },
  {
    id: "D",
    title: "Hearty Meals",
    when: "Days 6-8",
    description: "Curries, soups, chilis. The bulk of your freezer meals.",
    bgClass: "bg-orange-50",
    borderClass: "border-orange-200",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-800",
    recipes: [
      { id: 19, note: "Stove 30 min. Marinate night before. Both batches." },
      { id: 26, note: "Stove 30 min." },
      { id: 63, note: "Stove 40 min simmer. Ayurvedic gold." },
      { id: 12, note: "Stove 2 hrs (dried) or 30 min (canned)." },
      { id: 13, note: "Stove 30 min. Freeze WITHOUT noodles." },
      { id: 14, note: "Stove 25 min. Freeze WITHOUT pasta." },
      { id: 65, note: "Stove 25 min." },
      { id: 66, note: "Stove 30 min." },
      { id: 43, note: "Rice cooker. All 3 batches." },
      { id: 54, note: "Oven 20 min." },
    ],
  },
  {
    id: "E",
    title: "Iron + Protein",
    when: "Days 9-10",
    description: "Hidden liver recipes and omega-3. Critical postpartum nutrition.",
    bgClass: "bg-red-50",
    borderClass: "border-red-200",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
    recipes: [
      { id: 17, note: "Stove 30 min. Hidden liver \u2014 undetectable." },
      { id: 40, note: "Stove + Oven. Brown then bake 15 min." },
      { id: 35, note: "Stove 10 min per side." },
    ],
  },
  {
    id: "F",
    title: "Block 3 / Friends",
    when: "Days 11+ or delegate",
    description: "Stews, breakfast, comfort. Great candidates for friend delegation.",
    bgClass: "bg-sky-50",
    borderClass: "border-sky-200",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-800",
    recipes: [
      { id: 22, note: "Stove 30 min. Hidden liver." },
      { id: 68, note: "Stove/IP 1.5 hrs simmer." },
      { id: 69, note: "Stove/IP 2 hrs simmer." },
      { id: 32, note: "Stove 20 min. Freeze filling only." },
      { id: 45, note: "Stove 20 min. Boil + mash." },
      { id: 72, note: "Stove 30 min. Both batches." },
      { id: 73, note: "Oven 18 min. Both batches." },
      { id: 75, note: "Oven 40 min. All 3 quiches." },
      { id: 77, note: "Oven 35 min. Both batches." },
    ],
  },
];

// ── SHOPPING LISTS ──
const SHOPPING = {
  equipment: [
    "Souper Cubes 2-cup x4 (~$80)",
    "Souper Cubes 1-cup x2 (~$34)",
    "Souper Cubes 1/2-cup x1 (~$15)",
    "Souper Cubes 2-TB x1 (~$15)",
    "Parchment paper for wrapping cubes",
    "Quart freezer bags 4+ boxes",
    "Gallon freezer bags 2+ boxes",
    "Pink Sharpie or tape (Kelly bags)",
    "Blue Sharpie or tape (Jonny bags)",
  ],
  groceries: [
    {
      store: "Butcher / Meat",
      items: [
        "Beef marrow bones 17-22 lbs total — 8 beef broth batches across 6 weeks [B1+B2+B3]",
        "Oxtail 14-19 lbs total — 8 beef broth batches, KEEP THE MEAT [B1+B2+B3]",
        "Whole chickens x3 pasture-raised — chicken broth [B1]",
        "Chicken feet 3 lbs — broth collagen [B1]",
        "Beef brisket 1 lb sliced thin — miyeokguk [B1]",
        "Silkie chicken (black) 1 small — Wu Ji Tang tonic [B1]",
        "Chicken thighs bone-in 5 lbs — butter chicken, chicken noodle, pot pie, white chili [B2+B3]",
        "Italian sausage 1 lb — frittatas [B3]",
        "Ground beef 6 lbs — bolognese, chili, meatballs [B2+B3]",
        "Chicken livers 8 oz — hidden liver (puree into bolognese, chili, meatballs) [B2+B3]",
        "Beef chuck 4 lbs — 2 stews (sweet potato, Moroccan) [B3]",
        "Bacon 1 lb — quiche Lorraine [B3]",
        "Salmon fillets 1 lb or canned salmon x3 — salmon patties [B2]",
      ],
    },
    {
      store: "Asian Market / Weee!",
      items: [
        "Dried miyeok (wakame seaweed) 2 oz — miyeokguk [B1]",
        "Red dates (jujubes) 12 oz — congee, tea, rice pudding, silkie tonic [B1]",
        "Goji berries 8 oz — congee, tea, rice pudding, silkie tonic [B1]",
        "Black sesame seeds 8 oz — sweet congee, rice pudding [B1]",
        "Dried longan 8 oz — silkie tonic [B1]",
        "Dried shiitake 8 oz — silkie tonic [B1]",
        "Fresh turmeric ~12 oz total — 3 golden broth batches [B1+B2+B3]",
        "Fresh ginger 3 large hands — broths, soups, congee, teas, curries [B1+B2+B3]",
        "Green onions 2 bunches — ginger-scallion oil, congee topping [B1]",
        "Toasted sesame oil [B1]",
        "White pepper (ground) [B1]",
        "Coconut aminos [B1]",
        "Fish sauce (Red Boat) [B1]",
        "Astragalus root powder (huang qi) — silkie tonic [B1]",
        "Angelica root powder (dang gui) — silkie tonic [B1]",
        "Garam masala, cumin seeds, mustard seeds, curry leaves [B2]",
        "Fenugreek ground [B2]",
      ],
    },
    {
      store: "Grocery / Trader Joe's",
      items: [
        "Jasmine or basmati rice — big bag (20 lbs) [B1+B2+B3]",
        "Eggs 5+ dozen — egg bites, frittatas, quiche, meatballs, cooking [B1+B2+B3]",
        "Onions 6+ lbs — everything [B1+B2+B3]",
        "Carrots 6+ lbs — soups, broths, stews, extra carrot ginger batches [B1+B2+B3]",
        "Celery 3 bunches — broth + stews [B1+B2+B3]",
        "Garlic 5+ heads — everything [B1+B2+B3]",
        "Sweet potatoes 8+ lbs total — sweet potato coconut soup (2 batches), stew, mashed [B2+B3]",
        "Kabocha squash x3 — kabocha soup (extra batch for later weeks) [B1]",
        "Red lentils 2 lbs — kabocha soup (extra batch) [B1]",
        "Coconut milk x12 cans — soups, congee, curries, dals, rice pudding, sweet potato soup [B1+B2+B3]",
        "Crushed tomatoes (San Marzano) x7 — bolognese, chili, stews, butter chicken [B2+B3]",
        "Tomato paste x4 — broths, stews, sauces [B1+B2+B3]",
        "Ghee 1 large jar — golden broth, cooking, dals [B1+B2]",
        "Cream 1 quart total — butter chicken, dals, quiche [B2+B3]",
        "Whole milk 1/2 gal — rice pudding + oatmeal [B1+B2]",
        "Buttermilk — muffins [B2]",
        "Yogurt (plain) — butter chicken marinade [B2]",
        "Sour cream — white chicken chili [B2]",
        "Cottage cheese — egg bites [B3]",
        "Gruyere 1 lb — quiche Lorraine [B3]",
        "Sharp cheddar 2 blocks — frittatas, muffins [B2+B3]",
        "Honey — sweet congee, rice pudding, jujube tea, oatmeal cups [B1]",
        "Maple syrup — oatmeal cups, baked oatmeal bars [B1+B3]",
        "Cinnamon, cardamom, cumin, curry powder, turmeric (ground) [B1+B2]",
        "Apple cider vinegar — broth [B1]",
        "Peppercorns, thyme, bay leaves — broth [B1]",
        "Neutral oil (avocado or grapeseed) — ginger-scallion oil [B1]",
        "Olive oil — cooking [B2+B3]",
        "Rolled oats large container — lactation bites, oatmeal cups, baked bars [B1+B3]",
        "Steel cut oats large container — oatmeal bowls [B2]",
        "Brewer's yeast — lactation [B1+B2]",
        "Ground flaxseed — lactation [B1+B2]",
        "Chia seeds — lactation bites [B1]",
        "Walnuts raw — oatmeal cups [B1]",
        "Raw almonds — oatmeal cups [B1]",
        "Nut butter (almond or peanut) — oatmeal cups, bites [B1]",
        "Dark chocolate chips — lactation bites [B1]",
        "Medjool dates 2 lbs — date congee, tahini date balls, almond coconut balls [B2]",
        "Walnuts 1 lb — date congee topping [B2]",
        "Tahini 1 jar — tahini date balls [B2]",
        "Cashew butter 1 jar — cashew butter choco oat balls [B2]",
        "Almond butter 1 jar — almond coconut balls [B2]",
        "Shredded coconut (unsweetened) 1 bag — almond coconut balls [B2]",
        "Cacao nibs or extra dark chocolate chips — almond coconut balls [B2]",
        "Coconut flakes (unsweetened) 1 bag — cashew butter choco oat balls [B2]",
        "Dried black beans 1 lb — black bean soup [B2]",
        "Red lentils 1 lb — coconut lentil dal [B2]",
        "Yellow mung dal or red lentils — kitchari [B2]",
        "Dried chickpeas 1 lb or 2 cans — chickpea curry [B2]",
        "Chickpeas 1 can — Moroccan stew [B3]",
        "White beans 2 cans — white chicken chili [B2]",
        "Black beans 1 can — beef chili [B2]",
        "Diced green chiles 2 cans — white chicken chili [B2]",
        "Breadcrumbs — meatballs [B2], salmon patties [B2]",
        "Spinach 2 bags — chickpea curry, minestrone [B2]",
        "Zucchini 2 — savory muffins [B2]",
        "Red bell peppers 2 — frittatas [B3]",
        "Broccoli 2 heads — frittatas [B3]",
        "Fennel seeds — muffins (lactation) [B2]",
        "Flour — muffins [B2]",
        "Cocoa powder — beef chili (flavor depth) [B2]",
        "Pie crusts x3 (store-bought) — quiche [B3]",
        "Puff pastry 1 box — chicken pot pie [B3]",
        "Red wine 1 bottle — bolognese [B3]",
        "Chicken stock backup x2 — pantry safety [B2]",
        "Nettle tea bags — daily iron tonic [B1]",
        "Dried apricots unsulfured — iron snack [B1]",
        "Medjool dates — energy snack [B1]",
        "Pumpkin seeds raw — iron + zinc snack [B1]",
        "Canned sardines x4 — omega-3 pantry snack [B3]",
      ],
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
    batchCount: 2,
    ingredients: [
      "2-3 chicken carcasses (from roasted chickens)",
      "Remaining chicken feet // Blanch in boiling water 2-3 min first to remove impurities",
      "2 onions quartered",
      "4 carrots chopped",
      "4 celery stalks",
      "1 head garlic halved",
      "2 tbsp apple cider vinegar // Helps extract minerals and collagen from bones",
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
    batchCount: 2,
    ingredients: [
      "3-4 lbs beef marrow bones (cut crosswise) // Ask butcher to cut crosswise to expose the marrow",
      "2-3 lbs oxtail // Keep ALL the meat after cooking. Shred and add back to broth or save for congee topping",
      "2 onions",
      "4 carrots",
      "4 celery",
      "1 head garlic",
      "2 tbsp tomato paste",
      "2 tbsp apple cider vinegar // Helps extract minerals and collagen from bones",
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
    batchCount: 2,
    ingredients: [
      "8 cups ROUND 1 chicken broth",
      "3\" fresh turmeric (or 1 tbsp ground) // Stains everything bright yellow. Use gloves or utensils. No need to peel.",
      "2\" fresh ginger",
      "2 tbsp ghee",
      "1/2 tsp black pepper // Activates curcumin absorption by 2000%. Don't skip this.",
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
      "1 small black silkie chicken, whole // Comes with head and feet — normal. Blanch 2-3 min first. Discard head after cooking. Meat will be dark purple-grey — totally normal.",
      "Remaining chicken feet (3-5 pieces)",
      "8-10 red jujubes // Slice in half and remove the small hard pit before adding",
      "2 tbsp goji berries",
      "2 tbsp dried longan",
      "3\" fresh ginger, sliced",
      "4-5 dried shiitake (optional)",
      "Cold water to cover",
      "Salt",
      "1 tsp astragalus root powder // Add in the LAST 15 minutes only, not at the start",
      "1/2 tsp angelica root powder // Add in the LAST 15 minutes only, not at the start",
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
    batchCount: 2,
    ingredients: [
      "10-12 red jujubes // Slice in half and remove the small hard pit before adding",
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
      "1 oz dried miyeok (wakame seaweed) // Expands to 5-8x its size when soaked — don't overdo it",
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
    batchCount: 2,
    ingredients: [
      "2 cups jasmine rice",
      "12 cups ROUND 2 chicken broth",
      "4 cups water",
      "3\" ginger sliced",
      "8-10 jujubes // Slice in half and remove the small hard pit before adding",
      "1 tbsp goji berries",
      "2-3 cups shredded chicken // Use chicken pulled from broth-making",
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
    name: "Sweet Congee (Chai-Spiced)",
    category: "Soups",
    phase: 1,
    track: "kelly",
    kellyWeek: 1,
    tags: ["gentle", "warming", "sweet", "vata-pacifying"],
    ingredients: [
      "3 cups jasmine rice",
      "24 cups water",
      "24-30 red jujubes // Slice in half and remove the small hard pit before adding",
      "6 tbsp goji berries",
      "3 tbsp black sesame seeds // Toast in dry pan. Keep whole — sprinkle on top when serving for crunch.",
      "3 tbsp fresh ginger // Grate on a box grater. It dissolves into the congee during the long simmer.",
      "6 tbsp honey or brown sugar (adjust to taste)",
      "3 cans coconut milk // Shake well before opening",
      "1/4 tsp salt",
      "2 tsp ground cardamom // Add at the END with coconut milk — ground spices go bitter if simmered 1.5 hrs",
      "1 tbsp ground cinnamon // Same — add at the end only",
      "1/4 tsp ground clove // Tiny amount. Clove is aggressive. Start here and taste.",
      "1/4 tsp ground nutmeg",
    ],
    instructions: [
      "Rinse rice in cold water until water runs mostly clear",
      "Combine rice, water, jujubes, goji, and grated ginger in your large pot",
      "Bring to boil — watch it, stir so rice doesn't stick to the bottom",
      "Drop to lowest simmer, lid cracked open, stir every 15-20 min for 1.5 hrs",
      "Stir in coconut milk, honey, ground spices (cardamom, cinnamon, clove, nutmeg), and salt",
      "Simmer 5 more minutes. Taste. Adjust sweetness and spice.",
      "Cool before portioning into 1-cup portions for freezing",
    ],
    yield: "~30 portions (tripled batch). This is a breakfast bowl, not a full meal.",
    freezing: "Freeze in 1-cup Souper Cubes. Thickens a lot when frozen — add a splash of water or milk when reheating on the stove.",
    note: "Warming chai-spiced sweet congee. Jujubes + goji are traditional TCM blood-builders. Warming spices help counter postpartum vata (cold, dry, depleted). Top with toasted black sesame and a drizzle of honey.",
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
      "6-8 jujubes // Slice in half and remove the small hard pit before adding",
      "1 tbsp goji berries",
      "1 tbsp black sesame seeds // Toast in dry pan until fragrant",
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
    freezing: "Freeze in 1-cup Souper Cubes. Add splash of milk when reheating on stovetop.",
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
    batchCount: 2,
    ingredients: [
      "2 lbs carrots // No need to peel — just scrub well. Skin blends right in.",
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
    yield: "~10 two-cup portions per batch. Make 2 batches (20 portions for Weeks 1-4).",
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
    batchCount: 2,
    ingredients: [
      "2 kabocha squash (~4 lbs) // Cut carefully (very hard skin). Roast cut-side down. Scoop flesh out — leave skin behind.",
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
    yield: "~10 two-cup portions per batch. Make 2 batches (20 portions for Weeks 1-4).",
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
      "1 cup neutral oil (grapeseed or vegetable) // Oil should be warm, NOT smoking hot. Hot oil will burn the ginger.",
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
    batchCount: 3,
    ingredients: [
      "2 cups rolled oats",
      "4 tbsp brewer's yeast",
      "4 tbsp ground flaxseed",
      "2 tbsp chia seeds",
      "1/4 cup honey",
      "1/4 cup nut butter // almond or cashew",
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
    yield: "~36 cups (3 batches of 12). At 1-2/snack, lasts ~3-4 weeks.",
    freezing: "Freeze in freezer bags or glass container. Good for 3+ months frozen. Reheat in toaster oven 8-10 min.",
    note: "SNACK, not breakfast. The lactation trifecta: brewer's yeast + flaxseed + oats. Make all 3 batches in one session — same muffin tin, just reload. Reheat in toaster oven, drizzle with honey.",
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
    batchCount: 3,
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup almond butter // or cashew butter",
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
    yield: "~90 bites (3 batches of ~30). At 3 bites/snack, lasts ~30 days.",
    freezing: "Freeze flat on sheet pan, then transfer to freezer bags. Grab 2-3 for a snack. Eat from freezer or let sit 5 min.",
    note: "No-bake lactation snack. Brewer's yeast + flax + chia = milk supply boost. Make all 3 batches at once — 15 min per batch.",
  },
  {
    id: 78,
    name: "Date & Walnut Congee",
    category: "Soups",
    phase: 1,
    block: 2,
    track: "kelly",
    kellyWeek: 1,
    tags: ["gentle", "warming", "sweet", "vata-pacifying"],
    batchCount: 2,
    ingredients: [
      "1 cup jasmine rice",
      "8 cups water",
      "8-10 medjool dates // pitted and roughly chopped, they dissolve",
      "1/2 cup walnuts // roughly chopped, stir in at the end",
      "1 tbsp grated fresh ginger",
      "1 can coconut milk",
      "2 tbsp honey",
      "pinch salt",
      "3/4 tsp ground cardamom",
      "1 tsp cinnamon",
      "1/8 tsp clove",
      "pinch nutmeg"
    ],
    instructions: [
      "Combine rice and water in a large pot",
      "Bring to boil, then reduce heat and simmer for 1.5 hours, stirring occasionally",
      "Add pitted and chopped dates and ginger after 30 minutes of simmering",
      "When rice is very soft and broken down, add coconut milk and honey",
      "Stir in warm spices (cardamom, cinnamon, clove, nutmeg)",
      "Season with salt to taste",
      "Stir in chopped walnuts at the end"
    ],
    yield: "~20 portions (2 batches of ~10 portions each)",
    freezing: "Freeze in 1-cup Souper Cubes. Thickens when frozen — add water or milk when reheating. Top with chopped walnuts and honey.",
    note: "Naturally sweet from the dates — like warm date-walnut cake in congee form. Dates are one of the top postpartum recovery foods across Middle Eastern, Ayurvedic, and TCM traditions."
  },
  {
    id: 79,
    name: "Sweet Potato & Coconut Soup",
    category: "Soups",
    phase: 1,
    block: 2,
    track: "kelly",
    kellyWeek: 1,
    tags: ["sweet", "warming", "mug-friendly", "vata-pacifying"],
    batchCount: 2,
    ingredients: [
      "3 large sweet potatoes // about 3 lbs, peel and cube into 1-inch pieces",
      "1 large onion // diced",
      "3 cloves garlic // minced",
      "2 tbsp fresh ginger // grated",
      "4 cups bone broth // beef or chicken",
      "1 can coconut milk",
      "2 tbsp ghee or coconut oil",
      "1 tsp cinnamon",
      "1/2 tsp cardamom",
      "1/4 tsp nutmeg",
      "salt to taste",
      "optional drizzle of honey or maple syrup"
    ],
    instructions: [
      "Cube sweet potatoes into 1-inch pieces",
      "Heat ghee in a large pot over medium heat",
      "Sauté diced onion until soft, about 5 minutes",
      "Add minced garlic and grated ginger, cook for 1 minute",
      "Add cubed sweet potatoes and bone broth",
      "Bring to boil, then reduce heat and simmer 20-25 minutes until sweet potatoes are very soft",
      "Add coconut milk and warm spices (cinnamon, cardamom, nutmeg)",
      "Blend until completely smooth using an immersion blender",
      "Season with salt to taste",
      "Add honey or maple syrup if desired for extra sweetness"
    ],
    yield: "~16-20 portions (2 batches of ~8-10 two-cup portions each)",
    freezing: "Freeze in 2-cup Souper Cubes. Reheats perfectly — pour into mug, microwave or stovetop.",
    note: "The sweet lunch/dinner option Kelly asked for. 100% mug-drinkable. Naturally sweet, no added sugar needed. Sweet potatoes are rich in vitamin A and fiber."
  },
  {
    id: 80,
    name: "Tahini Date Balls",
    category: "Snacks",
    phase: 2,
    block: 2,
    track: "both",
    tags: ["snack", "sweet", "no-bake", "grab-and-go"],
    batchCount: 3,
    ingredients: [
      "1 cup medjool dates // about 12 dates, pitted; if dry, soak in warm water 10 min and drain",
      "1/3 cup tahini",
      "1 cup rolled oats",
      "1 tsp cinnamon",
      "1/4 tsp cardamom",
      "pinch sea salt",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Blend pitted dates in a food processor until they form a sticky paste",
      "Add tahini, rolled oats, cinnamon, cardamom, salt, and vanilla extract",
      "Pulse until combined — mixture should hold together when pressed",
      "Roll into 1-inch balls",
      "Refrigerate for 30 minutes to firm up"
    ],
    yield: "~60 balls (3 batches of ~20 balls each)",
    freezing: "Freeze flat on a sheet pan, then transfer to freezer bags. Grab from freezer — they're ready to eat in 5 minutes at room temperature.",
    note: "Rich and caramel-y. Tahini adds creaminess, iron, and calcium. One-handed snacking for both Kelly and Jonny."
  },
  {
    id: 81,
    name: "Cashew Butter Chocolate Oat Balls",
    category: "Snacks",
    phase: 2,
    block: 2,
    track: "both",
    tags: ["snack", "sweet", "no-bake", "grab-and-go"],
    batchCount: 3,
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup cashew butter // the creamy, drippy kind works best; stir well before measuring",
      "1/4 cup honey",
      "1/3 cup dark chocolate chips",
      "1/4 cup coconut flakes // unsweetened",
      "pinch sea salt",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Mix all ingredients in a bowl until well combined",
      "If mixture is too dry, add a splash of honey",
      "If mixture is too wet, add more oats",
      "Roll into 1-inch balls",
      "Refrigerate for 30 minutes"
    ],
    yield: "~60 balls (3 batches of ~20 balls each)",
    freezing: "Freeze flat on a sheet pan, then transfer to freezer bags. Eat from freezer or let sit 5 minutes at room temperature.",
    note: "Tastes like a no-bake cookie. Cashew butter is higher in iron and magnesium than peanut butter and easier to digest. Crowd-pleaser for Jonny."
  },
  {
    id: 82,
    name: "Almond Coconut Balls",
    category: "Snacks",
    phase: 2,
    block: 2,
    track: "both",
    tags: ["snack", "sweet", "no-bake", "grab-and-go"],
    batchCount: 2,
    ingredients: [
      "1 cup medjool dates // pitted",
      "1/2 cup almond butter",
      "1/2 cup shredded coconut // unsweetened",
      "2 tbsp cacao nibs // or dark chocolate chips",
      "1/4 tsp cardamom",
      "pinch sea salt",
      "extra shredded coconut // optional, for coating"
    ],
    instructions: [
      "Blend pitted dates in a food processor until they form a sticky paste",
      "Add almond butter, shredded coconut, cacao nibs, cardamom, and salt",
      "Pulse until combined",
      "Roll into 1-inch balls",
      "Roll in extra shredded coconut for coating if desired",
      "Refrigerate for 30 minutes"
    ],
    yield: "~40 balls (2 batches of ~20 balls each)",
    freezing: "Freeze flat on a sheet pan, then transfer to freezer bags. Eat from freezer or let sit 5 minutes at room temperature.",
    note: "More dessert-like, tropical. Almond butter is rich in vitamin E and calcium. The coconut coating makes them feel special."
  },

  // ─── BLOCK 2: Hearty Meals & Phase 2 ───
  {
    id: 19,
    name: "Butter Chicken",
    category: "Curries",
    phase: 2,
    block: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["curry", "warming"],
    batchCount: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes (single serving over rice). Thaw in fridge night before or reheat from frozen on stovetop.",
  },
  {
    id: 26,
    name: "Coconut Lentil Dal",
    category: "Dals",
    phase: 2,
    block: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes. Reheat on stovetop, serve over frozen rice.",
  },
  {
    id: 63,
    name: "Kitchari",
    category: "Dals",
    phase: 2,
    block: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes. Reheat with splash of water or broth — it thickens when frozen.",
    note: "The Ayurvedic gold standard for postpartum recovery. Gentle, warming, deeply nourishing. Easy to digest.",
  },
  {
    id: 12,
    name: "Black Bean Soup",
    category: "Soups",
    phase: 2,
    block: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes. Thick and hearty — reheats perfectly on stovetop.",
  },
  {
    id: 14,
    name: "Minestrone",
    category: "Soups",
    phase: 2,
    block: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes WITHOUT pasta. Cook pasta fresh when serving — add to reheated soup.",
  },
  {
    id: 13,
    name: "Chicken Noodle Soup",
    category: "Soups",
    phase: 2,
    block: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes WITHOUT noodles. Cook egg noodles fresh when serving.",
  },
  {
    id: 65,
    name: "Chickpea Coconut Curry",
    category: "Curries",
    phase: 2,
    block: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes. Serve over frozen rice.",
    note: "Plant-based iron + protein. The spinach wilts into nothing but adds iron.",
  },
  {
    id: 66,
    name: "White Chicken Chili",
    category: "Chilis",
    phase: 2,
    block: 2,
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
    freezing: "Freeze in 2-cup Souper Cubes. Reheat on stovetop — great over rice or with tortilla chips.",
  },
  {
    id: 43,
    name: "Frozen Rice (Batch 1)",
    category: "Bases",
    phase: 2,
    block: 2,
    track: "shared",
    kellyWeek: 1,
    tags: ["base", "staple"],
    batchCount: 3,
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
    freezing: "Freeze in ½-cup Souper Cubes (side portions to pair with curries/stews). Reheat in saucepan with splash of water or microwave 3 min with cover.",
  },
  {
    id: 54,
    name: "Lactation Savory Muffins",
    category: "Snacks",
    phase: 2,
    block: 2,
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
    batchCount: 4,
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
    block: 3,
    track: "shared",
    kellyWeek: 2,
    tags: ["iron", "hidden-liver"],
    ingredients: [
      "2 lbs ground beef",
      "8 oz chicken livers // Puree in blender until completely smooth liquid. This is the hidden liver — 10% ratio, completely undetectable.",
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
    freezing: "Freeze in 2-cup Souper Cubes. Reheat on stovetop, serve over pasta or rice.",
    note: "Liver is puréed to liquid, 10% ratio, mixed in with ground beef. Strong flavors (wine, tomato, herbs) mask completely. Undetectable iron boost.",
  },
  {
    id: 17,
    name: "Beef Chili (Hidden Liver)",
    category: "Chilis",
    phase: 2,
    block: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["chili", "iron", "hidden-liver"],
    ingredients: [
      "2 lbs ground beef",
      "8 oz chicken livers // Puree in blender until completely smooth liquid. Hidden liver — 10% ratio, undetectable.",
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
    freezing: "Freeze in 2-cup Souper Cubes. Reheat on stovetop — great over rice or with cornbread.",
    note: "Hidden liver — chicken livers pur\u00e9ed to liquid, 10% ratio mixed with ground beef. Cocoa deepens flavor. Completely undetectable.",
  },
  {
    id: 40,
    name: "Meatballs (Hidden Liver)",
    category: "Proteins",
    phase: 2,
    block: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["iron", "hidden-liver"],
    ingredients: [
      "2 lbs ground beef",
      "8 oz chicken livers // Puree in blender until completely smooth liquid. Hidden liver — 10% ratio, undetectable.",
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
    freezing: "Freeze flat on sheet pan, then transfer to freezer bags. Drop into minestrone or chicken noodle soup, or reheat standalone with marinara.",
    note: "Hidden liver — chicken livers pur\u00e9ed to liquid, 10% ratio mixed with ground beef. Italian seasoning + tomato paste mask completely. Undetectable.",
  },
  {
    id: 68,
    name: "Beef & Sweet Potato Stew",
    category: "Stews",
    phase: 2,
    block: 3,
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
    freezing: "Freeze in 2-cup Souper Cubes. Reheat on stovetop — complete meal, no side needed.",
    note: "Iron-rich and naturally sweet. The cinnamon + cumin + paprika give it warmth.",
  },
  {
    id: 69,
    name: "Moroccan Beef & Chickpea Stew",
    category: "Stews",
    phase: 2,
    block: 3,
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
    freezing: "Freeze in 2-cup Souper Cubes. Reheat on stovetop. Warming spice blend.",
  },
  {
    id: 32,
    name: "Chicken Pot Pie Filling",
    category: "Comfort",
    phase: 2,
    block: 3,
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
    freezing: "Freeze in 1-cup Souper Cubes. Thaw, pour into ramekin, top with puff pastry, bake 400F 20-25 min.",
  },
  {
    id: 35,
    name: "Salmon Patties + Rice + Warm Greens",
    category: "Proteins",
    phase: 2,
    block: 2,
    track: "shared",
    kellyWeek: 2,
    tags: ["omega-3", "lactation"],
    lactation: true,
    ingredients: [
      "14.75 oz canned salmon (or fresh fillets, cooked, flaked) // Drain well. Soft bones in canned salmon are edible and calcium-rich — leave them in.",
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
    freezing: "Freeze flat on sheet pan with parchment between patties, then transfer to freezer bags. Reheat in skillet or toaster oven. Serve with frozen rice + sauteed greens.",
    note: "Omega-3 supports lactation + baby's brain development.",
  },
  {
    id: 45,
    name: "Mashed Sweet Potatoes",
    category: "Bases",
    phase: 2,
    block: 3,
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
    freezing: "Freeze in ½-cup Souper Cubes (side dish portions). Reheat on stovetop or microwave.",
  },
  {
    id: 72,
    name: "Steel-Cut Oatmeal Bowls",
    category: "Breakfast",
    phase: 2,
    block: 3,
    track: "shared",
    kellyWeek: 2,
    tags: ["breakfast", "warming"],
    batchCount: 2,
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
    freezing: "Freeze in 1-cup Souper Cubes. Reheat with splash of milk on stovetop or microwave.",
    note: "Hearty breakfast base. Top with whatever's in the pantry — honey, walnuts, berries.",
  },
  {
    id: 73,
    name: "Frittata (Sausage + Pepper)",
    category: "Breakfast",
    phase: 2,
    block: 3,
    track: "shared",
    kellyWeek: 2,
    tags: ["breakfast", "protein"],
    batchCount: 2,
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
    id: 75,
    name: "Quiche Lorraine (Bacon + Gruyère)",
    category: "Breakfast",
    phase: 2,
    block: 3,
    track: "shared",
    kellyWeek: 2,
    tags: ["breakfast", "comfort"],
    batchCount: 3,
    ingredients: [
      "1 pie crust (store-bought) // Blind-bake first (375F 10 min with pie weights) to prevent soggy bottom",
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
    freezing: "Wrap individual slices in parchment, then freezer bag. Reheat in toaster oven 350F 10-12 min.",
    note: "The only quiche you need. Bacon + gruyère is classic Lorraine. Freeze slices, reheat in toaster oven.",
  },
  {
    id: 77,
    name: "Baked Oatmeal Bars",
    category: "Snacks",
    phase: 2,
    block: 3,
    track: "shared",
    kellyWeek: 2,
    tags: ["snack", "lactation"],
    batchCount: 2,
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

// ── MAIN COMPONENT ──
export default function MealPrep() {
  const [currentTab, setCurrentTab] = useState("Cook Plan");
  const [recipeNotes, setRecipeNotes] = useState({});
  const [recipeStatus, setRecipeStatus] = useState({});
  const [globalNotes, setGlobalNotes] = useState("");
  const [freezerInventory, setFreezerInventory] = useState({});
  const [shopChecked, setShopChecked] = useState({});
  const [shopTab, setShopTab] = useState("All Groceries");
  const [batchDone, setBatchDone] = useState({});
  const [customBatchCount, setCustomBatchCount] = useState({});

  const TABS = ["Cook Plan", "Daily Guide", "Overview", "Shopping", "Block 1", "Block 2", "Block 3", "Recipes", "Freezer"];

  useEffect(() => {
    const saved = localStorage.getItem("mealprep-v3");
    if (saved) {
      const data = JSON.parse(saved);
      setRecipeNotes(data.notes || {});
      setRecipeStatus(data.status || {});
      setGlobalNotes(data.globalNotes || "");
      setFreezerInventory(data.freezer || {});
      setShopChecked(data.shopChecked || {});
      setBatchDone(data.batchDone || {});
      setCustomBatchCount(data.customBatchCount || {});
    }
  }, []);

  useEffect(() => {
    const toSave = {
      notes: recipeNotes,
      status: recipeStatus,
      globalNotes,
      freezer: freezerInventory,
      shopChecked,
      batchDone,
      customBatchCount,
    };
    localStorage.setItem("mealprep-v3", JSON.stringify(toSave));
  }, [recipeNotes, recipeStatus, globalNotes, freezerInventory, shopChecked, batchDone, customBatchCount]);

  const cycleStatus = (id) => {
    setRecipeStatus((prev) => {
      const current = prev[id] || "todo";
      const next = current === "todo" ? "progress" : current === "progress" ? "done" : "todo";
      return { ...prev, [id]: next };
    });
  };

  const toggleShop = (key) => {
    setShopChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBatch = (recipeId, batchNum) => {
    setBatchDone((prev) => {
      const key = `${recipeId}-${batchNum}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const getEffectiveBatches = (recipe) => {
    if (customBatchCount[recipe.id] != null) return customBatchCount[recipe.id];
    return recipe.batchCount || 1;
  };

  const adjustBatchCount = (recipeId, delta) => {
    setCustomBatchCount((prev) => {
      const recipe = RECIPES.find((r) => r.id === recipeId);
      const base = recipe?.batchCount || 1;
      const current = prev[recipeId] != null ? prev[recipeId] : base;
      const next = Math.max(1, current + delta);
      return { ...prev, [recipeId]: next };
    });
  };

  const scaleIngredient = (ing, multiplier) => {
    if (multiplier === 1) return ing;
    const commentSplit = ing.split(" // ");
    const main = commentSplit[0];
    const comment = commentSplit.length > 1 ? " // " + commentSplit[1] : "";
    const match = main.match(/^(\d+\.?\d*|\d+\/\d+)\s*(-\s*\d+\.?\d*)?\s+(.+)/);
    if (!match) return ing;
    let numStr = match[1];
    let num;
    if (numStr.includes("/")) {
      const [n, d] = numStr.split("/").map(Number);
      num = n / d;
    } else {
      num = parseFloat(numStr);
    }
    const scaled = num * multiplier;
    const rangePart = match[2];
    let rangeScaled = "";
    if (rangePart) {
      const rangeNum = parseFloat(rangePart.replace("-", "").trim());
      rangeScaled = `-${rangeNum * multiplier}`;
    }
    const formatNum = (n) => {
      if (n === Math.floor(n)) return String(n);
      const fracs = [[0.25, "\u00BC"], [0.5, "\u00BD"], [0.75, "\u00BE"], [0.333, "\u2153"], [0.667, "\u2154"]];
      const whole = Math.floor(n);
      const frac = n - whole;
      for (const [val, sym] of fracs) {
        if (Math.abs(frac - val) < 0.05) return whole > 0 ? `${whole}${sym}` : sym;
      }
      return n % 1 === 0 ? String(n) : n.toFixed(1);
    };
    return `${formatNum(scaled)}${rangeScaled} ${match[3]}${comment}`;
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
      if (blockId === 2) return r.block === 2;
      if (blockId === 3) return r.block === 3;
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

  const [expandedDone, setExpandedDone] = useState({});

  const goToRecipe = (recipeId) => {
    const recipe = RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return;
    let targetTab = "Recipes";
    if (recipe.phase === 1 && !recipe.block) targetTab = "Block 1";
    else if (recipe.block === 2) targetTab = "Block 2";
    else if (recipe.block === 3) targetTab = "Block 3";
    setExpandedDone((prev) => ({ ...prev, [recipeId]: true }));
    setCurrentTab(targetTab);
    setTimeout(() => {
      const el = document.getElementById(`recipe-${recipeId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const RecipeCard = ({ recipe }) => {
    const st = recipeStatus[recipe.id] || "todo";
    const isDone = st === "done";
    const isExpanded = !!expandedDone[recipe.id];
    const cardBg = isDone ? "border-emerald-200 bg-emerald-50/30" : st === "progress" ? "border-amber-200 bg-amber-50/20" : "border-gray-300 bg-white";

    if (isDone && !isExpanded) {
      return (
        <div
          id={`recipe-${recipe.id}`}
          className={`border rounded p-3 mb-2 flex items-center justify-between cursor-pointer ${cardBg} hover:bg-emerald-50/50 transition-colors`}
          onClick={() => setExpandedDone((prev) => ({ ...prev, [recipe.id]: true }))}
        >
          <div className="flex items-center gap-3">
            <span className="text-emerald-600 text-lg">&#10003;</span>
            <span className="font-medium text-orange-400 line-through">{recipe.name}</span>
            {getEffectiveBatches(recipe) > 1 && (
              <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{getEffectiveBatches(recipe)} batches</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <StatusBtn id={recipe.id} />
            <span className="text-gray-400 text-xs">tap to expand</span>
          </div>
        </div>
      );
    }

    return (
      <div id={`recipe-${recipe.id}`} className={`border rounded p-4 mb-4 ${cardBg}`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-2">
            {isDone && (
              <button
                onClick={() => setExpandedDone((prev) => ({ ...prev, [recipe.id]: false }))}
                className="text-gray-400 hover:text-gray-600 text-sm mt-1"
                title="Collapse"
              >&#9650;</button>
            )}
            <div>
              <h4 className="font-bold text-lg text-orange-700">{recipe.name}</h4>
              <p className="text-gray-600 text-sm">{recipe.tags.join(" \u2022 ")}</p>
            </div>
          </div>
          <StatusBtn id={recipe.id} />
        </div>

        {(() => {
          const baseBatches = recipe.batchCount || 1;
          const effectiveBatches = getEffectiveBatches(recipe);
          const multiplier = effectiveBatches;
          const isCustom = customBatchCount[recipe.id] != null && customBatchCount[recipe.id] !== baseBatches;
          return (
            <>
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                {recipe.yield && (
                  <p className="text-gray-600 text-sm">
                    <strong>Yield:</strong> {recipe.yield}
                  </p>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-gray-500">Batches:</span>
                  <button
                    onClick={() => adjustBatchCount(recipe.id, -1)}
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center"
                  >&minus;</button>
                  <span className={`text-sm font-bold min-w-[1.5rem] text-center ${isCustom ? "text-violet-700" : "text-gray-900"}`}>{effectiveBatches}</span>
                  <button
                    onClick={() => adjustBatchCount(recipe.id, 1)}
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center"
                  >+</button>
                  {isCustom && (
                    <button
                      onClick={() => setCustomBatchCount((prev) => { const n = { ...prev }; delete n[recipe.id]; return n; })}
                      className="text-xs text-violet-600 hover:text-violet-800 underline ml-1"
                    >reset</button>
                  )}
                </div>
              </div>
              {multiplier > 1 && (
                <p className="text-xs text-violet-600 mb-2">
                  Ingredients shown for {effectiveBatches} {effectiveBatches === 1 ? "batch" : "batches"} ({multiplier}x single recipe)
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Ingredients</h5>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {recipe.ingredients.map((ing, i) => {
                      const scaled = scaleIngredient(ing, multiplier);
                      const parts = scaled.split(" // ");
                      return (
                        <li key={i}>
                          {parts[0]}
                          {parts[1] && <span className="block text-xs text-amber-700 ml-5 mt-0.5">{parts[1]}</span>}
                        </li>
                      );
                    })}
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

              {effectiveBatches > 1 && (
                <div className="mb-3">
                  <h5 className="font-semibold text-gray-700 text-sm mb-1">Batch Progress</h5>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: effectiveBatches }, (_, i) => {
                      const key = `${recipe.id}-${i + 1}`;
                      const done = !!batchDone[key];
                      return (
                        <label key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm cursor-pointer ${done ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-gray-50 border-gray-300 text-gray-600"}`}>
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => toggleBatch(recipe.id, i + 1)}
                            className="w-3.5 h-3.5"
                          />
                          Batch {i + 1}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          );
        })()}

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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 min-h-screen" style={{ background: 'linear-gradient(180deg, #FFF7ED 0%, #FFF1F2 15%, #F8FAFC 40%)' }}>
      <div className="text-center mb-6 pt-2">
        <p className="text-sm font-medium tracking-widest uppercase text-amber-600 mb-2">Postpartum Nourishment</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">Kelly&apos;s Meal Prep</h1>
        <p className="text-gray-500 text-sm">6-week recovery plan — warming foods, healing broths, aligned meals</p>
      </div>

      {/* TABS */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 px-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              currentTab === tab
                ? "bg-amber-700 text-white shadow-md"
                : "bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* COOK PLAN TAB */}
      {currentTab === "Cook Plan" && (() => {
        const allPlanRecipeIds = COOK_PLAN.flatMap((p) => p.recipes.map((r) => r.id));
        const totalRecipes = allPlanRecipeIds.length;
        const doneRecipes = allPlanRecipeIds.filter((id) => recipeStatus[id] === "done").length;
        const overallPct = totalRecipes > 0 ? Math.round((doneRecipes / totalRecipes) * 100) : 0;

        return (
          <div className="space-y-5">
            {/* Overall progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Cooking Progress</h2>
                  <p className="text-sm text-gray-500">{doneRecipes} of {totalRecipes} recipes complete</p>
                </div>
                <span className="text-2xl font-bold text-emerald-600">{overallPct}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
              </div>
            </div>

            {/* Phases */}
            {COOK_PLAN.map((phase) => {
              const phaseRecipeIds = phase.recipes.map((r) => r.id);
              const phaseDone = phaseRecipeIds.filter((id) => recipeStatus[id] === "done").length;
              const phaseTotal = phaseRecipeIds.length;

              return (
                <div key={phase.id} className={`rounded-xl border p-5 ${phase.bgClass} ${phase.borderClass}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${phase.badgeBg} ${phase.badgeText}`}>
                        {phase.id}
                      </span>
                      <span className="font-bold text-gray-900">{phase.title}</span>
                      <span className="text-sm text-gray-500">{phase.when}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{phaseDone}/{phaseTotal}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 ml-9">{phase.description}</p>

                  <div className="space-y-1.5">
                    {phase.recipes.map(({ id, note }) => {
                      const recipe = RECIPES.find((r) => r.id === id);
                      if (!recipe) return null;
                      const st = recipeStatus[id] || "todo";
                      const isDone = st === "done";
                      const isProgress = st === "progress";
                      const dotColor = isDone ? "bg-emerald-500" : isProgress ? "bg-amber-500" : "bg-gray-400";
                      const textClass = isDone ? "text-gray-500 line-through" : "text-gray-900 font-semibold";
                      const noteClass = isDone ? "text-gray-400" : "text-gray-700";

                      const totalBatches = getEffectiveBatches(recipe);
                      const doneBatches = totalBatches > 1
                        ? Array.from({ length: totalBatches }, (_, i) => batchDone[`${id}-${i + 1}`] ? 1 : 0).reduce((a, b) => a + b, 0)
                        : 0;

                      return (
                        <div
                          key={id}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isDone ? "bg-white/40" : "bg-white/70 hover:bg-white"}`}
                        >
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
                          <div
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => goToRecipe(id)}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`${textClass} hover:underline`}>{recipe.name}</span>
                              {totalBatches > 1 && (
                                <span className={`text-xs px-1.5 py-0.5 rounded ${isDone ? "bg-emerald-100 text-emerald-600" : doneBatches > 0 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                                  {doneBatches}/{totalBatches} batches
                                </span>
                              )}
                            </div>
                            {!isDone && <p className={`text-xs ${noteClass} truncate`}>{note}</p>}
                          </div>
                          <div className="flex-shrink-0 cursor-pointer" onClick={() => cycleStatus(id)}>
                            <span className={`text-xs font-medium px-2 py-1 rounded ${isDone ? "bg-emerald-100 text-emerald-700" : isProgress ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                              {isDone ? "\u2713 Done" : isProgress ? "Cooking" : "To Do"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* DAILY GUIDE TAB */}
      {currentTab === "Daily Guide" && (
        <div className="space-y-6">
          {/* Helper Banner */}
          <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/60 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-rose-800 mb-1">Kelly&apos;s Daily Rhythm</h2>
            <p className="text-sm text-gray-600">Not a rigid schedule. A rhythm to follow. Pick what sounds good from each phase&apos;s options.</p>
          </div>

          {/* Week 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">WEEK 1</span>
              <span className="text-gray-800 font-semibold">Gentle Recovery (Phase 1)</span>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-100">
                <h4 className="font-bold text-gray-800 mb-2">Daily Broth Schedule (4 cups/day)</h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-amber-200/60 shadow-sm">
                    <p className="font-semibold text-amber-700 text-xs uppercase tracking-wide mb-1">Morning</p>
                    <p className="text-gray-900 font-medium">2-cup portion</p>
                    <p className="text-gray-500 text-xs mt-1">Beef or chicken broth. Sip slowly.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-amber-200/60 shadow-sm">
                    <p className="font-semibold text-amber-700 text-xs uppercase tracking-wide mb-1">Afternoon</p>
                    <p className="text-gray-900 font-medium">1-cup portion</p>
                    <p className="text-gray-500 text-xs mt-1">Golden broth, silkie tonic, or jujube tea.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-amber-200/60 shadow-sm">
                    <p className="font-semibold text-amber-700 text-xs uppercase tracking-wide mb-1">Evening</p>
                    <p className="text-gray-900 font-medium">1-cup portion</p>
                    <p className="text-gray-500 text-xs mt-1">Beef or chicken broth. Wind down.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Breakfast Options <span className="font-normal text-gray-500 normal-case tracking-normal">(pick one)</span></h4>
                <div className="grid grid-cols-2 gap-2.5 text-sm text-gray-700">
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Congee + Egg</strong> — reheat congee, top with soft-boiled egg, ginger-scallion oil, black sesame, jujubes</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Egg Bites x3</strong> — toaster oven 8 min. Quick protein.</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Sweet Congee</strong> — jujubes + goji + black sesame already in it. Warming comfort.</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Warm Rice Pudding</strong> — jujubes + goji + cinnamon. Like a hug.</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Date &amp; Walnut Congee</strong> — warm, sweet, dates dissolve in. Top with walnuts + honey.</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Lunch &amp; Dinner Options <span className="font-normal text-gray-500 normal-case tracking-normal">(pick one each)</span></h4>
                <div className="grid grid-cols-2 gap-2.5 text-sm text-gray-700">
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Miyeokguk</strong> — Korean seaweed + beef soup. Eat the beef.</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Congee (savory)</strong> — top with shredded chicken from broth-making.</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Carrot Ginger Soup</strong> — made with bone broth base.</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Kabocha &amp; Red Lentil Soup</strong> — protein from lentils + bone broth.</div>
                  <div className="bg-amber-50/40 rounded-lg p-3 border border-amber-100/60"><strong className="text-gray-900">Sweet Potato &amp; Coconut Soup</strong> — sweet + warming, mug-drinkable. Made with bone broth.</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Snacks <span className="font-normal text-gray-500 normal-case tracking-normal">(throughout the day)</span></h4>
                <p className="text-sm text-gray-700">Lactation Bites x2-3 • Oatmeal Cup (snack, not meal) • Tahini Date Balls • Cashew Butter Choco Oat Balls • Almond Coconut Balls • Nettle tea • Jujube goji ginger tea • Pumpkin seeds • Dried apricots • Dates • Walnuts</p>
              </div>

              <div className="bg-rose-50/60 rounded-xl p-4 text-sm text-gray-700 border border-rose-100/60">
                <strong className="text-rose-800">Week 1 reminders:</strong> Everything warm. No cold food or drinks. Sip broth slowly. Eat the silkie meat with the tonic. Miyeokguk has beef in it. If Kelly doesn&apos;t want a meal, broth is always the fallback.
              </div>
            </div>
          </div>

          {/* Weeks 2-3 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">WEEKS 2-3</span>
              <span className="text-gray-800 font-semibold">Rebuilding (Phase 2)</span>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50/70 rounded-xl p-4 border border-orange-100">
                <h4 className="font-bold text-gray-800 mb-2">Broth Schedule (4 cups/day week 2, then 2 cups/day week 3)</h4>
                <p className="text-sm text-gray-700">Week 2: same as Week 1 (AM 2-cup + PM 1-cup + Eve 1-cup). Week 3: AM 1-cup + Eve 1-cup.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Breakfast <span className="font-normal text-gray-500 normal-case tracking-normal">(Kelly picks from Phase 1 + egg options)</span></h4>
                <p className="text-sm text-gray-700">Congee + Egg • Egg Bites • Sweet Congee • Date &amp; Walnut Congee • Warm Rice Pudding • Frittata slices • Quiche Lorraine slices</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Lunch &amp; Dinner <span className="font-normal text-gray-500 normal-case tracking-normal">(aligned with Jonny where possible)</span></h4>
                <p className="text-sm text-gray-700 mb-2">Heat the same thing for both of you. Green cells in the spreadsheet = aligned meals.</p>
                <div className="grid grid-cols-3 gap-2.5 text-sm text-gray-700">
                  <div className="bg-orange-50/40 rounded-lg p-3 border border-orange-100/60"><strong className="text-gray-900">Soups:</strong> Black Bean, Minestrone + Meatballs, Chicken Noodle</div>
                  <div className="bg-orange-50/40 rounded-lg p-3 border border-orange-100/60"><strong className="text-gray-900">Curries &amp; Dals:</strong> Butter Chicken, Chickpea Coconut Curry, Coconut Lentil Dal, Kitchari</div>
                  <div className="bg-orange-50/40 rounded-lg p-3 border border-orange-100/60"><strong className="text-gray-900">Comfort:</strong> White Chicken Chili, Chicken Pot Pie</div>
                  <div className="bg-orange-50/40 rounded-lg p-3 border border-orange-100/60"><strong className="text-gray-900">Omega-3:</strong> Salmon Patties + Rice + Warm Greens</div>
                  <div className="bg-orange-50/40 rounded-lg p-3 border border-orange-100/60"><strong className="text-gray-900">Phase 1 comfort:</strong> Miyeokguk, Kabocha Soup (Kelly anytime)</div>
                </div>
              </div>

              <div className="bg-orange-50/60 rounded-xl p-4 text-sm text-gray-700 border border-orange-100/60">
                <strong className="text-orange-800">Weeks 2-3 reminders:</strong> Still keep everything warm. Kelly can eat from the full Phase 2 menu. All curries and stews served over frozen rice. Jonny has been eating this since Day 1.
              </div>
            </div>
          </div>

          {/* Weeks 4-6 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">WEEKS 4-6</span>
              <span className="text-gray-800 font-semibold">Full Variety (Phase 3)</span>
            </div>
            <div className="space-y-4">
              <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-100">
                <h4 className="font-bold text-gray-800 mb-2">Broth Schedule (2 cups/day)</h4>
                <p className="text-sm text-gray-700">AM 1-cup + Eve 1-cup. Still nourishing, less intensive.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Everything from Phase 2 PLUS:</h4>
                <div className="grid grid-cols-2 gap-2.5 text-sm text-gray-700">
                  <div className="bg-emerald-50/40 rounded-lg p-3 border border-emerald-100/60"><strong className="text-gray-900">Iron-rich stews:</strong> Beef &amp; Sweet Potato, Moroccan Beef &amp; Chickpea</div>
                  <div className="bg-emerald-50/40 rounded-lg p-3 border border-emerald-100/60"><strong className="text-gray-900">Hidden liver meals:</strong> Bolognese, Beef Chili, Meatballs (add to soups)</div>
                  <div className="bg-emerald-50/40 rounded-lg p-3 border border-emerald-100/60"><strong className="text-gray-900">Breakfast variety:</strong> Steel-Cut Oatmeal, Frittata, Quiche, Baked Oatmeal Bars</div>
                  <div className="bg-emerald-50/40 rounded-lg p-3 border border-emerald-100/60"><strong className="text-gray-900">Cold foods OK:</strong> Chia pudding (make fresh weekly), raw greens, salads</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">All lunches and dinners aligned</h4>
                <p className="text-sm text-gray-700">You and Jonny eat the same thing at every meal. Just grab two portions of whatever sounds good.</p>
              </div>
            </div>
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
          {/* Tab selector */}
          <div className="flex gap-2">
            {["All Groceries", "Equipment", "Broth Plan"].map((label) => (
              <button
                key={label}
                onClick={() => setShopTab(label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  shopTab === label
                    ? "bg-amber-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* All Groceries */}
          {shopTab === "All Groceries" && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 font-medium">Complete shopping list for the full 6-week postpartum plan. Organized by store. Phase labels show which cooking block each ingredient is for: [B1] = Foundations, [B2] = Hearty Meals, [B3] = Iron, Protein &amp; Breakfast.</p>
              </div>
              {SHOPPING.groceries.map((storeSection) => {
                const storeItems = storeSection.items;
                const checkedCount = storeItems.filter((_, i) => shopChecked[`sh-${storeSection.store}-${i}`]).length;

                return (
                  <div key={storeSection.store} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold">{storeSection.store}</h3>
                      <span className="text-sm text-gray-500">{checkedCount}/{storeItems.length}</span>
                    </div>
                    <div className="space-y-2">
                      {storeItems.map((item, i) => {
                        const key = `sh-${storeSection.store}-${i}`;
                        return (
                          <label key={key} className="flex items-start gap-3 py-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!shopChecked[key]}
                              onChange={() => toggleShop(key)}
                              className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0"
                            />
                            <span className={`text-sm leading-relaxed ${shopChecked[key] ? "line-through text-gray-400" : "text-gray-700"}`}>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Equipment */}
          {shopTab === "Equipment" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-3">Freeze Setup Equipment</h3>
              <div className="space-y-2">
                {SHOPPING.equipment.map((item, i) => (
                  <label key={i} className="flex items-start gap-3 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!shopChecked[`eq-${i}`]}
                      onChange={() => toggleShop(`eq-${i}`)}
                      className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0"
                    />
                    <span className={`text-sm ${shopChecked[`eq-${i}`] ? "line-through text-gray-400" : "text-gray-700"}`}>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Broth Plan */}
          {shopTab === "Broth Plan" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-2">6-Week Broth Plan</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Weeks 1-2: 4 cups/day (AM 2-cup + PM 1-cup + Eve 1-cup) = 56 cups.
                  Weeks 3-6: 2 cups/day (AM 1-cup + Eve 1-cup) = 56 cups.
                  Total needed: ~112 cups.
                </p>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-emerald-800 mb-2">Already Frozen</h4>
                  <p className="text-sm text-emerald-700">11 two-cup chicken broth portions (22 cups)</p>
                  <p className="text-sm text-emerald-700">4 two-cup golden broth portions (8 cups)</p>
                  <p className="text-sm text-emerald-700 font-medium mt-1">Total banked: 30 cups</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-amber-800 mb-2">Still Need: ~82 cups</h4>
                </div>

                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2 border border-gray-200">Broth Type</th>
                      <th className="text-center p-2 border border-gray-200">Batches</th>
                      <th className="text-center p-2 border border-gray-200">When</th>
                      <th className="text-left p-2 border border-gray-200">Freeze As</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-gray-200 font-medium">Beef Broth (sipping)</td>
                      <td className="p-2 border border-gray-200 text-center">8 batches total</td>
                      <td className="p-2 border border-gray-200 text-center text-gray-600">B1: 1, B2: 3, B3: 4</td>
                      <td className="p-2 border border-gray-200 text-gray-600">
                        <strong>16 two-cup</strong> portions (AM sipping weeks 1-2)<br/>
                        <strong>40 one-cup</strong> portions (PM/Eve + weeks 3-6)
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 border border-gray-200 font-medium">Chicken Broth</td>
                      <td className="p-2 border border-gray-200 text-center">3 batches total</td>
                      <td className="p-2 border border-gray-200 text-center text-gray-600">B1: 1 (done), B2: 1, B3: 1</td>
                      <td className="p-2 border border-gray-200 text-gray-600">
                        <strong>11 two-cup already frozen.</strong><br/>
                        Remaining batches: use as golden broth base
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-gray-200 font-medium">Golden Broth</td>
                      <td className="p-2 border border-gray-200 text-center">3 batches total</td>
                      <td className="p-2 border border-gray-200 text-center text-gray-600">B1: 1 (done), B2: 1, B3: 1</td>
                      <td className="p-2 border border-gray-200 text-gray-600">
                        <strong>4 two-cup already frozen.</strong><br/>
                        Remaining: <strong>8 two-cup</strong> + <strong>8 one-cup</strong> portions
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 border border-gray-200 font-medium">Silkie Tonic</td>
                      <td className="p-2 border border-gray-200 text-center">1 batch</td>
                      <td className="p-2 border border-gray-200 text-center text-gray-600">B1</td>
                      <td className="p-2 border border-gray-200 text-gray-600">
                        <strong>7 one-cup</strong> portions (Week 1 only). Eat the meat!
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-gray-200 font-medium">Jujube Goji Ginger Tea</td>
                      <td className="p-2 border border-gray-200 text-center">2-3 batches</td>
                      <td className="p-2 border border-gray-200 text-center text-gray-600">B1: 1, then as needed</td>
                      <td className="p-2 border border-gray-200 text-gray-600">
                        <strong>1-cup</strong> portions. Reheat on stove or pour boiling water over cube.
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-700 mb-2">Freeze Size Guide</h4>
                  <p className="text-sm text-gray-600 mb-1"><strong>2-cup portions:</strong> Morning sipping sessions (Weeks 1-2). You sit down with a big warm mug.</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>1-cup portions:</strong> Afternoon + evening sips, and all sipping in Weeks 3-6. Smaller, more frequent.</p>
                  <p className="text-sm text-gray-600"><strong>Preference:</strong> Beef broth is your primary sipper. Chicken broth mostly becomes golden broth. Golden broth is the afternoon tonic.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BLOCK TABS */}
      {TABS.slice(4, 7).map((blockName, idx) => {
        const blockId = idx + 1;
        const block = BLOCKS[idx];
        const blockRecipes = RECIPES.filter((r) => {
          if (blockId === 1) return r.phase === 1;
          if (blockId === 2) return r.block === 2;
          if (blockId === 3) return r.block === 3;
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
