"use client";
import { useState, useEffect } from "react";

const RECIPES = [
  // Foundations & Broths
  { id: 1, name: "Chicken Bone Broth", category: "Broths", track: "kelly", servingUnit: "2-cup bag", color: "#f59e0b" },
  { id: 2, name: "Beef Bone Broth (2-cup)", category: "Broths", track: "kelly", servingUnit: "2-cup bag", color: "#f59e0b" },
  { id: 202, name: "Beef Bone Broth (1-cup)", category: "Broths", track: "kelly", servingUnit: "1-cup portion", color: "#f59e0b" },
  { id: 3, name: "Golden Broth", category: "Broths", track: "kelly", servingUnit: "2-cup bag", color: "#f59e0b" },
  { id: 51, name: "Silkie Chicken Tonic", category: "Broths", track: "kelly", servingUnit: "1-cup bag", color: "#f59e0b" },
  { id: 60, name: "Jujube Goji Ginger Tea", category: "Broths", track: "kelly", servingUnit: "1-cup cube", color: "#f59e0b" },
  // Soups & Congees (Kelly)
  { id: 57, name: "Miyeokguk", category: "Soups (Kelly)", track: "kelly", servingUnit: "2-cup bag", color: "#f43f5e" },
  { id: 8, name: "Chicken Ginger Congee", category: "Soups (Kelly)", track: "kelly", servingUnit: "2-cup bag", color: "#f43f5e" },
  { id: 61, name: "Sweet Congee (Chai-Spiced)", category: "Soups (Kelly)", track: "kelly", servingUnit: "2-cup bag", color: "#f43f5e" },
  { id: 78, name: "Date & Walnut Congee", category: "Soups (Kelly)", track: "kelly", servingUnit: "2-cup bag", color: "#f43f5e" },
  { id: 9, name: "Carrot Ginger Soup", category: "Soups (Kelly)", track: "kelly", servingUnit: "2-cup bag", color: "#f43f5e" },
  { id: 11, name: "Kabocha & Mung Bean Soup", category: "Soups (Kelly)", track: "kelly", servingUnit: "2-cup bag", color: "#f43f5e" },
  { id: 79, name: "Sweet Potato & Coconut Soup", category: "Soups (Kelly)", track: "kelly", servingUnit: "2-cup bag", color: "#f43f5e" },
  // Soups & Chilis (Shared)
  { id: 12, name: "Black Bean Soup", category: "Soups (Shared)", track: "shared", servingUnit: "2-cup bag", color: "#f97316" },
  { id: 14, name: "Minestrone", category: "Soups (Shared)", track: "shared", servingUnit: "2-cup bag", color: "#f97316" },
  { id: 17, name: "Beef Chili (Hidden Liver)", category: "Soups (Shared)", track: "shared", servingUnit: "2-cup bag", color: "#f97316" },
  { id: 66, name: "White Chicken Chili", category: "Soups (Shared)", track: "shared", servingUnit: "2-cup bag", color: "#f97316" },
  // Curries & Stews
  { id: 19, name: "Butter Chicken", category: "Curries & Stews", track: "shared", servingUnit: "2-cup bag", color: "#ef4444" },
  { id: 26, name: "Coconut Lentil Dal", category: "Curries & Stews", track: "shared", servingUnit: "2-cup bag", color: "#ef4444" },
  { id: 63, name: "Kitchari", category: "Curries & Stews", track: "shared", servingUnit: "2-cup bag", color: "#ef4444" },
  { id: 65, name: "Chickpea Coconut Curry", category: "Curries & Stews", track: "shared", servingUnit: "2-cup bag", color: "#ef4444" },
  { id: 68, name: "Beef & Sweet Potato Stew", category: "Curries & Stews", track: "shared", servingUnit: "2-cup bag", color: "#ef4444" },
  { id: 69, name: "Moroccan Beef & Chickpea Stew", category: "Curries & Stews", track: "shared", servingUnit: "2-cup bag", color: "#ef4444" },
  // Sauces & Proteins
  { id: 22, name: "Bolognese (Hidden Liver)", category: "Proteins & Sauces", track: "shared", servingUnit: "2-cup bag", color: "#dc2626" },
  { id: 40, name: "Meatballs (Hidden Liver)", category: "Proteins & Sauces", track: "shared", servingUnit: "bag (count meatballs)", color: "#dc2626" },
  { id: 32, name: "Chicken Pot Pie Filling", category: "Proteins & Sauces", track: "shared", servingUnit: "2-cup bag", color: "#dc2626" },
  { id: 35, name: "Salmon Patties", category: "Proteins & Sauces", track: "shared", servingUnit: "patty", color: "#dc2626" },
  // Breakfast
  { id: 55, name: "Egg Bites", category: "Breakfast", track: "shared", servingUnit: "bite (count each)", color: "#8b5cf6" },
  { id: 73, name: "Frittata (Sausage + Pepper)", category: "Breakfast", track: "shared", servingUnit: "frittata (count each)", color: "#8b5cf6" },
  { id: 75, name: "Quiche Lorraine", category: "Breakfast", track: "shared", servingUnit: "slice", color: "#8b5cf6" },
  { id: 72, name: "Steel-Cut Oatmeal Bowls", category: "Breakfast", track: "shared", servingUnit: "2-cup bag", color: "#8b5cf6" },
  { id: 77, name: "Baked Oatmeal Bars", category: "Breakfast", track: "shared", servingUnit: "bar", color: "#8b5cf6" },
  // Bases & Sides
  { id: 43, name: "Frozen Rice", category: "Bases & Sides", track: "shared", servingUnit: "½-cup cube", color: "#06b6d4" },
  { id: 45, name: "Mashed Sweet Potatoes", category: "Bases & Sides", track: "shared", servingUnit: "½-cup cube", color: "#06b6d4" },
  { id: 89, name: "Mango-Coconut Rice", category: "Bases & Sides", track: "shared", servingUnit: "1-cup cube", color: "#06b6d4" },
  // Snacks & Energy Balls
  { id: 52, name: "Lactation Oatmeal Cups", category: "Snacks", track: "kelly", servingUnit: "cup", color: "#10b981" },
  { id: 53, name: "Lactation Bites", category: "Snacks", track: "kelly", servingUnit: "ball", color: "#10b981" },
  { id: 80, name: "Tahini Date Balls", category: "Snacks", track: "shared", servingUnit: "ball", color: "#10b981" },
  { id: 81, name: "Cashew Choco Oat Balls", category: "Snacks", track: "shared", servingUnit: "ball", color: "#10b981" },
  { id: 82, name: "Almond Coconut Balls", category: "Snacks", track: "shared", servingUnit: "ball", color: "#10b981" },
  { id: 87, name: "Cherry-Choco Brownies", category: "Snacks", track: "shared", servingUnit: "square", color: "#10b981" },
  { id: 54, name: "Savory Muffins", category: "Snacks", track: "shared", servingUnit: "muffin", color: "#10b981" },
  // Toppings & Drinks
  { id: 83, name: "Warm Berry Compote", category: "Toppings & Drinks", track: "kelly", servingUnit: "½-cup cube", color: "#a855f7" },
  { id: 84, name: "Warm Mango Lassi", category: "Toppings & Drinks", track: "kelly", servingUnit: "1-cup cube", color: "#a855f7" },
  { id: 88, name: "Cherry Chia Jam", category: "Toppings & Drinks", track: "kelly", servingUnit: "2-tbsp cube", color: "#a855f7" },
];

