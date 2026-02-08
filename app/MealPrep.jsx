"use client";
import { useState } from "react";

const P = [
  { id:1, t:"Broths + Congees + Gentle Soups + Ferments", w:"Week 1 Feb", pm:"Week 1 postpartum", c:"amber", y:"~50+ two-cup portions + 2 qts sauerkraut" },
  { id:2, t:"Stews + Curries + Heartier Soups", w:"Week 2 Feb", pm:"Week 2-3 postpartum", c:"orange", y:"~40+ portions" },
  { id:3, t:"Proteins + Pastas + Iron-Rich", w:"Week 3 Feb", pm:"Week 3-4 postpartum", c:"red", y:"~50+ portions" },
  { id:4, t:"Lighter Items + Breakfast + Patties + Bases", w:"Week 4 Feb", pm:"Week 5-6 postpartum", c:"green", y:"~60+ portions" },
];

const SH = {
  costco:[{i:"Chest freezer",n:"Check Costco"}],
  equip:["Souper Cubes 2-cup x4 (~$80)","Souper Cubes 1-cup x2 (~$34)","Souper Cubes 1/2-cup x1 (~$15)","Souper Cubes 2-TB x1 (~$15)","Gallon freezer bags 2-3 boxes","Quart freezer bags 2-3 boxes"],
  asian:[
    {c:"Proteins",i:["Chicken feet - 3 lbs","Silkie chicken (black) - 1 small (for tonic)"]},
    {c:"Produce",i:["Fresh turmeric - 4 oz","Fresh ginger - 1 large hand"]},
    {c:"Dried Goods",i:["Goji berries - 8 oz","Red dates (jujubes) - 12 oz","Dried shiitake - 8 oz","Kombu - 4 oz","Dried longan - 8 oz","Black sesame seeds - 8 oz"]},
    {c:"Pantry",i:["Toasted sesame oil","White pepper (ground)","Miso paste","Fish sauce (Red Boat)","Coconut aminos"]},
    {c:"TCM Herbs",i:["Astragalus root powder (huang qi)","Angelica root powder (dang gui)"]}
  ],
  butcher:[
    {c:"Phase 1",i:["Whole chickens x3 (pasture-raised)","Chicken thighs bone-in - 4 lbs","Beef marrow bones - 3-4 lbs (cut crosswise)","Oxtail - 2-3 lbs"]},
    {c:"Later Phases",i:["Ground beef","Ground pork","Beef chuck","Lamb shoulder","Chicken livers","Short ribs","Italian sausage"]}
  ],
  tj:[
    {c:"Phase 1 Critical",i:["Jasmine/basmati rice - big bag","Red lentils - 1 lb","Non-iodized sea salt (fermentation)","Toasted sesame seeds"]},
    {c:"Later Phases",i:["Rice vinegar","Steel cut oats","Dried black beans","Dried white beans","Dried kidney beans","Dried lentils","Dried chickpeas","Crushed tomatoes (San Marzano)","Tomato paste","Chicken stock (backup)","Pine nuts","Dijon mustard","Baking soda + powder"]}
  ]
};

