"use client";
import { useState, useEffect } from "react";

const PLAN_DATA = {weeks:[{title:"Week 1",notes:["DAYS 1-3: Acute recovery. Massive hormone drop. Iron + protein critical. Warm, easy-to-digest meals. Broth sipping throughout the day.","DAYS 3-5: Baby blues window. Milk coming in. Omega-3s + B vitamins for mood. Caloric needs climbing.","DAYS 5-10: FIRST GROWTH SPURT. Cluster feeding begins. Hunger surges. Calorie-dense meals. Your body suppresses appetite regulation \u2014 eat on demand."],days:[{day:1,description:"Birth day. Gentle, warming. Miyeokguk is THE Korean recovery soup \u2014 iron-rich seaweed + beef. Sweet congee for Kelly healing breakfast.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Beef & Sweet Potato Stew"},{slot:"Dinner",kelly:"Chicken Ginger Congee",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:2,description:"Iron rebuilding. Silkie tonic for blood replenishment. Congee breakfast for postpartum healing.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Sweet Congee (Chai)",jonny:"White Chicken Chili"},{slot:"Dinner",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:3,description:"Day 3: Hormone crash. Milk transitioning. Beef stew for iron. Don\u2019t hold back on hearty food if craving it.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Beef Chili"},{slot:"Dinner",kelly:"Beef & Sweet Potato Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:4,description:"Day 4: Baby blues peak. Salmon for omega-3s \u2014 directly supports mood. B vitamins from egg-based breakfast.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Bolognese + Meatballs"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:5,description:"Day 5: Milk fully in. Engorgement. Caloric needs climbing. Carrot ginger soup for lunch is savory + warming \u2014 different texture from the date congee at breakfast.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Date & Walnut Congee",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"Sweet Potato Coconut Soup"},{slot:"Dinner",kelly:"Beef Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:6,description:"Building toward growth spurt. Calorie-dense dinner. Sweet congee breakfast \u2014 comforting and easy.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Sweet Potato Coconut Soup",jonny:"(same)"},{slot:"Dinner",kelly:"White Chicken Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:7,description:"DAY 7: Growth spurt likely starting. Cluster feeding. Hunger surges. Bolognese + meatballs for calorie density.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Black Bean Soup",jonny:"Beef & Sweet Potato Stew"},{slot:"Dinner",kelly:"Bolognese + Meatballs",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]}]},{title:"Week 2",notes:["DAYS 5-10: FIRST GROWTH SPURT continues.","WEEKS 2-3: Second growth spurt. Sustained elevated appetite. Cumulative sleep deprivation peaks. Nutrient density critical."],days:[{day:8,description:"Growth spurt day 2. Cluster feeding. Eat on demand \u2014 your body needs it.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Chicken Ginger Congee"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:9,description:"Growth spurt peak. Butter chicken = protein + healthy fat. Extra snacks encouraged.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Kabocha & Mung Bean Soup",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef & Sweet Potato Stew",jonny:"Beef Chili"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:10,description:"Growth spurt easing. Bolognese + meatballs for calorie density and iron.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Bolognese + Meatballs",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:11,description:"Between growth spurts. Building reserves. Sweet congee for Kelly, stew for Jonny.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Black Bean Soup",jonny:"Beef & Sweet Potato Stew"},{slot:"Dinner",kelly:"White Chicken Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:12,description:"Butter chicken for protein density. Gentle on digestion, deeply nourishing.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"Black Bean Soup"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:13,description:"Iron and comfort. Beef chili has hidden liver; stew adds B12 and warming nourishment.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef Chili",jonny:"(same)"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:14,description:"Loading iron before week 2-3 growth spurt. Last day of silkie tonic daily schedule.",meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Oatmeal Bowl + Compote",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Beef Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]}]},{title:"Week 3",notes:["WEEKS 2-3: Second growth spurt. Sustained elevated appetite. Sleep deprivation peaks.","WEEK 3-4: THE CRISIS WINDOW. Highest PPD/PPA risk. Iron, protein, B vitamins, choline all mood-supporting."],days:[{day:15,description:"Week 3 growth spurt window. Calorie-dense dinner. Nutrient density matters. Smoothie for Jonny \u2014 using up frozen berries.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Chicken Ginger Congee",jonny:"Moroccan Beef Stew"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:16,description:"Black bean soup \u2014 protein, fiber, iron. Easy on digestion.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Date & Walnut Congee",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Black Bean Soup",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:17,description:"Moroccan beef stew for dinner \u2014 iron + protein-rich. Sweet potato coconut soup at lunch.",meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Kabocha & Mung Bean Soup",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Sweet Potato Coconut Soup",jonny:"Bolognese + Meatballs"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:18,description:"Iron + protein focus. Hidden liver in the chili = stealth nutrition.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Date & Walnut Congee",jonny:"Carrot Ginger Soup"},{slot:"Dinner",kelly:"Beef Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:19,description:"Butter chicken \u2014 protein + healthy fat. Good variety from beef-heavy earlier days.",meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Date & Walnut Congee",jonny:"\u2014"},{slot:"Lunch",kelly:"Sweet Potato Coconut Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:20,description:"Salmon = omega-3 for mood support. Week 3 is highest PPD risk window.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef & Sweet Potato Stew",jonny:"(same)"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:21,description:"Heading into week 3-4 crisis. Moroccan stew is iron + protein dense.",meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Oatmeal Bowl + Compote",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]}]},{title:"Week 4",notes:["WEEK 3-4: THE CRISIS WINDOW. Highest PPD/PPA risk. Growth spurt + sleep debt + hormonal low. Iron, protein, B vitamins, choline all mood-supporting."],days:[{day:22,description:"Crisis window. Beef stew = iron + B12 + comfort. Choline-rich breakfast.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Black Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Beef & Sweet Potato Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:23,description:"Kabocha & mung bean soup for Kelly. Butter chicken for protein-dense dinner.",meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"Beef Chili"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:24,description:"Eggs for choline. White chili for protein.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Chicken Ginger Congee",jonny:"Moroccan Beef Stew"},{slot:"Dinner",kelly:"White Chicken Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:25,description:"Black bean soup for protein amid the intensity.",meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Black Bean Soup",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:26,description:"Salmon again \u2014 omega-3 is your best nutritional ally for mood right now.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Carrot Ginger Soup",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef Chili",jonny:"(same)"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:27,description:"Hidden liver in bolognese = stealth iron + B12. The body doesn\u2019t know, but it benefits.",meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Oatmeal Bowl + Compote",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Sweet Potato Coconut Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Bolognese + Meatballs",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:28,description:"Closing the crisis window. Hormones beginning to rise. You\u2019re through the hardest part.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Date & Walnut Congee",jonny:"Beef & Sweet Potato Stew"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:29,description:"Hormones stabilizing. Sleep still hard but you're through the hardest stretch.",meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Bolognese + Meatballs",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:30,description:"Day 30. One month in. You did it. The fog lifts. You are through the hardest chapter.",meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]}]}]};

// thawMethod: "overnight" = pull night before to thaw in fridge
// thawMethod: "from-frozen" = do NOT pull, always cook from frozen
// ─── Theme Constants ────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#1a1a2e",
  card: "#22223a",
  text: "#e8e0d0",
  textMuted: "#9ca3af",
  accent: "#ffd700",
  border: "#2a2a4a",
  green: "#4ade80",
};

const pixelFont = "'Press Start 2P', monospace";

const REHEAT_GUIDE = {
  "Silkie Chicken Tonic": {
    icon: "🐓",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 5–8 min, stir gently. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Sliced green onion", "Drop of sesame oil"],
    notes: "Gentle simmer only — don't boil. Add a splash of broth if it thickened in the freezer."
  },
  "Golden Broth": {
    icon: "✨",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 5 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Pinch of black pepper", "Optional squeeze of lemon"],
    notes: "Sip throughout the morning. Light and warming."
  },
  "Jujube Goji Ginger Tea": {
    icon: "🍵",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 5 min. Strain solids if desired before serving.",
    toppings: [],
    notes: "Gently sweet. Strain before serving or leave the goji berries in."
  },
  "Chicken Bone Broth": {
    icon: "🫙",
    thawMethod: "overnight",
    reheating: "Stove: med, 5 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Green onion", "Pinch of sea salt if needed"],
    notes: ""
  },
  "Beef Bone Broth (2-cup)": {
    icon: "🫙",
    thawMethod: "overnight",
    reheating: "Stove: med, 5 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Green onion", "Pinch of sea salt if needed"],
    notes: "Kelly's AM broth. Larger portion — two cups."
  },
  "Beef Bone Broth (1-cup)": {
    icon: "🫙",
    thawMethod: "overnight",
    reheating: "Stove: med, 5 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: [],
    notes: "PM sip. Small amount — drink warm."
  },
  "Sweet Congee (Chai)": {
    icon: "🍚",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 8–10 min. Add a splash of MILK (not water) and stir while warming. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Drizzle of honey or maple syrup", "Chopped walnuts or pecans", "Spoonful of berry compote", "Ghee"],
    notes: "Use milk — not water — when reheating. Stir frequently to prevent sticking on the bottom."
  },
  "Date & Walnut Congee": {
    icon: "🍚",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 8–10 min. Add a splash of MILK (not water) and stir while warming. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Extra chopped walnuts", "Drizzle of honey", "Ghee", "Pinch of cinnamon"],
    notes: "Use milk — not water — when reheating. Stir frequently."
  },
  "Chicken Ginger Congee": {
    icon: "🍚",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 8–10 min. Add a splash of chicken broth or water and stir. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Sliced green onion", "Sesame oil", "Grated fresh ginger"],
    notes: "Stir while warming. Add more broth if too thick."
  },
  "Oatmeal Bowl + Compote": {
    icon: "🌾",
    thawMethod: "overnight",
    reheating: "Stove: med, 5–7 min. Add splash of water or milk, stir. Compote is in the fridge — spoon on top after reheating.",
    toppings: ["Berry compote (from fridge jar)", "Hemp seeds", "Chopped nuts", "Ghee", "Honey"],
    notes: "Compote is in a jar in the main fridge. Spoon it on after warming the oats."
  },
  "Miyeokguk": {
    icon: "🌊",
    thawMethod: "overnight",
    reheating: "Stove: med, 8–10 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Sesame oil", "Sliced green onion"],
    notes: "Korean seaweed + beef soup. Iron-rich. Stir gently — the seaweed is delicate."
  },
  "Carrot Ginger Soup": {
    icon: "🥕",
    thawMethod: "overnight",
    reheating: "Stove: med, 8 min, stir. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Coconut cream drizzle", "Pumpkin seeds", "Fresh herbs"],
    notes: ""
  },
  "Sweet Potato Coconut Soup": {
    icon: "🍠",
    thawMethod: "overnight",
    reheating: "Stove: med, 8 min, stir. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Coconut cream drizzle", "Cilantro", "Lime squeeze", "Hemp seeds"],
    notes: ""
  },
  "Kabocha & Mung Bean Soup": {
    icon: "🎃",
    thawMethod: "overnight",
    reheating: "Stove: med, 8–10 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Sesame oil", "Green onion", "Sesame seeds"],
    notes: ""
  },
  "Black Bean Soup": {
    icon: "🫘",
    thawMethod: "overnight",
    reheating: "Stove: med, 8–10 min, stir frequently. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Cilantro", "Lime squeeze", "Avocado slices"],
    notes: ""
  },
  "White Chicken Chili": {
    icon: "🍲",
    thawMethod: "overnight",
    reheating: "Stove: med, 8–10 min, stir. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Cilantro", "Lime squeeze", "Avocado", "Coconut yogurt"],
    notes: ""
  },
  "Beef Chili": {
    icon: "🥘",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 10–12 min, stir frequently. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Cilantro", "Avocado", "Lime squeeze"],
    notes: "Contains hidden liver — iron-rich, totally undetectable in flavour."
  },
  "Beef & Sweet Potato Stew": {
    icon: "🥩",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 10 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Fresh parsley", "Squeeze of lemon"],
    notes: ""
  },
  "Moroccan Beef Stew": {
    icon: "🫕",
    thawMethod: "overnight",
    reheating: "Stove: med-low, 10 min. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Cilantro", "Toasted almonds", "Squeeze of lemon"],
    notes: ""
  },
  "Butter Chicken + Rice": {
    icon: "🍛",
    thawMethod: "overnight",
    reheating: "Stove: med, 8–10 min, stir. Rice is in the bag — heat separately in a pot with a splash of water.",
    toppings: ["Cilantro", "Lime squeeze", "Coconut yogurt"],
    notes: "Rice is already paired in your bag. Reheat curry + rice separately."
  },
  "Bolognese + Meatballs": {
    icon: "🍝",
    thawMethod: "overnight",
    reheating: "Stove: med, 10–12 min, stir. Hot Logic Mini: glass container + lid, 1.5–2 hrs.",
    toppings: ["Nutritional yeast or parmesan", "Fresh basil", "Drizzle of olive oil"],
    notes: "⚠️ No carb is in this bag — make rice or pasta fresh.\n\nIP Rice: Rinse 1 cup rice → add to Instant Pot with 1 cup water → Pressure Cook HIGH 3 min → natural release 10 min → fluff and serve."
  },
  "Salmon Patties + Rice": {
    icon: "🐟",
    thawMethod: "overnight",
    reheating: "Toaster oven: 375°F, 10–12 min, flip halfway. Or skillet: med, 4–5 min per side. Hot Logic Mini: glass + lid, 1.5–2 hrs. Rice is in the bag — heat separately.",
    toppings: ["Lemon squeeze", "Capers or pickles", "Fresh dill or parsley"],
    notes: "Rice is already in the bag. Salmon patties reheat best in the toaster oven — crispy outside."
  },
  "Egg Bites (\u00d73)": {
    icon: "🥚",
    thawMethod: "from-frozen",
    reheating: "Toaster oven: 350°F, 12–15 min, straight from frozen. Or skillet: med-low with lid, 8–10 min, from frozen.",
    toppings: ["Hot sauce", "Sliced avocado", "Fresh herbs"],
    notes: "Do NOT thaw first — always cook from frozen. Works straight from the freezer."
  },
  "Berry Banana Smoothie": {
    icon: "🫐",
    thawMethod: "from-frozen",
    reheating: "Blend straight from frozen: add 1 cup milk or nut milk. Optional: scoop of protein powder. Blend 60 sec.",
    toppings: [],
    notes: "Keep frozen until ready to blend. No thawing needed."
  },
};

