"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "fivefiverule", label: "The 5-5-5 Rule", icon: "🛏️" },
  { id: "physical", label: "Physical Recovery", icon: "💪" },
  { id: "mental", label: "Mental Health", icon: "🧠" },
  { id: "breastfeeding", label: "Breastfeeding", icon: "🍼" },
  { id: "sleep", label: "Sleep Strategy", icon: "🌙" },
  { id: "practical", label: "What To Do", icon: "✅" },
  { id: "laundry", label: "Laundry Guide", icon: "🧺" },
  { id: "temperature", label: "Baby Clothing", icon: "🌡️" },
  { id: "coregulation", label: "Co-Regulation", icon: "🫁" },
  { id: "decisions", label: "Decision Trees", icon: "🌿" },
  { id: "relationship", label: "Relationship", icon: "💛" },
  { id: "visitors", label: "Visitors", icon: "🚪" },
  { id: "redflags", label: "Red Flags", icon: "🚨" },
  { id: "timeline", label: "Timeline", icon: "📅" },
  { id: "contacts", label: "The Council", icon: "📞" },
  { id: "jonny", label: "Hero's Wellbeing", icon: "🧘" },
];

// ─── Styles ───
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
  navBg: "#12121f",
  navi: "#60a5fa",
};

const font = "'Consolas', 'Monaco', 'Courier New', monospace";
const pixelFont = "'Press Start 2P', monospace";

// ─── Components ───

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: colors.card,
        borderRadius: 4,
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        border: `1px solid ${colors.border}`,
        marginBottom: 16,
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 24px rgba(0,0,0,0.04)";
      }}
    >
      {children}
    </div>
  );
}

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
          textShadow: "0 0 12px rgba(255,215,0,0.2)",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
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
        background: colors.card,
        borderRadius: 12,
        borderLeft: `4px solid ${color}`,
        marginBottom: 12,
      }}
    >
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
          fontSize: 14,
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

// ─── Section Content ───