const FREEZER_LOCATIONS = [
  { id: "standing-1", name: "Standing Freezer — Top Shelf", short: "S1" },
  { id: "standing-2", name: "Standing Freezer — Middle Shelf", short: "S2" },
  { id: "standing-3", name: "Standing Freezer — Bottom Shelf", short: "S3" },
  { id: "standing-door", name: "Standing Freezer — Door", short: "SD" },
  { id: "garage", name: "Garage Freezer (Jonny's)", short: "GF" },
  { id: "kitchen", name: "Kitchen Freezer", short: "KF" },
  { id: "fridge", name: "Kitchen Fridge (thawing)", short: "FR" },
];

const CATEGORY_COLORS = {
  "Broths": { bg: "#fef3c7", border: "#f59e0b", text: "#92400e", tape: "YELLOW" },
  "Soups (Kelly)": { bg: "#fce7f3", border: "#f43f5e", text: "#9f1239", tape: "PINK" },
  "Soups (Shared)": { bg: "#ffedd5", border: "#f97316", text: "#9a3412", tape: "ORANGE" },
  "Curries & Stews": { bg: "#fee2e2", border: "#ef4444", text: "#991b1b", tape: "RED" },
  "Proteins & Sauces": { bg: "#fecaca", border: "#dc2626", text: "#7f1d1d", tape: "DARK RED" },
  "Breakfast": { bg: "#ede9fe", border: "#8b5cf6", text: "#5b21b6", tape: "PURPLE" },
  "Bases & Sides": { bg: "#cffafe", border: "#06b6d4", text: "#155e75", tape: "TEAL" },
  "Snacks": { bg: "#d1fae5", border: "#10b981", text: "#065f46", tape: "GREEN" },
  "Toppings & Drinks": { bg: "#f3e8ff", border: "#a855f7", text: "#6b21a8", tape: "LAVENDER" },
};