const RECIPE_GROUPS = [
  { label: "Broths & Tonics", emoji: "🥣", meals: ["Silkie Chicken Tonic", "Golden Broth", "Jujube Goji Ginger Tea", "Chicken Bone Broth", "Beef Bone Broth (2-cup)", "Beef Bone Broth (1-cup)"] },
  { label: "Congees & Porridge", emoji: "🍚", meals: ["Sweet Congee (Chai)", "Date & Walnut Congee", "Chicken Ginger Congee", "Oatmeal Bowl + Compote"] },
  { label: "Soups", emoji: "🫙", meals: ["Miyeokguk", "Carrot Ginger Soup", "Sweet Potato Coconut Soup", "Kabocha & Mung Bean Soup", "Black Bean Soup", "White Chicken Chili"] },
  { label: "Stews & Chilis", emoji: "🥘", meals: ["Beef Chili", "Beef & Sweet Potato Stew", "Moroccan Beef Stew"] },
  { label: "Curries & Dals", emoji: "🍛", meals: ["Butter Chicken + Rice"] },
  { label: "Mains", emoji: "🍝", meals: ["Bolognese + Meatballs", "Salmon Patties + Rice"] },
  { label: "Breakfast & Smoothies", emoji: "🌅", meals: ["Egg Bites (\u00d73)", "Berry Banana Smoothie"] },
];