function HomeSection({ setSection }) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 16 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🤍</div>
        <h1
          style={{
            fontFamily: font,
            fontSize: 32,
            fontWeight: 600,
            color: colors.accent,
            margin: "0 0 8px",
          }}
        >
          The Codex
        </h1>
        <p
          style={{
            fontFamily: font,
            fontSize: 15,
            color: colors.textLight,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Your complete guide to the fourth trimester.
        </p>
        <p
          style={{
            fontFamily: font,
            fontSize: 13,
            color: colors.textLight,
            margin: "12px 0 0",
            lineHeight: 1.6,
            maxWidth: 340,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Everything you need to support me and Eliana.
          Pull this up at 3am. I built it for you.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {SECTIONS.filter((s) => s.id !== "home").map((s) => (
          <div
            key={s.id}
            onClick={() => setSection(s.id)}
            style={{
              padding: "16px",
              textAlign: "center",
              marginBottom: 0,
              background: colors.card,
              borderRadius: 4,
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              border: `1px solid ${colors.border}`,
              cursor: "pointer",
              transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)";
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div
              style={{
                fontFamily: font,
                fontSize: 12,
                fontWeight: 600,
                color: colors.text,
              }}
            >
              {s.label}
            </div>
          </div>
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
          The first 12 weeks postpartum are the <Highlight>4th trimester</Highlight>. My body is healing, my hormones are recalibrating, and we're all learning each other. The 5-5-5 rule gives structure to the most critical first 15 days. Jonny's role during this time: <strong>be the runner.</strong>
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
      <SectionTitle subtitle="What my body is going through — and what's normal">
        Physical Recovery
      </SectionTitle>

      <InfoItem
        title="Lochia (Postpartum Bleeding)"
        text="Lasts 4-6 weeks. Goes red → pink → yellowish. This is normal. I already have heavy and spotting pads stocked. If I need more, reorder organic pads from my Amazon list (heavy, medium, and light — must be organic, no exceptions)."
      />
      <InfoItem
        title="Afterpains"
        text="Uterine contractions during breastfeeding. Can be intense, especially in the first few days. I'll be taking my own herbal support for these (not ibuprofen). Just make sure I have access to my herbal tinctures and a heating pad for my belly."
      />
      <InfoItem
        title="Night Sweats"
        text="Drenching sweats as hormones recalibrate, especially first 2-3 weeks. Keep extra sheets nearby."
      />
      <InfoItem
        title="Engorgement"
        text="Days 3-5 when milk comes in. Can feel like rocks in my chest and spike a low fever. Warm compresses before feeding, cold after."
      />
      <InfoItem
        title="Nipple Pain"
        text="Cracking and soreness early on is common. Lanolin cream, silverette cups, or call Sunshine's assistant (lactation consultant) for help."
      />
      <InfoItem
        title="Pelvic Floor"
        text="Leaking pee when sneezing or laughing is common. Pelvic floor PT once I'm cleared. No crunches or heavy lifting for a while."
      />
      <InfoItem
        title="Hair Loss"
        text="Typically 3-4 months postpartum. Not every woman gets it dramatically, but don't freak out if clumps come out."
      />
      <InfoItem
        title="Constipation"
        text="Very common. Stool softeners are essential. Make sure I'm eating fiber and drinking tons of water."
      />
      <InfoItem
        title="Joint Laxity"
        text="Relaxin hormone hangs around for months (especially if breastfeeding). My joints will be looser — easy on physical activity."
      />
      <InfoItem
        title="Feet Can Grow"
        text="Permanently, sometimes. Arch flattening from relaxin + weight. Not a myth."
      />
      <InfoItem
        title="Warm Oil Massage"
        text="A warm oil massage (belly, legs, feet) supports recovery and feels incredible. Offer this regularly in the first weeks. Warmth in general supports healing — keep me warm and comfortable."
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
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Baby blues are totally normal — I won't be sleeping, I'll be anxious and figuring out
          breastfeeding. Breastfeeding hormones (oxytocin) can also make me feel happy and floaty.
          Both are real. <Highlight>Your job is to hold space, not fix.</Highlight>
        </p>
        <p
          style={{
            fontFamily: font,
            fontSize: 13,
            color: colors.accent,
            lineHeight: 1.7,
            margin: "12px 0 0",
            fontWeight: 600,
          }}
        >
          Baby blues typically peak around days 4-5 and taper off around 2 weeks. If it goes longer than that, it may have become postpartum depression or anxiety — that's when to call for support.
        </p>
      </Card>

      <AlertCard
        level="normal"
        title="Totally normal (baby blues)"
        items={[
          "Teary and emotional, sometimes for no reason",
          "Anxious intrusive thoughts (like imagining falling down stairs with baby)",
          "Obsessively checking if Eliana is breathing (100 times is normal)",
          "Thoughts about missing my old life",
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
          "Mania: feeling like I don't need sleep, like I'm totally good (after 2+ weeks)",
          "Saying things that seem odd or disconnected from reality",
          "Thoughts about hurting the baby",
          "Can't or won't get out of bed when Eliana is crying (20-30+ min)",
          "Crying constantly or suicidal thoughts",
        ]}
      />

      <Card style={{ marginTop: 8 }}>
        <div
          style={{
            fontFamily: font,
            fontSize: 14,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 8,
          }}
        >
          If you see red flags:
        </div>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          {[
            "Don't diagnose me. Just say: \"I love you. I've noticed some things and I think talking to someone could really help us.\"",
            "Call Sunshine (our midwife) first",
            "Postpartum Support International: 1-800-944-4773 (text or call)",
            "If it's an emergency, take me to the ER — postpartum psychosis is rare but serious",
          ].map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: font,
                fontSize: 13,
                color: colors.textLight,
                lineHeight: 1.7,
                marginBottom: 6,
              }}
            >
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
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Milk comes in days 3-5. Before that, colostrum (liquid gold) is enough.{" "}
          <Highlight>Cluster feeding is normal</Highlight> — it doesn't mean my supply is low.
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
          {[
            "First few nights home (days 2-5)",
            "Around 7-10 days",
            "3 week growth spurt",
            "6 week growth spurt",
            "3 month growth spurt",
          ].map((item, i) => (
            <li key={i} style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.textLight, marginTop: 8, fontStyle: "italic" }}>
          Evenings are the peak time for cluster feeding. This is the hardest stretch. Be ready with water, snacks, and moral support.
        </div>
      </Card>

      <InfoItem
        title="Water — the 5-gallon jug"
        text="There's a 5-gallon water jug in the bedroom (which is also the nursing room). Your job: check it regularly and refill it before it runs out. Every time I sit down to nurse, make sure I have water within reach. I'm burning 500 extra calories a day."
        color={colors.green}
      />
      <InfoItem
        title="After each feed"
        text="Handle burping and diaper changes. Manage the 'feed station' — nipple cream, nursing pillow, burp cloths, phone charger, snacks."
        color={colors.green}
      />
      <InfoItem
        title="Tongue/Lip Tie"
        text="If breastfeeding is extremely painful beyond the first couple weeks, it's worth getting evaluated. Ask Sunshine, Revital, or Sunshine's assistant (who is a lactation consultant)."
        color={colors.orange}
      />
      <InfoItem
        title="Pumping"
        text="If we introduce a bottle, usually recommended to wait 3-4 weeks to avoid nipple confusion. We'll figure this out together."
      />

      <AlertCard
        level="red"
        title="Mastitis — call Sunshine immediately"
        items={[
          "Red, hot patch on breast",
          "Flu-like symptoms",
          "Fever above 101°F",
          "This can escalate fast — don't wait",
        ]}
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
          <strong>Our sleep setup:</strong> We are co-sleeping. The exact arrangement (C-curl with Eliana right next to me, bed basket, or bedside bassinet) is still being decided. Regardless of the setup, follow the Safe Sleep Seven guidelines from La Leche League.
        </div>
      </Card>

      <Card style={{ background: colors.accentLight }}>
        <div
          style={{
            fontFamily: font,
            fontSize: 16,
            fontWeight: 600,
            color: colors.accent,
            marginBottom: 12,
          }}
        >
          Our Shift Structure
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div
            style={{
              flex: 1,
              minWidth: 140,
              background: colors.card,
              borderRadius: 10,
              padding: 16,
            }}
          >
            <div
              style={{
                fontFamily: font,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                color: colors.accent,
                marginBottom: 6,
              }}
            >
              Kelly's Shift
            </div>
            <div
              style={{
                fontFamily: font,
                fontSize: 20,
                fontWeight: 600,
                color: colors.text,
              }}
            >
              10pm — 4/5am
            </div>
            <div
              style={{
                fontFamily: font,
                fontSize: 12,
                color: colors.textLight,
                marginTop: 4,
              }}
            >
              Co-sleeping + night feeds. Kelly's on.
            </div>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 140,
              background: colors.card,
              borderRadius: 10,
              padding: 16,
            }}
          >
            <div
              style={{
                fontFamily: font,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                color: colors.accent,
                marginBottom: 6,
              }}
            >
              Jonny's Shift
            </div>
            <div
              style={{
                fontFamily: font,
                fontSize: 20,
                fontWeight: 600,
                color: colors.text,
              }}
            >
              ~6am — 10am
            </div>
            <div
              style={{
                fontFamily: font,
                fontSize: 12,
                color: colors.textLight,
                marginTop: 4,
              }}
            >
              Morning shift. Kelly sleeps in.
            </div>
          </div>
        </div>
      </Card>

      <div style={{ marginTop: 16 }}>
        <InfoItem
          title="During Kelly's shift"
          text="Kelly will be co-sleeping and handling night feeds. If she needs you, she'll wake you. Otherwise, sleep."
        />
        <InfoItem
          title="During your morning shift"
          text="Take Eliana so Kelly can get unbroken sleep. Handle diapers, soothing, and bring Eliana to Kelly only when she needs to feed."
        />
        <InfoItem
          title="'Sleep when the baby sleeps'"
          text="Cliché but real, especially weeks 1-3. This means YOU should sleep then too, not catch up on emails."
        />
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
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Don't ask "what can I do?" Just do these things.{" "}
          <Highlight>The mental load of delegating is itself exhausting.</Highlight>
        </p>
      </Card>

      {[
        { title: "Meals + dishes", text: "Handle all meals and dishes without being asked. You've already built a meal prep system for this — use it." },
        { title: "Be the visitor gatekeeper", text: "Field ALL texts and calls about visiting. Check in with me about what feels good in the moment. Enforce limits. I should never have to be the bad guy." },
        { title: "Water — check the 5-gallon jug", text: "There's a 5-gallon jug in the bedroom/nursing room. Check it regularly and refill before it runs out. Snacks within arm's reach at ALL times." },
        { title: "Lola", text: "Handle all of Lola's walks, feeding, and needs entirely. Lola might need extra attention as she adjusts to a baby in the house." },
        { title: "Household supplies", text: "Diapers, wipes, nipple cream, pads — restock from the Amazon list I'll create (pre-loaded, just reorder). Everything must be organic. Don't wait for me to notice we're low." },
        { title: "Non-baby logistics", text: "Bills, mail, errands, appointments. All of it. Take it completely off my plate." },
        { title: "Document everything", text: "First smile, funny moments, milestones. I won't remember. Take photos and videos. I'll be so grateful later." },
        { title: "Learn independently", text: "Practice swaddling, diaper changes, and soothing techniques so I can fully hand Eliana off to you and actually rest." },
        { title: "Secondary support when you're working", text: "When you need to work, make sure someone is here so I can sleep if I need to. This could be Revital, Kiki, Aja, or another trusted person. I should never be alone with Eliana AND expected to stay awake with no backup." },
      ].map((item, i) => (
        <InfoItem key={i} title={item.title} text={item.text} color={colors.green} />
      ))}

      <Card style={{ marginTop: 8 }}>
        <div
          style={{
            fontFamily: font,
            fontSize: 14,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 8,
          }}
        >
          Things for just me (help me protect these)
        </div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {[
            "Yoga or gentle movement",
            "Sitting in the park or redwoods",
            "Bodywork session with Abby",
            "Even 30 minutes alone, reading or just breathing",
            "A walk without the stroller",
          ].map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: font,
                fontSize: 13,
                color: colors.textLight,
                lineHeight: 1.8,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        <p
          style={{
            fontFamily: font,
            fontSize: 12,
            color: colors.textLight,
            margin: "12px 0 0",
            fontStyle: "italic",
          }}
        >
          Harder if exclusively breastfeeding — we'll figure it out together. Even 30 min matters.
        </p>
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
          Two approved detergents. <Highlight>Never mix them up.</Highlight> Read below carefully.
        </p>
      </Card>

      <Card style={{ background: colors.accentLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: colors.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          Detergent Rules
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7 }}>
          <strong>Mollie's Suds</strong> — for Kelly's sheets, Kelly's clothes, and ALL baby items. This is the ONLY approved detergent for anything touching Kelly or Eliana's skin.
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, marginTop: 8 }}>
          <strong>Eco-Ecos</strong> — for towels and anything with poop, pee, or spit-up that needs a stronger wash. Can use hotter water with this one.
        </div>
      </Card>

      <InfoItem
        title="Kelly's Linen Sheets"
        text="Wash on WARM (not hot). Turn the comforter and any pillowcases with patterns/prints INSIDE OUT. Tumble dry on LOW. Don't overfill the washer or dryer — linen needs space. Use Mollie's Suds only."
        color={colors.accent}
      />
      <InfoItem
        title="Kelly's Clothes"
        text="Wash with Mollie's Suds. Normal cycle, normal temperatures. Nothing fancy here — just the right detergent."
        color={colors.accent}
      />
      <InfoItem
        title="All Baby Items"
        text="Clothes, swaddles, burp cloths, sleep sacks — everything baby touches gets washed in Mollie's Suds. Gentle cycle preferred."
        color={colors.accent}
      />
      <InfoItem
        title="Towels + Heavily Soiled Items"
        text="Anything with poop, pee, or spit-up can be washed with Eco-Ecos detergent and hotter water. BUT: be careful with delicate muslin items — they'll shrink in hot water. Use your judgment on temperature for muslin."
        color={colors.orange}
      />
      <InfoItem
        title="Muslin Warning"
        text="Muslin fabrics (swaddles, cloths) are delicate. Even if they have spit-up on them, wash on warm or cool — NOT hot. They will shrink. When in doubt, wash cooler."
        color={colors.orange}
      />

      <Card>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          Quick reference
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font, fontSize: 12 }}>
            <thead>
              <tr>
                {["Item", "Detergent", "Temp", "Notes"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 6px", borderBottom: `2px solid ${colors.border}`, color: colors.text, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Linen sheets", "Mollie's Suds", "Warm", "Inside out, low dry"],
                ["Kelly's clothes", "Mollie's Suds", "Normal", "—"],
                ["Baby clothes", "Mollie's Suds", "Gentle", "—"],
                ["Baby muslin", "Mollie's Suds", "Cool/warm", "Will shrink if hot!"],
                ["Towels", "Eco-Ecos", "Hot OK", "—"],
                ["Soiled items", "Eco-Ecos", "Hot OK", "Not muslin"],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "6px", borderBottom: `1px solid ${colors.border}`, color: colors.textLight }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
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
          Ideal room temperature for newborn sleep: <Highlight>68-72°F (20-22°C)</Highlight>. There are room thermometers throughout the house. Baby's internal thermometer (for checking fever) is in the cupboard above Kelly's toilet in the bedroom.
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
        <div style={{ fontFamily: font, fontSize: 12, color: colors.textLight, marginTop: 12, fontStyle: "italic" }}>
          General rule: dress Eliana in one more layer than you're wearing.
        </div>
      </Card>

      <InfoItem
        title="During skin-to-skin"
        text="Eliana should be in just a diaper. Your body heat regulates her temperature. Cover her back with a light blanket. This is especially important in the first weeks."
        color={colors.green}
      />

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          How to check if she's too hot or cold
        </div>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.7, marginBottom: 8 }}>
          Feel her <strong>chest or back of neck</strong> — NOT hands/feet (those are naturally cooler and not reliable indicators).
        </div>
        <AlertCard
          level="pink"
          title="Signs she's too HOT (more dangerous than cold)"
          items={[
            "Sweaty neck or damp hair",
            "Red, hot ears or flushed cheeks",
            "Rapid breathing or fast heartbeat",
            "Fussy and restless",
            "Heat rash",
          ]}
        />
        <AlertCard
          level="normal"
          title="Signs she's too COLD"
          items={[
            "Cool chest or back of neck (not just hands/feet)",
            "Fussiness and frequent waking",
            "Pale complexion",
            "Shivering",
          ]}
        />
      </Card>

      <InfoItem
        title="Overheating is more dangerous than mild cool"
        text="When in doubt, go with one fewer layer rather than one extra. Overheating increases SIDS risk. Never cover her head during sleep."
        color={colors.orange}
      />
    </div>
  );
}