const STORAGE_KEY = "freezer-audit-v1";

export default function FreezerAudit() {
  const [inventory, setInventory] = useState({});
  const [locations, setLocations] = useState({});
  const [bags, setBags] = useState({});
  const [notes, setNotes] = useState({});
  const [status, setStatus] = useState({}); // "stocked" | "pending" | null
  const [view, setView] = useState("audit"); // "audit" | "summary" | "map"
  const [expandedCat, setExpandedCat] = useState(null);
  const [auditComplete, setAuditComplete] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setInventory(data.inventory || {});
        setLocations(data.locations || {});
        setBags(data.bags || {});
        setNotes(data.notes || {});
        setStatus(data.status || {});
        setAuditComplete(data.auditComplete || false);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ inventory, locations, bags, notes, status, auditComplete }));
  }, [inventory, locations, bags, notes, status, auditComplete]);

  const categories = [...new Set(RECIPES.map(r => r.category))];

  const updateCount = (id, delta) => {
    setInventory(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const setCount = (id, val) => {
    const num = parseInt(val) || 0;
    setInventory(prev => ({ ...prev, [id]: Math.max(0, num) }));
  };

  const updateBags = (id, val) => {
    setBags(prev => ({ ...prev, [id]: Math.max(0, parseInt(val) || 0) }));
  };

  const updateLocation = (id, loc) => {
    setLocations(prev => ({ ...prev, [id]: loc }));
  };

  const toggleStatus = (id) => {
    setStatus(prev => {
      const current = prev[id];
      if (!current) return { ...prev, [id]: "pending" };
      if (current === "pending") return { ...prev, [id]: undefined };
      return { ...prev, [id]: undefined };
    });
  };

  const totalServings = Object.values(inventory).reduce((a, b) => a + b, 0);
  const totalBags = Object.values(bags).reduce((a, b) => a + b, 0);
  const recipesWithStock = RECIPES.filter(r => (inventory[r.id] || 0) > 0);
  const pendingRecipes = RECIPES.filter(r => status[r.id] === "pending");

  // Summary stats
  const kellyServings = RECIPES.filter(r => r.track === "kelly").reduce((acc, r) => acc + (inventory[r.id] || 0), 0);
  const sharedServings = RECIPES.filter(r => r.track === "shared").reduce((acc, r) => acc + (inventory[r.id] || 0), 0);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "-apple-system, sans-serif", padding: "16px", background: "#fafafa", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1e1b4b", margin: 0 }}>Freezer Audit</h1>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 0" }}>Tap through each recipe. Count what you actually have.</p>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#e5e7eb", borderRadius: 10, padding: 3 }}>
        {[
          { key: "audit", label: "Count" },
          { key: "summary", label: "Summary" },
          { key: "map", label: "Freezer Map" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            style={{
              flex: 1, padding: "8px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600,
              background: view === tab.key ? "#fff" : "transparent",
              color: view === tab.key ? "#1e1b4b" : "#6b7280",
              boxShadow: view === tab.key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              cursor: "pointer",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* AUDIT VIEW */}
      {view === "audit" && (
        <div>
          {/* Quick stats */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 12px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1e1b4b" }}>{totalServings}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>total servings</div>
            </div>
            <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 12px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1e1b4b" }}>{totalBags}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>gallon bags</div>
            </div>
            <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 12px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1e1b4b" }}>{recipesWithStock.length}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>in stock</div>
            </div>
            <div style={{ flex: 1, background: pendingRecipes.length > 0 ? "#fffbeb" : "#fff", borderRadius: 10, padding: "10px 12px", border: `1px solid ${pendingRecipes.length > 0 ? "#fcd34d" : "#e5e7eb"}` }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#92400e" }}>{pendingRecipes.length}</div>
              <div style={{ fontSize: 11, color: "#92400e" }}>still to cook</div>
            </div>
          </div>

          {categories.map(cat => {
            const catRecipes = RECIPES.filter(r => r.category === cat);
            const catColors = CATEGORY_COLORS[cat] || { bg: "#f3f4f6", border: "#9ca3af", text: "#374151", tape: "GREY" };
            const isExpanded = expandedCat === cat;
            const catTotal = catRecipes.reduce((acc, r) => acc + (inventory[r.id] || 0), 0);

            return (
              <div key={cat} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setExpandedCat(isExpanded ? null : cat)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 8,
                    padding: "12px 14px", borderRadius: 10, border: `1px solid ${catColors.border}`,
                    background: catColors.bg, cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: catColors.border, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: catColors.text }}>{cat}</div>
                    <div style={{ fontSize: 11, color: catColors.text, opacity: 0.7 }}>{catRecipes.length} recipes · {catColors.tape} tape</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: catColors.text }}>{catTotal}</div>
                  <div style={{ fontSize: 16, color: catColors.text, transform: isExpanded ? "rotate(90deg)" : "none", transition: "0.15s" }}>›</div>
                </button>

                {isExpanded && (
                  <div style={{ marginTop: 4, borderRadius: 10, overflow: "hidden", border: "1px solid #e5e7eb" }}>
                    {catRecipes.map((recipe, i) => {
                      const count = inventory[recipe.id] || 0;
                      const bagCount = bags[recipe.id] || 0;
                      const isPending = status[recipe.id] === "pending";
                      return (
                        <div key={recipe.id} style={{
                          padding: "12px 14px",
                          background: isPending ? "#fffbeb" : (i % 2 === 0 ? "#fff" : "#fafafa"),
                          borderBottom: i < catRecipes.length - 1 ? "1px solid #f3f4f6" : "none",
                          borderLeft: isPending ? "3px solid #f59e0b" : "3px solid transparent",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{recipe.name}</span>
                                {isPending && (
                                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: "#fef3c7", color: "#92400e", border: "1px solid #fcd34d" }}>PENDING</span>
                                )}
                              </div>
                              <div style={{ fontSize: 11, color: "#9ca3af" }}>
                                {recipe.servingUnit} · {recipe.track === "kelly" ? "Kelly only" : "Shared"}
                              </div>
                            </div>
                            <button
                              onClick={() => toggleStatus(recipe.id)}
                              style={{
                                padding: "4px 8px", borderRadius: 6, border: "1px solid",
                                fontSize: 11, fontWeight: 600, cursor: "pointer",
                                background: isPending ? "#fef3c7" : "#f9fafb",
                                borderColor: isPending ? "#fcd34d" : "#e5e7eb",
                                color: isPending ? "#92400e" : "#9ca3af",
                              }}
                            >{isPending ? "Not cooked yet" : "Mark pending"}</button>
                          </div>
                          {!isPending && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 0, background: "#f3f4f6", borderRadius: 8 }}>
                                <button
                                  onClick={() => updateCount(recipe.id, -1)}
                                  style={{ width: 36, height: 36, border: "none", background: "transparent", fontSize: 18, fontWeight: 700, color: "#6b7280", cursor: "pointer", borderRadius: "8px 0 0 8px" }}
                                >−</button>
                                <input
                                  type="number"
                                  inputMode="numeric"
                                  value={count}
                                  onChange={(e) => setCount(recipe.id, e.target.value)}
                                  style={{ width: 44, height: 36, border: "none", background: "#fff", textAlign: "center", fontSize: 16, fontWeight: 700, color: "#111827" }}
                                />
                                <button
                                  onClick={() => updateCount(recipe.id, 1)}
                                  style={{ width: 36, height: 36, border: "none", background: "transparent", fontSize: 18, fontWeight: 700, color: "#6b7280", cursor: "pointer", borderRadius: "0 8px 8px 0" }}
                                >+</button>
                              </div>
                              <div style={{ fontSize: 11, color: "#9ca3af", minWidth: 50 }}>servings</div>
                              <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                                <span style={{ fontSize: 11, color: "#9ca3af" }}>bags:</span>
                                <input
                                  type="number"
                                  inputMode="numeric"
                                  value={bagCount || ""}
                                  onChange={(e) => updateBags(recipe.id, e.target.value)}
                                  placeholder="0"
                                  style={{ width: 36, height: 28, border: "1px solid #e5e7eb", borderRadius: 6, textAlign: "center", fontSize: 13, fontWeight: 600, color: "#111827" }}
                                />
                              </div>
                            </div>
                          )}
                          {count > 0 && !isPending && (
                            <div style={{ marginTop: 8 }}>
                              <select
                                value={locations[recipe.id] || ""}
                                onChange={(e) => updateLocation(recipe.id, e.target.value)}
                                style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 12, color: "#374151", background: "#fff" }}
                              >
                                <option value="">Where is this stored?</option>
                                {FREEZER_LOCATIONS.map(loc => (
                                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={() => setAuditComplete(true)}
            style={{
              width: "100%", padding: "14px", borderRadius: 10, border: "none",
              background: auditComplete ? "#10b981" : "#4f46e5", color: "#fff",
              fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 16,
            }}
          >
            {auditComplete ? "✓ Audit Complete — Tap to Re-audit" : "Mark Audit Complete"}
          </button>
        </div>
      )}

      {/* SUMMARY VIEW */}
      {view === "summary" && (
        <div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 12px" }}>Inventory Overview</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "#fce7f3", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#9f1239" }}>{kellyServings}</div>
                <div style={{ fontSize: 11, color: "#9f1239" }}>Kelly servings</div>
              </div>
              <div style={{ background: "#dbeafe", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#1e40af" }}>{sharedServings}</div>
                <div style={{ fontSize: 11, color: "#1e40af" }}>Shared servings</div>
              </div>
            </div>
            {kellyServings > 0 && (
              <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280", textAlign: "center" }}>
                At 3 meals + 2 snacks/day, Kelly has ~{Math.floor(kellyServings / 5)} days of her own food
                {sharedServings > 0 && <span> + ~{Math.floor(sharedServings / 4)} days of shared meals</span>}
              </div>
            )}
          </div>

          {pendingRecipes.length > 0 && (
            <div style={{ background: "#fffbeb", borderRadius: 12, padding: 16, border: "1px solid #fcd34d", marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#92400e", margin: "0 0 10px" }}>Still to Cook ({pendingRecipes.length})</h3>
              {pendingRecipes.map(recipe => {
                const catColors = CATEGORY_COLORS[recipe.category] || {};
                return (
                  <div key={recipe.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #fef3c7" }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: catColors.border || "#9ca3af", flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 13, color: "#92400e" }}>{recipe.name}</div>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: "#fef3c7", color: "#92400e" }}>PENDING</span>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 12px" }}>All Recipes in Stock</h3>
            {recipesWithStock.length === 0 ? (
              <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", padding: 20 }}>No inventory yet. Go to Count tab to start.</p>
            ) : (
              <div>
                {recipesWithStock
                  .sort((a, b) => (inventory[b.id] || 0) - (inventory[a.id] || 0))
                  .map(recipe => {
                    const catColors = CATEGORY_COLORS[recipe.category] || {};
                    const loc = FREEZER_LOCATIONS.find(l => l.id === locations[recipe.id]);
                    return (
                      <div key={recipe.id} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "8px 0",
                        borderBottom: "1px solid #f3f4f6",
                      }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: catColors.border || "#9ca3af", flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{recipe.name}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>
                            {recipe.servingUnit}
                            {loc && <span> · {loc.short}</span>}
                          </div>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{inventory[recipe.id]}</div>
                        {bags[recipe.id] > 0 && (
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>({bags[recipe.id]} bags)</div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FREEZER MAP VIEW */}
      {view === "map" && (
        <div>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12, textAlign: "center" }}>
            Color = tape color for cardboard dividers
          </p>
          {FREEZER_LOCATIONS.map(loc => {
            const locRecipes = recipesWithStock.filter(r => locations[r.id] === loc.id);
            if (locRecipes.length === 0 && loc.id !== "garage" && loc.id !== "kitchen") return null;

            return (
              <div key={loc.id} style={{ background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #e5e7eb", marginBottom: 10 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
                  {loc.name}
                  {loc.id === "garage" && <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 400 }}> — Jonny&apos;s meals</span>}
                </h3>
                {locRecipes.length === 0 ? (
                  <p style={{ color: "#d1d5db", fontSize: 12, fontStyle: "italic" }}>Nothing assigned here yet</p>
                ) : (
                  <div>
                    {locRecipes.map(recipe => {
                      const catColors = CATEGORY_COLORS[recipe.category] || {};
                      return (
                        <div key={recipe.id} style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
                          borderBottom: "1px solid #f9fafb",
                        }}>
                          <div style={{
                            width: 8, height: 24, borderRadius: 2, background: catColors.border || "#9ca3af",
                            flexShrink: 0,
                          }} />
                          <div style={{ flex: 1, fontSize: 13, color: "#374151" }}>{recipe.name}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{inventory[recipe.id]}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>{recipe.servingUnit}</div>
                        </div>
                      );
                    })}
                    <div style={{ marginTop: 6, fontSize: 11, color: "#9ca3af", textAlign: "right" }}>
                      {locRecipes.reduce((a, r) => a + (bags[r.id] || 0), 0)} bags total
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Divider tape legend */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #e5e7eb", marginTop: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>Cardboard Divider Colors</h3>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 10px" }}>Use colored tape on top of cardboard strips so you can spot categories without reading labels.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
                <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0" }}>
                  <div style={{ width: 20, height: 12, borderRadius: 2, background: colors.border, flexShrink: 0 }} />
                  <div style={{ fontSize: 11, color: "#374151" }}>{colors.tape}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "20px 0 10px", fontSize: 11, color: "#d1d5db" }}>
        Miller Family Postpartum · Freezer Audit
      </div>
    </div>
  );
}