const STAPLES = {
  freezer2: {
    label: "Freezer 2 — Garage Small Fridge",
    emoji: "🏠",
    items: [
      { name: "Silkie Chicken Tonic", note: "Daily AM broth, Days 1–14" },
      { name: "Golden Broth", note: "Daily PM sip, Days 1–14" },
      { name: "Jujube Goji Ginger Tea", note: "Rotating PM sip, Days 1–14" },
      { name: "Chicken Bone Broth", note: "AM broth, Days 15–30" },
      { name: "Beef Bone Broth (2-cup)", note: "Kelly AM broth, alternating Days 15–30" },
      { name: "Beef Bone Broth (1-cup)", note: "Kelly PM sip, Days 15–30" },
    ]
  },
  freezer3door: {
    label: "Freezer 3 Door — Lactation Bites & Snacks",
    emoji: "🍫",
    items: [
      { name: "Cashew Butter Chocolate Oat Balls" },
      { name: "Almond Coconut Balls" },
      { name: "Baked Oatmeal Bars" },
      { name: "Cherry-Chocolate Chunk Brownies" },
      { name: "Lactation Oatmeal Cups" },
      { name: "Lactation Savory Muffins" },
    ]
  },
  freezer3main: {
    label: "Freezer 3 Main — Daily Meal Bags",
    emoji: "🧊",
    items: [
      { name: "Day X — Kelly", note: "Labeled by day. Pull the night before to thaw." },
      { name: "Day X — Jonny", note: "Labeled by day. Pull the night before to thaw." },
      { name: "Egg Bites (\u00d73)", note: "Multiple bags. Always cook from frozen — do not pull to thaw." },
      { name: "Berry Banana Smoothie", note: "Multiple bags. Blend straight from frozen — do not pull to thaw." },
    ]
  },
  fridge: {
    label: "Main Home Fridge — Fresh Add-Ons",
    emoji: "❄️",
    items: [
      { name: "Berry Compote", note: "Jar in fridge. Spoon onto oatmeal, congee, yogurt." },
      { name: "Lactation bites rotation", note: "Move small batches from freezer door to fridge. Thaw overnight." },
      { name: "Energy balls", note: "Thaw in fridge. Grab-and-go snack." },
      { name: "Ghee", note: "Add to congees, soups, oatmeal." },
      { name: "Walnuts, hemp seeds, pumpkin seeds", note: "Top anything savoury or sweet." },
      { name: "Dates (Medjool)", note: "Quick energy. Top congee or eat alongside." },
      { name: "Fresh ginger", note: "Grate into broths when reheating for extra warmth." },
    ]
  }
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function getUniqueMeals(dayObj) {
  const seen = new Set();
  const meals = [];
  dayObj.meals.forEach((m) => {
    const jonnyMeal = m.jonny === "(same)" ? m.kelly : m.jonny;
    [m.kelly, jonnyMeal].forEach((meal) => {
      if (meal && meal !== "\u2014" && meal !== "\u2013" && meal !== "—" && meal !== "–" && !seen.has(meal)) {
        seen.add(meal);
        meals.push(meal);
      }
    });
  });
  return meals;
}

function isBrothOrTonic(name) {
  return name.includes("Broth") || name.includes("Tonic") || name.includes("Tea");
}

function getPullList(dayObj) {
  // Returns { mainBagNeeded, freezer2Items, keepFrozen }
  if (!dayObj) return null;
  const allMeals = getUniqueMeals(dayObj);
  const freezer2Items = [];
  const keepFrozen = [];
  allMeals.forEach((meal) => {
    const info = REHEAT_GUIDE[meal];
    if (!info) return;
    if (info.thawMethod === "from-frozen") {
      keepFrozen.push(meal);
    } else if (isBrothOrTonic(meal)) {
      freezer2Items.push(meal);
    }
  });
  return { freezer2Items, keepFrozen };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ReheatingCard({ meal }) {
  const [open, setOpen] = useState(false);
  const info = REHEAT_GUIDE[meal];
  if (!info) return null;

  return (
    <div className="overflow-hidden" style={{ border: `1px solid ${COLORS.border}`, borderRadius: "4px", backgroundColor: COLORS.card }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        style={{ color: COLORS.text }}
      >
        <span className="font-medium text-sm">
          {info.icon} {meal}
          {info.thawMethod === "from-frozen" && (
            <span className="ml-2 text-xs px-1.5 py-0.5 font-medium" style={{ backgroundColor: COLORS.accent + "30", color: COLORS.accent, borderRadius: "4px" }}>keep frozen</span>
          )}
        </span>
        <span className="text-xs ml-2" style={{ color: COLORS.textMuted }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="px-4 py-3 space-y-2.5 text-sm" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.bg }}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.accent }}>Thaw</span>
            <p className="mt-0.5" style={{ color: COLORS.text }}>
              {info.thawMethod === "from-frozen"
                ? "🧊 Keep frozen — do not thaw. Cook directly from frozen."
                : "Pull night before → thaw overnight in fridge."}
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.accent }}>Reheat</span>
            <p className="mt-0.5" style={{ color: COLORS.text }}>{info.reheating}</p>
          </div>
          {info.toppings?.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.accent }}>Toppings</span>
              <p className="mt-0.5" style={{ color: COLORS.text }}>{info.toppings.join(", ")}</p>
            </div>
          )}
          {info.notes ? (
            <div className="text-xs leading-relaxed whitespace-pre-line" style={{ color: COLORS.textMuted }}>{info.notes}</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function DayView({ dayObj }) {
  if (!dayObj) return <p className="text-sm p-4" style={{ color: COLORS.textMuted }}>No data for this day.</p>;
  const dayNum = dayObj.day;
  const allMeals = getUniqueMeals(dayObj);

  // Pull-tonight is for tomorrow's bags
  const allDays = PLAN_DATA.weeks.flatMap((w) => w.days);
  const tomorrowObj = allDays.find((d) => d.day === dayNum + 1);
  const pullInfo = tomorrowObj ? getPullList(tomorrowObj) : null;

  return (
    <div className="space-y-4">
      {/* Why these foods */}
      {dayObj.description && (
        <div className="px-4 py-3" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: COLORS.accent }}>
            Chapter {dayNum} — why these foods
          </div>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.text }}>{dayObj.description}</p>
        </div>
      )}

      {/* Hot Logic reminder */}
      <div className="px-4 py-2.5 text-xs" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.text }}>
        <span className="font-semibold">Hot Logic Mini:</span> glass tupperware + lid only — never the plastic bag. 1.5–2 hrs from thawed.
      </div>

      {/* Pull tonight for tomorrow */}
      {tomorrowObj && pullInfo && (
        <div className="px-4 py-3" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: COLORS.accent }}>
            🌙 Pull tonight for Chapter {dayNum + 1}
          </div>
          <div className="space-y-1.5 text-sm" style={{ color: COLORS.text }}>
            <div>
              <span className="font-medium">Freezer 3 (main):</span>{" "}
              Day {dayNum + 1} Kelly bag + Day {dayNum + 1} Jonny bag
            </div>
            {pullInfo.freezer2Items.length > 0 && (
              <div>
                <span className="font-medium">Freezer 2 (garage fridge):</span>{" "}
                {pullInfo.freezer2Items.join(", ")}
              </div>
            )}
            {pullInfo.keepFrozen.length > 0 && (
              <div className="text-xs" style={{ color: COLORS.textMuted }}>
                Keep frozen (do not pull): {pullInfo.keepFrozen.join(", ")}
              </div>
            )}
          </div>
        </div>
      )}
      {!tomorrowObj && (
        <div className="px-4 py-3 text-sm" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.green}`, borderRadius: "4px", color: COLORS.green }}>
          Last day of the plan — no bags to pull tonight. 🎉
        </div>
      )}

      {/* Bag contents — two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Kelly */}
        <div className="p-3" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
          <div className="font-semibold mb-2 text-sm" style={{ color: COLORS.accent }}>{"Kelly's Bag"}</div>
          {dayObj.meals
            .filter((m) => m.kelly && m.kelly !== "\u2014" && m.kelly !== "—")
            .map((m, i) => (
              <div key={i} className="mb-1.5">
                <div className="text-[10px] uppercase tracking-wide" style={{ color: COLORS.textMuted }}>{m.slot}</div>
                <div className="text-xs font-medium leading-snug" style={{ color: COLORS.text }}>{m.kelly}</div>
              </div>
            ))}
        </div>

        {/* Jonny */}
        <div className="p-3" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
          <div className="font-semibold mb-2 text-sm" style={{ color: COLORS.accent }}>{"Jonny's Bag"}</div>
          {dayObj.meals.map((m, i) => {
            const jonnyMeal = m.jonny === "(same)" ? m.kelly : m.jonny;
            if (!jonnyMeal || jonnyMeal === "\u2014" || jonnyMeal === "—") return null;
            return (
              <div key={i} className="mb-1.5">
                <div className="text-[10px] uppercase tracking-wide" style={{ color: COLORS.textMuted }}>{m.slot}</div>
                <div className="text-xs font-medium leading-snug" style={{ color: COLORS.text }}>{jonnyMeal}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reheat guide */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide mb-2 px-1" style={{ color: COLORS.accent, fontFamily: pixelFont, fontSize: "9px" }}>
          Scroll of Reheating
        </div>
        <div className="space-y-2">
          {allMeals.map((meal) => (
            <ReheatingCard key={meal} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AllRecipesView() {
  return (
    <div className="space-y-6">
      {RECIPE_GROUPS.map((group) => (
        <div key={group.label}>
          <div className="font-semibold mb-2 flex items-center gap-1.5" style={{ color: COLORS.accent, fontFamily: pixelFont, fontSize: "10px" }}>
            <span>{group.emoji}</span>
            <span>{group.label}</span>
          </div>
          <div className="space-y-2">
            {group.meals.map((meal) => (
              <ReheatingCard key={meal} meal={meal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StaplesView() {
  return (
    <div className="space-y-5">
      {Object.values(STAPLES).map((section) => (
        <div key={section.label}>
          <div className="font-semibold mb-2" style={{ color: COLORS.accent, fontFamily: pixelFont, fontSize: "10px" }}>
            {section.emoji} {section.label}
          </div>
          <div className="space-y-1.5">
            {section.items.map((item, i) => (
              <div key={i} className="px-3 py-2 text-sm" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
                <span className="font-medium" style={{ color: COLORS.text }}>{item.name}</span>
                {item.note && (
                  <span style={{ color: COLORS.textMuted }}> — {item.note}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function JonnyPrep() {
  const [tab, setTab] = useState("today");
  const [selectedDay, setSelectedDay] = useState(1);
  const [day1Timestamp, setDay1Timestamp] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("postpartum_day1");
    if (saved) {
      const ts = parseInt(saved, 10);
      setDay1Timestamp(ts);
      const dayNum = Math.max(1, Math.min(30, Math.floor((Date.now() - ts) / 86400000) + 1));
      setSelectedDay(dayNum);
    }
    setHasLoaded(true);
  }, []);

  const totalElapsed = day1Timestamp
    ? Math.floor((Date.now() - day1Timestamp) / 86400000) + 1
    : null;
  const currentDay = totalElapsed ? Math.max(1, Math.min(30, totalElapsed)) : null;
  const isComplete = totalElapsed && totalElapsed > 30;

  function startDay1() {
    const now = Date.now();
    localStorage.setItem("postpartum_day1", now.toString());
    setDay1Timestamp(now);
    setSelectedDay(1);
    setPreviewMode(false);
  }

  function resetDay1() {
    if (!window.confirm("Reset Day 1 date? This will recalculate your current day.")) return;
    localStorage.removeItem("postpartum_day1");
    setDay1Timestamp(null);
    setSelectedDay(1);
    setPreviewMode(false);
  }

  const allDays = PLAN_DATA.weeks.flatMap((w) => w.days);
  const selectedDayObj = allDays.find((d) => d.day === selectedDay);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (!hasLoaded) {
    return <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }} />;
  }

  // ── Pre-birth landing ────────────────────────────────────────────────────
  if (!day1Timestamp && !previewMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: COLORS.bg }}>
        <div className="text-5xl mb-4">🗺️</div>
        <h1 className="text-xl font-bold mb-1" style={{ fontFamily: pixelFont, color: COLORS.accent, fontSize: "12px" }}>{"PROVISIONS"}</h1>
        <p className="mb-6 max-w-xs text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
          {"Start Day 1 from the home screen to unlock the daily meal plan."}
        </p>
        <button
          onClick={() => setPreviewMode(true)}
          className="text-sm px-6 py-3 font-medium"
          style={{ backgroundColor: COLORS.accent, color: COLORS.bg, borderRadius: "4px" }}
        >
          Preview all meals
        </button>
      </div>
    );
  }

  // ── Shared guide UI (active + preview) ──────────────────────────────────
  const progressPct = currentDay ? Math.min(100, (currentDay / 30) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg, maxWidth: "480px", margin: "0 auto" }}>
      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-10" style={{ backgroundColor: COLORS.card, borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="px-4 pt-3 pb-0">
          {/* Title row */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="font-bold text-base leading-tight" style={{ color: COLORS.accent, fontFamily: pixelFont, fontSize: "11px" }}>{"CHAPTER LOG"}</h1>
              {previewMode && (
                <span className="text-xs font-medium" style={{ color: COLORS.accent }}>Preview mode</span>
              )}
              {currentDay && !previewMode && (
                <div className="text-xs" style={{ color: COLORS.textMuted }}>
                  {isComplete ? "30 days complete ✓" : `Day ${currentDay} of 30`}
                </div>
              )}
            </div>
            {/* Start Day 1 button if in preview */}
            {previewMode && (
              <button
                onClick={startDay1}
                className="text-xs px-3 py-1.5 font-medium"
                style={{ backgroundColor: COLORS.accent, color: COLORS.bg, borderRadius: "4px" }}
              >
                Start Day 1 🎉
              </button>
            )}
          </div>

          {/* Progress bar */}
          {currentDay && !previewMode && (
            <div className="h-1.5 mb-2" style={{ backgroundColor: COLORS.border, borderRadius: "4px" }}>
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${progressPct}%`, backgroundColor: COLORS.accent, borderRadius: "4px" }}
              />
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-0 -mb-px">
            {[
              { key: "today", label: "Today" },
              { key: "staples", label: "Staples" },
              { key: "recipes", label: "Recipes" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.key
                    ? "border-b-2"
                    : "border-transparent"
                }`}
                style={{
                  borderBottomColor: tab === t.key ? COLORS.accent : "transparent",
                  color: tab === t.key ? COLORS.accent : COLORS.textMuted,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Day selector (Today tab only) */}
        {tab === "today" && (
          <div className="overflow-x-auto py-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
            <div className="flex gap-1.5 px-4 min-w-max">
              {allDays.map((d) => {
                const isPast = currentDay && d.day < currentDay;
                const isToday = currentDay && d.day === currentDay;
                const isSel = d.day === selectedDay;
                return (
                  <button
                    key={d.day}
                    onClick={() => setSelectedDay(d.day)}
                    className={`relative flex flex-col items-center justify-center min-w-[40px] h-10 text-xs font-semibold transition-all`}
                    style={{
                      backgroundColor: isSel ? COLORS.accent : isPast ? COLORS.border : isToday ? COLORS.accent + "40" : COLORS.card,
                      color: isSel ? COLORS.bg : isPast ? COLORS.textMuted : isToday ? COLORS.accent : COLORS.text,
                      borderRadius: "4px",
                      border: !isSel && isToday ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`,
                      boxShadow: isSel ? `0 0 0 2px ${COLORS.accent}80` : "none",
                    }}
                  >
                    {isToday && !isSel && (
                      <span className="text-[7px] font-bold uppercase leading-none mb-0.5" style={{ color: COLORS.accent }}>
                        TODAY
                      </span>
                    )}
                    <span>{isPast && !isSel ? "✓" : d.day}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Main content ── */}
      <div className="p-4 mx-auto pb-20" style={{ maxWidth: "480px" }}>
        {/* Completion banner */}
        {isComplete && (
          <div className="px-4 py-3 text-center mb-4" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.green}`, borderRadius: "4px" }}>
            <div className="text-2xl mb-1">🎉</div>
            <div className="font-semibold" style={{ color: COLORS.green }}>30 days complete!</div>
            <div className="text-sm" style={{ color: COLORS.green }}>You did it, Jonny. Kelly is through the hardest chapter.</div>
          </div>
        )}

        {tab === "today" && <DayView dayObj={selectedDayObj} currentDay={currentDay} />}
        {tab === "staples" && <StaplesView />}
        {tab === "recipes" && <AllRecipesView />}

        {/* Footer links */}
        <div className="mt-10 text-center space-y-2">
          {day1Timestamp && (
            <button onClick={resetDay1} className="text-xs underline underline-offset-2" style={{ color: COLORS.textMuted }}>
              Change Day 1 date
            </button>
          )}
          {previewMode && (
            <button
              onClick={() => setPreviewMode(false)}
              className="block mx-auto text-xs underline underline-offset-2"
              style={{ color: COLORS.textMuted }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