function CoregulationSection() {
  return (
    <div>
      <SectionTitle subtitle="Your nervous system state directly affects Kelly and Eliana. You already know this.">
        Co-Regulation
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 20 }}>
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Jonny — you literally teach this. Newborns are exquisitely attuned to the nervous system
          states of their caregivers. <Highlight>Your regulation IS their regulation.</Highlight>{" "}
          Kelly's system will be highly sensitized postpartum. If you're dysregulated, she'll feel it
          immediately — and so will Eliana.
        </p>
      </Card>

      <InfoItem
        title="Your state is contagious"
        text="Before picking up a crying baby, take 3 slow breaths. Eliana can feel tension in your body. A calm hold is more soothing than a tense one."
        color={colors.accent}
      />
      <InfoItem
        title="When Kelly is activated"
        text="Don't try to fix, solve, or rationalize. Match her pace, then gently slow down. Speak lower and slower. Your calm voice is a regulation tool."
        color={colors.accent}
      />
      <InfoItem
        title="Vagal tone matters here"
        text="Your daily practices aren't optional luxuries anymore — they're infrastructure. Even 5 min of breathwork or cold exposure shifts your baseline for the whole household."
        color={colors.accent}
      />
      <InfoItem
        title="Micro-moments of co-regulation"
        text="Hand on her back while she nurses. Eye contact when she's overwhelmed. A long exhale together. These are not small things."
        color={colors.accent}
      />
      <InfoItem
        title="When you're dysregulated"
        text="Name it out loud: 'I'm feeling overwhelmed right now. I need 5 minutes.' This models healthy regulation for Eliana from day one, and it's honest with Kelly."
        color={colors.orange}
      />

      <Card>
        <div
          style={{
            fontFamily: font,
            fontSize: 14,
            fontWeight: 600,
            color: colors.text,
            marginBottom: 8,
          }}
        >
          Quick Regulation Tools (abbreviated for 3am)
        </div>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {[
            "Physiological sigh: double inhale through nose, long exhale through mouth (fastest vagal reset)",
            "Hum or sing low notes while holding Eliana — vibrates the vagus nerve for both of you",
            "Slow rocking: rhythmic movement is regulating for all three nervous systems in the room",
            "Skin-to-skin: put Eliana on your bare chest. Her system syncs to yours.",
            "Cold water on wrists or face if you need a quick sympathetic reset",
          ].map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: font,
                fontSize: 13,
                color: colors.textLight,
                lineHeight: 1.8,
              }}
            >
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
          We follow Aware Parenting (Aletha Solter). The core idea: babies cry for two reasons — to communicate an unmet need (hunger, diaper, temperature) OR to release accumulated stress. When all needs are met and baby is still crying, we practice <strong>crying-in-arms</strong>: hold her with calm, loving presence and let her cry in your arms. No shushing, jiggling, or distracting to stop the crying. The crying IS the healing.
        </div>
      </Card>

      <DecisionTree
        title="Baby won't stop crying"
        question="You've checked diaper, tried feeding, and she's still crying. What next?"
        options={[
          {
            label: "She's fed, changed, and still crying",
            action:
              "This may be stress-release crying. Hold her close in your arms with calm, loving presence. Don't try to shush, jiggle, or distract her out of it. Your job is to be a compassionate listener — she's releasing accumulated stress. Breathe slowly, speak softly, make gentle eye contact. She'll stop when she's done. Babies often sleep deeply and contentedly after a good cry-in-arms session. Your calm nervous system is the most powerful tool here.",
          },
          {
            label: "She's pulling her legs up / seems gassy",
            action:
              "Bicycle her legs gently. Try tummy time on your forearm (football hold). Gentle pressure on her belly. Gripe water or gas drops if we have them. Warm bath can also help move things along.",
          },
          {
            label: "She feels warm or seems unwell",
            action:
              "Take her temperature (thermometer is in the cupboard above Kelly's toilet in the bedroom). Under 100.4°F — monitor, try skin-to-skin, keep feeding. Over 100.4°F in a newborn under 3 months — call Sunshine immediately or go to ER. This is not a wait-and-see situation for young babies.",
          },
          {
            label: "I'm getting overwhelmed while holding her",
            action:
              "It's OK to hand Eliana to Kelly if she's awake. If Kelly's sleeping and you're at your limit, lay Eliana down safely on her back and take 2-3 minutes for a physiological sigh and cold water on your face. Then pick her back up. The goal is always to return to holding her — she needs your presence, even if you need a brief pause to regulate yourself first. Call Kelly if you need her.",
          },
        ]}
      />

      <DecisionTree
        title="Kelly seems off"
        question="Something feels different about how Kelly is doing. What are you noticing?"
        options={[
          {
            label: "She's tearful but talking to me",
            action:
              "This is likely baby blues (normal in weeks 1-3). Don't try to fix it. Say: 'I see you. This is so hard. You're doing amazing.' Bring her tea. Sit with her. Let her cry. Oxytocin drop after feeding can trigger sudden tears — totally normal.",
          },
          {
            label: "She's withdrawing / won't talk",
            action:
              "Pink flag. Don't push but stay close. Try: 'You don't have to talk, but I'm here. Can I just sit with you?' If this lasts more than a few days, gently suggest: 'I think it could help to talk to someone — not because anything is wrong, but because you deserve support.'",
          },
          {
            label: "She seems disconnected from Eliana",
            action:
              "Red flag. This could be postpartum depression. Don't panic, but don't ignore it. Call Sunshine. Say to Kelly: 'I love you. I've noticed some things and I think talking to someone could really help us.' Frame it as 'us' not 'you.'",
          },
          {
            label: "She's saying things that seem strange or manic",
            action:
              "If she seems euphoric, doesn't think she needs sleep, is talking very fast, or saying things that don't connect to reality — this could be postpartum psychosis. It's rare but serious. Call Sunshine immediately. If Sunshine isn't available, go to the ER. Don't leave her alone with Eliana until you've talked to a professional.",
          },
        ]}
      />

      <DecisionTree
        title="Breastfeeding trouble"
        question="What's happening with feeding?"
        options={[
          {
            label: "Eliana won't latch",
            action:
              "Try different positions: cradle, cross-cradle, football, laid-back. Skin-to-skin can help reset. Express a little milk onto the nipple so she can smell it. If she's frantic, calm her first (skin-to-skin, swaying) then try again. If persistent, ask Sunshine, Revital, or Sunshine's assistant.",
          },
          {
            label: "Kelly's in a lot of pain while feeding",
            action:
              "Some discomfort is normal in the first week, but sharp/persistent pain is not. Check the latch — Eliana's mouth should be wide open with the bottom lip flanged out. Apply lanolin after feeds. If pain continues beyond week 1-2, get evaluated for tongue tie.",
          },
          {
            label: "Worried about milk supply",
            action:
              "Count wet diapers: 6+ wet diapers in 24 hours = she's getting enough. Cluster feeding is normal and doesn't mean low supply — it's actually how babies increase supply. Weight checks at pediatrician are the real metric.",
          },
          {
            label: "Red, hot, painful spot on breast",
            action:
              "Possible mastitis. Keep feeding on that side (it won't hurt Eliana). Warm compress before feeding. Cold compress after. Call Sunshine today — antibiotics may be needed. If fever above 101°F or flu-like symptoms, call immediately.",
          },
        ]}
      />

      <DecisionTree
        title="I need help and Kelly is asleep"
        question="It's your shift, Kelly is sleeping, and you're struggling."
        options={[
          {
            label: "I can't get Eliana to stop crying",
            action:
              "Work through the checklist: diaper, hunger, gas, temperature, overstimulation. If all needs are met, this is likely stress-release crying. Hold her in your arms with calm presence. Don't try to stop the crying — be with her through it. If you've been going for 30+ min and you're losing your regulation, it's OK to gently wake Kelly. She'd rather help than have you at your limit.",
          },
          {
            label: "I think something might be wrong with Eliana",
            action:
              "Trust your gut. If she feels unusually hot, cold, or limp — take her temperature (thermometer: cupboard above Kelly's toilet). Under 3 months, fever above 100.4°F = call Sunshine or ER immediately. Wake Kelly. Better to overreact than underreact with a newborn.",
          },
          {
            label: "I'm overwhelmed and need to regulate",
            action:
              "Lay Eliana down safely on her back for a moment. Do a physiological sigh (double inhale, long exhale). Splash cold water on your face. Then pick her back up — she needs your presence. You're not failing — you're being a responsible parent by recognizing your limit. Text a friend if it helps.",
          },
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
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          The relationship will temporarily revolve almost entirely around Eliana.{" "}
          <Highlight>This is normal and not permanent.</Highlight> We're becoming a family — the
          romantic partnership will find its new shape, but it takes time.
        </p>
      </Card>

      <InfoItem
        title="Daily check-in"
        text="Even just 5 minutes: 'How are you actually doing?' Not about logistics. About feelings. Ideally same time each day so it becomes a rhythm."
        color={colors.accent}
      />
      <InfoItem
        title="Don't wait to be asked"
        text="I won't always be able to tell you what I need. Try things. If you get it wrong, that's fine — the trying itself matters more than getting it right."
        color={colors.accent}
      />
      <InfoItem
        title="Resentment builds silently"
        text="Let's agree on a low-stakes signal for 'I'm starting to feel resentful.' A word, a hand signal. Catching it early before it builds."
        color={colors.orange}
      />
      <InfoItem
        title="Physical intimacy"
        text="Off the table for minimum 6 weeks (often longer). That's completely fine and non-negotiable. Closeness doesn't have to be sexual — hand holding, forehead kisses, laying together."
      />
      <InfoItem
        title="Your experience matters too"
        text="You'll have your own emotional experience of becoming a father. You should have someone to process with outside of me — a friend, therapist, or men's group. I can't be your only outlet right now."
        color={colors.green}
      />
      <InfoItem
        title="Appreciation cards"
        text="Create little appreciation note cards or a board where we can leave each other notes. When words are hard to say out loud, writing them down helps. Even a sticky note that says 'I see how hard you're working' can shift everything."
        color={colors.accent}
      />
      <InfoItem
        title="Daily micro check-in"
        text="Not a full conversation — just a moment. A hand on my shoulder, eye contact, 'How are you right now?' This small ritual keeps us connected when everything else is chaotic."
        color={colors.accent}
      />
    </div>
  );
}