const R = [
  {id:1,n:"Chicken Bone Broth",cat:"Foundations",ph:1,tg:["collagen","base"],
    ing:["2-3 chicken carcasses (from roasted chickens)","Remaining chicken feet","2 onions quartered","4 carrots chopped","4 celery stalks","1 head garlic halved","2 tbsp ACV","1 tbsp peppercorns","Thyme, parsley, bay leaves","Cold water to max line"],
    ins:["Add carcasses + feet to Instant Pot","Cover with cold water to max line, add vinegar","ROUND 1 (Premium Sipping Broth): HIGH pressure 2-3 hrs, natural release","Strain through fine mesh. This is your best broth - golden, wiggly, for sipping postpartum","ROUND 2 (Cooking Broth): Return same bones to IP, fresh water to max line","HIGH pressure 2 hrs, natural release","Strain. Use this batch for soups, congee, stews, cooking","Cool both batches, skim fat if desired"],
    yi:"Round 1: ~10-12 cups premium. Round 2: ~10-12 cups cooking.",fr:"Label ROUND 1 and ROUND 2 separately. Freeze 2-cup + 1-cup portions. Round 1 should jiggle like jelly."},
  {id:2,n:"Beef Bone Broth",cat:"Foundations",ph:1,tg:["collagen","iron"],
    ing:["3-4 lbs beef marrow bones (cut crosswise)","2-3 lbs oxtail (opt)","2 onions","4 carrots","4 celery","1 head garlic","2 tbsp tomato paste","2 tbsp ACV","Peppercorns, thyme, bay"],
    ins:["CRITICAL: Roast bones 425F 30-40 min until deeply browned","Transfer to Instant Pot, deglaze roasting pan, add to pot","Add veggies, aromatics, vinegar, paste, cold water to max","ROUND 1 (Premium): HIGH pressure 3 hrs, natural release","Strain - this is the good stuff for sipping","ROUND 2 (Cooking): Same bones, fresh water, HIGH 2 hrs","Strain - use for stews, soups, cooking bases"],
    yi:"Round 1: ~8-10 cups premium. Round 2: ~8-10 cups cooking.",fr:"Label rounds separately. Freeze 2-cup + 1-cup portions"},
  {id:3,n:"Golden Broth",cat:"Foundations",ph:1,tg:["warming","tonic"],
    ing:["8 cups ROUND 1 chicken broth","3\" fresh turmeric (or 1 tbsp ground)","2\" fresh ginger","2 tbsp ghee","1/2 tsp black pepper (activates curcumin)","Salt"],
    ins:["Combine broth, turmeric, ginger","Gentle simmer 15-20 min","Stir in ghee + black pepper","Strain, season"],
    yi:"~8 cups",fr:"Freeze 2-cup portions. Sip warm as healing tonic. Use Round 1 broth for this."},
  {id:51,n:"Black Silkie Chicken Tonic (Wu Ji Tang)",cat:"Foundations",ph:1,tg:["TCM","tonic","blood-building"],
    ing:["1 small black silkie chicken, whole (cleaned)","Remaining chicken feet (3-5 pieces for extra collagen)","8-10 red jujubes (red dates), rinsed","2 tbsp goji berries","2 tbsp dried longan","3\" fresh ginger, sliced into coins","4-5 dried shiitake mushrooms (optional)","Cold water to cover","Salt to taste","ADD LAST 15 MIN: 1 tsp astragalus powder (huang qi)","ADD LAST 15 MIN: 1/2 tsp angelica root powder (dang gui)"],
    ins:["Blanch silkie chicken: place in pot of boiling water 2-3 min, remove, rinse under cold water (removes impurities)","Blanch chicken feet the same way","Place blanched chicken + feet in Instant Pot or large pot","Add jujubes, goji berries, longan, ginger, shiitakes","Cover with cold water (about 8-10 cups)","INSTANT POT: HIGH pressure 45 min, natural release 15 min","STOVETOP: Bring to boil, reduce to gentle simmer 2-3 hrs","In last 15 min: stir in astragalus + angelica powders (adding late preserves medicinal properties)","Season with salt. The broth should be deeply golden-brown and rich","Serve chicken pieces in the broth - the meat will be very tender"],
    yi:"~6-8 cups of deeply nourishing tonic broth",fr:"This is the most special broth. Freeze 1-cup portions for postpartum Week 1. Traditionally consumed daily. The silkie chicken meat is eaten too - very tender and nutritious.",
    note:"Traditional Chinese postpartum tonic. Jujubes build blood, goji nourish yin, longan calms the spirit, astragalus strengthens qi, angelica moves blood. This is medicine as food."},
  {id:4,n:"Marinara Sauce",cat:"Foundations",ph:4,tg:["base"],
    ing:["2 (28oz) cans San Marzano tomatoes","1 onion diced","6 cloves garlic","1/4 cup olive oil","2 tbsp tomato paste","Oregano, basil, red pepper flakes, salt"],
    ins:["Saute onion in oil 7-8 min","Add garlic 1 min, tomato paste 2 min","Add tomatoes, herbs","Simmer 30-45 min"],
    yi:"~8 cups",fr:"Freeze 1/2-cup and 1-cup portions"},
  {id:5,n:"Pesto",cat:"Foundations",ph:4,tg:["base"],
    ing:["4 cups basil packed","1/2 cup pine nuts toasted","4 cloves garlic","1 cup Parmesan","3/4 cup olive oil","Lemon, salt, pepper"],
    ins:["Toast pine nuts","Pulse basil, nuts, garlic in food processor","Drizzle in oil","Stir in Parmesan, season"],
    yi:"~2 cups",fr:"Freeze in 2-TB portions"},
  {id:6,n:"Ginger-Scallion Oil",cat:"Foundations",ph:4,tg:["warming"],
    ing:["1 cup neutral oil","1 bunch scallions sliced","3\" ginger minced","1 tsp each salt + sugar","1 tbsp sesame oil"],
    ins:["Combine scallions, ginger, salt, sugar in heatproof bowl","Heat oil until shimmering","Pour over mixture (will sizzle)","Stir in sesame oil"],
    yi:"~1.5 cups",fr:"Freeze 2-TB portions. Amazing on congee/rice."},
  {id:7,n:"Chimichurri",cat:"Foundations",ph:4,tg:["fresh"],
    ing:["2 cups parsley chopped","1/2 cup oregano","6 cloves garlic","1 shallot diced","3/4 cup olive oil","1/4 cup red wine vinegar","Red pepper flakes, salt"],
    ins:["Combine parsley, oregano, garlic, shallot","Stir in oil and vinegar","Add pepper flakes, season","Rest 30 min"],
    yi:"~2 cups",fr:"Freeze 2-TB portions"},
  {id:8,n:"Chicken Ginger Congee",cat:"Soups",ph:1,tg:["gentle","week1"],
    ing:["2 cups jasmine rice","12 cups ROUND 2 chicken broth","4 cups water","3\" ginger sliced","2-3 cups shredded chicken","2 tbsp sesame oil","Salt"],
    ins:["Rinse rice until clear","Combine rice, broth, water, ginger","Boil then low simmer 1.5-2 hrs, stir occasionally","Stir in chicken + sesame oil","Season"],
    ip:"IP: 30 min, natural release 15 min. Use Round 2 broth for this.",yi:"~12 two-cup portions",fr:"Thickens when frozen. Add broth when reheating.",
    top:"Green onions, sesame seeds, coconut aminos, soft-boiled egg"},
  {id:9,n:"Carrot Ginger Soup",cat:"Soups",ph:1,tg:["gentle","week1"],
    ing:["2 lbs carrots","1 onion","4 cloves garlic","3\" ginger","6 cups Round 2 broth","1 can coconut milk","2 tbsp ghee","1 tsp cumin"],
    ins:["Saute onion in ghee 5-7 min","Add garlic, ginger 1 min","Add carrots, cumin, broth","Simmer 25-30 min","Blend smooth, stir in coconut milk"],
    yi:"~10 two-cup portions",fr:"Freezes beautifully"},
  {id:10,n:"Italian Wedding Soup",cat:"Soups",ph:2,tg:["hearty"],
    ing:["Meatballs","8 cups chicken broth","2 cups escarole/spinach","1 cup small pasta","2 eggs","1/2 cup Parmesan"],
    ins:["Simmer broth, add meatballs 10 min","Add pasta until al dente","Add greens 2 min","Whisk eggs + Parmesan, drizzle in while stirring"],
    yi:"~8-10 portions",fr:"Freeze without pasta"},
  {id:11,n:"Kabocha & Red Lentil Soup",cat:"Soups",ph:1,tg:["gentle","week1"],
    ing:["2 kabocha squash (~4 lbs)","1 cup red lentils","1 onion","4 garlic","2\" ginger","6 cups broth","1 can coconut milk","2 tbsp ghee","Curry powder, cumin, turmeric"],
    ins:["Roast squash cut-side down 400F 45 min","Scoop flesh","Saute onion, add garlic/ginger/spices","Add squash, lentils, broth","Simmer 20-25 min","Blend, stir in coconut milk"],
    yi:"~10 two-cup portions",fr:"May thicken - add broth when reheating"},
  {id:12,n:"Black Bean Soup",cat:"Soups",ph:2,tg:["hearty","fiber"],
    ing:["1 lb dried black beans (soaked)","1 onion","4 garlic","2 tsp cumin","6 cups broth","Lime, cilantro"],
    ins:["Saute onion, garlic, spices","Add beans + broth","Simmer 1.5-2 hrs until tender","Blend half for creaminess","Add lime juice, season"],
    yi:"~10 portions",fr:"Freezes well"},
  {id:13,n:"Chicken Noodle Soup",cat:"Soups",ph:2,tg:["classic"],
    ing:["8 cups chicken broth","2 cups shredded chicken","2 carrots, 2 celery diced","1 onion","2 garlic","2 tbsp butter","Thyme, bay leaf"],
    ins:["Saute veggies in butter 5-7 min","Add broth, herbs, simmer 15 min","Add chicken, season"],
    yi:"~8-10 portions",fr:"Freeze without noodles - add fresh when serving"},
  {id:14,n:"Minestrone",cat:"Soups",ph:2,tg:["hearty"],
    ing:["White + kidney beans","28oz diced tomatoes","6 cups broth","Carrots, celery, onion, zucchini","4 garlic","Olive oil, basil, oregano"],
    ins:["Saute veggies 5 min","Add garlic, herbs 2 min","Add tomatoes, broth, beans","Simmer 20-30 min"],
    yi:"~10 portions",fr:"Freeze base - add pasta fresh"},
  {id:15,n:"Oxtail Stew",cat:"Stews",ph:2,tg:["collagen","iron"],
    ing:["3 lbs oxtail","2 onions, 4 carrots, 4 celery","4 garlic","2 cups red wine","4 cups beef broth","2 tbsp tomato paste","Thyme, bay"],
    ins:["Season + flour oxtail, brown deeply","Saute veggies","Add garlic, tomato paste 2 min","Deglaze with wine","Return oxtail, add broth + herbs","Cover, low simmer 3-4 hours until falling off bone"],
    yi:"~8-10 portions",fr:"Incredible collagen. Freezes perfectly."},
  {id:16,n:"Lamb & White Bean Stew",cat:"Stews",ph:2,tg:["hearty"],
    ing:["2 lbs lamb shoulder cubed","White beans","Onion, garlic, carrots","14oz diced tomatoes","4 cups broth","Cumin, smoked paprika, rosemary"],
    ins:["Brown lamb in batches","Saute veggies, add spices","Add tomatoes, broth, return lamb","Simmer 2-2.5 hrs","Add beans last 30 min"],
    yi:"~8-10 portions",fr:"Freezes well"},
  {id:17,n:"Beef Chili (Hidden Liver)",cat:"Stews",ph:3,tg:["iron","hidden liver"],
    ing:["2 lbs ground beef","4 oz chicken livers (blended)","2 cans kidney beans","28oz crushed tomatoes","2 onions, 4 garlic","Chili powder, cumin, paprika","2 cups beef broth"],
    ins:["Brown beef, add blended livers (they disappear)","Saute onions, garlic","Add spices, tomato paste 2 min","Add tomatoes, broth, beans","Simmer 45 min-1 hr"],
    yi:"~12 portions",fr:"Nobody will taste the liver. Freezes perfectly."},
  {id:18,n:"Thai Massaman Curry",cat:"Stews",ph:2,tg:["warming"],
    ing:["2 lbs beef chuck or chicken","2 cans coconut milk","3 tbsp massaman paste","1 lb potatoes","Onion, peanuts","Fish sauce, palm sugar, tamarind","Cinnamon, star anise, cardamom"],
    ins:["Fry curry paste in coconut cream 3-4 min","Add meat, brown","Add remaining coconut milk, potatoes, spices","Simmer 45 min (beef) / 30 min (chicken)","Season with fish sauce, sugar, tamarind"],
    yi:"~8-10 portions",fr:"Serve over rice"},
  {id:19,n:"Butter Chicken",cat:"Stews",ph:2,tg:["comfort"],
    ing:["2 lbs chicken thighs","Yogurt + garam masala (marinade)","28oz crushed tomatoes","1 cup cream","4 tbsp butter","Onion, garlic, ginger","Garam masala, turmeric, cumin"],
    ins:["Marinate chicken in yogurt 30 min+","Saute onion golden, add garlic/ginger/spices","Add tomatoes, simmer 15 min, blend smooth","Add chicken, cook 15-20 min","Stir in cream, pinch of sugar"],
    yi:"~8-10 portions",fr:"Serve over rice or with naan"},
  {id:20,n:"Beef Bourguignon",cat:"Stews",ph:2,tg:["iron","slow-cook"],
    ing:["3 lbs beef chuck","1 bottle red wine","6 slices bacon","2 onions, 4 carrots","8 oz mushrooms","4 garlic","2 cups beef broth","Tomato paste, thyme, bay"],
    ins:["Cook bacon crispy, remove","Brown floured beef in bacon fat","Saute veggies","Add paste 2 min, deglaze with wine","Add broth, herbs, return beef + bacon","Cover, simmer 2.5-3 hrs until fork-tender"],
    yi:"~10-12 portions",fr:"Even better after freezing and reheating"},
  {id:21,n:"Lamb Tagine",cat:"Stews",ph:2,tg:["warming"],
    ing:["2 lbs lamb shoulder","Onion, garlic, tomatoes","Dried apricots, green olives","2 cups broth","Cumin, cinnamon, ginger, turmeric","Honey, cilantro"],
    ins:["Brown lamb in batches","Saute onion, garlic, add spices","Add tomatoes, broth, return lamb","Simmer 1.5-2 hrs","Add apricots, olives, honey last 30 min"],
    yi:"~8-10 portions",fr:"Serve over couscous or rice"},
  {id:22,n:"Bolognese (Hidden Liver)",cat:"Pastas",ph:3,tg:["iron","hidden liver"],
    ing:["1 lb ground beef","1/2 lb ground pork","4 oz chicken livers (blended)","Onion, 2 carrots, 2 celery (soffritto)","4 garlic","1 cup red wine","28oz crushed tomatoes","1 cup milk","Tomato paste, thyme, bay"],
    ins:["Saute soffritto 10 min","Add garlic, then meats + blended livers, brown","Add tomato paste 2 min","Deglaze with wine","Add tomatoes, milk, herbs","Lowest simmer 2-3 hours"],
    yi:"~10-12 portions",fr:"Liver vanishes completely. Serve over pasta/polenta."},
  {id:23,n:"Pesto Pasta (Mix & Match)",cat:"Pastas",ph:4,tg:["quick"],
    ing:["Frozen pesto","Frozen shredded chicken or white beans","Cherry tomatoes, Parmesan","Pasta (cook fresh)"],
    ins:["Thaw pesto and chicken","Cook pasta fresh","Toss with pesto, chicken, tomatoes","Top with Parmesan"],
    yi:"Varies",fr:"Keep components frozen separately"},
  {id:24,n:"Creamy Tomato Sausage Sauce",cat:"Pastas",ph:3,tg:["comfort"],
    ing:["1 lb Italian sausage","28oz crushed tomatoes","1 cup cream","Onion, garlic","Tomato paste, red pepper flakes, basil"],
    ins:["Brown sausage in pieces","Saute onion, garlic","Add paste, pepper flakes 2 min","Add tomatoes, simmer 20 min","Stir in cream"],
    yi:"~8-10 portions",fr:"Serve over rigatoni or penne"},
  {id:25,n:"Mac and Cheese",cat:"Pastas",ph:3,tg:["comfort"],
    ing:["1 lb pasta (undercook 2 min)","4 tbsp butter, 1/4 cup flour","3 cups milk","3 cups sharp cheddar","1 cup gruyere","Mustard powder, paprika"],
    ins:["Cook pasta 2 min LESS than package","Make roux: butter + flour 2 min","Whisk in milk until thick","Off heat: stir in cheese","Add spices, combine with pasta"],
    yi:"~8-10 portions",fr:"Undercook pasta - prevents mushy reheat"},
  {id:26,n:"Coconut Lentil Dal",cat:"Dals",ph:4,tg:["gentle","warming"],
    ing:["2 cups red lentils","1 can coconut milk","4 cups water/broth","Onion, garlic, ginger","Cumin, turmeric, garam masala","2 tbsp ghee, lemon, cilantro"],
    ins:["Saute onion golden in ghee","Add garlic, ginger, spices 1 min","Add lentils + liquid, boil","Simmer 20-25 min until broken down","Stir in coconut milk + lemon"],
    yi:"~10 portions",fr:"May thicken - add water when reheating"},
  {id:27,n:"Tadka Dal",cat:"Dals",ph:4,tg:["warming","traditional"],
    ing:["2 cups yellow lentils","6 cups water","Turmeric, salt","TADKA: 3 tbsp ghee, cumin seeds, mustard seeds, dried chilies, garlic, onion, tomatoes, curry leaves"],
    ins:["Cook lentils with water + turmeric until soft","Mash slightly, add salt","Heat ghee, add seeds until they pop","Add chilies, garlic, curry leaves","Add onion golden, tomatoes soft","Pour tadka over dal, stir"],
    yi:"~8-10 portions",fr:"The tadka makes it special"},
  {id:28,n:"Chana Masala",cat:"Dals",ph:4,tg:["warming","hearty"],
    ing:["2 cans chickpeas","14oz diced tomatoes","Onion, garlic, ginger","Cumin, coriander, garam masala, turmeric","Olive oil/ghee, lemon, cilantro"],
    ins:["Saute onion deeply golden 10 min","Add garlic, ginger, spices 2 min","Add tomatoes, simmer 10 min","Add chickpeas + water, simmer 20 min","Mash some for creaminess, add lemon"],
    yi:"~8 portions",fr:"Serve over rice or with naan"},
  {id:29,n:"White Bean & Greens Soup",cat:"Dals",ph:4,tg:["gentle"],
    ing:["2 cans white beans","1 bunch kale/chard","6 cups broth","Onion, garlic","Lemon, olive oil, Parmesan rind, red pepper flakes"],
    ins:["Saute onion, garlic","Add broth, beans, Parm rind, simmer 15 min","Mash some beans for creaminess","Add greens, cook 5 min","Add lemon, season"],
    yi:"~8-10 portions",fr:"Freezes well"},
  {id:30,n:"Vegetable Frittata",cat:"Eggs",ph:4,tg:["protein"],
    ing:["12 eggs","1/2 cup milk/cream","2 cups mixed veg","1 cup cheese","2 tbsp olive oil","Herbs, salt, pepper"],
    ins:["Saute vegetables in oven-safe skillet","Pour whisked eggs over, sprinkle cheese","Cook on stove 2-3 min","Oven 375F 12-15 min until set","Cool, cut wedges"],
    yi:"8 wedges",fr:"Freeze individually wrapped. Toaster oven reheat."},
  {id:31,n:"Quiche",cat:"Eggs",ph:4,tg:["comfort"],
    ing:["1 pie crust","8 eggs","1 cup cream","1.5 cups filling (choice)","1 cup gruyere/cheddar","Nutmeg, salt, pepper"],
    ins:["Blind-bake crust 375F 10 min","Layer filling + cheese","Pour egg-cream mixture over","Bake 35-40 min until golden"],
    yi:"8 slices",fr:"Freeze slices or whole. Reheat in oven."},
  {id:32,n:"Chicken Pot Pie Filling",cat:"Comfort",ph:4,tg:["classic"],
    ing:["3 cups shredded chicken","2 cups mixed veg","Onion, butter, flour","2 cups broth, 1 cup milk","Thyme","Puff pastry (for serving)"],
    ins:["Saute onion in butter 5 min","Whisk in flour 2 min","Slowly add broth + milk, whisk until thick","Add chicken, veggies, thyme","Cool"],
    yi:"~8 portions",fr:"Freeze filling. Thaw, pour into ramekin, puff pastry top, 400F 20-25 min"},
  {id:33,n:"Shepherd's Pie",cat:"Comfort",ph:4,tg:["hearty"],
    ing:["2 lbs ground lamb/beef","2 lbs potatoes","Butter, milk","Onion, carrots, peas, garlic","Tomato paste, broth, Worcestershire, thyme"],
    ins:["Boil + mash potatoes with butter/milk","Brown meat, saute veggies","Add paste, broth, Worcestershire, thyme","Simmer 15 min, add peas","Top with mash, optional broil 5 min"],
    yi:"~8 portions",fr:"Freeze assembled or components separately"},
  {id:34,n:"Baked Salmon Portions",cat:"Fish",ph:4,tg:["omega-3"],
    ing:["2 lbs salmon in portions","Olive oil, soy sauce/coconut aminos","Honey, garlic, ginger, lemon"],
    ins:["Mix marinade","Coat portions","Wrap individually with marinade","Freeze raw"],
    yi:"6-8 portions",fr:"Freeze raw in marinade. Thaw overnight, 400F 12-15 min."},
  {id:35,n:"Salmon Patties",cat:"Patties",ph:4,tg:["omega-3"],
    ing:["2 cans salmon (or 1 lb fresh cooked)","Breadcrumbs, 2 eggs, mayo","Green onions, Dijon, lemon, Old Bay"],
    ins:["Combine all ingredients","Form patties","Pan-fry 3-4 min per side"],
    yi:"~10 patties",fr:"Freeze cooked. Toaster oven 350F 10-12 min."},
  {id:36,n:"Black Bean Patties",cat:"Patties",ph:4,tg:["fiber"],
    ing:["2 cans black beans","Breadcrumbs, 1 egg","Onion, garlic, cumin, chili powder","Lime, cilantro"],
    ins:["Mash half, leave half whole","Combine everything","Form patties, chill 30 min","Pan-fry or bake 375F"],
    yi:"~8 patties",fr:"Freeze cooked. Toaster oven reheat."},
  {id:37,n:"White Bean & Herb Patties",cat:"Patties",ph:4,tg:["gentle"],
    ing:["2 cans white beans","Breadcrumbs, 1 egg","Garlic, fresh herbs, lemon, Parmesan"],
    ins:["Mash beans, combine all","Form patties, chill 30 min","Pan-fry or bake 375F"],
    yi:"~8 patties",fr:"Freeze cooked. Toaster oven reheat."},
  {id:38,n:"Chicken-Veggie Patties",cat:"Patties",ph:4,tg:["protein"],
    ing:["1 lb ground chicken","1 cup grated zucchini (squeeze dry)","1/2 cup carrots, 2 green onions","1 egg, breadcrumbs, garlic powder"],
    ins:["Squeeze moisture from zucchini","Combine all ingredients","Form patties","Pan-fry 4-5 min per side"],
    yi:"~10 patties",fr:"Freeze cooked. Toaster oven reheat."},
  {id:39,n:"Shredded Chicken (Dark Meat)",cat:"Proteins",ph:3,tg:["iron","versatile"],
    ing:["4 lbs chicken thighs bone-in","Salt, pepper, garlic powder, onion powder"],
    ins:["Season generously","Roast 425F 35-40 min OR poach in broth 25-30 min","Shred","Save bones for more broth!"],
    yi:"~6-8 cups",fr:"Freeze 1-cup portions. Use for anything."},
  {id:40,n:"Meatballs (Hidden Liver)",cat:"Proteins",ph:3,tg:["iron","hidden liver"],
    ing:["1.5 lbs ground beef, 1/2 lb pork","4 oz chicken livers blended","Breadcrumbs, milk, 2 eggs","Onion grated, garlic, Parmesan","Italian seasoning"],
    ins:["Soak breadcrumbs in milk 5 min","Blend livers smooth","Combine gently (don't overwork)","Form 1.5\" balls","Bake 400F 18-20 min"],
    yi:"~30-35 meatballs",fr:"Freeze on sheet pan first, then bag. Liver undetectable."},
  {id:41,n:"Carnitas",cat:"Proteins",ph:3,tg:["comfort"],
    ing:["4 lbs pork shoulder","Onion, 6 garlic smashed","Orange + lime juice","Cumin, oregano, chili powder","1 cup chicken broth"],
    ins:["Season pork all over","Place in Dutch oven with everything","Cover, braise 300F 3.5-4 hrs","Shred with forks, toss in juices","Optional: broil 5 min for crispy edges"],
    yi:"~8-10 cups",fr:"Freeze 1-cup portions with braising liquid"},
  {id:42,n:"Braised Short Ribs",cat:"Proteins",ph:3,tg:["iron","collagen"],
    ing:["4 lbs bone-in short ribs","2 onions, 4 carrots, garlic","2 cups red wine, 2 cups beef broth","Tomato paste, thyme, bay"],
    ins:["Sear ribs all sides (take your time)","Saute veggies, add paste 2 min","Deglaze with wine","Add broth, herbs, return ribs","Cover, braise 325F 3-3.5 hrs"],
    yi:"~8 portions",fr:"Freeze with braising liquid"},
  {id:43,n:"Rice (Cooked in Broth)",cat:"Bases",ph:4,tg:["base"],
    ing:["4 cups jasmine rice","6 cups chicken broth","2 tbsp butter, salt"],
    ins:["Rinse rice","Combine all, bring to boil","Lowest heat, cover 18 min","Rest 10 min, fluff"],
    yi:"~12 one-cup portions",fr:"Freeze 1-cup portions"},
  {id:44,n:"Mashed Potatoes",cat:"Bases",ph:4,tg:["comfort"],
    ing:["3 lbs Yukon Gold cubed","6 tbsp butter","3/4 cup warm milk/cream","Salt, pepper"],
    ins:["Boil until very tender","Drain, add butter, mash","Add warm milk gradually","Season generously"],
    yi:"~8-10 portions",fr:"May need extra butter/milk on reheat"},
  {id:45,n:"Mashed Sweet Potatoes",cat:"Bases",ph:4,tg:["nutritious"],
    ing:["3 lbs sweet potatoes","3 tbsp butter","Cinnamon, nutmeg, salt"],
    ins:["Boil until tender","Drain, mash with butter + spices"],
    yi:"~8 portions",fr:"Freeze 1-cup portions"},
  {id:46,n:"Polenta",cat:"Bases",ph:4,tg:["comfort"],
    ing:["2 cups polenta","8 cups water/broth","2 tbsp butter, 1/2 cup Parmesan, salt"],
    ins:["Boil liquid with salt","Slowly whisk in polenta","Stir frequently 30-40 min","Stir in butter + Parmesan"],
    yi:"~8 portions",fr:"Reheat with splash of water/milk"},
  {id:47,n:"Cooked Black Beans",cat:"Bases",ph:4,tg:["fiber"],
    ing:["1 lb dried (soaked overnight)","8 cups water","Onion, garlic, bay, cumin, salt"],
    ins:["Drain, add fresh water + aromatics","Boil then simmer 1-1.5 hrs","Salt last 15 min"],
    yi:"~8 portions",fr:"Freeze 1-cup with some liquid"},
  {id:48,n:"Cooked White Beans",cat:"Bases",ph:4,tg:["gentle"],
    ing:["1 lb dried cannellini (soaked)","8 cups water","Onion, garlic, rosemary, bay, salt"],
    ins:["Drain, add fresh water + aromatics","Boil then simmer 1-1.5 hrs until creamy"],
    yi:"~8 portions",fr:"Freeze 1-cup with some liquid"},
  {id:49,n:"Sauerkraut",cat:"Ferments",ph:1,tg:["gut health","probiotic"],
    ing:["2 heads green cabbage (~5 lbs)","3 tbsp non-iodized salt"],
    ins:["Quarter, core, slice thin","Sprinkle with salt in large bowl","Massage 10-15 min until liquid releases","Pack tightly into jars, submerge in liquid","Fermentation weights on top","Room temp 60-75F, away from light","Ferment 2-4 weeks, taste weekly","Refrigerate when desired sourness"],
    yi:"~2 quarts",fr:"Do NOT freeze - fridge only. CRITICAL: keep submerged under brine."},
];

