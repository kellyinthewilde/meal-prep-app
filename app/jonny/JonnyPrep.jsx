"use client";
import { useState } from "react";

// ── PLAN DATA (30 days) ──
const PLAN_DATA = {weeks:[{title:"Week 1",days:[{day:1,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Beef & Sweet Potato Stew"},{slot:"Dinner",kelly:"Chicken Ginger Congee",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:2,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Sweet Congee (Chai)",jonny:"White Chicken Chili"},{slot:"Dinner",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:3,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Beef Chili"},{slot:"Dinner",kelly:"Beef & Sweet Potato Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:4,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Bolognese + Meatballs"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:5,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Date & Walnut Congee",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"Sweet Potato Coconut Soup"},{slot:"Dinner",kelly:"Beef Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:6,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Sweet Potato Coconut Soup",jonny:"(same)"},{slot:"Dinner",kelly:"White Chicken Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:7,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Black Bean Soup",jonny:"Beef & Sweet Potato Stew"},{slot:"Dinner",kelly:"Bolognese + Meatballs",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]}]},{title:"Week 2",days:[{day:8,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Miyeokguk",jonny:"Chicken Ginger Congee"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:9,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Kabocha & Mung Bean Soup",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef & Sweet Potato Stew",jonny:"Kitchari"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:10,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Coconut Mung Bean Dal + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:11,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Black Bean Soup",jonny:"Kitchari"},{slot:"Dinner",kelly:"Chickpea Curry + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:12,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"Black Bean Soup"},{slot:"Dinner",kelly:"Kitchari",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]},{day:13,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef Chili",jonny:"(same)"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Golden Broth",jonny:"\u2014"}]},{day:14,meals:[{slot:"AM Broth",kelly:"Silkie Chicken Tonic",jonny:"\u2014"},{slot:"Breakfast",kelly:"Oatmeal Bowl + Compote",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Beef Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Jujube Goji Ginger Tea",jonny:"\u2014"}]}]},{title:"Week 3",days:[{day:15,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Chicken Ginger Congee",jonny:"Moroccan Beef Stew"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:16,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Date & Walnut Congee",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Black Bean Soup",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:17,meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Kabocha & Mung Bean Soup",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Sweet Potato Coconut Soup",jonny:"Bolognese + Meatballs"},{slot:"Dinner",kelly:"Coconut Mung Bean Dal + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:18,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Date & Walnut Congee",jonny:"Carrot Ginger Soup"},{slot:"Dinner",kelly:"Beef Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:19,meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Date & Walnut Congee",jonny:"Oatmeal Bowl + Compote"},{slot:"Lunch",kelly:"Sweet Potato Coconut Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Chickpea Curry + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:20,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef & Sweet Potato Stew",jonny:"(same)"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:21,meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Oatmeal Bowl + Compote",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Moroccan Beef Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]}]},{title:"Week 4",days:[{day:22,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Black Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Beef & Sweet Potato Stew",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:23,meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Oatmeal Bowl + Compote"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"Coconut Mung Bean Dal + Rice"},{slot:"Dinner",kelly:"Butter Chicken + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:24,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Chicken Ginger Congee",jonny:"Moroccan Beef Stew"},{slot:"Dinner",kelly:"White Chicken Chili",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:25,meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Chicken Ginger Congee",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Kitchari",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:26,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Carrot Ginger Soup",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Beef Chili",jonny:"(same)"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:27,meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Oatmeal Bowl + Compote",jonny:"Egg Bites (\u00d73)"},{slot:"Lunch",kelly:"Kitchari",jonny:"(same)"},{slot:"Dinner",kelly:"Bolognese + Meatballs",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:28,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Date & Walnut Congee",jonny:"Kitchari"},{slot:"Dinner",kelly:"Chickpea Curry + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:29,meals:[{slot:"AM Broth",kelly:"Beef Bone Broth (2-cup)",jonny:"\u2014"},{slot:"Breakfast",kelly:"Egg Bites (\u00d73)",jonny:"(same)"},{slot:"Lunch",kelly:"Kabocha & Mung Bean Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Kitchari",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]},{day:30,meals:[{slot:"AM Broth",kelly:"Chicken Bone Broth",jonny:"\u2014"},{slot:"Breakfast",kelly:"Sweet Congee (Chai)",jonny:"Berry Banana Smoothie"},{slot:"Lunch",kelly:"Carrot Ginger Soup",jonny:"(same)"},{slot:"Dinner",kelly:"Salmon Patties + Rice",jonny:"(same)"},{slot:"PM Sip",kelly:"Beef Bone Broth (1-cup)",jonny:"\u2014"}]}]}]};

// Flatten all days for easy lookup
const ALL_DAYS = PLAN_DATA.weeks.flatMap(w => w.days);

// ── RECIPE REHEAT GUIDE ──
// thawMethod: "overnight" | "from-frozen"
// reheating: how to actually heat it
// toppings: optional add-ons
// notes: extra context
const REHEAT_GUIDE = {
  "Silkie Chicken Tonic": {
    thawMethod: "overnight",
    reheating: "Pot or microwave on medium-low 3–4 min. Don\u2019t boil. Gentle heat only.",
    toppings: [],
    notes: "Kelly only. Pour into a mug — it\u2019s a sipping broth, not a bowl meal.",
    icon: "🍵",
  },
  "Golden Broth": {
    thawMethod: "overnight",
    reheating: "Pot or microwave 3 min. Whisk if turmeric has settled.",
    toppings: ["Pinch of black pepper (helps absorb curcumin)", "Splash of coconut milk for creaminess"],
    notes: "Kelly only. Sipping broth. Drink warm, not hot.",
    icon: "✨",
  },
  "Jujube Goji Ginger Tea": {
    thawMethod: "overnight",
    reheating: "Pot or microwave 3 min. Can add a little hot water if too concentrated.",
    toppings: ["Optional: drizzle of honey"],
    notes: "Kelly only. Sweet and gingery. Serve in a mug.",
    icon: "🍵",
  },
  "Chicken Bone Broth": {
    thawMethod: "overnight",
    reheating: "Microwave 3 min or small pot 5 min. PM sip only — pour into a mug.",
    toppings: ["Pinch of salt if needed", "Optional: few drops toasted sesame oil"],
    notes: "Served as PM sip (1-cup) or AM broth (2-cup). Check bag label for size.",
    icon: "🥣",
  },
  "Beef Bone Broth (2-cup)": {
    thawMethod: "overnight",
    reheating: "Microwave 4 min or small pot 5 min. AM broth — serve in a bowl or large mug.",
    toppings: ["Pinch of salt", "Optional: fresh ginger grated in"],
    notes: "2-cup portion. Mornings only for Kelly.",
    icon: "🥣",
  },
  "Beef Bone Broth (1-cup)": {
    thawMethod: "overnight",
    reheating: "Microwave 2–3 min. PM sip — pour into a mug.",
    toppings: ["Pinch of salt", "Optional: few drops sesame oil"],
    notes: "1-cup evening portion. Both Kelly and Jonny get this slot from Day 15 on.",
    icon: "🥣",
  },
  "Sweet Congee (Chai)": {
    thawMethod: "overnight",
    reheating: "Microwave 3 min, stir halfway. Or pot on medium 5 min with lid. Add a splash of water if thick.",
    toppings: ["Handful of granola or toasted coconut flakes", "Sliced banana or fresh berries", "Drizzle of honey or maple syrup", "Sprinkle of cinnamon"],
    notes: "Chai-spiced sweet congee. Thick and porridge-like. Stir well before serving.",
    icon: "🍚",
  },
  "Date & Walnut Congee": {
    thawMethod: "overnight",
    reheating: "Microwave 3 min, stir halfway. Add a splash of water if thick.",
    toppings: ["Extra chopped dates", "Toasted walnuts", "Drizzle of honey", "Sprinkle of cinnamon or cardamom"],
    notes: "Sweet, rich, warming breakfast. Kelly loves this one.",
    icon: "🍚",
  },
  "Chicken Ginger Congee": {
    thawMethod: "overnight",
    reheating: "Microwave 3–4 min, stir halfway. Or pot on medium 5–6 min. Loosen with a splash of broth or water.",
    toppings: ["Sliced green onion (scallion)", "Drizzle of toasted sesame oil", "Pinch of white pepper", "Crispy shallots if you have them", "Soft-boiled egg, halved (optional)"],
    notes: "Savory rice porridge. Ginger-forward. Good for any meal of the day.",
    icon: "🍚",
  },
  "Egg Bites (\u00d73)": {
    thawMethod: "from-frozen",
    reheating: "Toaster oven: 325\u00b0F for 8–10 min directly from frozen. Microwave: 60–90 sec from frozen (wrap in damp paper towel). Don\u2019t thaw — they get rubbery.",
    toppings: ["Hot sauce (Cholula or Valentina)", "Sliced avocado", "Salsa", "Sprinkle of everything bagel seasoning"],
    notes: "3 bites per bag. Reheat from frozen \u2014 DO NOT thaw overnight. Toaster oven gives best texture.",
    icon: "🥚",
  },
  "Oatmeal Bowl + Compote": {
    thawMethod: "overnight",
    reheating: "Oatmeal: microwave 2–3 min with a splash of milk or water, stir well. Compote: microwave 45 sec in a small bowl.",
    toppings: ["Fresh or frozen berries", "Sliced banana", "Sprinkle of hemp seeds or flaxseed", "Drizzle of almond butter or honey", "Chopped toasted walnuts"],
    notes: "Two bags: one oatmeal, one compote portion. Microwave separately and spoon compote on top.",
    icon: "🥣",
  },
  "Berry Banana Smoothie": {
    thawMethod: "from-frozen",
    reheating: "Blend from frozen: dump bag into blender, add \u00be cup milk of choice and blend 30–45 sec. No need to thaw.",
    toppings: ["Handful of spinach (blends in invisibly)", "Scoop of protein powder", "Tablespoon of almond butter", "Chia seeds"],
    notes: "Jonny only. Frozen smoothie pack \u2014 blend straight from frozen.",
    icon: "🫐",
  },
  "Miyeokguk": {
    thawMethod: "overnight",
    reheating: "Pot on medium 5–7 min until hot through. Or microwave 4 min, stirring halfway. Add a splash of water if too thick.",
    toppings: ["Splash of toasted sesame oil", "Pinch of sea salt", "A few drops fish sauce (optional)"],
    notes: "Kelly only. Korean seaweed soup — traditional postpartum recovery. Earthy, mild, nutritious.",
    icon: "🫙",
  },
  "Carrot Ginger Soup": {
    thawMethod: "overnight",
    reheating: "Microwave 3–4 min, stir halfway. Or pot 5 min on medium. Thin with a splash of broth or water if too thick.",
    toppings: ["Swirl of coconut cream or sour cream", "Toasted pumpkin seeds (pepitas)", "Drizzle of olive oil", "Fresh cilantro or parsley", "Squeeze of lime (brightens flavor)"],
    notes: "Smooth blended soup. Light lunch — pair with 2–3 meatballs or egg bites if she\u2019s extra hungry.",
    icon: "🥕",
  },
  "Sweet Potato Coconut Soup": {
    thawMethod: "overnight",
    reheating: "Microwave 3–4 min, stir halfway. Or pot 5 min on medium.",
    toppings: ["Swirl of coconut cream", "Toasted coconut flakes", "Drizzle of chili oil or red pepper flakes", "Fresh cilantro", "Squeeze of lime"],
    notes: "Creamy, slightly sweet. Light lunch — consider adding egg bites or meatballs for more protein.",
    icon: "🍠",
  },
  "Kabocha & Mung Bean Soup": {
    thawMethod: "overnight",
    reheating: "Microwave 3–4 min, stir halfway. Or pot 5 min on medium. May thicken up — add a splash of water.",
    toppings: ["Drizzle of sesame oil", "Sprinkle of toasted sesame seeds", "Pinch of white pepper", "Fresh ginger grated in (optional)"],
    notes: "Japanese pumpkin + mung bean. Hearty and slightly sweet. More substantial than the other soups.",
    icon: "🎃",
  },
  "Black Bean Soup": {
    thawMethod: "overnight",
    reheating: "Microwave 3–4 min, stir halfway. Or pot 5 min on medium.",
    toppings: ["Dollop of sour cream or Greek yogurt", "Sliced avocado or guacamole", "Lime wedge", "Cilantro", "Tortilla chips", "Shredded cheddar"],
    notes: "Satisfying standalone. Can serve with rice or tortilla chips on the side if she\u2019s very hungry.",
    icon: "🫘",
  },
  "White Chicken Chili": {
    thawMethod: "overnight",
    reheating: "Pot on medium 6–8 min until hot through. Or microwave 4 min, stirring halfway. Stir well as it\u2019s thick.",
    toppings: ["Dollop of sour cream", "Sliced avocado", "Lime wedge", "Fresh cilantro", "Tortilla chips", "Shredded Monterey Jack cheese"],
    notes: "Chunky white bean and chicken chili. Hearty — no side needed.",
    icon: "🌶️",
  },
  "Beef Chili": {
    thawMethod: "overnight",
    reheating: "Pot on medium 6–8 min. Or microwave 4 min, stirring halfway. Thick — stir well.",
    toppings: ["Dollop of sour cream", "Shredded cheddar", "Sliced avocado or guacamole", "Lime wedge", "Tortilla chips", "Fresh jalape\u00f1o"],
    notes: "Has hidden puree\u0301d liver — totally undetectable. Iron and B12 boost. Can serve with rice.",
    icon: "🍲",
  },
  "Beef & Sweet Potato Stew": {
    thawMethod: "overnight",
    reheating: "Pot on medium 6–8 min. Or microwave 4 min, stirring halfway.",
    toppings: ["Fresh parsley or cilantro", "Crusty bread (for Jonny)", "Sprinkle of flaky sea salt"],
    notes: "Complete meal — sweet potato chunks built in. Iron-rich and filling.",
    icon: "🥘",
  },
  "Moroccan Beef Stew": {
    thawMethod: "overnight",
    reheating: "Pot on medium 6–8 min. Or microwave 4 min, stirring halfway.",
    toppings: ["Fresh cilantro", "Squeeze of lemon", "Drizzle of harissa or chili sauce (for Jonny)", "Plain yogurt or sour cream (for Kelly)", "Couscous or rice alongside (optional)"],
    notes: "Warming spiced stew with chickpeas and root veg. Complete meal as-is.",
    icon: "🥘",
  },
  "Kitchari": {
    thawMethod: "overnight",
    reheating: "Pot on medium 5–6 min with a splash of water — it thickens as it sits. Or microwave 3–4 min, stir, add water.",
    toppings: ["Drizzle of ghee", "Squeeze of lemon", "Pinch of cumin or garam masala", "Fresh cilantro", "Plain yogurt (for Kelly)"],
    notes: "Rice + lentil Ayurvedic dish. Complete meal, no side needed. Restorative and easy to digest.",
    icon: "🍛",
  },
  "Coconut Mung Bean Dal + Rice": {
    thawMethod: "overnight",
    reheating: "Dal: microwave 3–4 min, stir, add a splash of water if thick. Rice: microwave from frozen 90 sec in separate dish (or thaw overnight).",
    toppings: ["Drizzle of coconut cream", "Fresh cilantro", "Squeeze of lime", "Pinch of garam masala", "Mango chutney or mango rice (complements naturally)"],
    notes: "Dal is a sauce — it needs the rice. Pack rice portion separately (frozen \u00bd-cup cube). Mango rice is a great match.",
    icon: "🍛",
  },
  "Chickpea Curry + Rice": {
    thawMethod: "overnight",
    reheating: "Curry: pot 5–6 min or microwave 3–4 min, stir halfway. Rice: microwave from frozen 90 sec (or thaw overnight).",
    toppings: ["Fresh cilantro", "Squeeze of lemon", "Plain yogurt or raita", "Naan (optional, for Jonny)"],
    notes: "Pack rice portion in the bag or separately. Good protein + iron combo.",
    icon: "🍛",
  },
  "Butter Chicken + Rice": {
    thawMethod: "overnight",
    reheating: "Butter chicken: microwave 3–4 min or pot 5 min. Rice: microwave from frozen 90 sec.",
    toppings: ["Fresh cilantro", "Drizzle of coconut cream", "Naan (optional, for Jonny)", "Squeeze of lemon"],
    notes: "Crowd pleaser. Rich and creamy. Rice frozen separately as \u00bd-cup cube.",
    icon: "🍛",
  },
  "Bolognese + Meatballs": {
    thawMethod: "overnight",
    reheating: "Pot on medium 6–7 min, stirring often (meat sauce can stick). Or microwave 3–4 min, stir halfway. Has hidden liver — undetectable.",
    toppings: ["Parmesan cheese", "Fresh basil", "Drizzle of olive oil", "Red pepper flakes (for Jonny)", "Pasta cooked fresh (for Jonny) or serve with rice"],
    notes: "Hidden liver \u2014 undetectable. Jonny can cook pasta fresh and ladle sauce over. Or just serve with rice.",
    icon: "🍝",
  },
  "Salmon Patties + Rice": {
    thawMethod: "overnight",
    reheating: "Patties: toaster oven 350\u00b0F 8–10 min OR skillet with olive oil 3 min per side over medium heat. Rice: microwave from frozen 90 sec. Reheat patties separately from rice.",
    toppings: ["Lemon wedge (squeeze over patties)", "Dollop of tartar sauce or garlic aioli", "Sliced avocado", "Fresh dill or parsley", "Capers (for Kelly if she wants)"],
    notes: "Omega-3 priority meal. Don\u2019t microwave patties \u2014 toaster oven or skillet keeps them from getting soggy.",
    icon: "🐟",
  },
  "Kabocha & Mung Bean Soup": {
    thawMethod: "overnight",
    reheating: "Microwave 3–4 min, stir halfway. Or pot 5 min on medium.",
    toppings: ["Sesame oil drizzle", "Toasted sesame seeds", "White pepper", "Fresh ginger (optional)"],
    notes: "Hearty and naturally sweet. Japanese kabocha pumpkin. Will thicken when cold — add a splash of water when reheating.",
    icon: "🎃",
  },
};

// Resolve "(same)" — returns actual meal name
function resolveJonnyMeal(kellyMeal, jonnyMeal) {
  if (!jonnyMeal || jonnyMeal === "\u2014") return null;
  if (jonnyMeal === "(same)") return kellyMeal;
  return jonnyMeal;
}

// Build bag contents for a given day
function getBagContents(dayObj) {
  const kellyBag = [];
  const jonnyBag = [];

  dayObj.meals.forEach(meal => {
    const k = meal.kelly;
    const j = resolveJonnyMeal(meal.kelly, meal.jonny);

    if (k && k !== "\u2014") {
      kellyBag.push({ slot: meal.slot, meal: k });
    }
    if (j) {
      jonnyBag.push({ slot: meal.slot, meal: j });
    }
  });

  return { kellyBag, jonnyBag };
}

// Unique meals for a person on a given day (for reheat guide)
function getUniqueMeals(bag) {
  const seen = new Set();
  return bag.filter(item => {
    if (seen.has(item.meal)) return false;
    seen.add(item.meal);
    return true;
  });
}

// Slot color coding
const SLOT_COLORS = {
  "AM Broth": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-400" },
  "Breakfast": { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", dot: "bg-rose-400" },
  "Lunch": { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", dot: "bg-green-400" },
  "Dinner": { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", dot: "bg-indigo-400" },
  "PM Sip": { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "bg-purple-400" },
};

function SlotBadge({ slot }) {
  const c = SLOT_COLORS[slot] || { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text} border ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
      {slot}
    </span>
  );
}

// ── STAPLES DATA ──
const STAPLES = {
  freezer2: {
    label: "Freezer 2",
    sublabel: "Small garage fridge freezer",
    emoji: "🧊",
    color: "blue",
    items: [
      { name: "Silkie Chicken Tonic", note: "1-cup bags. Kelly\u2019s morning tonic — Days 1–14 only.", icon: "🍵" },
      { name: "Chicken Bone Broth", note: "1-cup and 2-cup bags. Kelly AM broth Days 15+. PM sip both.", icon: "🥣" },
      { name: "Beef Bone Broth (2-cup)", note: "2-cup bags. Kelly\u2019s morning broth on alternating days.", icon: "🥣" },
      { name: "Beef Bone Broth (1-cup)", note: "1-cup bags. Evening sip for both of you from Day 15.", icon: "🥣" },
      { name: "Golden Broth", note: "1-cup bags. Kelly\u2019s PM sip in Week 1. Turmeric, anti-inflammatory.", icon: "✨" },
      { name: "Jujube Goji Ginger Tea", note: "1-cup bags. Kelly\u2019s PM sip alternating Days 2–14.", icon: "🍵" },
    ],
  },
  freezer3door: {
    label: "Freezer 3 Door",
    sublabel: "Tall standing freezer — door only",
    emoji: "🚪",
    color: "emerald",
    items: [
      { name: "Lactation Bites", note: "Oat + flax + brewer\u2019s yeast energy balls. Grab 2–3 whenever Kelly wants a snack.", icon: "🍪" },
      { name: "Chocolate Peanut Butter Balls", note: "No-bake energy balls. Great for both of you — grab anytime.", icon: "🍫" },
      { name: "Tahini Date Balls", note: "No-bake. Dates + tahini + oats. Natural energy boost.", icon: "🟤" },
      { name: "Almond Coconut Bites", note: "No-bake. Lighter, coconutty. Grab 2–3 as a snack.", icon: "🥥" },
      { name: "Lactation Bars", note: "Baked oat bars. Sliced and individually foil-wrapped. 1–2 bars per snack.", icon: "🍫" },
      { name: "Snack Bars (other)", note: "Any other baked bars Kelly prepped. Check door \u2014 labeled individually.", icon: "🟫" },
    ],
  },
  freezer3main: {
    label: "Freezer 3 Main",
    sublabel: "Tall standing freezer — body",
    emoji: "📦",
    color: "slate",
    items: [
      { name: "All daily meal bags", note: "Labeled \u201cDay X Kelly\u201d and \u201cDay X Jonny\u201d. Pull BOTH bags the night before.", icon: "🏷️" },
      { name: "Rice portions", note: "\u00bd-cup frozen cubes. Used as sides for curry, dal, butter chicken, bolognese, salmon patties.", icon: "🍚" },
      { name: "Mango Rice", note: "Mango-cooked rice, frozen in \u00bd-cup cubes. Pairs with the dal.", icon: "🥭" },
      { name: "Berry Compote", note: "Frozen in 2-tbsp cubes. Spooned over oatmeal.", icon: "🍓" },
      { name: "Smoothie packs", note: "Jonny\u2019s berry banana smoothie \u2014 pre-portioned bags. Blend from frozen.", icon: "🫐" },
    ],
  },
};

// ── COMPONENTS ──

function ThawBadge({ method }) {
  if (method === "from-frozen") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
        ❄️ Reheat from frozen
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
      🌙 Thaw overnight
    </span>
  );
}

function RecipeCard({ meal, showFull = false }) {
  const [open, setOpen] = useState(showFull);
  const guide = REHEAT_GUIDE[meal];

  if (!guide) {
    return (
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🍽️</span>
          <span className="font-medium text-gray-800 text-sm">{meal}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-2"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl flex-shrink-0">{guide.icon}</span>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 text-sm leading-tight">{meal}</div>
            <div className="mt-0.5">
              <ThawBadge method={guide.thawMethod} />
            </div>
          </div>
        </div>
        <span className="text-gray-400 flex-shrink-0 text-lg">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-stone-100 pt-3 space-y-3">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">How to reheat</div>
            <p className="text-sm text-gray-700">{guide.reheating}</p>
          </div>

          {guide.toppings && guide.toppings.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Toppings & add-ons</div>
              <ul className="space-y-0.5">
                {guide.toppings.map((t, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                    <span className="text-stone-400 mt-0.5 flex-shrink-0">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {guide.notes && (
            <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
              <p className="text-xs text-amber-800">{guide.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DayView({ dayNum }) {
  const dayObj = ALL_DAYS.find(d => d.day === dayNum);
  if (!dayObj) return <div className="text-center text-gray-400 py-8">No data for Day {dayNum}</div>;

  const { kellyBag, jonnyBag } = getBagContents(dayObj);
  const allUnique = getUniqueMeals([...kellyBag, ...jonnyBag]);

  return (
    <div className="space-y-5">
      {/* Pull reminder */}
      <div className="rounded-xl bg-indigo-600 text-white px-4 py-3 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🌙</span>
        <div>
          <div className="font-bold text-sm">Tonight: Pull both bags</div>
          <div className="text-indigo-100 text-xs mt-0.5">
            Move <strong>&ldquo;Day {dayNum} Kelly&rdquo;</strong> and <strong>&ldquo;Day {dayNum} Jonny&rdquo;</strong> from Freezer 3 to the fridge tonight to thaw overnight.
          </div>
          <div className="text-indigo-200 text-xs mt-1">⚠️ Egg Bites + Berry Smoothie: keep frozen — reheat from frozen instead.</div>
        </div>
      </div>

      {/* Two bag columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Kelly's bag */}
        <div className="rounded-xl border-2 border-rose-200 bg-rose-50 overflow-hidden">
          <div className="bg-rose-500 text-white px-3 py-2 flex items-center gap-2">
            <span>💕</span>
            <div>
              <div className="font-bold text-sm">Kelly</div>
              <div className="text-rose-100 text-xs">Day {dayNum}</div>
            </div>
          </div>
          <div className="p-2 space-y-1.5">
            {kellyBag.map((item, i) => (
              <div key={i} className="bg-white rounded-lg px-2 py-1.5">
                <SlotBadge slot={item.slot} />
                <div className="text-xs font-medium text-gray-800 mt-0.5 leading-tight">{item.meal}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Jonny's bag */}
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 overflow-hidden">
          <div className="bg-blue-600 text-white px-3 py-2 flex items-center gap-2">
            <span>🤙</span>
            <div>
              <div className="font-bold text-sm">Jonny</div>
              <div className="text-blue-100 text-xs">Day {dayNum}</div>
            </div>
          </div>
          <div className="p-2 space-y-1.5">
            {jonnyBag.length === 0 ? (
              <div className="text-xs text-gray-400 p-2">Sharing Kelly\u2019s bags today</div>
            ) : (
              jonnyBag.map((item, i) => (
                <div key={i} className="bg-white rounded-lg px-2 py-1.5">
                  <SlotBadge slot={item.slot} />
                  <div className="text-xs font-medium text-gray-800 mt-0.5 leading-tight">{item.meal}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Reheat guide for today's meals */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2">Today\u2019s reheat guide</h3>
        <div className="space-y-2">
          {allUnique.map((item, i) => (
            <RecipeCard key={i} meal={item.meal} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StaplesView() {
  const colorMap = {
    blue: { header: "bg-blue-600", border: "border-blue-200", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700" },
    emerald: { header: "bg-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700" },
    slate: { header: "bg-slate-600", border: "border-slate-200", bg: "bg-slate-50", badge: "bg-slate-100 text-slate-700" },
  };

  return (
    <div className="space-y-5">
      {/* Top reminder */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
        <div className="font-semibold text-amber-900 text-sm mb-1">📦 Freezer orientation</div>
        <p className="text-xs text-amber-800">
          <strong>Freezer 2</strong> = small fridge freezer in the garage. Broths and drinks live here.
          <br /><br />
          <strong>Freezer 3</strong> = tall standing freezer. All daily meal bags in the main body. Snacks and lactation items in the door.
        </p>
      </div>

      {Object.values(STAPLES).map(section => {
        const c = colorMap[section.color];
        return (
          <div key={section.label} className={`rounded-xl border-2 ${c.border} overflow-hidden`}>
            <div className={`${c.header} text-white px-4 py-3`}>
              <div className="font-bold text-sm flex items-center gap-2">
                <span>{section.emoji}</span>
                {section.label}
              </div>
              <div className="text-xs opacity-75 mt-0.5">{section.sublabel}</div>
            </div>
            <div className={`${c.bg} p-3 space-y-2`}>
              {section.items.map((item, i) => (
                <div key={i} className="bg-white rounded-lg px-3 py-2.5 flex items-start gap-2.5">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AllRecipesView() {
  const [search, setSearch] = useState("");
  const allMeals = Object.keys(REHEAT_GUIDE).sort();
  const filtered = search
    ? allMeals.filter(m => m.toLowerCase().includes(search.toLowerCase()))
    : allMeals;

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 pl-9"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      <div className="space-y-2">
        {filtered.map((meal, i) => (
          <RecipeCard key={i} meal={meal} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-6 text-sm">No recipes found</div>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ──
export default function JonnyPrep() {
  const [tab, setTab] = useState("today");
  const [selectedDay, setSelectedDay] = useState(1);

  const TABS = [
    { id: "today", label: "Today", emoji: "📅" },
    { id: "days", label: "All Days", emoji: "📆" },
    { id: "recipes", label: "Recipes", emoji: "🍽️" },
    { id: "staples", label: "Staples", emoji: "📦" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Jonny\u2019s Prep Guide</h1>
              <p className="text-xs text-gray-500">Kelly\u2019s postpartum meals \u2014 30 days</p>
            </div>
            <a
              href="/"
              className="text-xs text-indigo-600 font-medium hover:underline"
            >
              ← Full plan
            </a>
          </div>

          {/* Tab bar */}
          <div className="flex mt-3 bg-stone-100 rounded-xl p-1 gap-0.5">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex flex-col items-center py-1.5 rounded-lg text-xs font-medium transition-all ${
                  tab === t.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="text-base">{t.emoji}</span>
                <span className="mt-0.5">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-5">
        {/* TODAY tab */}
        {tab === "today" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">Day selector</h2>
              <span className="text-xs text-gray-400">tap to change</span>
            </div>

            {/* Day picker carousel */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
              {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`flex-shrink-0 w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                    selectedDay === d
                      ? "bg-indigo-600 text-white shadow-md scale-110"
                      : "bg-white border border-stone-200 text-gray-600 hover:border-indigo-300"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <DayView dayNum={selectedDay} />
          </div>
        )}

        {/* ALL DAYS tab */}
        {tab === "days" && (
          <div>
            <p className="text-xs text-gray-500 mb-4">
              Tap any day to see full bag contents + reheat guide.
            </p>
            <div className="space-y-2">
              {ALL_DAYS.map(dayObj => {
                const { kellyBag, jonnyBag } = getBagContents(dayObj);
                return (
                  <button
                    key={dayObj.day}
                    onClick={() => { setSelectedDay(dayObj.day); setTab("today"); }}
                    className="w-full text-left bg-white rounded-xl border border-stone-200 px-4 py-3 hover:border-indigo-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {dayObj.day}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 flex gap-2">
                            <span>💕 {kellyBag.length} items</span>
                            <span>🤙 {jonnyBag.length} items</span>
                          </div>
                          <div className="text-xs text-gray-700 mt-0.5 truncate max-w-48">
                            {kellyBag.find(x => x.slot === "Dinner")?.meal || kellyBag[0]?.meal || ""}
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-300 text-lg">›</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* RECIPES tab */}
        {tab === "recipes" && (
          <div>
            <p className="text-xs text-gray-500 mb-3">
              Reheat instructions and toppings for every recipe.
            </p>
            <AllRecipesView />
          </div>
        )}

        {/* STAPLES tab */}
        {tab === "staples" && <StaplesView />}
      </div>
    </div>
  );
}