function VisitorSection() {
  return (
    <div>
      <SectionTitle subtitle="You are the gatekeeper. Check in with me about what feels right.">
        Visitors & Boundaries
      </SectionTitle>

      <Card style={{ background: colors.accentLight, marginBottom: 20 }}>
        <div
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.accent,
            lineHeight: 1.7,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Our visitor approach:
          </div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>We might want visitors in the first 2 weeks, or we might not — <strong>check in with me in the moment</strong></li>
            <li>Short visits only (1-2 hours max) unless it feels right for longer</li>
            <li>Visitors should be helpful (bring food, help around the house) not just hold the baby while I host</li>
            <li>Have a code word for "I need everyone to leave now"</li>
          </ul>
        </div>
      </Card>

      <Card style={{ background: colors.greenLight, marginBottom: 16 }}>
        <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.green, marginBottom: 4 }}>
          Always Welcome
        </div>
        <div style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7 }}>
          <strong>Revital (our doula)</strong> — she has open access anytime. No need to check schedules or limit her visits.
        </div>
      </Card>

      <InfoItem
        title="You're the enforcer"
        text="Field all texts and calls about visiting. Check in with me about timing and what feels good. I should never have to be the 'bad guy' — that's your job right now."
        color={colors.accent}
      />
      <InfoItem
        title="Script for family"
        text="'We're so excited for you to meet Eliana! We're doing short visits right now — can we find a 1-hour window that works? And if you're able to bring a meal or help around the house, we'd really appreciate it.'"
        color={colors.green}
      />
      <InfoItem
        title="When to cancel"
        text="If I had a bad night, if I'm emotional, if I just don't feel like it — cancel. 'Kelly's resting today, let's reschedule' is a complete sentence."
        color={colors.orange}
      />
    </div>
  );
}

