"use client";
/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

// ─── Color System (Adventure Theme) ───
const colors = {
  bg: "#1a1a2e",
  card: "#22223a",
  parchment: "#f5f0e1",
  parchmentDark: "#e8e0c8",
  text: "#e8e0d0",
  textLight: "#9ca3af",
  textDark: "#2d2a1e",
  accent: "#ffd700",
  accentLight: "#ffd70020",
  highlight: "#ffd700",
  warmBg: "#2a2a4a",
  red: "#ef4444",
  redLight: "#ef444420",
  orange: "#f59e0b",
  orangeLight: "#f59e0b20",
  green: "#4ade80",
  greenLight: "#4ade8020",
  border: "#2a2a4a",
  navi: "#60a5fa",
};

const font = "'Consolas', 'Monaco', 'Courier New', monospace";
const pixelFont = "'Press Start 2P', monospace";

// ─── Reusable Components ───

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: colors.card,
        borderRadius: 4,
        padding: "24px",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        marginBottom: 16,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,215,0,0.1)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)";
      }}
    >
      {children}
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        background: checked ? colors.greenLight : colors.card,
        border: `1px solid ${checked ? colors.green : colors.border}`,
        borderRadius: 4,
        padding: "12px 16px",
        marginBottom: 8,
        fontFamily: font,
        fontSize: 13,
        color: colors.text,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s ease-out",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 2,
          background: checked ? colors.green : "transparent",
          border: `2px solid ${checked ? colors.green : "#5b5b7b"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: "#1a1a2e",
          flexShrink: 0,
        }}
      >
        {checked ? "✓" : ""}
      </div>
      <span
        style={{
          flex: 1,
          textDecoration: checked ? "line-through" : "none",
          opacity: checked ? 0.6 : 1,
          color: checked ? colors.green : colors.text,
        }}
      >
        {checked ? `${label} — COMPLETE` : label}
      </span>
    </button>
  );
}

// ─── Guide Components (from postpartum guide) ───

function Highlight({ children }) {
  return (
    <span
      style={{
        background: `linear-gradient(transparent 60%, ${colors.highlight} 60%)`,
        padding: "0 4px",
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2
        style={{
          fontFamily: pixelFont,
          fontSize: 14,
          fontWeight: 400,
          color: colors.accent,
          margin: 0,
          lineHeight: 1.6,
          textShadow: "0 0 12px rgba(255, 215, 0, 0.2)",
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: font,
            fontSize: 13,
            color: colors.textLight,
            margin: "8px 0 0",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function InfoItem({ title, text, color = colors.accent }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        background: colors.warmBg,
        borderRadius: 4,
        borderLeft: `4px solid ${color}`,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontFamily: font,
          fontSize: 14,
          fontWeight: 600,
          color: colors.text,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: font,
          fontSize: 13,
          color: colors.textLight,
          lineHeight: 1.6,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function AlertCard({ level, title, items }) {
  const cfg = {
    normal: { bg: colors.greenLight, border: colors.green, label: "Normal" },
    pink: { bg: colors.orangeLight, border: colors.orange, label: "Pink Flag" },
    red: { bg: colors.redLight, border: colors.red, label: "Red Flag" },
    emergency: { bg: "#FEE2E2", border: "#991B1B", label: "Emergency" },
  };
  const c = cfg[level];
  return (
    <div
      style={{
        background: c.bg,
        borderRadius: 12,
        padding: 20,
        borderLeft: `4px solid ${c.border}`,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontFamily: font,
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: c.border,
          marginBottom: 8,
        }}
      >
        {c.label}
      </div>
      {title && (
        <div
          style={{
            fontFamily: font,
            fontSize: 15,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      )}
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: font,
              fontSize: 14,
              color: colors.text,
              lineHeight: 1.7,
              marginBottom: 4,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DecisionTree({ title, question, options }) {
  const [selected, setSelected] = useState(null);
  return (
    <Card style={{ background: colors.warmBg }}>
      <div
        style={{
          fontFamily: font,
          fontSize: 16,
          fontWeight: 600,
          color: colors.text,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: font,
          fontSize: 14,
          color: colors.textLight,
          marginBottom: 16,
          lineHeight: 1.6,
        }}
      >
        {question}
      </div>
      {options.map((opt, i) => (
        <div key={i}>
          <button
            onClick={() => setSelected(selected === i ? null : i)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              background:
                selected === i ? colors.accentLight : colors.card,
              border: `1px solid ${selected === i ? colors.accent : colors.border}`,
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 8,
              fontFamily: font,
              fontSize: 14,
              color: colors.text,
              cursor: "pointer",
              transition: "all 0.15s ease-out",
            }}
          >
            <span style={{ fontWeight: 600 }}>{opt.label}</span>
          </button>
          {selected === i && (
            <div
              style={{
                background: colors.card,
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
                marginLeft: 16,
                borderLeft: `3px solid ${colors.accent}`,
                fontFamily: font,
                fontSize: 13,
                color: colors.textLight,
                lineHeight: 1.7,
              }}
            >
              {opt.action}
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}

function TimelineItem({ week, title, description }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
      <div
        style={{
          minWidth: 56,
          height: 56,
          borderRadius: 12,
          background: colors.accentLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: font,
          fontSize: 12,
          fontWeight: 700,
          color: colors.accent,
          textTransform: "uppercase",
        }}
      >
        {week}
      </div>
      <div>
        <div
          style={{
            fontFamily: font,
            fontSize: 15,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: font,
            fontSize: 13,
            color: colors.textLight,
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

// ─── Guide Sections ───

function HomeSection({ setSection }) {
  const SECTIONS = [
    { id: "fivefiverule", label: "The 5-5-5 Rule" },
    { id: "physical", label: "Physical Recovery" },
    { id: "mental", label: "Mental Health" },
    { id: "breastfeeding", label: "Breastfeeding" },
    { id: "sleep", label: "Sleep Strategy" },
    { id: "practical", label: "What To Do" },
    { id: "laundry", label: "Laundry Guide" },
    { id: "temperature", label: "Baby Clothing" },
    { id: "coregulation", label: "Co-Regulation" },
    { id: "decisions", label: "Decision Trees" },
    { id: "relationship", label: "Relationship" },
    { id: "visitors", label: "Visitors" },
    { id: "redflags", label: "Red Flags" },
    { id: "timeline", label: "Timeline" },
    { id: "contacts", label: "Contacts" },
    { id: "jonny", label: "Jonny's Health" },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 16 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💙</div>
        <h1
          style={{
            fontFamily: font,
            fontSize: 32,
            fontWeight: 600,
            color: colors.text,
            margin: "0 0 8px",
          }}
        >
          Guide
        </h1>
        <p
          style={{
            fontFamily: font,
            fontSize: 15,
            color: colors.textLight,
            margin: "0 0 12px",
            lineHeight: 1.6,
          }}
        >
          Everything you need to know
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {SECTIONS.map((s) => (
          <Card
            key={s.id}
            onClick={() => setSection(s.id)}
            style={{
              padding: "16px",
              textAlign: "center",
              marginBottom: 0,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontFamily: font,
                fontSize: 13,
                fontWeight: 600,
                color: colors.text,
              }}
            >
              {s.label}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FiveFiveRuleSection() {
  return (
    <div>
      <SectionTitle subtitle="The first 15 days. This is the foundation of the 4th trimester.">
        The 5-5-5 Rule
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          The first 12 weeks postpartum are the <Highlight>4th trimester</Highlight>. Kelly's body is healing, hormones are recalibrating, and we're all learning each other. The 5-5-5 rule gives structure to the most critical first 15 days. Jonny's role during this time: <strong>be the runner.</strong>
        </p>
      </Card>

      <Card style={{ background: colors.accentLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 20, fontWeight: 600, color: colors.accent, marginBottom: 4 }}>
          Days 1-5
        </div>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          5 days IN the bed
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.textLight, lineHeight: 1.7 }}>
          Horizontal. Inside the sheets. Bonding with Eliana and healing. Kelly should not be getting up for anything except the bathroom. Jonny is <strong>the runner</strong>: bringing food, water, supplies, handling everything outside of the bed. Keep the room warm and comfortable. Cozy socks, robe, and pajamas.
        </div>
      </Card>

      <Card style={{ background: colors.accentLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 20, fontWeight: 600, color: colors.accent, marginBottom: 4 }}>
          Days 6-10
        </div>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          5 days ON the bed
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.textLight, lineHeight: 1.7 }}>
          Propped up and comfortable, mostly horizontal. Maybe sitting up more to nurse. Still resting, still healing. Short bathroom trips, maybe a slow walk to the kitchen. Jonny still running everything.
        </div>
      </Card>

      <Card style={{ background: colors.accentLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 20, fontWeight: 600, color: colors.accent, marginBottom: 4 }}>
          Days 11-15
        </div>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          5 days AROUND the bed
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.textLight, lineHeight: 1.7 }}>
          Short trips around the house. Sitting on the couch. Maybe stepping outside briefly. Still taking it very slow. Jonny is still handling the household but Kelly is starting to move a little more.
        </div>
      </Card>

      <InfoItem
        title="The postpartum station"
        text="Set up a station right next to the bed with: water (5-gallon jug), snacks, nipple cream, burp cloths, diapers, wipes, phone charger, nursing pillow, herbal tinctures, heating pad, and extra blankets. Everything Kelly needs within arm's reach."
        color={colors.green}
      />
      <InfoItem
        title="Warm and comfortable"
        text="Keep the room warm. Have a really nice pair of pajamas, a robe, and cozy socks ready. Warmth supports healing. A warm oil massage (belly, legs, feet) can feel incredible and support recovery."
        color={colors.green}
      />
      <InfoItem
        title="Nourishing meals"
        text="Warm, nutrient-dense food. Soups, stews, bone broth, warm drinks. Bring meals to the bed. Kelly shouldn't have to think about food at all during this time."
        color={colors.green}
      />
      <InfoItem
        title="Keep the bathroom stocked"
        text="Keep a checklist of what should be in the bathroom: pads (heavy, medium, light), peri bottle, witch hazel pads, herbal spray, fresh towels, comfortable underwear. Restock without being asked."
        color={colors.green}
      />
      <InfoItem
        title="Naps"
        text="Sleep when Eliana sleeps. Both of you. This is not negotiable during the first 15 days. Everything else can wait."
        color={colors.green}
      />
    </div>
  );
}

function PhysicalSection() {
  return (
    <div>
      <SectionTitle subtitle="What Kelly's body is going through — and what's normal">
        Physical Recovery
      </SectionTitle>

      <InfoItem
        title="Lochia (Postpartum Bleeding)"
        text="Lasts 4-6 weeks. Goes red → pink → yellowish. This is normal. Stock heavy and spotting pads stocked. If needed, reorder organic pads from Amazon list (heavy, medium, and light — must be organic, no exceptions)."
      />
      <InfoItem
        title="Afterpains"
        text="Uterine contractions during breastfeeding. Can be intense, especially in the first few days. Kelly uses herbal support for these (not ibuprofen). Make sure she has access to herbal tinctures and a heating pad for her belly."
      />
      <InfoItem
        title="Night Sweats"
        text="Drenching sweats as hormones recalibrate, especially first 2-3 weeks. Keep extra sheets nearby."
      />
      <InfoItem
        title="Engorgement"
        text="Days 3-5 when milk comes in. Can feel like rocks in the chest and spike a low fever. Warm compresses before feeding, cold after."
      />
      <InfoItem
        title="Nipple Pain"
        text="Cracking and soreness early on is common. Lanolin cream, silverette cups, or call the lactation consultant for help."
      />
      <InfoItem
        title="Pelvic Floor"
        text="Leaking pee when sneezing or laughing is common. Pelvic floor PT once Kelly is cleared. No crunches or heavy lifting for a while."
      />
      <InfoItem
        title="Hair Loss"
        text="Typically 3-4 months postpartum. Not every woman gets it dramatically, but don't freak out if clumps come out."
      />
      <InfoItem
        title="Constipation"
        text="Very common. Stool softeners are essential. Make sure Kelly is eating fiber and drinking tons of water."
      />
      <InfoItem
        title="Joint Laxity"
        text="Relaxin hormone hangs around for months (especially if breastfeeding). Joints will be looser — easy on physical activity."
      />
      <InfoItem
        title="Feet Can Grow"
        text="Permanently, sometimes. Arch flattening from relaxin + weight. Not a myth."
      />
      <InfoItem
        title="Warm Oil Massage"
        text="A warm oil massage (belly, legs, feet) supports recovery and feels incredible. Offer this regularly in the first weeks. Warmth in general supports healing."
        color={colors.green}
      />

      <div style={{ marginTop: 16 }}>
        <AlertCard
          level="red"
          title="Get help immediately if:"
          items={[
            "Fever above 100.4°F",
            "Heavy bleeding — soaking more than 1 pad per hour",
            "Foul-smelling discharge",
            "Severe headache or vision changes (postpartum preeclampsia)",
            "Chest pain or difficulty breathing",
            "Calf pain or swelling (blood clot risk)",
            "Inability to pee or severe pain urinating",
          ]}
        />
      </div>
    </div>
  );
}

function MentalHealthSection() {
  return (
    <div>
      <SectionTitle subtitle="80% of women experience baby blues. Here's what to watch for.">
        Mental Health
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          Baby blues are totally normal — Kelly won't be sleeping, will be anxious and figuring out breastfeeding. Breastfeeding hormones (oxytocin) can also make her feel happy and floaty. Both are real. <Highlight>Your job is to hold space, not fix.</Highlight>
        </p>
        <p style={{ fontFamily: font, fontSize: 13, color: colors.accent, lineHeight: 1.7, margin: "12px 0 0", fontWeight: 600 }}>
          Baby blues typically peak around days 4-5 and taper off around 2 weeks. If it goes longer than that, it may have become postpartum depression or anxiety.
        </p>
      </Card>

      <AlertCard
        level="normal"
        title="Totally normal (baby blues)"
        items={[
          "Teary and emotional, sometimes for no reason",
          "Anxious intrusive thoughts (like imagining falling down stairs with baby)",
          "Obsessively checking if Eliana is breathing (100 times is normal)",
          "Thoughts about missing her old life",
          "Feeling overwhelmed by the enormity of it all",
        ]}
      />
      <AlertCard
        level="pink"
        title="Pink flags — pay attention"
        items={[
          "Withdrawing, not talking to you",
          "Refusing help or insisting everything is fine when it clearly isn't",
          "Not eating or drinking enough",
          "Can't sleep even when Eliana is sleeping",
        ]}
      />
      <AlertCard
        level="red"
        title="Red flags — take action"
        items={[
          "Feeling depressed beyond 2-3 weeks",
          "Not able to emotionally connect with Eliana or not wanting to be around her",
          "Mania: feeling like she doesn't need sleep, feeling totally good (after 2+ weeks)",
          "Saying things that seem odd or disconnected from reality",
          "Thoughts about hurting the baby",
          "Can't or won't get out of bed when Eliana is crying (20-30+ min)",
          "Crying constantly or suicidal thoughts",
        ]}
      />

      <Card style={{ marginTop: 8 }}>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          If you see red flags:
        </div>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          {[
            "Don't diagnose. Just say: 'I love you. I've noticed some things and I think talking to someone could really help us.'",
            "Call the midwife first",
            "Postpartum Support International: 1-800-944-4773 (text or call)",
            "If it's an emergency, take her to the ER — postpartum psychosis is rare but serious",
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.7, marginBottom: 6 }}>
              {item}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function BreastfeedingSection() {
  return (
    <div>
      <SectionTitle subtitle="This is its own journey. Here's how you can genuinely help.">
        Breastfeeding
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          Milk comes in days 3-5. Before that, colostrum (liquid gold) is enough. <Highlight>Cluster feeding is normal</Highlight> — it doesn't mean supply is low.
        </p>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          What is cluster feeding?
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.textLight, lineHeight: 1.7 }}>
          Cluster feeding is when baby feeds many times in a short period, sometimes every 20-45 minutes for several hours. It's most common in the evenings (roughly 6pm-midnight) and during growth spurts. It does NOT mean supply is low. It's actually how babies signal the body to produce more milk.
        </div>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.accent, marginTop: 12, fontWeight: 600 }}>
          Expect heavy cluster feeding around:
        </div>
        <ul style={{ margin: "4px 0 0", paddingLeft: 20 }}>
          {["First few nights home (days 2-5)", "Around 7-10 days", "3 week growth spurt", "6 week growth spurt", "3 month growth spurt"].map((item, i) => (
            <li key={i} style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
      </Card>

      <InfoItem title="Water — the 5-gallon jug" text="There's a 5-gallon water jug in the bedroom. Your job: check it regularly and refill before it runs out. Every time Kelly sits down to nurse, make sure she has water within reach. She's burning 500 extra calories a day." color={colors.green} />
      <InfoItem title="After each feed" text="Handle burping and diaper changes. Manage the feed station — nipple cream, nursing pillow, burp cloths, phone charger, snacks." color={colors.green} />
      <InfoItem title="Tongue/Lip Tie" text="If breastfeeding is extremely painful beyond the first couple weeks, get it evaluated. Ask the midwife or lactation consultant." color={colors.orange} />

      <AlertCard
        level="red"
        title="Mastitis — call midwife immediately"
        items={["Red, hot patch on breast", "Flu-like symptoms", "Fever above 101°F", "This can escalate fast — don't wait"]}
      />
    </div>
  );
}

function SleepSection() {
  return (
    <div>
      <SectionTitle subtitle="Sleep deprivation is real torture. Let's have a plan.">
        Sleep Strategy
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7 }}>
          <strong>Sleep setup:</strong> Co-sleeping following the Safe Sleep Seven guidelines from La Leche League.
        </div>
      </Card>

      <Card style={{ background: colors.accentLight }}>
        <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: colors.accent, marginBottom: 12 }}>
          Shift Structure
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140, background: colors.card, borderRadius: 10, padding: 16 }}>
            <div style={{ fontFamily: font, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: colors.accent, marginBottom: 6 }}>
              Kelly's Shift
            </div>
            <div style={{ fontFamily: font, fontSize: 20, fontWeight: 600, color: colors.text }}>
              10pm — 4/5am
            </div>
            <div style={{ fontFamily: font, fontSize: 12, color: colors.textLight, marginTop: 4 }}>
              Co-sleeping + night feeds.
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 140, background: colors.card, borderRadius: 10, padding: 16 }}>
            <div style={{ fontFamily: font, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: colors.accent, marginBottom: 6 }}>
              Jonny's Shift
            </div>
            <div style={{ fontFamily: font, fontSize: 20, fontWeight: 600, color: colors.text }}>
              ~6am — 10am
            </div>
            <div style={{ fontFamily: font, fontSize: 12, color: colors.textLight, marginTop: 4 }}>
              Morning shift. Kelly sleeps in.
            </div>
          </div>
        </div>
      </Card>

      <div style={{ marginTop: 16 }}>
        <InfoItem title="During Kelly's shift" text="Kelly will be co-sleeping and handling night feeds. If she needs you, she'll wake you. Otherwise, sleep." />
        <InfoItem title="During your morning shift" text="Take Eliana so Kelly can get unbroken sleep. Handle diapers, soothing, and bring Eliana to Kelly only when she needs to feed." />
        <InfoItem title="Sleep when the baby sleeps" text="Not just during Kelly's shift — YOU should sleep then too, not catch up on emails." />
      </div>
    </div>
  );
}

function PracticalSection() {
  return (
    <div>
      <SectionTitle subtitle="Default to doing these without being asked.">
        What Jonny Should Do
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
          Don't ask "what can I do?" Just do these things. <Highlight>The mental load of delegating is itself exhausting.</Highlight>
        </p>
      </Card>

      {[
        { title: "Meals + dishes", text: "Handle all meals and dishes without being asked. You've already built a meal prep system for this." },
        { title: "Be the visitor gatekeeper", text: "Field ALL texts and calls about visiting. Check in with Kelly about what feels good. Enforce limits." },
        { title: "Water — check the 5-gallon jug", text: "Check it regularly and refill before it runs out. Snacks within arm's reach at ALL times." },
        { title: "Lola", text: "Handle all of Lola's walks, feeding, and needs entirely. Lola might need extra attention adjusting to a baby." },
        { title: "Household supplies", text: "Diapers, wipes, nipple cream, pads — restock without being asked. Everything must be organic." },
        { title: "Non-baby logistics", text: "Bills, mail, errands, appointments. All of it. Take it completely off her plate." },
        { title: "Document everything", text: "First smile, funny moments, milestones. Kelly won't remember. Take photos and videos." },
        { title: "Learn independently", text: "Practice swaddling, diaper changes, and soothing so Kelly can fully hand Eliana off and actually rest." },
      ].map((item, i) => (
        <InfoItem key={i} title={item.title} text={item.text} color={colors.green} />
      ))}

      <Card style={{ marginTop: 8 }}>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          Things for Kelly (help her protect these)
        </div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {["Yoga or gentle movement", "Sitting in the park or redwoods", "Bodywork session", "Even 30 minutes alone, reading or just breathing", "A walk without the stroller"].map((item, i) => (
            <li key={i} style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.8 }}>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function LaundrySection() {
  return (
    <div>
      <SectionTitle subtitle="Different things need different care. This matters.">
        Laundry Guide
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          Two approved detergents. <Highlight>Never mix them up.</Highlight>
        </p>
      </Card>

      <Card style={{ background: colors.accentLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: colors.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          Detergent Rules
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7 }}>
          <strong>Mollie's Suds</strong> — for Kelly's sheets, Kelly's clothes, and ALL baby items. Only approved detergent for anything touching Kelly or Eliana's skin.
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, marginTop: 8 }}>
          <strong>Eco-Ecos</strong> — for towels and anything with poop, pee, or spit-up. Can use hotter water.
        </div>
      </Card>

      <InfoItem title="Kelly's Linen Sheets" text="Wash on WARM. Turn patterns INSIDE OUT. Tumble dry on LOW. Don't overfill. Use Mollie's Suds only." color={colors.accent} />
      <InfoItem title="Kelly's Clothes" text="Wash with Mollie's Suds. Normal cycle, normal temperatures." color={colors.accent} />
      <InfoItem title="All Baby Items" text="Clothes, swaddles, burp cloths, sleep sacks — everything baby touches gets Mollie's Suds. Gentle cycle preferred." color={colors.accent} />
      <InfoItem title="Towels + Heavily Soiled Items" text="Use Eco-Ecos with hotter water. BUT: be careful with muslin — it will shrink in hot water." color={colors.orange} />
      <InfoItem title="Muslin Warning" text="Muslin fabrics are delicate. Wash on warm or cool — NOT hot. They will shrink." color={colors.orange} />
    </div>
  );
}

function TemperatureSection() {
  return (
    <div>
      <SectionTitle subtitle="What to dress Eliana in based on room temperature.">
        Baby Clothing & Temperature
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 16 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          Ideal room temperature for newborn sleep: <Highlight>68-72°F (20-22°C)</Highlight>.
        </p>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 12 }}>
          What to dress her in
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font, fontSize: 12 }}>
            <thead>
              <tr>
                {["Room Temp", "For Sleep", "Awake"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 6px", borderBottom: `2px solid ${colors.border}`, color: colors.text, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Below 65°F", "Long-sleeve onesie + 2.5 TOG sleep sack", "Long-sleeve + pants + socks"],
                ["65-68°F", "Long-sleeve onesie + 1.5-2.0 TOG sack", "Long-sleeve + pants"],
                ["68-72°F ✓", "Long-sleeve onesie + 1.0 TOG sack", "Long-sleeve onesie + pants"],
                ["72-75°F", "Short-sleeve onesie + 0.5-1.0 TOG sack", "Short-sleeve onesie"],
                ["Above 75°F", "Short-sleeve onesie only (or just diaper)", "Diaper + light cotton"],
              ].map((row, i) => (
                <tr key={i} style={{ background: i === 2 ? colors.greenLight : "transparent" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "8px 6px", borderBottom: `1px solid ${colors.border}`, color: colors.textLight, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <InfoItem title="During skin-to-skin" text="Eliana should be in just a diaper. Your body heat regulates her temperature. Cover her back with a light blanket." color={colors.green} />

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          How to check if she's too hot or cold
        </div>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.7, marginBottom: 8 }}>
          Feel her <strong>chest or back of neck</strong> — NOT hands/feet.
        </div>
        <AlertCard level="pink" title="Signs she's too HOT" items={["Sweaty neck or damp hair", "Red, hot ears or flushed cheeks", "Rapid breathing", "Fussy and restless", "Heat rash"]} />
        <AlertCard level="normal" title="Signs she's too COLD" items={["Cool chest or back of neck", "Fussiness and frequent waking", "Pale complexion", "Shivering"]} />
      </Card>

      <InfoItem title="Overheating is more dangerous" text="When in doubt, go with one fewer layer. Overheating increases SIDS risk. Never cover her head during sleep." color={colors.orange} />
    </div>
  );
}

function CoregulationSection() {
  return (
    <div>
      <SectionTitle subtitle="Your nervous system state directly affects Kelly and Eliana.">
        Co-Regulation
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          Newborns are exquisitely attuned to the nervous system states of their caregivers. <Highlight>Your regulation IS their regulation.</Highlight> Kelly's system will be highly sensitized postpartum. If you're dysregulated, she'll feel it immediately.
        </p>
      </Card>

      <InfoItem title="Your state is contagious" text="Before picking up a crying baby, take 3 slow breaths. Eliana can feel tension in your body. A calm hold is more soothing than a tense one." color={colors.accent} />
      <InfoItem title="When Kelly is activated" text="Don't try to fix or rationalize. Match her pace, then gently slow down. Speak lower and slower. Your calm voice is a regulation tool." color={colors.accent} />
      <InfoItem title="Vagal tone matters" text="Your daily practices aren't optional luxuries anymore — they're infrastructure. Even 5 min of breathwork or cold exposure shifts your baseline for the whole household." color={colors.accent} />
      <InfoItem title="Micro-moments of co-regulation" text="Hand on her back while she nurses. Eye contact. A long exhale together. These are not small things." color={colors.accent} />
      <InfoItem title="When you're dysregulated" text="Name it: 'I'm feeling overwhelmed right now. I need 5 minutes.' This models healthy regulation from day one." color={colors.orange} />

      <Card>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          Quick Regulation Tools (for 3am)
        </div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {[
            "Physiological sigh: double inhale through nose, long exhale through mouth",
            "Hum or sing low notes while holding Eliana",
            "Slow rocking: rhythmic movement is regulating for all three nervous systems",
            "Skin-to-skin: put Eliana on your bare chest",
            "Cold water on wrists or face if you need a quick reset",
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.8 }}>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function DecisionTreesSection() {
  return (
    <div>
      <SectionTitle subtitle="Common 3am scenarios. Tap through to find what to do.">
        Decision Trees
      </SectionTitle>

      <Card style={{ background: colors.accentLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.accent, marginBottom: 8 }}>
          Our Parenting Philosophy: Aware Parenting
        </div>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.text, lineHeight: 1.7 }}>
          Babies cry for two reasons — to communicate an unmet need OR to release accumulated stress. When all needs are met and baby is still crying, practice <strong>crying-in-arms</strong>: hold her with calm, loving presence and let her cry. The crying IS the healing.
        </div>
      </Card>

      <DecisionTree
        title="Baby won't stop crying"
        question="You've checked diaper, tried feeding, and she's still crying. What next?"
        options={[
          { label: "She's fed, changed, and still crying", action: "This may be stress-release crying. Hold her close with calm, loving presence. Don't try to shush, jiggle, or distract. Your job is to be a compassionate listener. Your calm nervous system is the most powerful tool here." },
          { label: "She's pulling her legs up / seems gassy", action: "Bicycle her legs gently. Try tummy time on your forearm (football hold). Gentle pressure on her belly. Gripe water or gas drops. Warm bath can help." },
          { label: "She feels warm or seems unwell", action: "Take her temperature. Under 100.4°F — monitor, try skin-to-skin, keep feeding. Over 100.4°F in a newborn under 3 months — call midwife or go to ER immediately." },
          { label: "I'm getting overwhelmed", action: "It's OK to hand Eliana to Kelly if she's awake. If Kelly's sleeping and you're at your limit, lay Eliana down safely and take 2-3 minutes for a physiological sigh. Then pick her back up." },
        ]}
      />

      <DecisionTree
        title="Kelly seems off"
        question="Something feels different about how Kelly is doing. What are you noticing?"
        options={[
          { label: "She's tearful but talking to me", action: "This is likely baby blues (normal in weeks 1-3). Don't try to fix it. Say: 'I see you. This is so hard. You're doing amazing.' Bring her tea. Sit with her. Oxytocin drop after feeding can trigger sudden tears." },
          { label: "She's withdrawing / won't talk", action: "Pink flag. Stay close. Try: 'You don't have to talk, but I'm here.' If this lasts more than a few days, gently suggest: 'I think it could help to talk to someone.'" },
          { label: "She seems disconnected from Eliana", action: "Red flag. This could be postpartum depression. Call midwife. Say: 'I love you. I've noticed some things and I think talking to someone could help us.' Frame as 'us' not 'you.'" },
          { label: "She's saying things that seem strange", action: "If she seems euphoric, doesn't need sleep, is talking fast, or things don't connect to reality — this could be postpartum psychosis. Call midwife immediately. Don't leave her alone with Eliana." },
        ]}
      />

      <DecisionTree
        title="Breastfeeding trouble"
        question="What's happening with feeding?"
        options={[
          { label: "Eliana won't latch", action: "Try different positions: cradle, cross-cradle, football, laid-back. Skin-to-skin can help. Express milk onto nipple. If frantic, calm her first then try again." },
          { label: "Kelly's in a lot of pain", action: "Some discomfort early is normal, but sharp pain is not. Check the latch — mouth wide open with bottom lip flanged out. Apply lanolin after feeds. Beyond week 1-2, get evaluated for tongue tie." },
          { label: "Worried about milk supply", action: "Count wet diapers: 6+ wet in 24 hours = getting enough. Cluster feeding is normal and doesn't mean low supply — it's how babies increase supply. Weight checks are the real metric." },
          { label: "Red, hot, painful spot on breast", action: "Possible mastitis. Keep feeding on that side. Warm compress before, cold after. Call midwife today — antibiotics may be needed." },
        ]}
      />

      <DecisionTree
        title="I need help and Kelly is asleep"
        question="It's your shift, Kelly is sleeping, and you're struggling."
        options={[
          { label: "I can't get Eliana to stop crying", action: "Work through checklist: diaper, hunger, gas, temperature, overstimulation. If all needs met, this is stress-release crying. Hold her with calm presence. If you've been going 30+ min and losing regulation, it's OK to gently wake Kelly." },
          { label: "I think something might be wrong", action: "Trust your gut. If she feels hot, cold, or limp — take her temperature. Under 3 months, fever above 100.4°F = call midwife or ER immediately. Wake Kelly. Better to overreact than underreact." },
          { label: "I'm overwhelmed and need to regulate", action: "Lay Eliana down safely. Do a physiological sigh. Splash cold water on your face. Then pick her back up — she needs your presence. You're being a responsible parent by recognizing your limit." },
        ]}
      />
    </div>
  );
}

function RelationshipSection() {
  return (
    <div>
      <SectionTitle subtitle="The relationship shifts. This is normal. Here's how to protect it.">
        Relationship
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          The relationship will temporarily revolve almost entirely around Eliana. <Highlight>This is normal and not permanent.</Highlight> You're becoming a family — the romantic partnership will find its new shape, but it takes time.
        </p>
      </Card>

      <InfoItem title="Daily check-in" text="Even just 5 minutes: 'How are you actually doing?' Not logistics. About feelings. Same time each day if possible." color={colors.accent} />
      <InfoItem title="Don't wait to be asked" text="Kelly won't always be able to tell you what she needs. Try things. If you get it wrong, that's fine — the trying itself matters." color={colors.accent} />
      <InfoItem title="Resentment builds silently" text="Agree on a low-stakes signal for 'I'm starting to feel resentful.' Catch it early before it builds." color={colors.orange} />
      <InfoItem title="Physical intimacy" text="Off the table for minimum 6 weeks (often longer). That's fine and non-negotiable. Closeness doesn't have to be sexual — hand holding, forehead kisses." />
      <InfoItem title="Your experience matters too" text="You'll have your own emotional experience of becoming a father. You should have someone to process with outside of Kelly — a friend, therapist, or men's group." color={colors.green} />
      <InfoItem title="Appreciation notes" text="Create little appreciation cards or a board where you can leave each other notes. Writing them down helps when words are hard to say out loud." color={colors.accent} />
      <InfoItem title="Daily micro check-in" text="Not a full conversation — just a moment. Hand on her shoulder, eye contact, 'How are you right now?' This small ritual keeps you connected." color={colors.accent} />
    </div>
  );
}

function VisitorSection() {
  return (
    <div>
      <SectionTitle subtitle="You are the gatekeeper. Check in with Kelly about what feels right.">
        Visitors & Boundaries
      </SectionTitle>

      <Card style={{ background: colors.accentLight, marginBottom: 20 }}>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.accent, lineHeight: 1.7 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Our visitor approach:
          </div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Check in with Kelly in the moment about what feels good</li>
            <li>Short visits only (1-2 hours max) unless it feels right for longer</li>
            <li>Visitors should be helpful (bring food, help around house) not just hold the baby while Kelly hosts</li>
            <li>Have a code word for "I need everyone to leave now"</li>
          </ul>
        </div>
      </Card>

      <Card style={{ background: colors.greenLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.green, marginBottom: 4 }}>
          Always Welcome
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7 }}>
          <strong>The doula</strong> — has open access anytime. No need to check schedules.
        </div>
      </Card>

      <InfoItem title="You're the enforcer" text="Field all texts and calls about visiting. Check with Kelly about timing. Kelly should never have to be the 'bad guy.'" color={colors.accent} />
      <InfoItem title="Script for family" text="'We're so excited for you to meet Eliana! We're doing short visits — can we find a 1-hour window? If you can bring a meal or help around the house, we'd really appreciate it.'" color={colors.green} />
      <InfoItem title="When to cancel" text="If Kelly had a bad night, if she's emotional, if she just doesn't feel like it — cancel. 'Kelly's resting today, let's reschedule' is a complete sentence." color={colors.orange} />
    </div>
  );
}

function RedFlagsSection() {
  return (
    <div>
      <SectionTitle subtitle="Quick reference. When in doubt, call the midwife.">
        Red Flags
      </SectionTitle>

      <AlertCard
        level="emergency"
        title="Call 911 / Go to ER immediately"
        items={[
          "Kelly has chest pain or can't breathe",
          "Seizure",
          "Kelly talking about hurting herself or Eliana",
          "Kelly seems psychotic — disconnected from reality, hallucinating",
          "Heavy bleeding that won't stop (soaking 1+ pad per hour)",
          "Severe headache + vision changes (postpartum preeclampsia)",
        ]}
      />

      <AlertCard
        level="red"
        title="Call midwife today"
        items={[
          "Fever above 100.4°F (Kelly)",
          "Fever above 100.4°F (Eliana, under 3 months — ER directly)",
          "Red, hot breast with flu symptoms (mastitis)",
          "Foul-smelling discharge",
          "Calf pain or swelling",
          "Can't urinate or severe pain urinating",
          "Signs of depression persisting beyond 2-3 weeks",
          "Kelly can't connect with or doesn't want to be around Eliana",
        ]}
      />

      <AlertCard
        level="pink"
        title="Monitor closely — mention at next appointment"
        items={[
          "Baby blues lasting longer than expected",
          "Kelly withdrawing from conversation",
          "Persistent breastfeeding pain beyond week 2",
          "Significant mood swings",
          "Kelly not eating or sleeping even when she has the chance",
        ]}
      />
    </div>
  );
}

function TimelineSection() {
  return (
    <div>
      <SectionTitle subtitle="The 4th trimester (first 12 weeks) and beyond.">
        Recovery Timeline
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 16 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          The first 12 weeks are called the <Highlight>4th trimester</Highlight>. Eliana is adjusting to life outside the womb. Kelly is healing, hormonally recalibrating, learning a new identity. Go slow. The 5-5-5 rule covers the critical first 15 days.
        </p>
      </Card>

      <TimelineItem week="Wk 1-2" title="Survival Mode" description="Hormonal rollercoaster. Milk coming in. Learning to feed. Everything is new and intense. Baby blues peaking. Focus on keeping everyone fed, hydrated, and resting." />
      <TimelineItem week="Wk 3-4" title="Small Rhythms Emerge" description="Still exhausted but you start to notice patterns. First growth spurt around week 3 (cluster feeding). Kelly may want small bits of normalcy." />
      <TimelineItem week="Wk 5-6" title="Six-Week Checkup" description="Doctor's appointment for Kelly. Starting to find rhythms but growth spurts disrupt everything. Second growth spurt around week 6." />
      <TimelineItem week="Mo 2-3" title="Slightly More Predictable" description="Patterns become more recognizable. 3-month growth spurt incoming. Eliana starts making eye contact and social smiling. This changes everything." />
      <TimelineItem week="Mo 3-4" title="A Turning Point" description="Often when things start feeling more manageable. Baby interacts more. Hair loss may begin (don't panic). Kelly's identity continues to shift." />
      <TimelineItem week="Mo 6+" title="More of Kelly Returns" description="More of her pre-baby self returns, but the identity shift is ongoing. New normal is settling in. Keep supporting, keep checking in." />
    </div>
  );
}

function ContactsSection() {
  const ContactCard = ({ title, phone, note }) => (
    <Card style={{ padding: "16px 20px" }}>
      <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: colors.text }}>
        {title}
      </div>
      {phone && (
        <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} style={{ fontFamily: font, fontSize: 16, color: colors.accent, fontWeight: 600, margin: "4px 0", display: "block", textDecoration: "none" }}>
          {phone}
        </a>
      )}
      {note && (
        <div style={{ fontFamily: font, fontSize: 12, color: colors.textLight, marginTop: 4 }}>
          {note}
        </div>
      )}
    </Card>
  );

  return (
    <div>
      <SectionTitle subtitle="Save these. Print these. Put them on the fridge.">
        Contacts + Support Network
      </SectionTitle>

      <Card style={{ background: colors.redLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: colors.red, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          In an emergency: call 911
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7 }}>
          Postpartum psychosis, heavy uncontrolled bleeding, chest pain, seizure, suicidal ideation
        </div>
      </Card>

      {/* ── Birth Team ── */}
      <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: colors.accent, marginTop: 24, marginBottom: 12 }}>
        Birth Team
      </div>
      <ContactCard title="Sunshine (Midwife)" phone="831-234-2314" note="First call for most concerns about Kelly or Eliana. Also handles tongue tie evaluation." />
      <ContactCard title="Revital (Doula)" phone="928-713-7123" note="Always welcome. Open access anytime. No need to ask before reaching out." />

      {/* ── Hotlines ── */}
      <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: colors.accent, marginTop: 24, marginBottom: 12 }}>
        Hotlines
      </div>
      <ContactCard title="Postpartum Support International" phone="1-800-944-4773" note="Call or text, 24/7. For mental health concerns." />

      {/* ── Friends + Sister Support ── */}
      <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: colors.accent, marginTop: 24, marginBottom: 12 }}>
        Friends + Sister Support
      </div>
      <Card style={{ background: colors.warmBg, marginBottom: 16, padding: "16px 20px" }}>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.text, lineHeight: 1.7 }}>
          These are Kelly's closest people. If you need backup, someone to bring food, or just another human in the house while Kelly rests, reach out to any of them. They want to help.
        </div>
      </Card>
      <ContactCard title="Kiki" note="Postpartum support sisterhood" />
      <ContactCard title="Ashley Carver" phone="312-613-6777" note="Nosara friend" />
      <ContactCard title="Aja" phone="970-819-3981" note="Boulder. Postpartum support sisterhood." />
      <ContactCard title="Rachel" note="Friend + sister support" />

      {/* ── Local in Santa Cruz ── */}
      <div style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: colors.accent, marginTop: 24, marginBottom: 12 }}>
        Local in Santa Cruz
      </div>
      <Card style={{ background: colors.warmBg, marginBottom: 16, padding: "16px 20px" }}>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.text, lineHeight: 1.7 }}>
          Nearby friends who can come over, bring a meal, take Lola for a walk, or sit with Kelly while you step out.
        </div>
      </Card>
      <ContactCard title="Breann" note="Local Santa Cruz" />
      <ContactCard title="Deanna" note="Local Santa Cruz" />
      <ContactCard title="Janet" note="Local Santa Cruz" />
      <ContactCard title="Leslie" note="Local Santa Cruz" />
      <ContactCard title="Abby" note="Local Santa Cruz" />
    </div>
  );
}

function JonnySection() {
  return (
    <div>
      <SectionTitle subtitle="You can't pour from an empty cup. Paternal mental health matters.">
        Jonny's Health
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          Roughly 10% of new dads experience paternal postpartum depression. You're not immune. In fact, <Highlight>your high self-awareness might make you more likely to dismiss your own needs.</Highlight>
        </p>
      </Card>

      <AlertCard
        level="pink"
        title="Watch for in yourself"
        items={[
          "Withdrawal from Kelly or Eliana",
          "Irritability that's unusual for you",
          "Feeling disconnected from the baby",
          "Anger that feels disproportionate",
          "Numbness or going through the motions",
          "Telling yourself you don't need support because 'Kelly has it harder'",
        ]}
      />

      <InfoItem title="Keep some version of your practices" text="Even abbreviated. 5 min breathwork. A cold shower. These aren't luxuries — they're how you stay regulated for your family." color={colors.green} />
      <InfoItem title="Have your person" text="At least one friend, therapist, or men's group where you can be honest. Not Kelly — she can't hold that right now." color={colors.green} />
      <InfoItem title="Surfing, foiling, nature" text="Keep these alive even if less frequent. An hour in the water resets you. Protect this without guilt." color={colors.green} />
      <InfoItem title="NSM work" text="Decide now what's essential and what can be delegated. This is a season. The business will be fine. Eliana's first months won't come back." color={colors.orange} />

      <Card>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
          From Kelly: I love you. I need you regulated more than I need you productive. Taking care of yourself IS taking care of us.
        </p>
      </Card>
    </div>
  );
}

// ─── Tab Components ───

function TodayTab({ checkedTasks, setCheckedTasks }) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dateStr = today.toISOString().split("T")[0];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[dayOfWeek];

  const hour = today.getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17) greeting = "Good evening";

  const toggleTask = (taskId) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [dateStr]: {
        ...(prev[dateStr] || {}),
        [taskId]: !prev[dateStr]?.[taskId],
      },
    }));
  };

  // Build quest list based on day and date
  const tasks = [
    { id: "lola-food", label: "Rotate Lola's food: move a portion from freezer to fridge", type: "side" },
  ];

  if (dayName === "Monday") {
    tasks.push({ id: "alejandrina", label: "Alejandrina arrives around 12pm", type: "event" });
  }
  if (dayName === "Wednesday") {
    tasks.push({ id: "trash", label: "Take out trash, recycling, compost, green waste", type: "side" });
  }
  if (dayName === "Saturday") {
    tasks.push({ id: "domestic-daddy", label: "Domestic Daddy + Grove Quest: Water all plants", type: "main" });
    tasks.push({ id: "lola-bowl", label: "Clean Lola's water bowl and refill", type: "side" });
    tasks.push({ id: "monstera", label: "Spray Monstera with water bottle", type: "side" });
  }

  const dayOfMonth = today.getDate();
  if (dayOfMonth === 1) {
    tasks.push({ id: "lola-interceptor", label: "Potion Quest: Give Lola Interceptor Plus tablet", type: "main" });
  }
  if (dayOfMonth === 15) {
    tasks.push({ id: "lola-credelio", label: "Potion Quest: Give Lola Credelio tablet", type: "main" });
  }

  const tasksToday = checkedTasks[dateStr] || {};
  const completedCount = Object.values(tasksToday).filter(Boolean).length;
  const allComplete = completedCount === tasks.length && tasks.length > 0;
  const xpPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.textLight, marginBottom: 4 }}>
          {greeting}, Guardian
        </div>
        <h2 style={{ fontFamily: pixelFont, fontSize: 14, color: colors.accent, margin: 0, lineHeight: 1.6, textShadow: "0 0 12px rgba(255,215,0,0.2)" }}>
          Guardian's Log
        </h2>
      </div>

      {/* Status Card */}
      <Card style={{ background: "linear-gradient(135deg, #2a2a4a 0%, #1a1a2e 100%)", border: `1px solid ${colors.accent}40`, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: pixelFont, fontSize: 8, color: colors.textLight, marginBottom: 6, letterSpacing: "0.05em" }}>
              {dayName.toUpperCase()}
            </div>
            <div style={{ fontFamily: font, fontSize: 13, color: colors.text }}>
              {dateStr}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: pixelFont, fontSize: 8, color: colors.textLight, marginBottom: 6 }}>
              QUESTS
            </div>
            <div style={{ fontFamily: pixelFont, fontSize: 12, color: allComplete ? colors.green : colors.accent }}>
              {completedCount}/{tasks.length}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div style={{ background: "#0f0f1a", borderRadius: 2, height: 12, overflow: "hidden", border: "1px solid #3a3a5a" }}>
          <div
            style={{
              height: "100%",
              width: `${xpPercent}%`,
              background: allComplete
                ? "linear-gradient(90deg, #4ade80, #22c55e)"
                : "linear-gradient(90deg, #ffd700, #f59e0b)",
              transition: "width 0.4s ease-out",
              boxShadow: allComplete ? "0 0 8px rgba(74,222,128,0.5)" : "0 0 8px rgba(255,215,0,0.3)",
            }}
          />
        </div>
        <div style={{ fontFamily: pixelFont, fontSize: 7, color: allComplete ? colors.green : colors.textLight, marginTop: 6, textAlign: "right" }}>
          {allComplete ? "ALL DUTIES COMPLETE ✨" : `${Math.round(xpPercent)}% XP`}
        </div>
      </Card>

      {/* Navi hint for Saturdays */}
      {dayName === "Saturday" && (
        <Card style={{ background: "#60a5fa15", border: "1px solid #60a5fa30", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20, filter: "drop-shadow(0 0 4px rgba(96,165,250,0.5))" }}>🧚</span>
            <div>
              <div style={{ fontFamily: pixelFont, fontSize: 7, color: colors.navi, marginBottom: 6 }}>
                HEY, LISTEN!
              </div>
              <div style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.6 }}>
                Snake Plant and Trailing Jades only need water every other Saturday. Check soil moisture before watering.
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quest List */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: pixelFont, fontSize: 8, color: colors.textLight, marginBottom: 12, letterSpacing: "0.05em" }}>
          GUARDIAN DUTIES
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        {tasks.map((task) => (
          <Checkbox
            key={task.id}
            checked={tasksToday[task.id] || false}
            onChange={() => toggleTask(task.id)}
            label={task.label}
          />
        ))}
      </div>

      {/* Locked Quest */}
      <Card style={{ background: "#1a1a2e", border: "1px dashed #3a3a5a", opacity: 0.7 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>🔒</span>
          <div style={{ fontFamily: pixelFont, fontSize: 8, color: "#5b5b7b", letterSpacing: "0.03em" }}>
            LOCKED QUEST
          </div>
        </div>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: "#5b5b7b", marginBottom: 6 }}>
          The Guardian's Companion
        </div>
        <div style={{ fontFamily: font, fontSize: 12, color: "#4a4a6a", lineHeight: 1.7 }}>
          This quest chain unlocks when Eliana arrives. Daily briefings on Kelly's recovery, the baby's milestones, and your guardian duties for each stage of the fourth trimester.
        </div>
      </Card>
    </div>
  );
}

function PlantDaddyTab() {
  const [expandedPlant, setExpandedPlant] = useState(null);

  const plants = [
    { room: "Kelly's Room", name: "Variegated Rubber Plant", emoji: "🌿", pot: "Blue patterned pot on green nightstand", water: "Water when top inch dry", issue: "Yellowing leaves = too much water", img: "/plants/variegated-rubber-plant.jpg" },
    { room: "Kelly's Room", name: "Orchid (Phalaenopsis)", emoji: "🌸", pot: "White pot near birth plan", water: "Soak roots 10-15 min weekly, drain fully", issue: "Don't get water in the crown. Yellow/peach blooms.", img: "/plants/orchid.jpg" },
    { room: "Living Room", name: "Monstera", emoji: "🪴", pot: "Blue textured pot on black tripod plant stand, near kitchen", water: "Spray with water bottle. Water when top 1-2 inches dry", issue: "Brown crispy edges = needs more water", img: "/plants/monstera.jpg" },
    { room: "Living Room", name: "Fiddle Leaf Fig", emoji: "🌳", pot: "Brown/dark pot on floor by window, near bookshelf", water: "Water when top inch dry. Drama queen.", issue: "Droopy leaves = thirsty", img: "/plants/fiddle-leaf-fig.jpg" },
    { room: "Living Room", name: "Pilea Peperomioides", emoji: "🪙", pot: "Two-tone sage/cream pot on bookshelf", water: "Water when top inch dry", issue: "Curling leaves = thirsty or too much sun", img: "/plants/pilea.jpg" },
    { room: "Living Room", name: "Trailing Jade #1", emoji: "🍃", pot: "Boob pot (white ceramic) on bookshelf", water: "Every other Saturday", issue: "Tiny round leaves. Let soil dry between waterings.", img: "/plants/trailing-jade-boob-pot.jpg" },
    { room: "Living Room", name: "Dark Philodendron", emoji: "🌑", pot: "Terra cotta pot on floor next to TV", water: "Water when top inch dry", issue: "Dark glossy leaves with burgundy/red stems", img: "/plants/dark-philodendron-tv.jpg" },
    { room: "Jonny's Room", name: "Snake Plant", emoji: "🐍", pot: "Blue decorative pot on floor", water: "Every other Saturday only", issue: "Tall upright striped leaves. Thrives on neglect.", img: "/plants/snake-plant.jpg" },
    { room: "Jonny's Room", name: "Satin Pothos", emoji: "✨", pot: "Small terra cotta pot on nightstand", water: "Water when soil dry about an inch down", issue: "Silver-speckled heart-shaped leaves", img: "/plants/satin-pothos.jpg" },
    { room: "Jonny's Office", name: "Dark Philodendron", emoji: "🌑", pot: "Terra cotta pot on floor by sliding door", water: "Water when top inch dry", issue: "Same dark variety as living room", img: "/plants/dark-philodendron-office-1.jpg" },
    { room: "Jonny's Office", name: "Peperomia", emoji: "🌱", pot: "Small white ridged pot, near salt lamp", water: "Every other Saturday", issue: "Small thick variegated leaves", img: "/plants/peperomia.jpg" },
    { room: "Jonny's Office", name: "Neon Pothos", emoji: "💚", pot: "Grey-blue pot on wooden shelf", water: "Water when soil dry about an inch down", issue: "Bright lime-green leaves", img: "/plants/neon-pothos.jpg" },
    { room: "Kitchen", name: "Trailing Jade #2", emoji: "🍃", pot: "White ribbed pot on cork coaster, top shelf", water: "Every other Saturday", issue: "Same care as boob pot one", img: "/plants/trailing-jade-hydration-station.jpg" },
    { room: "Kitchen", name: "Pothos", emoji: "💧", pot: "On hydration station shelf", water: "Water when soil dry about an inch down", issue: "Smaller trailing plant", img: "/plants/pothos-hydration-station.jpg" },
    { room: "Kitchen", name: "Dark Philodendron", emoji: "🌑", pot: "Terra cotta pot next to hydration station", water: "Water when top inch dry", issue: "Same dark variety", img: "/plants/dark-philodendron-hydration-station.jpg" },
    { room: "Kelly's Bathroom", name: "Pothos", emoji: "💧", pot: "Terra cotta pot on cream cabinet", water: "Water when soil dry about an inch down", issue: "Green trailing heart-shaped leaves", img: "/plants/pothos-kellys-bathroom.jpg" },
    { room: "Jonny's Bathroom", name: "Pothos", emoji: "💧", pot: "Blue-grey/white pot on top of shuttered cabinet", water: "Water when soil dry about an inch down", issue: "Golden variegated trailing leaves", img: "/plants/pothos-jonnys-bathroom.jpg" },
  ];

  const ROOM_NAMES = {
    "Kelly's Room": "Kelly's Chamber",
    "Living Room": "The Great Hall",
    "Jonny's Room": "Guardian's Quarters",
    "Jonny's Office": "The Study",
    "Kitchen": "The Kitchen Keep",
    "Kelly's Bathroom": "Kelly's Spring",
    "Jonny's Bathroom": "Guardian's Spring",
  };

  const rooms = [...new Set(plants.map((p) => p.room))];

  return (
    <div>
      <SectionTitle subtitle="Saturday Grove Quest">
        The Grove
      </SectionTitle>

      <Card style={{ background: "#4ade8015", border: "1px solid #4ade8030", marginBottom: 20 }}>
        <div style={{ fontFamily: pixelFont, fontSize: 8, color: colors.green, marginBottom: 10 }}>
          GROVE OBJECTIVES
        </div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {[
            "Water all plants (Snake Plant + Trailing Jades every other week)",
            "Spray Monstera with water bottle",
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: font, fontSize: 13, color: colors.text, lineHeight: 1.8 }}>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {rooms.map((room) => (
        <div key={room}>
          <div style={{ fontFamily: pixelFont, fontSize: 8, color: colors.accent, marginTop: 28, marginBottom: 14, background: colors.accentLight, padding: "10px 14px", borderRadius: 2, display: "inline-block", letterSpacing: "0.03em" }}>
            {ROOM_NAMES[room] || room}
          </div>
          {plants
            .filter((p) => p.room === room)
            .map((plant, i) => {
              const plantKey = `${room}-${i}`;
              const isExpanded = expandedPlant === plantKey;
              return (
              <Card key={i} style={{ borderLeft: `4px solid ${colors.green}`, overflow: "hidden" }}>
                {plant.img && (
                  <div
                    onClick={() => setExpandedPlant(isExpanded ? null : plantKey)}
                    style={{ cursor: "pointer", marginBottom: 12, borderRadius: 4, overflow: "hidden", maxHeight: isExpanded ? 400 : 140, transition: "max-height 0.3s ease" }}
                  >
                    <img
                      src={plant.img}
                      alt={plant.name}
                      style={{ width: "100%", height: isExpanded ? 400 : 140, objectFit: "cover", display: "block", borderRadius: 4, transition: "height 0.3s ease" }}
                    />
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 28,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      background: `${colors.green}15`,
                      borderRadius: 4,
                    }}
                  >
                    {plant.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: colors.text, marginBottom: 4 }}>
                      {plant.name}
                    </div>
                    <div style={{ fontFamily: font, fontSize: 12, color: colors.textLight, lineHeight: 1.6 }}>
                      <strong>Pot:</strong> {plant.pot}
                    </div>
                  </div>
                </div>
                <InfoItem title="Watering" text={plant.water} />
                <div style={{ fontFamily: font, fontSize: 12, color: colors.orange, lineHeight: 1.6 }}>
                  {plant.issue}
                </div>
              </Card>
              );
            })}
        </div>
      ))}
    </div>
  );
}

function CalendarTab() {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    days.push(day);
  }

  const getTasksForDay = (date) => {
    const dayOfWeek = dayNames[date.getDay()];
    const dayOfMonth = date.getDate();
    const tasks = ["Rotate Lola's provisions"];

    if (dayOfWeek === "Monday") tasks.push("Alejandrina arrives ~12pm");
    if (dayOfWeek === "Wednesday") tasks.push("Trash night");
    if (dayOfWeek === "Saturday") {
      tasks.push("Grove Quest + Domestic Quest");
      tasks.push("Water all plants");
      tasks.push("Clean Lola's bowl");
    }

    if (dayOfMonth === 1) tasks.push("Potion: Lola's Interceptor Plus");
    if (dayOfMonth === 15) tasks.push("Potion: Lola's Credelio");

    return tasks;
  };

  return (
    <div>
      <SectionTitle subtitle="This Week's Journey">
        The Map
      </SectionTitle>

      {days.map((day, i) => {
        const isToday = day.toDateString() === today.toDateString();
        const isPast = day < today && !isToday;
        const tasks = getTasksForDay(day);

        return (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
            {/* Path line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24 }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: isToday ? 0 : 6,
                background: isToday ? colors.accent : isPast ? colors.green : "#3a3a5a",
                border: isToday ? `2px solid ${colors.accent}` : "none",
                boxShadow: isToday ? "0 0 8px rgba(255,215,0,0.5)" : "none",
                flexShrink: 0,
                transform: isToday ? "rotate(45deg)" : "none",
              }} />
              {i < 6 && <div style={{ width: 2, flex: 1, background: isPast ? `${colors.green}40` : "#2a2a4a" }} />}
            </div>

            <Card style={{
              flex: 1,
              background: isToday ? `${colors.accent}12` : colors.card,
              border: isToday ? `1px solid ${colors.accent}40` : `1px solid ${colors.border}`,
              opacity: isPast ? 0.5 : 1,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontFamily: pixelFont, fontSize: 7, color: isToday ? colors.accent : colors.textLight }}>
                  {dayNames[day.getDay()].toUpperCase()}
                </div>
                <div style={{ fontFamily: font, fontSize: 12, color: colors.textLight }}>
                  {day.getDate()}
                  {isToday && <span style={{ color: colors.accent, marginLeft: 6 }}>◆ YOU ARE HERE</span>}
                </div>
              </div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {tasks.map((task, j) => (
                  <li key={j} style={{ fontFamily: font, fontSize: 12, color: colors.text, lineHeight: 1.7 }}>
                    {task}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main App ───

export default function PostpartumHQ({ defaultTab = "today" }) {
  const [checkedTasks, setCheckedTasks] = useState({});

  return (
    <div
      style={{
        fontFamily: font,
        background: colors.bg,
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          paddingBottom: 80,
        }}
      >
        {defaultTab === "today" && <TodayTab checkedTasks={checkedTasks} setCheckedTasks={setCheckedTasks} />}
        {defaultTab === "plant" && <PlantDaddyTab />}
        {defaultTab === "calendar" && <CalendarTab />}
      </div>
    </div>
  );
}