const CC = { amber:{bg:"bg-amber-50",bd:"border-amber-200",badge:"bg-amber-100 text-amber-800",ac:"text-amber-700",hd:"bg-amber-100"},
  orange:{bg:"bg-orange-50",bd:"border-orange-200",badge:"bg-orange-100 text-orange-800",ac:"text-orange-700",hd:"bg-orange-100"},
  red:{bg:"bg-red-50",bd:"border-red-200",badge:"bg-red-100 text-red-800",ac:"text-red-700",hd:"bg-red-100"},
  green:{bg:"bg-emerald-50",bd:"border-emerald-200",badge:"bg-emerald-100 text-emerald-800",ac:"text-emerald-700",hd:"bg-emerald-100"}};

function Chk({label,checked,onChange}){
  return <label className="flex items-start gap-3 py-1.5 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="mt-1 w-4 h-4 rounded border-gray-300 flex-shrink-0"/>
    <span className={`text-sm leading-relaxed ${checked?"line-through text-gray-400":"text-gray-700"}`}>{label}</span>
  </label>;
}

function Bar({done,total}){
  const p=total>0?Math.round(done/total*100):0;
  return <div className="flex items-center gap-3">
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{width:`${p}%`}}/>
    </div>
    <span className="text-xs text-gray-500 w-16 text-right">{done}/{total}</span>
  </div>;
}