function RedFlagsSection() {
  return (
    <div>
      <SectionTitle subtitle="Quick reference. When in doubt, call Sunshine.">
        Red Flags
      </SectionTitle>

      <AlertCard
        level="emergency"
        title="Call 911 / Go to ER immediately"
        items={[
          "Kelly has chest pain or can't breathe",
          "Seizure",
          "Kelly is talking about hurting herself or Eliana",
          "Kelly seems psychotic — disconnected from reality, hallucinating",
          "Heavy bleeding that won't stop (soaking 1+ pad per hour)",
          "Severe headache + vision changes (postpartum preeclampsia)",
        ]}
      />

      <AlertCard
        level="red"
        title="Call Sunshine today"
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
      <SectionTitle subtitle="The 4th trimester (first 12 weeks) and beyond. Every woman is different but this gives you a map.">
        Recovery Timeline
      </SectionTitle>

      <Card style={{ background: colors.warmBg, marginBottom: 16 }}>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.text, lineHeight: 1.7, margin: 0 }}>
          The first 12 weeks are called the <Highlight>4th trimester</Highlight>. Eliana is adjusting to life outside the womb. I'm healing, hormonally recalibrating, and learning a completely new identity. Go slow. The 5-5-5 rule (see that section) covers the critical first 15 days.
        </p>
      </Card>

      <TimelineItem
        week="Wk 1-2"
        title="Survival Mode"
        description="Hormonal rollercoaster. Milk coming in. Learning to feed. Everything is new and intense. Baby blues are peaking. Just focus on keeping everyone fed, hydrated, and resting."
      />
      <TimelineItem
        week="Wk 3-4"
        title="Small Rhythms Emerge"
        description="Still exhausted but you start to notice micro-patterns. First growth spurt around week 3 (cluster feeding). Kelly may start wanting small bits of normalcy."
      />
      <TimelineItem
        week="Wk 5-6"
        title="Six-Week Checkup"
        description="Doctor's appointment for Kelly. Starting to find rhythms but growth spurts still disrupt everything. Second growth spurt around week 6."
      />
      <TimelineItem
        week="Mo 2-3"
        title="Slightly More Predictable"
        description="Patterns become more recognizable. But 3-month growth spurt incoming. Eliana starts making more eye contact and social smiling. This changes everything."
      />
      <TimelineItem
        week="Mo 3-4"
        title="A Turning Point"
        description="Often when things start feeling more manageable. Baby interacts more. But: hair loss may begin (don't panic). Kelly's identity continues to shift."
      />
      <TimelineItem
        week="Mo 6+"
        title="More of Kelly Returns"
        description="More of her pre-baby self returns, but the identity shift is ongoing and real. New normal is settling in. Keep supporting, keep checking in."
      />
    </div>
  );
}

function ContactsSection() {
  return (
    <div>
      <SectionTitle subtitle="Save these. Print these. Put them on the fridge.">
        Emergency Contacts
      </SectionTitle>

      <Card style={{ background: colors.redLight, marginBottom: 16 }}>
        <div
          style={{
            fontFamily: font,
            fontSize: 13,
            fontWeight: 700,
            color: colors.red,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 12,
          }}
        >
          In an emergency: call 911
        </div>
        <div
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
          }}
        >
          Postpartum psychosis, heavy uncontrolled bleeding, chest pain, seizure, suicidal ideation
        </div>
      </Card>

      {[
        {
          title: "Sunshine (Midwife)",
          detail: "[Add number]",
          note: "First call for most concerns about Kelly or Eliana",
        },
        {
          title: "Revital (Doula)",
          detail: "[Add number]",
          note: "Always welcome. Open access anytime.",
        },
        {
          title: "Sunshine's Assistant (Lactation Consultant)",
          detail: "[Add number]",
          note: "For breastfeeding issues, tongue/lip tie evaluation",
        },
        {
          title: "Pelvic Floor PT",
          detail: "[Find one in Santa Cruz]",
          note: "For postpartum recovery once cleared",
        },
        {
          title: "Postpartum Support International",
          detail: "1-800-944-4773",
          note: "Call or text, 24/7. For mental health concerns.",
        },
        {
          title: "Abby (Bodywork)",
          detail: "[Add number]",
          note: "Kelly's bodywork sessions — help schedule these",
        },
      ].map((c, i) => (
        <Card key={i} style={{ padding: "16px 20px" }}>
          <div
            style={{
              fontFamily: font,
              fontSize: 15,
              fontWeight: 600,
              color: colors.text,
            }}
          >
            {c.title}
          </div>
          <div
            style={{
              fontFamily: font,
              fontSize: 16,
              color: colors.accent,
              fontWeight: 600,
              margin: "4px 0",
            }}
          >
            {c.detail}
          </div>
          <div
            style={{
              fontFamily: font,
              fontSize: 12,
              color: colors.textLight,
            }}
          >
            {c.note}
          </div>
        </Card>
      ))}

      <Card style={{ marginTop: 8, background: colors.warmBg }}>
        <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
          Kelly's Psycho-Emotional Support Team
        </div>
        <div style={{ fontFamily: font, fontSize: 13, color: colors.textLight, lineHeight: 1.7, marginBottom: 4 }}>
          My postpartum support sisterhood. They can be called for emotional support, to come sit with me, or as secondary support when Jonny needs to work.
        </div>
        {[
          { name: "Kiki", detail: "[Add number]" },
          { name: "Aja", detail: "[Add number]" },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i === 0 ? `1px solid ${colors.border}` : "none" }}>
            <span style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: colors.text }}>{p.name}</span>
            <span style={{ fontFamily: font, fontSize: 14, color: colors.accent, fontWeight: 600 }}>{p.detail}</span>
          </div>
        ))}
      </Card>

      <Card style={{ marginTop: 8, background: colors.greenLight }}>
        <div
          style={{
            fontFamily: font,
            fontSize: 13,
            color: colors.green,
            lineHeight: 1.7,
          }}
        >
          <strong>Local Santa Cruz resources to find:</strong> new parent groups,
          mom meetups, postpartum yoga classes. These become lifelines around month 2-3.
        </div>
      </Card>
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
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Roughly 10% of new dads experience paternal postpartum depression. You're not immune just
          because you teach nervous system regulation. In fact,{" "}
          <Highlight>your high self-awareness might make you more likely to dismiss your own needs.</Highlight>
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

      <InfoItem
        title="Keep some version of your practices"
        text="Even abbreviated. 5 min breathwork. A cold shower. A few minutes of sitting. These aren't luxuries — they're how you stay regulated for your family."
        color={colors.green}
      />
      <InfoItem
        title="Have your person"
        text="At least one friend, therapist, or men's group where you can be honest. Not Kelly — she can't hold that right now. Process your experience of becoming a father somewhere safe."
        color={colors.green}
      />
      <InfoItem
        title="Surfing, foiling, nature"
        text="Keep a thread of these alive even if it's less frequent. An hour in the water resets you in a way nothing else does. Protect this without guilt."
        color={colors.green}
      />
      <InfoItem
        title="NSM work"
        text="Decide now what's essential and what can be delegated or paused. This is a season, not permanent. The business will be fine. Eliana's first months won't come back."
        color={colors.orange}
      />

      <Card>
        <p
          style={{
            fontFamily: font,
            fontSize: 14,
            color: colors.text,
            lineHeight: 1.7,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          From Kelly: I love you. I need you regulated more than I need you productive.
          Taking care of yourself IS taking care of us.
        </p>
      </Card>
    </div>
  );
}