function Rcard({r,open,toggle,done,onDone}){
  return <div className={`border rounded-lg overflow-hidden ${done?"border-emerald-200 bg-emerald-50/30":"border-gray-200"} ${open?"shadow-md":""}`}>
    <div className="flex items-center">
      {onDone && <label className="pl-4 pr-1 py-3 cursor-pointer flex-shrink-0">
        <input type="checkbox" checked={done} onChange={onDone} className="w-4 h-4 rounded border-gray-300"/>
      </label>}
      <button onClick={toggle} className={`flex-1 text-left px-3 py-3 flex items-center justify-between ${done?"":"hover:bg-gray-50"}`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-sm font-medium truncate ${done?"text-gray-400 line-through":"text-gray-800"}`}>{r.n}</span>
          {r.tg?.slice(0,2).map(t=><span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full flex-shrink-0">{t}</span>)}
        </div>
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open?"rotate-180":""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
      </button>
    </div>
    {open&&<div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Ingredients</h4>
          <ul className="space-y-1">{r.ing.map((x,i)=><li key={i} className="text-sm text-gray-700">{x}</li>)}</ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Instructions</h4>
          <ol className="space-y-1">{r.ins.map((x,i)=><li key={i} className="text-sm text-gray-700">{i+1}. {x}</li>)}</ol>
          {r.ip&&<p className="mt-2 text-xs text-indigo-600 bg-indigo-50 rounded px-2 py-1">{r.ip}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-3 pt-2 border-t border-gray-200 text-xs">
        {r.yi&&<span><b className="text-gray-500">Yield:</b> {r.yi}</span>}
        {r.fr&&<span><b className="text-gray-500">Freeze:</b> {r.fr}</span>}
      </div>
      {r.top&&<div className="mt-1 text-xs"><b className="text-gray-500">Toppings:</b> {r.top}</div>}
      {r.note&&<div className="mt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1.5">{r.note}</div>}
    </div>}
  </div>;
}

const TABS=["Overview","Shopping","Phase 1","Phase 2","Phase 3","Phase 4","Recipes","Freezer"];

export default function App(){
  const [tab,setTab]=useState("Overview");
  const [ck,setCk]=useState({});
  const [ex,setEx]=useState({});
  const [fl,setFl]=useState([]);
  const [fi,setFi]=useState({n:"",p:"",d:""});
  const [rf,setRf]=useState("All");

  const tg=(k)=>setCk(c=>({...c,[k]:!c[k]}));
  const te=(id)=>setEx(e=>({...e,[id]:!e[id]}));
  const cc=(pre)=>Object.keys(ck).filter(k=>k.startsWith(pre)&&ck[k]).length;

  const addF=()=>{if(!fi.n)return;setFl([...fl,{...fi,id:Date.now(),u:0}]);setFi({n:"",p:"",d:""});};

  // Overview
  const overview=()=>{
    const ph=P.map(p=>{
      const recipes=R.filter(r=>r.ph===p.id);
      const total=recipes.length;
      const done=recipes.filter(r=>ck[`recipe-${r.id}`]).length;
      return{...p,total,done};
    });
    const tt=ph.reduce((a,p)=>a+p.total,0),td=ph.reduce((a,p)=>a+p.done,0);
    return <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Kelly&apos;s Postpartum Meal Prep</h2>
        <p className="text-sm text-gray-600 mb-4">4-6 weeks of nourishing freezer meals before baby arrives</p>
        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Overall Progress</div>
        <Bar done={td} total={tt}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ph.map(p=>{const c=CC[p.c];return <button key={p.id} onClick={()=>setTab(`Phase ${p.id}`)} className={`${c.bg} ${c.bd} border rounded-xl p-4 text-left hover:shadow-md transition-shadow`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-semibold uppercase ${c.ac}`}>Phase {p.id}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{p.w}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">{p.t}</h3>
          <p className="text-xs text-gray-500 mb-3">{p.pm}</p>
          <Bar done={p.done} total={p.total}/>
        </button>;})}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Guiding Philosophy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
          {["42 days for 42 years - recovery in first 6 weeks affects long-term health",
            "Warming foods - ginger, turmeric, cumin, cinnamon. No cold/raw early on.",
            "Wiggly broth - high collagen from chicken feet, slow-simmered bones",
            "Hidden liver - in meatballs and bolognese for iron",
            "Fermented foods - homemade sauerkraut for gut health",
            "TCM + Ayurveda - traditional postpartum nutrition, silkie chicken tonic",
            "Two-round broth - Round 1 for sipping, Round 2 for cooking"
          ].map((x,i)=><div key={i} className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">&#9670;</span><span>{x}</span></div>)}
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Recovery Stages</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3"><span className="font-medium text-amber-600 w-16">Wk 1</span><span className="text-gray-600">Gentlest: broths (Round 1 sipping), congees, simple soups, silkie tonic. Avoid greens.</span></div>
          <div className="flex gap-3"><span className="font-medium text-orange-600 w-16">Wk 2</span><span className="text-gray-600">Gentle + substance: stews, dals, soft proteins</span></div>
          <div className="flex gap-3"><span className="font-medium text-red-600 w-16">Wk 3-4</span><span className="text-gray-600">Rebuilding: red meat, heartier stews, more variety</span></div>
          <div className="flex gap-3"><span className="font-medium text-emerald-600 w-16">Wk 5-6</span><span className="text-gray-600">Full nourishment: full variety, digestion strengthening</span></div>
        </div>
      </div>
    </div>;
  };

  // Shopping
  const shopping=()=>{
    const ms=[
      {k:"asian",t:"Weee! / Asian Market (Order Placed)",cats:SH.asian.map(c=>({...c,items:c.i}))},
      {k:"butcher",t:"Shopper\u2019s Corner / Butcher",cats:SH.butcher.map(c=>({...c,items:c.i}))},
      {k:"tj",t:"Trader Joe\u2019s / Grocery",cats:SH.tj.map(c=>({...c,items:c.i}))}
    ];
    return <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h3 className="text-sm font-bold text-emerald-800 mb-1">Costco - Done</h3>
        <p className="text-xs text-emerald-600">Onions, garlic, carrots, celery, sweet potatoes, butter, eggs (5 doz), Parmesan, ACV, coconut milk, ghee, oils, freezer bags</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between"><h3 className="text-sm font-bold">Costco - Still Needed</h3><span className="text-xs text-gray-500">{cc("sh-co-")}/1</span></div>
        <div className="px-4 py-2">{SH.costco.map((x,i)=><Chk key={i} label={`${x.i} (${x.n})`} checked={!!ck[`sh-co-${i}`]} onChange={()=>tg(`sh-co-${i}`)}/>)}</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between"><h3 className="text-sm font-bold">Equipment - Still Needed</h3><span className="text-xs text-gray-500">{cc("sh-eq-")}/{SH.equip.length}</span></div>
        <div className="px-4 py-2">{SH.equip.map((x,i)=><Chk key={i} label={x} checked={!!ck[`sh-eq-${i}`]} onChange={()=>tg(`sh-eq-${i}`)}/>)}</div>
      </div>
      {ms.map(store=>{
        const all=store.cats.flatMap(c=>c.items);
        return <div key={store.k} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between"><h3 className="text-sm font-bold">{store.t}</h3><span className="text-xs text-gray-500">{cc(`sh-${store.k}-`)}/ {all.length}</span></div>
          <div className="px-4 py-2">{store.cats.map((cat,ci)=>{
            const off=store.cats.slice(0,ci).flatMap(c=>c.items).length;
            return <div key={ci} className="mb-2">
              <div className="text-xs font-semibold uppercase text-gray-400 mt-2 mb-1">{cat.c}</div>
              {cat.items.map((x,i)=><Chk key={i} label={x} checked={!!ck[`sh-${store.k}-${off+i}`]} onChange={()=>tg(`sh-${store.k}-${off+i}`)}/>)}
            </div>;
          })}</div>
        </div>;
      })}
    </div>;
  };

  // Phase - now recipe-based, no day schedules
  const phase=(n)=>{
    const p=P[n-1],c=CC[p.c];
    const pr=R.filter(r=>r.ph===n);
    const done=pr.filter(r=>ck[`recipe-${r.id}`]).length;
    return <div className="space-y-6">
      <div className={`${c.bg} ${c.bd} border rounded-xl p-5`}>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-semibold uppercase ${c.ac}`}>Phase {p.id} - {p.w}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{p.pm}</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">{p.t}</h2>
        <Bar done={done} total={pr.length}/>
        <p className="text-xs text-gray-500 mt-2">Expected yield: {p.y}</p>
      </div>
      <div className="space-y-2">
        {pr.map(r=><Rcard key={r.id} r={r} open={!!ex[r.id]} toggle={()=>te(r.id)} done={!!ck[`recipe-${r.id}`]} onDone={()=>tg(`recipe-${r.id}`)}/>)}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Freezing Workflow</h4>
        <ol className="space-y-1 text-sm text-gray-600">
          {["Cool to room temperature","Ladle into Souper Cubes - leave 1/4\" for expansion","Freeze 24 hrs until solid","Pop cubes into labeled freezer bags","Label: NAME + DATE + PORTION SIZE + ROUND (for broths)","Reload trays for next batch"].map((x,i)=><li key={i}>{i+1}. {x}</li>)}
        </ol>
      </div>
    </div>;
  };

  // Recipes
  const cats=["All",...new Set(R.map(r=>r.cat))];
  const fr2=rf==="All"?R:R.filter(r=>r.cat===rf);
  const recipes=()=><div className="space-y-4">
    <div className="flex flex-wrap gap-2">
      {cats.map(c=><button key={c} onClick={()=>setRf(c)} className={`text-xs px-3 py-1.5 rounded-full border ${rf===c?"bg-indigo-600 text-white border-indigo-600":"bg-white text-gray-600 border-gray-300 hover:border-indigo-300"}`}>
        {c} ({c==="All"?R.length:R.filter(r=>r.cat===c).length})
      </button>)}
    </div>
    <div className="space-y-2">{fr2.map(r=><Rcard key={r.id} r={r} open={!!ex[r.id]} toggle={()=>te(r.id)} done={!!ck[`recipe-${r.id}`]} onDone={()=>tg(`recipe-${r.id}`)}/>)}</div>
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Breakfast Ideas</h3>
      {["Egg bites (muffin tins, bake 350F 20-25 min)","Breakfast burritos (eggs, beans, cheese, salsa - foil-wrap, freeze)","Steel cut oatmeal cups (big batch into muffin tins, freeze)","Savory muffins (zucchini, cheddar, herbs)","Congee (doubles as breakfast)","Mini frittatas (egg + veggies in muffin tins, 375F 15-18 min)"].map((x,i)=><p key={i} className="text-sm text-gray-600 mb-1">&#8226; {x}</p>)}
    </div>
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Snacks</h3>
      <p className="text-sm text-gray-600 mb-1">&#8226; Lactation bites (oats, flaxseed, brewer&apos;s yeast, nut butter, chocolate, honey - no-bake balls)</p>
      <p className="text-sm text-gray-600">&#8226; Chia pudding (1/4 cup chia + 1 cup milk + sweetener - fridge overnight, NOT frozen)</p>
    </div>
  </div>;

  // Freezer
  const freezer=()=><div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Add to Freezer</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <input placeholder="Meal name" value={fi.n} onChange={e=>setFi({...fi,n:e.target.value})} className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <input type="number" placeholder="# portions" value={fi.p} onChange={e=>setFi({...fi,p:e.target.value})} className="w-28 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <input type="date" value={fi.d} onChange={e=>setFi({...fi,d:e.target.value})} className="w-40 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <button onClick={addF} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">Add</button>
      </div>
    </div>
    {fl.length===0?<div className="text-center py-12 text-gray-400"><p className="text-lg mb-1">Freezer is empty</p><p className="text-sm">Add items as you complete each recipe</p></div>
    :<div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="bg-gray-50 border-b border-gray-200">
          <th className="text-left px-4 py-2 font-medium text-gray-600">Meal</th>
          <th className="text-center px-4 py-2 font-medium text-gray-600">Total</th>
          <th className="text-center px-4 py-2 font-medium text-gray-600">Left</th>
          <th className="text-center px-4 py-2 font-medium text-gray-600">Date</th>
          <th className="text-center px-4 py-2 font-medium text-gray-600">Actions</th>
        </tr></thead>
        <tbody>{fl.map(f=>{
          const rem=Number(f.p)-f.u;
          return <tr key={f.id} className={`border-b border-gray-100 ${rem<=0?"opacity-40":""}`}>
            <td className="px-4 py-2.5 font-medium text-gray-800">{f.n}</td>
            <td className="px-4 py-2.5 text-center text-gray-600">{f.p}</td>
            <td className="px-4 py-2.5 text-center"><span className={`font-medium ${rem<=2&&rem>0?"text-amber-600":rem<=0?"text-gray-400":"text-emerald-600"}`}>{rem}</span></td>
            <td className="px-4 py-2.5 text-center text-gray-500">{f.d}</td>
            <td className="px-4 py-2.5 text-center">
              <button onClick={()=>setFl(fl.map(x=>x.id===f.id?{...x,u:Math.min(Number(x.p),x.u+1)}:x))} className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded mr-1">Use 1</button>
              <button onClick={()=>setFl(fl.filter(x=>x.id!==f.id))} className="px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">Remove</button>
            </td>
          </tr>;
        })}</tbody>
      </table>
    </div>}
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Reheating Guide</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
        <div><p className="font-medium text-gray-700">Broths/Soups</p><p>Frozen block into saucepan, medium-low, stir. Add water/broth if thick.</p></div>
        <div><p className="font-medium text-gray-700">Congee</p><p>Thaw in fridge or microwave. Add extra broth (thickens a lot). Stir often.</p></div>
        <div><p className="font-medium text-gray-700">Microwave</p><p>Cover loosely, 90-sec bursts, stir between. Stand 1 min.</p></div>
      </div>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Fresh Weekly Rotation (Not Frozen)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
        <div><p className="font-medium text-gray-700">Fermented</p><p>Sauerkraut (homemade), yogurt/kefir, miso</p></div>
        <div><p className="font-medium text-gray-700">Fresh Proteins</p><p>Eggs always, fish 1-2x/wk, mussels/clams 1x/wk (Jonny cooks)</p></div>
        <div><p className="font-medium text-gray-700">Produce</p><p>Avocados, lemons/limes, herbs, greens, seasonal veg</p></div>
        <div><p className="font-medium text-gray-700">Staples</p><p>Bread/tortillas, pasta, cheese, butter, olive oil</p></div>
      </div>
    </div>
  </div>;

  return <div className="min-h-screen bg-gray-50">
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3">
          <span className="text-lg">&#127858;</span>
          <h1 className="text-base font-bold text-gray-800">Postpartum Meal Prep</h1>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${tab===t?"bg-indigo-600 text-white":"text-gray-500 hover:bg-gray-100"}`}>{t}</button>)}
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto px-4 py-6">
      {tab==="Overview"&&overview()}
      {tab==="Shopping"&&shopping()}
      {tab==="Phase 1"&&phase(1)}
      {tab==="Phase 2"&&phase(2)}
      {tab==="Phase 3"&&phase(3)}
      {tab==="Phase 4"&&phase(4)}
      {tab==="Recipes"&&recipes()}
      {tab==="Freezer"&&freezer()}
    </div>
    <div className="max-w-4xl mx-auto px-4 py-4 border-t border-gray-200 mt-8 text-center text-xs text-gray-400">
      <p>Made with love for Kelly &amp; baby Miller</p>
      <p className="mt-1">Resources: The First Forty Days | Burlap &amp; Barrel | Diaspora Co. | Weee! | Shopper&apos;s Corner | Lotus Asian Market (Capitola)</p>
    </div>
  </div>;
}