// ─── Main App ───

const SECTION_COMPONENTS = {
  home: HomeSection,
  fivefiverule: FiveFiveRuleSection,
  physical: PhysicalSection,
  mental: MentalHealthSection,
  breastfeeding: BreastfeedingSection,
  sleep: SleepSection,
  practical: PracticalSection,
  laundry: LaundrySection,
  temperature: TemperatureSection,
  coregulation: CoregulationSection,
  decisions: DecisionTreesSection,
  relationship: RelationshipSection,
  visitors: VisitorSection,
  redflags: RedFlagsSection,
  timeline: TimelineSection,
  contacts: ContactsSection,
  jonny: JonnySection,
};

export default function PostpartumGuide() {
  const [section, setSection] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [section]);

  const currentSection = SECTIONS.find((s) => s.id === section);
  const SectionComponent = SECTION_COMPONENTS[section];

  return (
    <div
      style={{
        fontFamily: font,
        background: colors.bg,
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      {section !== "home" && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: colors.navBg,
            borderBottom: `1px solid #2a2a4a`,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => setSection("home")}
            style={{
              background: "none",
              border: "none",
              fontFamily: font,
              fontSize: 14,
              color: colors.accent,
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            ← Home
          </button>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: colors.text,
            }}
          >
            {currentSection?.icon} {currentSection?.label}
          </div>
          <button
            onClick={() => setNavOpen(!navOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              padding: "4px",
              color: colors.textLight,
            }}
          >
            ☰
          </button>
        </div>
      )}

      {/* Nav overlay */}
      {navOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 200,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setNavOpen(false)}
        >
          <div
            style={{
              background: colors.card,
              width: 280,
              maxWidth: "80%",
              padding: "24px 0",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "0 20px 16px",
                fontFamily: font,
                fontSize: 16,
                fontWeight: 600,
                color: colors.text,
                borderBottom: `1px solid ${colors.border}`,
                marginBottom: 8,
              }}
            >
              Sections
            </div>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSection(s.id);
                  setNavOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background:
                    section === s.id ? colors.warmBg : "transparent",
                  border: "none",
                  padding: "12px 20px",
                  fontFamily: font,
                  fontSize: 14,
                  color: section === s.id ? colors.accent : colors.text,
                  fontWeight: section === s.id ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          paddingBottom: 80,
        }}
      >
        <SectionComponent setSection={setSection} />
      </div>

      {/* Bottom nav for quick access */}
      {section !== "home" && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: colors.navBg,
            borderTop: `1px solid #2a2a4a`,
            display: "flex",
            justifyContent: "space-around",
            padding: "8px 0",
          }}
        >
          {[
            { id: "redflags", icon: "🚨", label: "Red Flags" },
            { id: "decisions", icon: "🌿", label: "Decisions" },
            { id: "contacts", icon: "📞", label: "Contacts" },
            { id: "practical", icon: "✅", label: "To Do" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                background: "none",
                border: "none",
                fontFamily: font,
                fontSize: 10,
                color:
                  section === item.id ? colors.accent : colors.textLight,
                cursor: "pointer",
                padding: "4px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                fontWeight: section === item.id ? 600 : 400,
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
