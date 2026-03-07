import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { Calendar, Users, Bell, Settings, LogOut, Sun, Moon, Plus, Search, Filter, ChevronRight, Check, X, Edit2, Trash2, Eye, Send, Clock, MapPin, Link, Tag, Shield, User, Menu, Home, BarChart2, Award, Inbox, ChevronDown, AlertCircle, CheckCircle, Info, UserPlus, Hash, ExternalLink, Layers, TrendingUp, Star, Mail, Phone, Globe, Bookmark, BookmarkCheck, MessageSquare, Zap, Trophy, BarChart, Activity, Heart, ThumbsUp, ThumbsDown, ChevronLeft, ChevronUp } from "lucide-react";

// ============ GOOGLE FONTS ============
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Jost', sans-serif; }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
    ::selection { background: var(--accent-soft); color: var(--accent); }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    .fade-in { animation: fadeIn 0.3s ease; }
    .nexus-sidebar { display: flex !important; }
    .nexus-hamburger { display: none !important; }
    @media (max-width: 768px) {
      .nexus-sidebar { display: none !important; }
      .nexus-hamburger { display: flex !important; }
      .nexus-content-pad { padding: 16px !important; }
      .nexus-grid-2 { grid-template-columns: 1fr !important; }
      .nexus-stats-row { flex-direction: column !important; }
    }
  `}</style>
);

// ============ SEED DATA ============
const SEED_USERS = [
  { id: "u1", name: "Arjun Mehta", email: "admin@nexus.com", password: "admin123", role: "admin", bio: "Platform administrator", skills: ["Management", "Strategy"], points: 0 },
  { id: "u2", name: "Sarah Lin", email: "sarah@nexus.com", password: "admin123", role: "admin", bio: "Event coordinator", skills: ["Events", "Design"], points: 0 },
  { id: "u3", name: "Alex Rivera", email: "alex@nexus.com", password: "pass1234", role: "participant", bio: "Full-stack developer", skills: ["React", "Node.js"], points: 340 },
  { id: "u4", name: "Priya Sharma", email: "priya@nexus.com", password: "pass1234", role: "participant", bio: "UI/UX Designer", skills: ["Figma", "CSS"], points: 280 },
  { id: "u5", name: "Tom Nguyen", email: "tom@nexus.com", password: "pass1234", role: "participant", bio: "ML Engineer", skills: ["Python", "TensorFlow"], points: 410 },
  { id: "u6", name: "Nina Patel", email: "nina@nexus.com", password: "pass1234", role: "participant", bio: "Product Manager", skills: ["Strategy", "Agile"], points: 195 },
];

const now = new Date();
const daysFromNow = (d) => new Date(now.getTime() + d * 86400000).toISOString();

const SEED_EVENTS = [
  { id: "e1", name: "HackNexus 2025", description: "A 48-hour hackathon bringing together the brightest minds to build solutions for tomorrow's challenges. Prizes worth ₹5,00,000 await.", category: "Hackathon", date: daysFromNow(30), duration: 48, venueName: "Innovation Hub, Bangalore", venueUrl: "https://maps.google.com", capacity: 100, coverUrl: "", tags: ["coding", "innovation", "prizes"], allowTeams: true, maxTeamSize: 4, status: "upcoming", createdAt: daysFromNow(-5) },
  { id: "e2", name: "UI/UX Design Sprint", description: "An intensive workshop on modern design systems, prototyping, and user research methodologies led by industry veterans.", category: "Workshop", date: daysFromNow(15), duration: 8, venueName: "Design Studio, Mumbai", venueUrl: "", capacity: 40, coverUrl: "", tags: ["design", "figma", "ux"], allowTeams: false, maxTeamSize: 1, status: "upcoming", createdAt: daysFromNow(-3) },
  { id: "e3", name: "AI Keynote Summit", description: "Join leading AI researchers and practitioners for a day of inspiring talks, panel discussions, and networking.", category: "Talk", date: daysFromNow(7), duration: 6, venueName: "Grand Hall, Delhi", venueUrl: "https://zoom.us/j/example", capacity: 200, coverUrl: "", tags: ["AI", "ML", "keynote"], allowTeams: false, maxTeamSize: 1, status: "upcoming", createdAt: daysFromNow(-10) },
  { id: "e4", name: "Code Royale", description: "A competitive coding championship across algorithms, data structures, and system design challenges.", category: "Competition", date: daysFromNow(-20), duration: 5, venueName: "Tech Arena, Pune", venueUrl: "", capacity: 60, coverUrl: "", tags: ["algorithms", "competitive", "DSA"], allowTeams: true, maxTeamSize: 3, status: "completed", createdAt: daysFromNow(-30) },
  { id: "e5", name: "Product Strategy Workshop", description: "Master the art of product thinking — from ideation and market research to roadmapping and stakeholder alignment.", category: "Workshop", date: daysFromNow(45), duration: 7, venueName: "Startup Campus, Hyderabad", venueUrl: "", capacity: 30, coverUrl: "", tags: ["product", "strategy", "PM"], allowTeams: false, maxTeamSize: 1, status: "upcoming", createdAt: daysFromNow(-1) },
];

const SEED_REGISTRATIONS = [
  { id: "r1", userId: "u3", eventId: "e1", registeredAt: daysFromNow(-4), checkedIn: false },
  { id: "r2", userId: "u4", eventId: "e1", registeredAt: daysFromNow(-3), checkedIn: false },
  { id: "r3", userId: "u5", eventId: "e1", registeredAt: daysFromNow(-2), checkedIn: false },
  { id: "r4", userId: "u6", eventId: "e1", registeredAt: daysFromNow(-1), checkedIn: false },
  { id: "r5", userId: "u3", eventId: "e3", registeredAt: daysFromNow(-5), checkedIn: true },
  { id: "r6", userId: "u4", eventId: "e2", registeredAt: daysFromNow(-2), checkedIn: false },
  { id: "r7", userId: "u5", eventId: "e3", registeredAt: daysFromNow(-4), checkedIn: true },
  { id: "r8", userId: "u6", eventId: "e5", registeredAt: daysFromNow(-1), checkedIn: false },
  { id: "r9", userId: "u3", eventId: "e4", registeredAt: daysFromNow(-25), checkedIn: true },
  { id: "r10", userId: "u5", eventId: "e4", registeredAt: daysFromNow(-25), checkedIn: true },
];

const SEED_TEAMS = [
  { id: "t1", name: "Syntax Rebels", eventId: "e1", captainId: "u3", members: ["u3", "u4"], pendingInvites: ["u6"], bio: "Building the future one commit at a time", createdAt: daysFromNow(-3), messages: [
    { id: "m1", userId: "u3", text: "Hey team! Let's brainstorm project ideas before the hackathon.", time: daysFromNow(-2) },
    { id: "m2", userId: "u4", text: "I was thinking we could build an AI-powered accessibility tool 🚀", time: daysFromNow(-1) },
  ]},
  { id: "t2", name: "Neural Nomads", eventId: "e1", captainId: "u5", members: ["u5"], pendingInvites: ["u6"], bio: "AI-first solutions for real-world problems", createdAt: daysFromNow(-2), messages: [
    { id: "m3", userId: "u5", text: "Team created! Who has ideas for the hackathon theme?", time: daysFromNow(-2) },
  ]},
  { id: "t3", name: "Code Crusaders", eventId: "e4", captainId: "u3", members: ["u3", "u5"], pendingInvites: [], bio: "Competitive coding veterans", createdAt: daysFromNow(-25), messages: [] },
];

const SEED_NOTIFICATIONS = {
  u3: [
    { id: "n1", type: "info", message: "Welcome to Nexus Events! Explore upcoming events and register today.", read: false, createdAt: daysFromNow(-5) },
    { id: "n2", type: "success", message: "You've successfully registered for AI Keynote Summit.", read: true, createdAt: daysFromNow(-5) },
    { id: "n3", type: "info", message: "HackNexus 2025 is 30 days away. Prepare your team!", read: false, createdAt: daysFromNow(-1) },
  ],
  u4: [
    { id: "n4", type: "info", message: "Welcome to Nexus Events!", read: false, createdAt: daysFromNow(-3) },
    { id: "n5", type: "success", message: "You've joined team 'Syntax Rebels' for HackNexus 2025.", read: true, createdAt: daysFromNow(-3) },
  ],
  u5: [
    { id: "n6", type: "info", message: "New event added: Product Strategy Workshop.", read: false, createdAt: daysFromNow(-1) },
    { id: "n7", type: "success", message: "Your team 'Neural Nomads' has been created.", read: true, createdAt: daysFromNow(-2) },
  ],
  u6: [
    { id: "n8", type: "info", message: "Welcome to Nexus Events! Explore upcoming events.", read: false, createdAt: daysFromNow(-1) },
    { id: "n9", type: "info", message: "Nina, you've been invited to join a team for HackNexus 2025.", read: false, createdAt: daysFromNow(-1) },
  ],
  u1: [], u2: [],
};

const ACTIVITY_LOG_SEED = [
  { id: "a1", message: "Alex Rivera registered for HackNexus 2025", time: daysFromNow(-4), type: "registration" },
  { id: "a2", message: "Team 'Syntax Rebels' created for HackNexus 2025", time: daysFromNow(-3), type: "team" },
  { id: "a3", message: "Priya Sharma registered for UI/UX Design Sprint", time: daysFromNow(-2), type: "registration" },
  { id: "a4", message: "Team 'Neural Nomads' created for HackNexus 2025", time: daysFromNow(-2), type: "team" },
  { id: "a5", message: "Nina Patel registered for Product Strategy Workshop", time: daysFromNow(-1), type: "registration" },
  { id: "a6", message: "New event added: Product Strategy Workshop", time: daysFromNow(-1), type: "event" },
];

// Seed feedback data
const SEED_FEEDBACK = [
  { id: "f1", userId: "u3", eventId: "e4", rating: 5, comment: "Amazing experience! Great challenges and well-organized.", createdAt: daysFromNow(-18) },
  { id: "f2", userId: "u5", eventId: "e4", rating: 4, comment: "Really tough problems, loved the environment. Could use better catering!", createdAt: daysFromNow(-17) },
];

// Seed waitlist data
const SEED_WAITLIST = [];

// ============ THEME CONTEXT ============
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const THEMES = {
  light: {
    "--bg": "#F7F5F0", "--bg-secondary": "#EDEAE3", "--bg-tertiary": "#E4E0D7",
    "--surface": "#FFFFFF", "--surface-hover": "#F7F5F0",
    "--text": "#1A1A1A", "--text-secondary": "#5C5C5C", "--text-muted": "#9A9A9A",
    "--border": "rgba(0,0,0,0.08)", "--border-strong": "rgba(0,0,0,0.15)",
    "--accent": "#3D6B4F", "--accent-hover": "#2E5240", "--accent-soft": "#DCE9E2",
    "--accent-text": "#FFFFFF",
    "--sidebar-bg": "#EDEAE3", "--sidebar-active": "#DCE9E2",
    "--success": "#3D6B4F", "--success-bg": "#DCE9E2",
    "--warning": "#A0620A", "--warning-bg": "#FEF3E2",
    "--error": "#B04040", "--error-bg": "#FAEAEA",
    "--info": "#2F6090", "--info-bg": "#E3EFF8",
    "--shadow": "0 2px 12px rgba(0,0,0,0.08)", "--shadow-lg": "0 8px 32px rgba(0,0,0,0.12)",
    "--badge-hackathon": "#DCE9E2", "--badge-hackathon-text": "#2E5240",
    "--badge-workshop": "#E3EFF8", "--badge-workshop-text": "#2F6090",
    "--badge-talk": "#FEF3E2", "--badge-talk-text": "#A0620A",
    "--badge-competition": "#FAEAEA", "--badge-competition-text": "#B04040",
  },
  dark: {
    "--bg": "#141A14", "--bg-secondary": "#1C231C", "--bg-tertiary": "#202820",
    "--surface": "#1E271E", "--surface-hover": "#243024",
    "--text": "#F0EDE8", "--text-secondary": "#B8B4AE", "--text-muted": "#706C68",
    "--border": "rgba(255,255,255,0.07)", "--border-strong": "rgba(255,255,255,0.12)",
    "--accent": "#5A9068", "--accent-hover": "#6AAB7A", "--accent-soft": "#1E3326",
    "--accent-text": "#F0EDE8",
    "--sidebar-bg": "#1C231C", "--sidebar-active": "#1E3326",
    "--success": "#5A9068", "--success-bg": "#1E3326",
    "--warning": "#C4870E", "--warning-bg": "#2D2010",
    "--error": "#C25252", "--error-bg": "#2D1414",
    "--info": "#4A85B5", "--info-bg": "#0E1E2D",
    "--shadow": "0 2px 12px rgba(0,0,0,0.3)", "--shadow-lg": "0 8px 32px rgba(0,0,0,0.4)",
    "--badge-hackathon": "#1E3326", "--badge-hackathon-text": "#6AAB7A",
    "--badge-workshop": "#0E1E2D", "--badge-workshop-text": "#4A85B5",
    "--badge-talk": "#2D2010", "--badge-talk-text": "#C4870E",
    "--badge-competition": "#2D1414", "--badge-competition-text": "#C25252",
  }
};

// ============ APP STATE CONTEXT ============
const AppContext = createContext();
const useApp = () => useContext(AppContext);

// ============ TOAST SYSTEM ============
const ToastContext = createContext();
const useToast = () => useContext(ToastContext);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((message, type = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);
  return (
    <ToastContext.Provider value={add}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map(t => <Toast key={t.id} toast={t} onClose={() => setToasts(p => p.filter(x => x.id !== t.id))} />)}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onClose }) {
  const icons = { success: <CheckCircle size={16}/>, error: <AlertCircle size={16}/>, info: <Info size={16}/>, warning: <AlertCircle size={16}/> };
  const colors = { success: "var(--success)", error: "var(--error)", info: "var(--info)", warning: "var(--warning)" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "var(--surface)", border: `1px solid var(--border)`, borderLeft: `3px solid ${colors[toast.type]}`, borderRadius: 10, boxShadow: "var(--shadow-lg)", minWidth: 280, maxWidth: 360, animation: "slideIn 0.3s ease" }}>
      <span style={{ color: colors[toast.type], flexShrink: 0 }}>{icons[toast.type]}</span>
      <span style={{ fontSize: 13, color: "var(--text)", flex: 1, fontFamily: "'Jost', sans-serif" }}>{toast.message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2 }}><X size={14}/></button>
    </div>
  );
}

// ============ SHARED COMPONENTS ============
// ============ IMAGE UPLOAD COMPONENT ============
function ImageUpload({ value, onChange, shape = "rect", height = 160, label = "Upload Image", hint = "" }) {
  const id = useRef("img-" + Math.random().toString(36).slice(2));
  const [dragOver, setDragOver] = useState(false);
  const [hover, setHover] = useState(false);

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    processFile(e.dataTransfer.files[0]);
  };

  const isCircle = shape === "circle";

  return (
    <div style={{ width: isCircle ? height : "100%", height, borderRadius: isCircle ? "50%" : 12, position: "relative", flexShrink: 0 }}>
      {/* Hidden real file input — label click triggers it natively */}
      <input
        id={id.current}
        type="file"
        accept="image/*"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        onChange={e => { processFile(e.target.files[0]); e.target.value = ""; }}
      />

      {/* Clickable label wraps everything — most reliable trigger */}
      <label
        htmlFor={id.current}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "block", width: "100%", height: "100%",
          borderRadius: isCircle ? "50%" : 12,
          border: `2px dashed ${dragOver ? "var(--accent)" : value ? "var(--accent)" : "var(--border)"}`,
          background: value ? "transparent" : dragOver ? "var(--accent-soft)" : "var(--bg-secondary)",
          cursor: "pointer", overflow: "hidden", position: "relative",
          transition: "border-color 0.18s, background 0.18s",
        }}
      >
        {/* Image preview */}
        {value && (
          <img src={value} alt="preview"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
        )}

        {/* Empty state */}
        {!value && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, pointerEvents: "none" }}>
            <div style={{ fontSize: isCircle ? 22 : 30 }}>📷</div>
            {!isCircle && <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>{label}</div>}
            {!isCircle && hint && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{hint}</div>}
            {!isCircle && <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginTop: 2 }}>Click or drag & drop</div>}
          </div>
        )}

        {/* Hover overlay when image exists */}
        {value && hover && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)",
            borderRadius: isCircle ? "50%" : 10,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            pointerEvents: "none",
          }}>
            <div style={{ fontSize: 18 }}>✏️</div>
            <span style={{ fontSize: 11, color: "#fff", fontWeight: 600, fontFamily: "'Jost', sans-serif" }}>Change photo</span>
          </div>
        )}
      </label>

      {/* Remove button — outside label so it doesn't trigger file picker */}
      {value && (
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); onChange(""); }}
          style={{
            position: "absolute", top: isCircle ? 0 : 8, right: isCircle ? 0 : 8,
            width: 22, height: 22, borderRadius: "50%",
            background: "rgba(0,0,0,0.7)", border: "1.5px solid rgba(255,255,255,0.4)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20,
          }}>
          <X size={11} color="#fff" />
        </button>
      )}
    </div>
  );
}

// ============ AVATAR ============
function Avatar({ name, photoUrl, size = 36, style = {} }) {
  if (photoUrl) {
    return (
      <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, ...style }}>
        <img src={photoUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  const colors = ["#4A7C59", "#5A7D9A", "#8A5E7D", "#7A6E4A", "#4A6B7C", "#6B5A4A"];
  const color = colors[name?.charCodeAt(0) % colors.length] || colors[0];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 600, color: "#fff", fontFamily: "'Jost', sans-serif", flexShrink: 0, ...style }}>
      {initials}
    </div>
  );
}

function Badge({ label, variant = "default", style = {} }) {
  const styles = {
    default: { background: "var(--bg-tertiary)", color: "var(--text-secondary)" },
    accent: { background: "var(--accent-soft)", color: "var(--accent)" },
    success: { background: "var(--success-bg)", color: "var(--success)" },
    warning: { background: "var(--warning-bg)", color: "var(--warning)" },
    error: { background: "var(--error-bg)", color: "var(--error)" },
    info: { background: "var(--info-bg)", color: "var(--info)" },
    hackathon: { background: "var(--badge-hackathon)", color: "var(--badge-hackathon-text)" },
    workshop: { background: "var(--badge-workshop)", color: "var(--badge-workshop-text)" },
    talk: { background: "var(--badge-talk)", color: "var(--badge-talk-text)" },
    competition: { background: "var(--badge-competition)", color: "var(--badge-competition-text)" },
  };
  return (
    <span style={{ ...styles[variant] || styles.default, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, fontFamily: "'Jost', sans-serif", letterSpacing: "0.03em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 4, ...style }}>
      {label}
    </span>
  );
}

function categoryVariant(cat) {
  const m = { "Hackathon": "hackathon", "Workshop": "workshop", "Talk": "talk", "Competition": "competition" };
  return m[cat] || "default";
}
function statusVariant(s) {
  const m = { "upcoming": "info", "ongoing": "warning", "completed": "default" };
  return m[s] || "default";
}

function Btn({ children, variant = "primary", size = "md", onClick, disabled, style = {}, icon }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Jost', sans-serif", fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer", border: "none", borderRadius: 8, transition: "all 0.18s ease", opacity: disabled ? 0.5 : 1, letterSpacing: "0.01em" };
  const sizes = { sm: { padding: "6px 14px", fontSize: 12 }, md: { padding: "9px 18px", fontSize: 13 }, lg: { padding: "12px 24px", fontSize: 14 } };
  const variants = {
    primary: { background: "var(--accent)", color: "var(--accent-text)" },
    ghost: { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-strong)" },
    danger: { background: "var(--error-bg)", color: "var(--error)", border: "1px solid var(--error)" },
    subtle: { background: "var(--bg-secondary)", color: "var(--text-secondary)" },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={e => { if (!disabled) { if (variant === "primary") e.target.style.background = "var(--accent-hover)"; else if (variant === "ghost") e.target.style.background = "var(--bg-secondary)"; else if (variant === "subtle") e.target.style.background = "var(--bg-tertiary)"; } }}
      onMouseLeave={e => { if (variant === "primary") e.target.style.background = "var(--accent)"; else if (variant === "ghost") e.target.style.background = "transparent"; else if (variant === "subtle") e.target.style.background = "var(--bg-secondary)"; }}>
      {icon && icon}{children}
    </button>
  );
}

function Card({ children, style = {}, onClick, hover = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, boxShadow: hovered && hover ? "var(--shadow-lg)" : "var(--shadow)", transform: hovered && hover ? "translateY(-2px)" : "none", transition: "all 0.2s ease", cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 520 }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: "var(--surface)", borderRadius: 16, width: "100%", maxWidth: width, maxHeight: "85vh", overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", animation: "scaleIn 0.2s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, borderRadius: 6, display: "flex" }}><X size={18}/></button>
        </div>
        <div style={{ overflow: "auto", flex: 1, padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Drawer({ open, onClose, title, children }) {
  return (
    <>
      {open && <div style={{ position: "fixed", inset: 0, zIndex: 800, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(3px)" }} onClick={onClose} />}
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 900, width: 440, background: "var(--surface)", boxShadow: "var(--shadow-lg)", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.3s ease", display: "flex", flexDirection: "column", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}><X size={18}/></button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>{children}</div>
      </div>
    </>
  );
}

function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose} title={title} width={400}>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{message}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn variant="danger" onClick={() => { onConfirm(); onClose(); }}>Confirm</Btn>
      </div>
    </Modal>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, error, required, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}{required && <span style={{ color: "var(--error)" }}> *</span>}</label>}
      <input value={value} onChange={e => onChange(e.target.value)} type={type} placeholder={placeholder}
        style={{ background: "var(--bg-secondary)", border: `1px solid ${error ? "var(--error)" : "var(--border)"}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif", transition: "border-color 0.15s" }}
        onFocus={e => { e.target.style.borderColor = "var(--accent)"; }}
        onBlur={e => { e.target.style.borderColor = error ? "var(--error)" : "var(--border)"; }} />
      {error && <span style={{ fontSize: 11, color: "var(--error)" }}>{error}</span>}
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 4, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</label>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif", resize: "vertical", transition: "border-color 0.15s" }}
        onFocus={e => e.target.style.borderColor = "var(--accent)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"} />
    </div>
  );
}

function Select({ label, value, onChange, options, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      {label && <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{label}</span>}
      <button onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? "var(--accent)" : "var(--bg-tertiary)", border: "none", cursor: "pointer", padding: 2, transition: "all 0.2s ease", position: "relative" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", transform: value ? "translateX(20px)" : "translateX(0)", transition: "transform 0.2s ease" }} />
      </button>
    </div>
  );
}

function ProgressBar({ value, max, style = {} }) {
  const pct = Math.min(100, (value / max) * 100);
  const color = pct > 80 ? "var(--error)" : pct > 60 ? "var(--warning)" : "var(--accent)";
  return (
    <div style={{ background: "var(--bg-tertiary)", borderRadius: 4, height: 6, overflow: "hidden", ...style }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.5s ease" }} />
    </div>
  );
}

function EmptyState({ icon, title, message, action, onAction }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 48 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--text)", fontWeight: 600 }}>{title}</h3>
      <p style={{ color: "var(--text-muted)", fontSize: 13, maxWidth: 300, lineHeight: 1.7 }}>{message}</p>
      {action && <Btn onClick={onAction} style={{ marginTop: 8 }}>{action}</Btn>}
    </div>
  );
}

function Skeleton({ width = "100%", height = 20, rounded = false, style = {} }) {
  return (
    <div style={{
      width, height,
      borderRadius: rounded ? 9999 : 8,
      background: "linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)",
      backgroundSize: "600px 100%",
      animation: "shimmer 1.6s infinite linear",
      ...style
    }} />
  );
}

function SkeletonCard() {
  return (
    <div style={{ background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
      <Skeleton height={120} style={{ borderRadius: "10px 10px 0 0" }} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <Skeleton height={16} width="70%" />
        <Skeleton height={12} width="40%" />
        <Skeleton height={12} width="90%" />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <Skeleton height={28} width={80} style={{ borderRadius: 6 }} />
          <Skeleton height={28} width={60} style={{ borderRadius: 6 }} />
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px" }}>
      <Skeleton width={36} height={36} rounded style={{ flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
        <Skeleton height={13} width="55%" />
        <Skeleton height={11} width="35%" />
      </div>
      <Skeleton height={24} width={70} style={{ borderRadius: 20 }} />
    </div>
  );
}

function SkeletonStats() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ flex: 1, minWidth: 160, background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <Skeleton height={36} width={36} style={{ borderRadius: 10 }} />
          <Skeleton height={32} width="50%" />
          <Skeleton height={12} width="70%" />
        </div>
      ))}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function formatDateTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ============ EVENT COVER ============
function EventCover({ event, height = 120, style = {} }) {
  const gradients = {
    Hackathon: "linear-gradient(135deg, #2E5240 0%, #4A7C59 100%)",
    Workshop: "linear-gradient(135deg, #2F4A6B 0%, #4A7C9A 100%)",
    Talk: "linear-gradient(135deg, #6B4A2A 0%, #9A7A4A 100%)",
    Competition: "linear-gradient(135deg, #6B2E2E 0%, #9A5A5A 100%)",
  };
  return (
    <div style={{ height, borderRadius: "10px 10px 0 0", display: "flex", alignItems: "flex-end", padding: 12, position: "relative", overflow: "hidden",
      background: event.coverUrl ? "transparent" : (gradients[event.category] || gradients.Hackathon), ...style }}>
      {event.coverUrl && (
        <img src={event.coverUrl} alt={event.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      {event.coverUrl && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Badge label={event.category} variant={categoryVariant(event.category)} />
      </div>
    </div>
  );
}

// ============ STAT CARD ============
function StatCard({ title, value, icon, color = "var(--accent)", sub, trend }) {
  return (
    <Card style={{ flex: 1, minWidth: 160 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>{icon}</div>
        {trend && <span style={{ fontSize: 11, color: trend > 0 ? "var(--success)" : "var(--error)", display: "flex", alignItems: "center", gap: 2 }}>{trend > 0 ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}{Math.abs(trend)}%</span>}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: "var(--text)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontWeight: 500 }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 4 }}>{sub}</div>}
    </Card>
  );
}

// ============ STAR RATING ============
function StarRating({ value, onChange, readonly = false, size = 18 }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <button key={i} onClick={() => !readonly && onChange && onChange(i)}
          onMouseEnter={() => !readonly && setHover(i)}
          onMouseLeave={() => !readonly && setHover(0)}
          style={{ background: "none", border: "none", cursor: readonly ? "default" : "pointer", color: (hover || value) >= i ? "#F5A623" : "var(--bg-tertiary)", padding: 1, transition: "color 0.1s" }}>
          <Star size={size} fill={(hover || value) >= i ? "#F5A623" : "none"} />
        </button>
      ))}
    </div>
  );
}

// ============ MINI BAR CHART ============
function MiniBarChart({ data, height = 80 }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div title={`${d.label}: ${d.value}`} style={{ width: "100%", height: `${(d.value / max) * (height - 20)}px`, background: "var(--accent)", borderRadius: "3px 3px 0 0", opacity: 0.8 + (i / data.length) * 0.2, transition: "height 0.5s ease" }} />
          <span style={{ fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", maxWidth: 30, textOverflow: "ellipsis" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ============ DONUT CHART ============
function DonutChart({ segments, size = 120 }) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  if (total === 0) return <div style={{ width: size, height: size, borderRadius: "50%", background: "var(--bg-tertiary)" }} />;
  let cum = 0;
  const circles = segments.map(s => {
    const pct = s.value / total;
    const offset = cum;
    cum += pct;
    return { ...s, pct, offset };
  });
  const r = 40, cx = 60, cy = 60, circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {circles.map((s, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={14}
          strokeDasharray={`${s.pct * circumference} ${circumference}`}
          strokeDashoffset={-s.offset * circumference}
          style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }} />
      ))}
      <circle cx={cx} cy={cy} r={33} fill="var(--surface)" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 14, fontWeight: 700, fill: "var(--text)", fontFamily: "Cormorant Garamond, serif" }}>{total}</text>
    </svg>
  );
}

// ============ APP MAIN ============
export default function NexusEvents() {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("landing");
  const [users, setUsers] = useState(SEED_USERS);
  const [events, setEvents] = useState(SEED_EVENTS);
  const [registrations, setRegistrations] = useState(SEED_REGISTRATIONS);
  const [teams, setTeams] = useState(SEED_TEAMS);
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);
  const [activityLog, setActivityLog] = useState(ACTIVITY_LOG_SEED);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [adminTab, setAdminTab] = useState("overview");
  const [participantTab, setParticipantTab] = useState("home");
  const [sentNotifications, setSentNotifications] = useState([]);
  const [feedback, setFeedback] = useState(SEED_FEEDBACK);
  const [waitlist, setWaitlist] = useState(SEED_WAITLIST);
  const [bookmarks, setBookmarks] = useState({ u3: ["e3"], u4: ["e1","e5"], u5: [], u6: ["e3"] });

  const themeVars = THEMES[theme];

  const addNotification = useCallback((userId, notif) => {
    setNotifications(prev => ({
      ...prev,
      [userId]: [{ id: Math.random().toString(36).slice(2), ...notif, read: false, createdAt: new Date().toISOString() }, ...(prev[userId] || [])]
    }));
  }, []);

  const addActivity = useCallback((message, type = "info") => {
    setActivityLog(prev => [{ id: Math.random().toString(36).slice(2), message, time: new Date().toISOString(), type }, ...prev].slice(0, 20));
  }, []);

  const login = useCallback((email, password, resolvedUser = null) => {
    const user = resolvedUser || users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setView(user.role === "admin" ? "admin" : "participant");
      return true;
    }
    return false;
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setView("landing");
    setAdminTab("overview");
    setParticipantTab("discover");
  }, []);

  const register = useCallback((data) => {
    const newUser = { id: `u${Date.now()}`, ...data, skills: [], points: 0 };
    setUsers(prev => [...prev, newUser]);
    setNotifications(prev => ({ ...prev, [newUser.id]: [{ id: "welcome", type: "success", message: "Welcome to Nexus Events! Explore upcoming events and register today.", read: false, createdAt: new Date().toISOString() }] }));
    setCurrentUser(newUser);
    setView(newUser.role === "admin" ? "admin" : "participant");
  }, []);

  const addPoints = useCallback((userId, pts) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, points: (u.points || 0) + pts } : u));
  }, []);

  const unreadCount = currentUser ? (notifications[currentUser.id] || []).filter(n => !n.read).length : 0;

  const appCtx = {
    currentUser, setCurrentUser, logout, users, setUsers, events, setEvents, registrations, setRegistrations,
    teams, setTeams, notifications, setNotifications, activityLog, addActivity,
    addNotification, sentNotifications, setSentNotifications, unreadCount,
    adminTab, setAdminTab, participantTab, setParticipantTab, sidebarCollapsed, setSidebarCollapsed,
    feedback, setFeedback, waitlist, setWaitlist, bookmarks, setBookmarks, addPoints
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AppContext.Provider value={appCtx}>
        <ToastProvider>
          <FontLoader />
          <style>{`
            @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
            @keyframes shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .fade-in { animation: fadeIn 0.3s ease; }
            input, textarea, select { color-scheme: ${theme}; }
            /* ── Mobile ── */
            @media (max-width: 768px) {
              .desktop-sidebar { display: none !important; }
              .mobile-hamburger { display: flex !important; }
              .landing-split { flex-direction: column !important; }
              .landing-left { display: none !important; }
              .landing-right { width: 100% !important; min-height: 100vh; padding: 32px 20px !important; justify-content: center; }
              .topbar-title { font-size: 15px !important; }
              .content-pad { padding: 16px !important; }
              .stats-grid { flex-wrap: wrap !important; }
              .stats-grid > * { min-width: calc(50% - 8px) !important; }
              .grid-2col { grid-template-columns: 1fr !important; }
              .admin-events-grid { grid-template-columns: 1fr !important; }
              .auth-right-width { width: 100% !important; }
            }
            @media (min-width: 769px) {
              .mobile-hamburger { display: none !important; }
            }
          `}</style>
          <div style={{ ...Object.fromEntries(Object.entries(themeVars).map(([k, v]) => [k, v])), minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "background 0.2s ease, color 0.2s ease" }}>
            {view === "landing" && <Landing login={login} register={register} />}
            {view === "admin" && currentUser?.role === "admin" && <AppShell role="admin" logout={logout}><AdminDashboard /></AppShell>}
            {view === "admin" && currentUser?.role !== "admin" && <Forbidden currentUser={currentUser} logout={logout} />}
            {view === "participant" && currentUser?.role === "participant" && <AppShell role="participant" logout={logout}><ParticipantDashboard /></AppShell>}
            {view === "participant" && currentUser?.role !== "participant" && <Forbidden currentUser={currentUser} logout={logout} />}
          </div>
        </ToastProvider>
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
}

// ============ COUNTRY CODES ============
const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1",  flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+971",flag: "🇦🇪", name: "UAE" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
];

// ============ GOOGLE ICON SVG ============
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  );
}

// ============ OTP INPUT ============
function OtpInput({ value, onChange, length = 6 }) {
  const inputs = useRef([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };
  const handleChange = (i, val) => {
    const clean = val.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, idx) => idx === i ? clean : d).join("");
    onChange(next);
    if (clean && i < length - 1) setTimeout(() => inputs.current[i + 1]?.focus(), 0);
  };
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    setTimeout(() => inputs.current[Math.min(pasted.length, length - 1)]?.focus(), 0);
  };

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {digits.map((d, i) => (
        <input key={i} ref={el => inputs.current[i] = el}
          value={d} maxLength={1} inputMode="numeric"
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          onPaste={handlePaste}
          style={{ width: 44, height: 52, textAlign: "center", fontSize: 20, fontWeight: 700, fontFamily: "'Jost', sans-serif", background: "var(--bg-secondary)", border: `2px solid ${d ? "var(--accent)" : "var(--border)"}`, borderRadius: 10, color: "var(--text)", outline: "none", transition: "border-color 0.15s", caretColor: "transparent" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = d ? "var(--accent)" : "var(--border)"} />
      ))}
    </div>
  );
}

// ============ COUNTRY SELECTOR ============
function CountrySelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} type="button"
        style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 10px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px 0 0 8px", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 13, color: "var(--text)", whiteSpace: "nowrap", borderRight: "none" }}>
        <span>{selected.flag}</span>
        <span>{selected.code}</span>
        <ChevronDown size={12} style={{ opacity: 0.5 }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 200, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "var(--shadow-lg)", width: 200, maxHeight: 240, overflowY: "auto" }}>
          {COUNTRY_CODES.map(c => (
            <button key={c.code} onClick={() => { onChange(c.code); setOpen(false); }} type="button"
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 14px", background: c.code === value ? "var(--accent-soft)" : "transparent", border: "none", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 13, color: c.code === value ? "var(--accent)" : "var(--text)", textAlign: "left" }}
              onMouseEnter={e => { if (c.code !== value) e.currentTarget.style.background = "var(--bg-secondary)"; }}
              onMouseLeave={e => { if (c.code !== value) e.currentTarget.style.background = "transparent"; }}>
              <span style={{ fontSize: 16 }}>{c.flag}</span>
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{ opacity: 0.5, fontSize: 12 }}>{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ 403 FORBIDDEN ============
function Forbidden({ currentUser, logout }) {
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const t = setInterval(() => setCountdown(c => {
      if (c <= 1) { clearInterval(t); logout(); return 0; }
      return c - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [logout]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 32, textAlign: "center" }}>
      <div style={{ maxWidth: 420 }}>
        {/* Shield icon */}
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--error-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", border: "3px solid var(--error)" }}>
          <Shield size={44} color="var(--error)" />
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, fontWeight: 700, color: "var(--error)", lineHeight: 1, marginBottom: 8 }}>403</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>Access Denied</h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 8 }}>
          Your account <strong style={{ color: "var(--text)" }}>{currentUser?.email}</strong> has the role <strong style={{ color: "var(--accent)" }}>{currentUser?.role}</strong> and does not have permission to access this area.
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>
          You will be redirected to the login page in <strong style={{ color: "var(--error)", fontSize: 15 }}>{countdown}</strong> second{countdown !== 1 ? "s" : ""}.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", background: "var(--error)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 600 }}>
            <LogOut size={15}/> Sign Out Now
          </button>
          <button onClick={() => setCountdown(30)} style={{ padding: "11px 24px", background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 10, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 500 }}>
            Stay on Page
          </button>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 28, height: 4, background: "var(--bg-tertiary)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "var(--error)", borderRadius: 4, width: `${(countdown / 5) * 100}%`, transition: "width 1s linear" }} />
        </div>
      </div>
    </div>
  );
}

// ============ TAB LOADING SKELETON ============
function TabLoader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeIn 0.2s ease" }}>
      <SkeletonStats />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2col">
        <div style={{ background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <Skeleton height={18} width="50%" />
          {[1,2,3].map(i => <SkeletonRow key={i} />)}
        </div>
        <div style={{ background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <Skeleton height={18} width="40%" />
          {[1,2,3].map(i => <SkeletonRow key={i} />)}
        </div>
      </div>
    </div>
  );
}

// ============ LANDING PAGE ============
function Landing({ login, register }) {
  const [mode, setMode] = useState("login");       // "login" | "register"
  const [authMethod, setAuthMethod] = useState("email"); // "email" | "phone" | "google"
  const [step, setStep] = useState("input");        // "input" | "otp" | "profile"

  // Email/password form
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "participant", phone: "" });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  // Phone OTP state
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpTarget, setOtpTarget] = useState(""); // phone or email
  const [otpChannel, setOtpChannel] = useState("phone"); // "phone" | "email"

  // Google mock
  const [googleLoading, setGoogleLoading] = useState(false);

  // Profile completion (after phone/google sign-up)
  const [profileForm, setProfileForm] = useState({ name: "", role: "participant" });

  const toast = useToast();
  const { theme, setTheme } = useTheme();
  const timerRef = useRef(null);

  // ── OTP countdown ──
  useEffect(() => {
    if (otpTimer > 0) {
      timerRef.current = setTimeout(() => setOtpTimer(t => t - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [otpTimer]);

  // ── Helpers ──
  const resetFlow = () => { setStep("input"); setOtp(""); setGeneratedOtp(""); setOtpTimer(0); setErrors({}); };
  const doShake = () => { setShake(true); setTimeout(() => setShake(false), 500); };

  // ── Generate & "send" OTP (mock — replace body with real API call) ──
  const sendOtp = (target, channel) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpTarget(target);
    setOtpChannel(channel);
    setOtpTimer(60);
    setOtp("");
    setStep("otp");

    // REAL INTEGRATION: POST to your backend with { to, code }.
    // Use Twilio for SMS or SendGrid/Resend for email OTP delivery.
    // e.g. await fetch("/api/send-sms", { method:"POST", body: JSON.stringify({ to:`${countryCode}${target}`, code }) });

    toast(`OTP sent to ${channel === "phone" ? countryCode + target : target} (demo: ${code})`, "info");
  };

  // ── Verify OTP ──
  const verifyOtp = () => {
    if (otp.length < 6) { toast("Enter the 6-digit code", "error"); return; }
    if (otp !== generatedOtp) { doShake(); toast("Incorrect OTP. Try again.", "error"); setOtp(""); return; }

    // OTP correct — check if existing user or new
    const existingUser = SEED_USERS.find(u =>
      otpChannel === "phone" ? u.phone === `${countryCode}${phoneNumber}` : u.email === otpTarget
    );

    if (existingUser) {
      login(existingUser.email, existingUser.password, existingUser);
      toast(`Welcome back, ${existingUser.name}!`, "success");
    } else {
      // New user — collect name + role
      setStep("profile");
    }
  };

  // ── Complete profile after OTP ──
  const completeProfile = () => {
    if (!profileForm.name.trim()) { toast("Please enter your name", "error"); return; }
    const newUser = {
      name: profileForm.name,
      email: otpChannel === "email" ? otpTarget : `${otpTarget.replace(/\D/g,"")}@phone.nexus`,
      phone: otpChannel === "phone" ? `${countryCode}${phoneNumber}` : "",
      password: Math.random().toString(36).slice(2),
      role: profileForm.role,
      authMethod: otpChannel,
    };
    register(newUser);
    toast(`Welcome to Nexus Events, ${newUser.name}!`, "success");
  };

  // ── Email / password handlers ──
  const handleEmailLogin = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const ok = login(form.email, form.password);
    if (!ok) { doShake(); toast("Invalid email or password", "error"); }
  };

  const handleEmailRegister = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.password || form.password.length < 8) errs.password = "Min 8 chars";
    if (form.phone && !/^\d{7,15}$/.test(form.phone)) errs.phone = "Invalid phone number";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    register({ ...form, phone: form.phone ? `${countryCode}${form.phone}` : "" });
    toast("Account created! Welcome to Nexus Events.", "success");
  };

  // ── Google mock sign-in ──
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    // REAL INTEGRATION — Google Identity Services (no backend needed):
    // 1. Add <script src="https://accounts.google.com/gsi/client" async /> to your HTML
    // 2. Call: google.accounts.id.initialize({ client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com", callback: handleCredentialResponse });
    //          google.accounts.id.prompt();
    // 3. In handleCredentialResponse: decode response.credential (JWT) to get name/email,
    //    then call login() or register() with that data.
    setTimeout(() => {
      setGoogleLoading(false);
      // Mock: sign in as Alex Rivera (pretend Google returned his email)
      const mockGoogleUser = SEED_USERS.find(u => u.email === "alex@nexus.com");
      if (mockGoogleUser) {
        login(mockGoogleUser.email, mockGoogleUser.password, mockGoogleUser);
        toast("Signed in with Google!", "success");
      }
    }, 1400);
  };

  const demos = [
    { label: "Admin", email: "admin@nexus.com", password: "admin123" },
    { label: "Participant", email: "alex@nexus.com", password: "pass1234" },
  ];

  const features = [
    { icon: "🎪", title: "Multi-Event Management", desc: "Create and manage events, workshops, and competitions all in one place." },
    { icon: "👥", title: "Team Formation", desc: "Build your dream team, invite members, and collaborate via team chat." },
    { icon: "📊", title: "Analytics & Leaderboards", desc: "Track registrations, event performance, and celebrate top participants." },
    { icon: "🤖", title: "AI Event Assistant", desc: "Get instant answers about events, schedules, and teams using our AI assistant." },
  ];

  // ── Auth method tab labels ──
  const authTabs = [
    { id: "email", label: "Email", icon: <Mail size={14}/> },
    { id: "phone", label: "Phone", icon: <Phone size={14}/> },
    { id: "google", label: "Google", icon: <GoogleIcon /> },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        @keyframes googleSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .auth-card { animation: ${shake ? "shake 0.4s ease" : "none"}; }
        .otp-digit:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px var(--accent-soft); }
      `}</style>

      {/* ── Left panel ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 64px", background: "var(--bg-secondary)", borderRight: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
            <div style={{ width: 36, height: 36, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={18} color="white" />
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>Nexus Events</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 46, fontWeight: 600, color: "var(--text)", lineHeight: 1.1, marginBottom: 16 }}>Where great events come together</p>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 48, maxWidth: 380 }}>Manage registrations, build teams, earn badges, and keep every participant connected — from discovery to check-in.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
            {features.map(f => (
              <div key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Demo accounts */}
          <div style={{ background: "var(--bg)", borderRadius: 12, padding: 16, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Demo Accounts</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              {demos.map(d => (
                <button key={d.label} onClick={() => { setAuthMethod("email"); setForm(p => ({...p, email: d.email, password: d.password})); }}
                  style={{ fontSize: 11, padding: "6px 12px", background: "var(--accent-soft)", color: "var(--accent)", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                  {d.label}: {d.email}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
              Passwords: <code style={{ background: "var(--bg-tertiary)", padding: "1px 6px", borderRadius: 4 }}>admin123</code> / <code style={{ background: "var(--bg-tertiary)", padding: "1px 6px", borderRadius: 4 }}>pass1234</code>
            </div>
            <div style={{ marginTop: 10, padding: "8px 10px", background: "var(--warning-bg)", borderRadius: 8, fontSize: 11, color: "var(--warning)", lineHeight: 1.6 }}>
              <strong>Phone OTP demo:</strong> use any number — the OTP code appears in the toast notification.
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{ width: 480, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 40px", position: "relative", overflowY: "auto" }}>
        <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
          style={{ position: "absolute", top: 24, right: 24, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 10px", cursor: "pointer", color: "var(--text-secondary)", display: "flex" }}>
          {theme === "light" ? <Moon size={16}/> : <Sun size={16}/>}
        </button>

        <div className="auth-card" style={{ background: "var(--surface)", borderRadius: 16, padding: 32, boxShadow: "var(--shadow-lg)", border: "1px solid var(--border)" }}>

          {/* ── Sign in / Create account tabs ── */}
          {step === "input" && (
            <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--bg-secondary)", borderRadius: 8, padding: 4 }}>
              {["login", "register"].map(m => (
                <button key={m} onClick={() => { setMode(m); setErrors({}); resetFlow(); }}
                  style={{ flex: 1, padding: "8px", fontSize: 13, fontFamily: "'Jost', sans-serif", fontWeight: 500, border: "none", borderRadius: 6, cursor: "pointer", background: mode === m ? "var(--surface)" : "transparent", color: mode === m ? "var(--text)" : "var(--text-muted)", boxShadow: mode === m ? "var(--shadow)" : "none", transition: "all 0.2s ease" }}>
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          {/* ── OTP step header ── */}
          {step === "otp" && (
            <div style={{ marginBottom: 24 }}>
              <button onClick={resetFlow} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 13, fontFamily: "'Jost', sans-serif", marginBottom: 16, padding: 0 }}>
                <ChevronLeft size={16}/> Back
              </button>
              <div style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Enter verification code</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                We sent a 6-digit code to <strong style={{ color: "var(--text)" }}>{otpChannel === "phone" ? `${countryCode} ${phoneNumber}` : otpTarget}</strong>
              </div>
            </div>
          )}

          {/* ── Profile completion header ── */}
          {step === "profile" && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--success-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <CheckCircle size={22} color="var(--success)" />
              </div>
              <div style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Almost there!</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Verified ✓ — just tell us a bit about yourself.</div>
            </div>
          )}

          {/* ═══════════ INPUT STEP ═══════════ */}
          {step === "input" && (
            <>
              {/* Auth method tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                {authTabs.map(t => (
                  <button key={t.id} onClick={() => { setAuthMethod(t.id); setErrors({}); }}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 8px", border: `1px solid ${authMethod === t.id ? "var(--accent)" : "var(--border)"}`, borderRadius: 9, background: authMethod === t.id ? "var(--accent-soft)" : "transparent", color: authMethod === t.id ? "var(--accent)" : "var(--text-secondary)", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 500, transition: "all 0.15s" }}>
                    {t.icon}{t.label}
                  </button>
                ))}
              </div>

              {/* ── EMAIL METHOD ── */}
              {authMethod === "email" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {mode === "register" && <Input label="Full Name" value={form.name} onChange={v => setForm(p => ({...p, name: v}))} placeholder="Your full name" required error={errors.name} />}
                  <Input label="Email" value={form.email} onChange={v => setForm(p => ({...p, email: v}))} type="email" placeholder="you@example.com" required error={errors.email} />
                  <Input label="Password" value={form.password} onChange={v => setForm(p => ({...p, password: v}))} type="password" placeholder={mode === "register" ? "Min 8 characters" : "Your password"} required error={errors.password} />

                  {/* Phone number (optional on register) */}
                  {mode === "register" && (
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                        Phone Number <span style={{ color: "var(--text-muted)", fontWeight: 400, textTransform: "none" }}>(optional — for SMS alerts)</span>
                      </label>
                      <div style={{ display: "flex" }}>
                        <CountrySelector value={countryCode} onChange={setCountryCode} />
                        <input value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value.replace(/\D/g,"")}))}
                          placeholder="9876543210" inputMode="tel"
                          style={{ flex: 1, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "0 8px 8px 0", padding: "9px 12px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }}
                          onFocus={e => e.target.style.borderColor = "var(--accent)"}
                          onBlur={e => e.target.style.borderColor = "var(--border)"} />
                      </div>
                      {errors.phone && <span style={{ fontSize: 11, color: "var(--error)", marginTop: 4, display: "block" }}>{errors.phone}</span>}
                    </div>
                  )}

                  {mode === "register" && <Select label="Role" value={form.role} onChange={v => setForm(p => ({...p, role: v}))} options={[{value:"participant",label:"Participant"},{value:"admin",label:"Admin"}]} />}

                  <Btn onClick={mode === "login" ? handleEmailLogin : handleEmailRegister} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                    {mode === "login" ? "Sign In" : "Create Account"}
                  </Btn>

                  {/* OTP via email option */}
                  {mode === "login" && (
                    <button onClick={() => {
                      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) { toast("Enter your email first", "error"); return; }
                      sendOtp(form.email, "email");
                    }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 12, fontFamily: "'Jost', sans-serif", textDecoration: "underline", textAlign: "center", padding: "4px 0" }}>
                      Sign in with email OTP instead
                    </button>
                  )}
                </div>
              )}

              {/* ── PHONE METHOD ── */}
              {authMethod === "phone" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Mobile Number <span style={{ color: "var(--error)" }}>*</span></label>
                    <div style={{ display: "flex" }}>
                      <CountrySelector value={countryCode} onChange={setCountryCode} />
                      <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/\D/g,""))}
                        placeholder="Enter your number" inputMode="tel"
                        style={{ flex: 1, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "0 8px 8px 0", padding: "9px 12px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }}
                        onFocus={e => e.target.style.borderColor = "var(--accent)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                        onKeyDown={e => { if (e.key === "Enter" && phoneNumber.length >= 7) sendOtp(phoneNumber, "phone"); }} />
                    </div>
                  </div>

                  <div style={{ padding: "12px 14px", background: "var(--info-bg)", borderRadius: 10, fontSize: 12, color: "var(--info)", lineHeight: 1.6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>A one-time code will be sent via SMS to verify your number. Standard rates may apply.</span>
                  </div>

                  <Btn onClick={() => {
                    if (phoneNumber.length < 7) { toast("Enter a valid phone number", "error"); return; }
                    sendOtp(phoneNumber, "phone");
                  }} style={{ width: "100%", justifyContent: "center" }} icon={<Phone size={15}/>}>
                    Send OTP via SMS
                  </Btn>
                </div>
              )}

              {/* ── GOOGLE METHOD ── */}
              {authMethod === "google" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ textAlign: "center", padding: "24px 0 8px" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <GoogleIcon />
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
                      {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>
                      Use your Google account for quick, secure access — no password needed.
                    </p>
                  </div>

                  <button onClick={handleGoogleLogin} disabled={googleLoading}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "11px 20px", background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 9, cursor: googleLoading ? "not-allowed" : "pointer", fontFamily: "'Jost', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text)", boxShadow: "var(--shadow)", transition: "all 0.18s", opacity: googleLoading ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!googleLoading) e.currentTarget.style.background = "var(--bg-secondary)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; }}>
                    {googleLoading
                      ? <div style={{ width: 18, height: 18, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "googleSpin 0.7s linear infinite" }} />
                      : <GoogleIcon />}
                    {googleLoading ? "Connecting to Google..." : "Continue with Google"}
                  </button>

                  {/* Integration callout */}
                  <div style={{ padding: "12px 14px", background: "var(--warning-bg)", borderRadius: 10, fontSize: 11, color: "var(--warning)", lineHeight: 1.7 }}>
                    <strong>Developer note:</strong> Replace <code>handleGoogleLogin</code> with your Google Client ID and the Google Identity Services script to go live.
                  </div>
                </div>
              )}

              {/* Divider + switch */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)", textAlign: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setErrors({}); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 600, padding: 0 }}>
                    {mode === "login" ? "Create one" : "Sign in"}
                  </button>
                </span>
              </div>
            </>
          )}

          {/* ═══════════ OTP STEP ═══════════ */}
          {step === "otp" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <OtpInput value={otp} onChange={setOtp} length={6} />

              {/* Timer */}
              <div style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)" }}>
                {otpTimer > 0
                  ? <span>Resend code in <strong style={{ color: "var(--text)" }}>{otpTimer}s</strong></span>
                  : <button onClick={() => sendOtp(otpTarget, otpChannel)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 13, fontFamily: "'Jost', sans-serif", fontWeight: 600, padding: 0 }}>Resend OTP</button>
                }
              </div>

              <Btn onClick={verifyOtp} disabled={otp.length < 6} style={{ width: "100%", justifyContent: "center" }} icon={<Shield size={15}/>}>
                Verify & Continue
              </Btn>

              <div style={{ padding: "10px 14px", background: "var(--bg-secondary)", borderRadius: 8, fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6, textAlign: "center" }}>
                Didn't receive it? Check spam, or{" "}
                <button onClick={resetFlow} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 11, fontFamily: "'Jost', sans-serif", padding: 0 }}>try a different method</button>.
              </div>
            </div>
          )}

          {/* ═══════════ PROFILE STEP ═══════════ */}
          {step === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Input label="Your Name" value={profileForm.name} onChange={v => setProfileForm(p => ({...p, name: v}))} placeholder="Full name" required />
              <Select label="I am a..." value={profileForm.role} onChange={v => setProfileForm(p => ({...p, role: v}))} options={[{value:"participant",label:"Participant"},{value:"admin",label:"Admin"}]} />
              <Btn onClick={completeProfile} style={{ width: "100%", justifyContent: "center" }}>
                Create My Account
              </Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ 403 FORBIDDEN ============
function ForbiddenScreen({ requiredRole, currentRole, onLogout }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--error-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>
          🚫
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 700, color: "var(--error)", lineHeight: 1, marginBottom: 8 }}>403</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>Access Forbidden</h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 8 }}>
          This area requires <strong style={{ color: "var(--text)" }}>{requiredRole}</strong> privileges.
          You're signed in as a <strong style={{ color: "var(--text)" }}>{currentRole}</strong>.
        </p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 28 }}>
          If you believe this is a mistake, please contact your platform administrator.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 22px", background: "var(--accent)", color: "var(--accent-text)", border: "none", borderRadius: 9, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 600 }}>
            <LogOut size={15}/> Sign in as different account
          </button>
        </div>
        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 20 }}>Error code: 403 Forbidden · Nexus Events Platform</p>
      </div>
    </div>
  );
}

// ============ ROLE GUARD ============
function RoleGuard({ requiredRole, children }) {
  const { currentUser, logout } = useApp();
  if (!currentUser) return null;
  if (currentUser.role !== requiredRole) {
    return <ForbiddenScreen requiredRole={requiredRole} currentRole={currentUser.role} onLogout={logout} />;
  }
  return children;
}

// ============ APP SHELL ============
function AppShell({ role, logout, children }) {
  const { theme, setTheme } = useTheme();
  const { currentUser, adminTab, setAdminTab, participantTab, setParticipantTab, sidebarCollapsed, setSidebarCollapsed, unreadCount } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminNav = [
    { id: "overview", label: "Overview", icon: <Home size={18}/> },
    { id: "events", label: "Events", icon: <Calendar size={18}/> },
    { id: "participants", label: "Participants", icon: <Users size={18}/> },
    { id: "teams", label: "Teams", icon: <Award size={18}/> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={18}/> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18}/> },
    { id: "settings", label: "Settings", icon: <Settings size={18}/> },
  ];

  const participantNav = [
    { id: "home", label: "Home", icon: <Home size={18}/> },
    { id: "discover", label: "Discover", icon: <Globe size={18}/> },
    { id: "registrations", label: "My Registrations", icon: <Calendar size={18}/> },
    { id: "teams", label: "My Teams", icon: <Users size={18}/> },
    { id: "leaderboard", label: "Leaderboard", icon: <Trophy size={18}/> },
    { id: "calendar", label: "Event Calendar", icon: <Calendar size={18}/> },
    { id: "assistant", label: "AI Assistant", icon: <Zap size={18}/> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18}/> },
    { id: "profile", label: "Profile", icon: <User size={18}/> },
  ];

  const nav = role === "admin" ? adminNav : participantNav;
  const tab = role === "admin" ? adminTab : participantTab;
  const setTab = role === "admin" ? setAdminTab : setParticipantTab;
  const currentTabLabel = nav.find(n => n.id === tab)?.label || "";
  const sidebarW = sidebarCollapsed ? 64 : 240;

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 0 16px 0" }}>
      <div style={{ padding: sidebarCollapsed ? "20px 0" : "20px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border)", justifyContent: sidebarCollapsed ? "center" : "flex-start", marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Layers size={16} color="white" />
        </div>
        {!sidebarCollapsed && <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap" }}>Nexus Events</span>}
      </div>
      {!sidebarCollapsed && (
        <div style={{ padding: "12px 16px", margin: "4px 12px", background: "var(--sidebar-active)", borderRadius: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name={currentUser?.name} photoUrl={currentUser?.photoUrl} size={32} />
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{currentUser?.name}</div>
              <div style={{ fontSize: 11, color: "var(--accent)", textTransform: "capitalize" }}>{currentUser?.role}</div>
            </div>
          </div>
        </div>
      )}
      <nav style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(item => {
          const active = tab === item.id;
          const notifBadge = item.id === "notifications" && unreadCount > 0;
          return (
            <button key={item.id} onClick={() => { setTab(item.id); setMobileOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebarCollapsed ? "10px 0" : "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: active ? "var(--sidebar-active)" : "transparent", color: active ? "var(--accent)" : "var(--text-secondary)", fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: active ? 600 : 400, transition: "all 0.15s ease", justifyContent: sidebarCollapsed ? "center" : "flex-start", borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent", position: "relative" }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--surface-hover)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
              <span style={{ flexShrink: 0, position: "relative" }}>
                {item.icon}
                {notifBadge && <span style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, background: "var(--error)", borderRadius: "50%" }} />}
              </span>
              {!sidebarCollapsed && <span>{item.label}</span>}
              {!sidebarCollapsed && notifBadge && <span style={{ marginLeft: "auto", background: "var(--error)", color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 10, fontWeight: 700 }}>{unreadCount}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebarCollapsed ? "10px 0" : "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "var(--text-secondary)", fontFamily: "'Jost', sans-serif", fontSize: 13, justifyContent: sidebarCollapsed ? "center" : "flex-start" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--surface-hover)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
          {!sidebarCollapsed && (theme === "light" ? "Dark Mode" : "Light Mode")}
        </button>
        <button onClick={logout}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: sidebarCollapsed ? "10px 0" : "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "var(--error)", fontFamily: "'Jost', sans-serif", fontSize: 13, justifyContent: sidebarCollapsed ? "center" : "flex-start" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--error-bg)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <LogOut size={18}/>
          {!sidebarCollapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="desktop-sidebar" style={{ width: sidebarW, flexShrink: 0, background: "var(--sidebar-bg)", borderRight: "1px solid var(--border)", height: "100vh", position: "sticky", top: 0, transition: "width 0.25s ease", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <SidebarContent />
      </div>
      {mobileOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 700, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 800, width: 240, background: "var(--sidebar-bg)", borderRight: "1px solid var(--border)" }}>
            <SidebarContent />
          </div>
        </>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ height: 60, background: "var(--surface)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", paddingLeft: 24, paddingRight: 24, gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
          {/* Desktop: collapse sidebar toggle */}
          <button onClick={() => setSidebarCollapsed(c => !c)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, display: "flex", flexShrink: 0 }} className="topbar-collapse">
            <Menu size={18}/>
          </button>
          {/* Mobile: open drawer */}
          <button onClick={() => setMobileOpen(true)} className="mobile-hamburger" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, alignItems: "center", flexShrink: 0 }}>
            <Menu size={18}/>
          </button>
          <h2 className="topbar-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", flex: 1 }}>{currentTabLabel}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setTab("notifications")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 6, borderRadius: 8, display: "flex" }}>
              <Bell size={18}/>
              {unreadCount > 0 && <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, background: "var(--error)", borderRadius: "50%" }} />}
            </button>
            <Avatar name={currentUser?.name} photoUrl={currentUser?.photoUrl} size={32} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div style={{ flex: 1, padding: 28, overflow: "auto" }} className="fade-in content-pad">
          {children}
        </div>
      </div>
    </div>
  );
}

// ============ ADMIN DASHBOARD ============
function AdminDashboard() {
  const { adminTab } = useApp();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(adminTab);
  const prevTab = useRef(adminTab);

  useEffect(() => {
    if (adminTab !== prevTab.current) {
      setLoading(true);
      prevTab.current = adminTab;
      const t = setTimeout(() => { setActiveTab(adminTab); setLoading(false); }, 350);
      return () => clearTimeout(t);
    }
  }, [adminTab]);

  const tabs = { overview: AdminOverview, events: AdminEvents, participants: AdminParticipants, teams: AdminTeams, analytics: AdminAnalytics, notifications: AdminNotifications, settings: AdminSettings };
  const TabComponent = tabs[activeTab] || AdminOverview;
  return loading ? <TabLoader /> : <TabComponent />;
}

function AdminOverview() {
  const { events, registrations, teams, activityLog } = useApp();
  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date) > now).length;
  const checkedIn = registrations.filter(r => r.checkedIn).length;
  const icons = { registration: <UserPlus size={14}/>, team: <Users size={14}/>, event: <Calendar size={14}/> };
  const colors = { registration: "var(--info)", team: "var(--accent)", event: "var(--warning)" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }} className="fade-in">
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard title="Total Events" value={events.length} icon={<Calendar size={20}/>} trend={12} />
        <StatCard title="Total Registrations" value={registrations.length} icon={<Users size={20}/>} trend={8} />
        <StatCard title="Active Teams" value={teams.length} icon={<Award size={20}/>} />
        <StatCard title="Checked In" value={checkedIn} icon={<CheckCircle size={20}/>} sub={`of ${registrations.length}`} />
      </div>

      <div className="nexus-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text)" }}>Upcoming Events</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {events.filter(e => new Date(e.date) > now).slice(0, 4).map(e => {
              const reg = registrations.filter(r => r.eventId === e.id).length;
              return (
                <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{formatDate(e.date)}</div>
                  </div>
                  <Badge label={`${reg}/${e.capacity}`} variant="default" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text)" }}>Activity Feed</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activityLog.slice(0, 7).map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingBottom: 8, borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: colors[a.type] || "var(--text-muted)", marginTop: 1, flexShrink: 0 }}>{icons[a.type] || <Info size={14}/>}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{a.message}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{timeAgo(a.time)}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text)" }}>Registration Overview</h3>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
          {events.map(e => {
            const reg = registrations.filter(r => r.eventId === e.id).length;
            return (
              <div key={e.id} style={{ minWidth: 160, background: "var(--bg-secondary)", borderRadius: 10, padding: 14, border: "1px solid var(--border)", flexShrink: 0 }}>
                <Badge label={e.category} variant={categoryVariant(e.category)} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4, lineHeight: 1.3 }}>{e.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>{formatDate(e.date)}</div>
                <ProgressBar value={reg} max={e.capacity} />
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{reg}/{e.capacity} registered</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ============ ADMIN: ANALYTICS (NEW) ============
function AdminAnalytics() {
  const { events, registrations, users, teams, feedback } = useApp();
  const now = new Date();

  const catData = ["Hackathon","Workshop","Talk","Competition"].map(cat => ({
    label: cat,
    value: events.filter(e => e.category === cat).length,
    color: cat === "Hackathon" ? "#4A7C59" : cat === "Workshop" ? "#4A7C9A" : cat === "Talk" ? "#9A7A4A" : "#9A5A5A"
  }));

  const regByEvent = events.map(e => ({
    label: e.name.split(" ")[0],
    value: registrations.filter(r => r.eventId === e.id).length
  }));

  const checkinRate = registrations.length > 0 ? Math.round((registrations.filter(r => r.checkedIn).length / registrations.length) * 100) : 0;

  const avgRating = feedback.length > 0 ? (feedback.reduce((a, b) => a + b.rating, 0) / feedback.length).toFixed(1) : "N/A";

  const topEvents = events.map(e => ({
    event: e,
    regs: registrations.filter(r => r.eventId === e.id).length,
    fillPct: Math.round((registrations.filter(r => r.eventId === e.id).length / e.capacity) * 100)
  })).sort((a, b) => b.regs - a.regs);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }} className="fade-in">
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard title="Avg Attendance Rate" value={`${checkinRate}%`} icon={<Activity size={20}/>} sub="Check-in rate" trend={5} />
        <StatCard title="Avg Event Rating" value={avgRating} icon={<Star size={20}/>} sub={`${feedback.length} reviews`} />
        <StatCard title="Total Participants" value={users.filter(u => u.role === "participant").length} icon={<Users size={20}/>} />
        <StatCard title="Teams Formed" value={teams.length} icon={<Award size={20}/>} trend={20} />
      </div>

      <div className="nexus-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, marginBottom: 4, color: "var(--text)" }}>Events by Category</h3>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>Distribution across all event types</p>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <DonutChart segments={catData} size={120} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {catData.map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{s.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginLeft: "auto" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, marginBottom: 4, color: "var(--text)" }}>Registrations by Event</h3>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>Number of participants per event</p>
          <MiniBarChart data={regByEvent} height={100} />
        </Card>
      </div>

      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, marginBottom: 4, color: "var(--text)" }}>Event Performance</h3>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>Capacity fill rate and feedback scores per event</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {topEvents.map(({ event, regs, fillPct }) => {
            const eventFeedback = feedback.filter(f => f.eventId === event.id);
            const avgRating = eventFeedback.length > 0 ? (eventFeedback.reduce((a, b) => a + b.rating, 0) / eventFeedback.length).toFixed(1) : null;
            return (
              <div key={event.id} style={{ padding: "14px 16px", background: "var(--bg-secondary)", borderRadius: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <Badge label={event.category} variant={categoryVariant(event.category)} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", flex: 1 }}>{event.name}</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{regs}/{event.capacity}</span>
                  {avgRating && (
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#F5A623" }}>
                      <Star size={12} fill="#F5A623" />{avgRating}
                    </span>
                  )}
                </div>
                <ProgressBar value={regs} max={event.capacity} />
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{fillPct}% capacity filled</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, marginBottom: 4, color: "var(--text)" }}>Participant Feedback</h3>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>Recent reviews from completed events</p>
        {feedback.length === 0 ? <EmptyState icon="⭐" title="No feedback yet" message="Reviews will appear after events are completed." /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {feedback.map(fb => {
              const user = SEED_USERS.find(u => u.id === fb.userId);
              const event = SEED_EVENTS.find(e => e.id === fb.eventId);
              return (
                <div key={fb.id} style={{ padding: "14px 16px", background: "var(--bg-secondary)", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <Avatar name={user?.name} size={28} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{user?.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{event?.name}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}><StarRating value={fb.rating} readonly /></div>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{fb.comment}</p>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

// ============ ADMIN: EVENTS ============
function AdminEvents() {
  const { events, setEvents, registrations, addActivity, addNotification, users } = useApp();
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", category: "Hackathon", date: "", duration: 8, venueName: "", venueUrl: "", capacity: 50, coverUrl: "", tags: "", allowTeams: false, maxTeamSize: 4 });
  const [errors, setErrors] = useState({});
  const cats = ["All", "Hackathon", "Workshop", "Talk", "Competition"];

  const filtered = events.filter(e => {
    const matchCat = catFilter === "All" || e.category === catFilter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const openCreate = () => { setEditingEvent(null); setForm({ name: "", description: "", category: "Hackathon", date: "", duration: 8, venueName: "", venueUrl: "", capacity: 50, coverUrl: "", tags: "", allowTeams: false, maxTeamSize: 4 }); setErrors({}); setDrawerOpen(true); };
  const openEdit = (e) => { setEditingEvent(e); setForm({ ...e, tags: e.tags.join(", "), date: e.date.slice(0, 16) }); setErrors({}); setDrawerOpen(true); };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Event name is required";
    if (!form.date) errs.date = "Date is required";
    if (!form.venueName) errs.venueName = "Venue is required";
    if (!form.capacity || form.capacity < 1) errs.capacity = "Capacity must be > 0";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const eventData = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), capacity: parseInt(form.capacity), duration: parseInt(form.duration), maxTeamSize: parseInt(form.maxTeamSize), status: "upcoming" };
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...eventData } : e));
      toast("Event updated successfully", "success");
    } else {
      const newEvent = { id: `e${Date.now()}`, ...eventData, createdAt: new Date().toISOString() };
      setEvents(prev => [...prev, newEvent]);
      addActivity(`New event added: ${eventData.name}`, "event");
      users.filter(u => u.role === "participant").forEach(u => addNotification(u.id, { type: "info", message: `New event added: ${eventData.name}` }));
      toast("Event created successfully!", "success");
    }
    setDrawerOpen(false);
  };

  const handleDelete = (event) => {
    setEvents(prev => prev.filter(e => e.id !== event.id));
    toast("Event deleted", "info");
    addActivity(`Event deleted: ${event.name}`, "event");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="fade-in">
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." style={{ width: "100%", padding: "8px 12px 8px 32px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "7px 14px", borderRadius: 20, border: "1px solid var(--border)", background: catFilter === c ? "var(--accent)" : "transparent", color: catFilter === c ? "white" : "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: "all 0.15s" }}>{c}</button>
          ))}
        </div>
        <Btn onClick={openCreate} icon={<Plus size={15}/>}>Create Event</Btn>
      </div>

      {filtered.length === 0 ? <EmptyState icon="📅" title="No events found" message="Try adjusting your filters or create a new event." action="Create Event" onAction={openCreate} /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {filtered.map(e => {
            const reg = registrations.filter(r => r.eventId === e.id).length;
            return (
              <Card key={e.id} hover style={{ padding: 0, overflow: "hidden" }}>
                <EventCover event={e} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>{e.name}</h3>
                    <Badge label={e.status} variant={statusVariant(e.status)} />
                  </div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--text-muted)" }}><Calendar size={12}/>{formatDate(e.date)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--text-muted)" }}><MapPin size={12}/>{e.venueName.split(",")[0]}</span>
                  </div>
                  <ProgressBar value={reg} max={e.capacity} style={{ marginBottom: 6 }} />
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>{reg} / {e.capacity} registered</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn variant="ghost" size="sm" icon={<Edit2 size={13}/>} onClick={() => openEdit(e)}>Edit</Btn>
                    <Btn variant="danger" size="sm" icon={<Trash2 size={13}/>} onClick={() => setDeleteConfirm(e)}>Delete</Btn>
                    {e.venueUrl && <a href={e.venueUrl} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", color: "var(--accent)", fontSize: 12, display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}><ExternalLink size={13}/>Link</a>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editingEvent ? "Edit Event" : "Create New Event"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Event Name" value={form.name} onChange={v => setForm(p => ({...p, name: v}))} placeholder="e.g. HackNexus 2025" required error={errors.name} />
          <Textarea label="Description" value={form.description} onChange={v => setForm(p => ({...p, description: v}))} placeholder="What's this event about?" rows={3} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select label="Category" value={form.category} onChange={v => setForm(p => ({...p, category: v}))} options={["Hackathon","Workshop","Talk","Competition"].map(c => ({value:c,label:c}))} />
            <Input label="Duration (hours)" value={form.duration} onChange={v => setForm(p => ({...p, duration: v}))} type="number" placeholder="8" />
          </div>
          <Input label="Date & Time" value={form.date} onChange={v => setForm(p => ({...p, date: v}))} type="datetime-local" required error={errors.date} />
          <Input label="Venue Name" value={form.venueName} onChange={v => setForm(p => ({...p, venueName: v}))} placeholder="e.g. Innovation Hub, Bangalore" required error={errors.venueName} />
          <Input label="Venue / Join URL" value={form.venueUrl} onChange={v => setForm(p => ({...p, venueUrl: v}))} placeholder="https://..." />
          <Input label="Max Capacity" value={form.capacity} onChange={v => setForm(p => ({...p, capacity: v}))} type="number" required error={errors.capacity} />
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Cover Image</label>
            <ImageUpload value={form.coverUrl} onChange={v => setForm(p => ({...p, coverUrl: v}))} height={140} label="Upload event cover" hint="JPG, PNG or WebP · max 5 MB" />
          </div>
          <Input label="Tags (comma-separated)" value={form.tags} onChange={v => setForm(p => ({...p, tags: v}))} placeholder="coding, design, AI" />
          <div style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: 10 }}>
            <Toggle label="Allow Teams" value={form.allowTeams} onChange={v => setForm(p => ({...p, allowTeams: v}))} />
            {form.allowTeams && <Input label="Max Team Size" value={form.maxTeamSize} onChange={v => setForm(p => ({...p, maxTeamSize: v}))} type="number" style={{ marginTop: 12 }} />}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8 }}>
            <Btn variant="ghost" onClick={() => setDrawerOpen(false)}>Cancel</Btn>
            <Btn onClick={handleSave}>{editingEvent ? "Save Changes" : "Create Event"}</Btn>
          </div>
        </div>
      </Drawer>
      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => handleDelete(deleteConfirm)} title="Delete Event" message={`Are you sure you want to delete "${deleteConfirm?.name}"?`} />
    </div>
  );
}

// ============ ADMIN: PARTICIPANTS ============
function AdminParticipants() {
  const { users, events, registrations, setRegistrations, teams } = useApp();
  const toast = useToast();
  const [eventFilter, setEventFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const data = registrations.map(r => {
    const user = users.find(u => u.id === r.userId);
    const event = events.find(e => e.id === r.eventId);
    const team = teams.find(t => t.eventId === r.eventId && t.members.includes(r.userId));
    return { ...r, user, event, team };
  }).filter(r => r.user && r.event);

  const filtered = data.filter(r => {
    const matchEvent = eventFilter === "all" || r.eventId === eventFilter;
    const matchSearch = !search || r.user?.name.toLowerCase().includes(search.toLowerCase()) || r.user?.email.toLowerCase().includes(search.toLowerCase());
    return matchEvent && matchSearch;
  });

  const toggleCheckIn = (regId) => {
    setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, checkedIn: !r.checkedIn } : r));
  };

  const bulkCheckIn = () => {
    setRegistrations(prev => prev.map(r => selected.includes(r.id) ? { ...r, checkedIn: true } : r));
    toast(`Checked in ${selected.length} participants`, "success");
    setSelected([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="fade-in">
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search participants..." style={{ width: "100%", padding: "8px 12px 8px 32px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }} />
        </div>
        <Select value={eventFilter} onChange={setEventFilter} options={[{value:"all",label:"All Events"}, ...events.map(e => ({value:e.id, label:e.name}))]} style={{ width: 200 }} />
        {selected.length > 0 && <Btn onClick={bulkCheckIn} icon={<Check size={14}/>}>Check In {selected.length}</Btn>}
        <Btn variant="ghost" onClick={() => toast("CSV exported successfully", "success")} icon={<ExternalLink size={14}/>}>Export CSV</Btn>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", width: 40 }}>
                  <input type="checkbox" onChange={e => setSelected(e.target.checked ? filtered.map(r => r.id) : [])} checked={selected.length === filtered.length && filtered.length > 0} />
                </th>
                {["Participant", "Event", "Team", "Registered", "Check-In"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} style={{ borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--bg-secondary)" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <input type="checkbox" checked={selected.includes(r.id)} onChange={e => setSelected(prev => e.target.checked ? [...prev, r.id] : prev.filter(x => x !== r.id))} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={r.user?.name} size={28} />
                      <div>
                        <div style={{ fontWeight: 500, color: "var(--text)" }}>{r.user?.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge label={r.event?.category} variant={categoryVariant(r.event?.category)} />
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{r.event?.name}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-secondary)" }}>{r.team ? r.team.name : <span style={{ color: "var(--text-muted)" }}>—</span>}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-muted)" }}>{formatDate(r.registeredAt)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Toggle value={r.checkedIn} onChange={() => toggleCheckIn(r.id)} />
                      {r.checkedIn && <Badge label="✓ In" variant="success" />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon="👥" title="No participants found" message="No registrations match your current filters." />}
        </div>
      </Card>
    </div>
  );
}

// ============ ADMIN: TEAMS ============
function AdminTeams() {
  const { teams, setTeams, events, users } = useApp();
  const toast = useToast();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [disbandConfirm, setDisbandConfirm] = useState(null);
  const [eventFilter, setEventFilter] = useState("all");

  const filtered = teams.filter(t => eventFilter === "all" || t.eventId === eventFilter);

  const handleDisband = (team) => {
    setTeams(prev => prev.filter(t => t.id !== team.id));
    toast(`Team "${team.name}" has been dissolved`, "info");
    setSelectedTeam(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="fade-in">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Select value={eventFilter} onChange={setEventFilter} options={[{value:"all",label:"All Events"}, ...events.map(e => ({value:e.id,label:e.name}))]} style={{ width: 240 }} />
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{filtered.length} team{filtered.length !== 1 ? "s" : ""}</span>
      </div>
      {filtered.length === 0 ? <EmptyState icon="🏆" title="No teams yet" message="Teams will appear here once participants create them." /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map(team => {
            const event = events.find(e => e.id === team.eventId);
            const captain = users.find(u => u.id === team.captainId);
            const members = team.members.map(id => users.find(u => u.id === id)).filter(Boolean);
            return (
              <Card key={team.id} hover onClick={() => setSelectedTeam(team)} style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>{team.name}</h3>
                    {event && <Badge label={event.name} variant="default" style={{ marginTop: 4 }} />}
                  </div>
                  <span style={{ fontSize: 18 }}>🏆</span>
                </div>
                {team.bio && <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.6 }}>{team.bio}</p>}
                <div style={{ display: "flex", alignItems: "center" }}>
                  {members.slice(0, 4).map((m, i) => <Avatar key={m.id} name={m.name} size={28} style={{ marginLeft: i > 0 ? -8 : 0, border: "2px solid var(--surface)" }} />)}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>Captain: {captain?.name}</div>
              </Card>
            );
          })}
        </div>
      )}
      <Modal open={!!selectedTeam} onClose={() => setSelectedTeam(null)} title={selectedTeam?.name || ""}>
        {selectedTeam && (() => {
          const event = events.find(e => e.id === selectedTeam.eventId);
          const members = selectedTeam.members.map(id => users.find(u => u.id === id)).filter(Boolean);
          return (
            <div>
              {event && <Badge label={event.name} variant={categoryVariant(event.category)} style={{ marginBottom: 12 }} />}
              {selectedTeam.bio && <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>{selectedTeam.bio}</p>}
              <h4 style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Members ({members.length})</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {members.map(m => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: 10 }}>
                    <Avatar name={m.name} size={32} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.email}</div>
                    </div>
                    {m.id === selectedTeam.captainId && <Badge label="Captain" variant="accent" />}
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <Btn variant="danger" onClick={() => { setDisbandConfirm(selectedTeam); setSelectedTeam(null); }} style={{ width: "100%", justifyContent: "center" }}>Dissolve Team</Btn>
              </div>
            </div>
          );
        })()}
      </Modal>
      <ConfirmDialog open={!!disbandConfirm} onClose={() => setDisbandConfirm(null)} onConfirm={() => handleDisband(disbandConfirm)} title="Dissolve Team" message={`Dissolve "${disbandConfirm?.name}"? This cannot be undone.`} />
    </div>
  );
}

// ============ ADMIN: NOTIFICATIONS ============
function AdminNotifications() {
  const { events, users, sentNotifications, setSentNotifications, notifications, setNotifications, addActivity } = useApp();
  const toast = useToast();
  const [channel, setChannel] = useState("In-App");
  const [audience, setAudience] = useState("all");
  const [audienceEvent, setAudienceEvent] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState(false);

  const handleSend = () => {
    if (!message.trim()) { toast("Message cannot be empty", "error"); return; }
    const notif = { id: Date.now().toString(), channel, audience: audience === "all" ? "All Participants" : events.find(e => e.id === audienceEvent)?.name || audience, subject, message, sentAt: new Date().toISOString(), status: schedule ? "Scheduled" : "Sent" };
    setSentNotifications(prev => [notif, ...prev]);
    if (channel === "In-App" && !schedule) {
      users.filter(u => u.role === "participant").forEach(u => setNotifications(prev => ({ ...prev, [u.id]: [{ id: Math.random().toString(36).slice(2), type: "info", message, read: false, createdAt: new Date().toISOString() }, ...(prev[u.id] || [])] })));
    }
    toast(schedule ? `Notification scheduled` : `Sent to ${notif.audience}`, "success");
    addActivity(`Broadcast: "${message.slice(0, 40)}..."`, "info");
    setMessage(""); setSubject("");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }} className="fade-in">
      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 20 }}>Send Notification</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Channel</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[{l:"Email",i:<Mail size={16}/>},{l:"WhatsApp",i:<Phone size={16}/>},{l:"In-App",i:<Bell size={16}/>}].map(c => (
                <button key={c.l} onClick={() => setChannel(c.l)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 12px", border: `1px solid ${channel === c.l ? "var(--accent)" : "var(--border)"}`, borderRadius: 8, background: channel === c.l ? "var(--accent-soft)" : "transparent", color: channel === c.l ? "var(--accent)" : "var(--text-secondary)", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 500 }}>
                  {c.i}{c.l}
                </button>
              ))}
            </div>
          </div>
          <Select label="Audience" value={audience} onChange={setAudience} options={[{value:"all",label:"All Participants"},{value:"event",label:"By Event"}]} />
          {audience === "event" && <Select label="Event" value={audienceEvent} onChange={setAudienceEvent} options={[{value:"",label:"Select event..."}, ...events.map(e => ({value:e.id,label:e.name}))]} />}
          <Input label="Subject (optional)" value={subject} onChange={setSubject} placeholder="e.g. Event Reminder" />
          <Textarea label="Message" value={message} onChange={setMessage} placeholder="Write your message here..." rows={4} />
          <Toggle label="Schedule for later" value={schedule} onChange={setSchedule} />
          <Btn onClick={handleSend} icon={<Send size={14}/>} style={{ alignSelf: "flex-start" }}>
            {schedule ? "Schedule" : "Send Now"}
          </Btn>
        </div>
      </Card>

      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 20 }}>Sent Notifications</h3>
        {sentNotifications.length === 0 ? <EmptyState icon="📬" title="No notifications sent" message="Sent notifications will appear here." /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sentNotifications.slice(0, 8).map(n => (
              <div key={n.id} style={{ padding: "12px 14px", background: "var(--bg-secondary)", borderRadius: 10, borderLeft: `3px solid ${n.status === "Sent" ? "var(--success)" : "var(--warning)"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Badge label={n.channel} variant="default" />
                  <Badge label={n.audience} variant="info" />
                  <Badge label={n.status} variant={n.status === "Sent" ? "success" : "warning"} />
                  <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: "auto" }}>{timeAgo(n.sentAt)}</span>
                </div>
                {n.subject && <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{n.subject}</div>}
                <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{n.message.slice(0, 80)}{n.message.length > 80 ? "..." : ""}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ============ ADMIN: SETTINGS ============
function AdminSettings() {
  const toast = useToast();
  const [settings, setSettings] = useState({ platformName: "Nexus Events", registrationOpen: true, teamCreation: true, maxEventsPerUser: 5, requireApproval: false });
  return (
    <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 24 }} className="fade-in">
      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 20 }}>Platform Settings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Platform Name" value={settings.platformName} onChange={v => setSettings(p => ({...p, platformName: v}))} />
          <Input label="Max Events per Participant" value={settings.maxEventsPerUser} onChange={v => setSettings(p => ({...p, maxEventsPerUser: v}))} type="number" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Toggle label="Registration Open" value={settings.registrationOpen} onChange={v => setSettings(p => ({...p, registrationOpen: v}))} />
            <Toggle label="Allow Team Creation" value={settings.teamCreation} onChange={v => setSettings(p => ({...p, teamCreation: v}))} />
            <Toggle label="Require Admin Approval for Events" value={settings.requireApproval} onChange={v => setSettings(p => ({...p, requireApproval: v}))} />
          </div>
          <Btn onClick={() => toast("Settings saved!", "success")} style={{ alignSelf: "flex-start" }}>Save Settings</Btn>
        </div>
      </Card>
      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>Data Management</h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.7 }}>Export all platform data for backup or analysis.</p>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost" onClick={() => toast("Events CSV exported", "success")}>Export Events</Btn>
          <Btn variant="ghost" onClick={() => toast("Registrations CSV exported", "success")}>Export Registrations</Btn>
        </div>
      </Card>
    </div>
  );
}

// ============ PARTICIPANT DASHBOARD ============
function ParticipantDashboard() {
  const { participantTab } = useApp();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(participantTab);
  const prevTab = useRef(participantTab);

  useEffect(() => {
    if (participantTab !== prevTab.current) {
      setLoading(true);
      prevTab.current = participantTab;
      const t = setTimeout(() => { setActiveTab(participantTab); setLoading(false); }, 300);
      return () => clearTimeout(t);
    }
  }, [participantTab]);

  const tabs = { home: ParticipantHome, discover: ParticipantDiscover, registrations: ParticipantRegistrations, teams: ParticipantTeams, leaderboard: ParticipantLeaderboard, calendar: ParticipantCalendar, assistant: ParticipantAssistant, notifications: ParticipantNotifications, profile: ParticipantProfile };
  const TabComponent = tabs[activeTab] || ParticipantHome;
  return loading ? <TabLoader /> : <TabComponent />;
}

// ============ PARTICIPANT: HOME LANDING PAGE ============
function ParticipantHome() {
  const { currentUser, events, registrations, teams, notifications, users, feedback, setParticipantTab, waitlist } = useApp();
  const now = new Date();

  const myRegs = registrations.filter(r => r.userId === currentUser?.id);
  const myTeams = teams.filter(t => t.members.includes(currentUser?.id));
  const myNotifs = (notifications[currentUser?.id] || []).filter(n => !n.read);
  const myWaitlist = (waitlist || []).filter(w => w.userId === currentUser?.id);

  const upcomingMyEvents = myRegs
    .map(r => ({ reg: r, event: events.find(e => e.id === r.eventId) }))
    .filter(x => x.event && new Date(x.event.date) > now)
    .sort((a, b) => new Date(a.event.date) - new Date(b.event.date));

  const suggestedEvents = events
    .filter(e => new Date(e.date) > now && !myRegs.some(r => r.eventId === e.id))
    .slice(0, 3);

  const pts = users.find(u => u.id === currentUser?.id)?.points || 0;
  const allParticipants = users.filter(u => u.role === "participant").sort((a, b) => (b.points||0) - (a.points||0));
  const myRank = allParticipants.findIndex(p => p.id === currentUser?.id) + 1;

  const catColors = { Hackathon: "#4A7C59", Workshop: "#4A7C9A", Talk: "#9A7A4A", Competition: "#9A5A5A" };

  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = currentUser?.name?.split(" ")[0] || "there";

  const quickActions = [
    { icon: "🔍", label: "Discover Events", tab: "discover", color: "var(--accent)" },
    { icon: "📋", label: "My Registrations", tab: "registrations", color: "var(--info)" },
    { icon: "👥", label: "My Teams", tab: "teams", color: "var(--warning)" },
    { icon: "🏆", label: "Leaderboard", tab: "leaderboard", color: "#F5A623" },
    { icon: "📅", label: "Calendar", tab: "calendar", color: "#8A5E7D" },
    { icon: "🤖", label: "AI Assistant", tab: "assistant", color: "#4A6B7C" },
  ];

  const nextEvent = upcomingMyEvents[0];
  const daysUntil = nextEvent ? Math.ceil((new Date(nextEvent.event.date) - now) / 86400000) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }} className="fade-in">

      {/* ── Hero greeting ── */}
      <div style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)", borderRadius: 20, padding: "36px 40px", position: "relative", overflow: "hidden" }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -60, right: 60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.04em" }}>{greeting} 👋</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>{firstName}!</h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 400 }}>
                {upcomingMyEvents.length > 0
                  ? `You have ${upcomingMyEvents.length} upcoming event${upcomingMyEvents.length > 1 ? "s" : ""} lined up. Keep going — you're on a roll!`
                  : "Ready to dive in? Discover events and start your journey on Nexus."}
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                <button onClick={() => setParticipantTab("discover")}
                  style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", background: "#fff", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--accent)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                  <Globe size={15}/> Discover Events
                </button>
                {myTeams.length === 0 && (
                  <button onClick={() => setParticipantTab("teams")}
                    style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", background: "rgba(255,255,255,0.15)", borderRadius: 9, border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontSize: 13, fontWeight: 500, color: "#fff" }}>
                    <Users size={15}/> Create a Team
                  </button>
                )}
              </div>
            </div>
            {/* Stats bubble */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "Events", value: myRegs.length },
                { label: "Teams", value: myTeams.length },
                { label: "Points", value: pts },
                { label: "Rank", value: myRank > 0 ? `#${myRank}` : "—" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "14px 18px", textAlign: "center", minWidth: 72, border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Next event countdown ── */}
      {nextEvent && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: catColors[nextEvent.event.category] || "var(--accent)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 20, lineHeight: 1 }}>📅</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Your Next Event</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nextEvent.event.name}</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)" }}><Calendar size={12}/>{formatDateTime(nextEvent.event.date)}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)" }}><MapPin size={12}/>{nextEvent.event.venueName}</span>
            </div>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>{daysUntil}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{daysUntil === 1 ? "day" : "days"} to go</div>
          </div>
          {nextEvent.reg.checkedIn && <Badge label="✓ Checked In" variant="success" />}
        </div>
      )}

      {/* ── Alerts row ── */}
      {(myNotifs.length > 0 || myWaitlist.length > 0) && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {myNotifs.length > 0 && (
            <button onClick={() => setParticipantTab("notifications")}
              style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "var(--info-bg)", border: "1px solid var(--info)", borderRadius: 12, cursor: "pointer", textAlign: "left" }}>
              <Bell size={18} color="var(--info)" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--info)", fontFamily: "'Jost', sans-serif" }}>{myNotifs.length} unread notification{myNotifs.length > 1 ? "s" : ""}</div>
                <div style={{ fontSize: 11, color: "var(--info)", opacity: 0.8, fontFamily: "'Jost', sans-serif" }}>Tap to view</div>
              </div>
              <ChevronRight size={16} color="var(--info)" style={{ marginLeft: "auto" }} />
            </button>
          )}
          {myWaitlist.length > 0 && (
            <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "var(--warning-bg)", border: "1px solid var(--warning)", borderRadius: 12 }}>
              <Clock size={18} color="var(--warning)" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--warning)", fontFamily: "'Jost', sans-serif" }}>On waitlist for {myWaitlist.length} event{myWaitlist.length > 1 ? "s" : ""}</div>
                <div style={{ fontSize: 11, color: "var(--warning)", opacity: 0.8, fontFamily: "'Jost', sans-serif" }}>You'll be notified when a spot opens</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Quick actions ── */}
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "var(--text)", marginBottom: 14 }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
          {quickActions.map(a => (
            <button key={a.tab} onClick={() => setParticipantTab(a.tab)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "20px 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, cursor: "pointer", transition: "all 0.18s", fontFamily: "'Jost', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; e.currentTarget.style.borderColor = a.color; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {a.icon}
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.4 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="nexus-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* My upcoming events */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>My Upcoming Events</h3>
            <button onClick={() => setParticipantTab("registrations")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--accent)", fontFamily: "'Jost', sans-serif", display: "flex", alignItems: "center", gap: 3 }}>View all <ChevronRight size={13}/></button>
          </div>
          {upcomingMyEvents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>No events yet.</div>
              <button onClick={() => setParticipantTab("discover")} style={{ marginTop: 10, background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 12, fontFamily: "'Jost', sans-serif", fontWeight: 600 }}>Discover events →</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {upcomingMyEvents.slice(0, 4).map(({ event, reg }) => (
                <div key={event.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 9, background: catColors[event.category] || "var(--accent)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 16 }}>{event.category === "Hackathon" ? "💻" : event.category === "Workshop" ? "🛠" : event.category === "Talk" ? "🎤" : "🏆"}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{event.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{formatDate(event.date)}</div>
                  </div>
                  {reg.checkedIn
                    ? <Badge label="✓ In" variant="success" />
                    : <Badge label={event.category} variant={categoryVariant(event.category)} />}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Suggested events */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>Suggested for You</h3>
            <button onClick={() => setParticipantTab("discover")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--accent)", fontFamily: "'Jost', sans-serif", display: "flex", alignItems: "center", gap: 3 }}>Browse all <ChevronRight size={13}/></button>
          </div>
          {suggestedEvents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>You're registered for everything!</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {suggestedEvents.map(event => {
                const count = registrations.filter(r => r.eventId === event.id).length;
                const spotsLeft = event.capacity - count;
                return (
                  <div key={event.id} style={{ padding: "12px 14px", background: "var(--bg-secondary)", borderRadius: 10, borderLeft: `3px solid ${catColors[event.category] || "var(--accent)"}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", lineHeight: 1.3 }}>{event.name}</div>
                      <Badge label={event.category} variant={categoryVariant(event.category)} />
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{formatDate(event.date)}</span>
                      <span style={{ fontSize: 11, color: spotsLeft < 10 ? "var(--error)" : "var(--text-muted)" }}>· {spotsLeft} spots left</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* My teams */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>My Teams</h3>
            <button onClick={() => setParticipantTab("teams")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--accent)", fontFamily: "'Jost', sans-serif", display: "flex", alignItems: "center", gap: 3 }}>View all <ChevronRight size={13}/></button>
          </div>
          {myTeams.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🤝</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>You're not in any teams yet.</div>
              <button onClick={() => setParticipantTab("teams")} style={{ marginTop: 10, background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 12, fontFamily: "'Jost', sans-serif", fontWeight: 600 }}>Create a team →</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {myTeams.map(team => {
                const event = events.find(e => e.id === team.eventId);
                const members = team.members.map(id => users.find(u => u.id === id)).filter(Boolean);
                const isCaptain = team.captainId === currentUser?.id;
                const unread = (team.messages || []).length;
                return (
                  <div key={team.id} onClick={() => setParticipantTab("teams")} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: 10, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-tertiary)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--bg-secondary)"}>
                    <div style={{ width: 40, height: 40, borderRadius: 9, background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🏆</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", display: "flex", alignItems: "center", gap: 6 }}>
                        {team.name}
                        {isCaptain && <span style={{ fontSize: 10, color: "var(--accent)", fontWeight: 700 }}>👑</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{event?.name} · {members.length} members</div>
                    </div>
                    {unread > 0 && <span style={{ fontSize: 10, background: "var(--info-bg)", color: "var(--info)", borderRadius: 10, padding: "2px 7px", fontWeight: 700 }}>{unread}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Points & rank */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>Your Progress</h3>
            <button onClick={() => setParticipantTab("leaderboard")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--accent)", fontFamily: "'Jost', sans-serif", display: "flex", alignItems: "center", gap: 3 }}>Leaderboard <ChevronRight size={13}/></button>
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, padding: "16px", background: "var(--accent-soft)", borderRadius: 12, textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: "var(--accent)" }}>{pts}</div>
              <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Points</div>
            </div>
            <div style={{ flex: 1, padding: "16px", background: "var(--bg-secondary)", borderRadius: 12, textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: "var(--text)" }}>#{myRank}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Rank</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Register for an event", pts: 50, done: myRegs.length > 0 },
              { label: "Get checked in", pts: 30, done: myRegs.some(r => r.checkedIn) },
              { label: "Join or create a team", pts: 40, done: myTeams.length > 0 },
              { label: "Leave feedback", pts: 20, done: feedback.some(f => f.userId === currentUser?.id) },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: item.done ? "var(--success-bg)" : "var(--bg-secondary)", borderRadius: 8, opacity: item.done ? 0.8 : 1 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.done ? "var(--success)" : "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.done ? <Check size={11} color="#fff" /> : <span style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 700 }}>+{item.pts}</span>}
                </div>
                <span style={{ fontSize: 12, color: item.done ? "var(--success)" : "var(--text-secondary)", flex: 1, textDecoration: item.done ? "line-through" : "none" }}>{item.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.done ? "var(--success)" : "var(--accent)" }}>+{item.pts} pts</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============ PARTICIPANT: DISCOVER ============
function ParticipantDiscover() {
  const { currentUser, events, registrations, setRegistrations, addActivity, addNotification, users, waitlist, setWaitlist, bookmarks, setBookmarks, addPoints } = useApp();
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerConfirm, setRegisterConfirm] = useState(null);

  const cats = ["All", "Hackathon", "Workshop", "Talk", "Competition"];
  const filtered = events.filter(e => {
    const matchCat = catFilter === "All" || e.category === catFilter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const isRegistered = (eventId) => registrations.some(r => r.userId === currentUser?.id && r.eventId === eventId);
  const getCount = (eventId) => registrations.filter(r => r.eventId === eventId).length;
  const isBookmarked = (eventId) => (bookmarks[currentUser?.id] || []).includes(eventId);
  const isWaitlisted = (eventId) => waitlist.some(w => w.userId === currentUser?.id && w.eventId === eventId);

  const toggleBookmark = (e, eventId) => {
    e.stopPropagation();
    setBookmarks(prev => {
      const mine = prev[currentUser.id] || [];
      const updated = mine.includes(eventId) ? mine.filter(id => id !== eventId) : [...mine, eventId];
      return { ...prev, [currentUser.id]: updated };
    });
    toast(isBookmarked(eventId) ? "Removed from bookmarks" : "Event bookmarked!", isBookmarked(eventId) ? "info" : "success");
  };

  const handleRegister = (event) => {
    const reg = { id: `r${Date.now()}`, userId: currentUser.id, eventId: event.id, registeredAt: new Date().toISOString(), checkedIn: false };
    setRegistrations(prev => [...prev, reg]);
    addActivity(`${currentUser.name} registered for ${event.name}`, "registration");
    addNotification(currentUser.id, { type: "success", message: `You've successfully registered for ${event.name}.` });
    addPoints(currentUser.id, 50);
    toast(`Registered for ${event.name}! +50 pts`, "success");
    setRegisterConfirm(null);
    setSelectedEvent(null);
  };

  const joinWaitlist = (e, event) => {
    e.stopPropagation();
    if (isWaitlisted(event.id)) { toast("Already on waitlist", "info"); return; }
    setWaitlist(prev => [...prev, { id: `w${Date.now()}`, userId: currentUser.id, eventId: event.id, joinedAt: new Date().toISOString() }]);
    toast("Added to waitlist! We'll notify you if a spot opens.", "success");
  };

  const bookmarkedIds = bookmarks[currentUser?.id] || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="fade-in">
      {bookmarkedIds.length > 0 && (
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <Bookmark size={16} color="var(--accent)" /> Bookmarked
          </h3>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {events.filter(e => bookmarkedIds.includes(e.id)).map(e => (
              <div key={e.id} onClick={() => setSelectedEvent(e)} style={{ minWidth: 200, background: "var(--accent-soft)", borderRadius: 10, padding: 12, cursor: "pointer", border: "1px solid var(--accent)", flexShrink: 0 }}>
                <Badge label={e.category} variant={categoryVariant(e.category)} style={{ marginBottom: 6 }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{e.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{formatDate(e.date)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, tags..." style={{ width: "100%", padding: "8px 12px 8px 32px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "7px 14px", borderRadius: 20, border: "1px solid var(--border)", background: catFilter === c ? "var(--accent)" : "transparent", color: catFilter === c ? "white" : "var(--text-secondary)", fontSize: 12, cursor: "pointer", fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: "all 0.15s" }}>{c}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? <EmptyState icon="🔍" title="No events found" message="Try adjusting your search or category filter." /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {filtered.map(e => {
            const reg = isRegistered(e.id);
            const count = getCount(e.id);
            const full = count >= e.capacity;
            const waitlisted = isWaitlisted(e.id);
            const bookmarked = isBookmarked(e.id);
            return (
              <Card key={e.id} hover style={{ padding: 0, overflow: "hidden", cursor: "pointer" }} onClick={() => setSelectedEvent(e)}>
                <div style={{ position: "relative" }}>
                  <EventCover event={e} />
                  <button onClick={(ev) => toggleBookmark(ev, e.id)} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.3)", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: bookmarked ? "#F5A623" : "#fff", display: "flex" }}>
                    {bookmarked ? <BookmarkCheck size={14}/> : <Bookmark size={14}/>}
                  </button>
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 8, lineHeight: 1.2 }}>{e.name}</h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{e.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}><Calendar size={13}/>{formatDateTime(e.date)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}><MapPin size={13}/>{e.venueName}</span>
                  </div>
                  <ProgressBar value={count} max={e.capacity} style={{ marginBottom: 5 }} />
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>{e.capacity - count} spots left</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                    {e.tags.slice(0, 3).map(t => <span key={t} style={{ fontSize: 11, padding: "2px 8px", background: "var(--bg-secondary)", color: "var(--text-muted)", borderRadius: 10 }}>#{t}</span>)}
                  </div>
                  {reg ? (
                    <Badge label="✓ Registered" variant="success" style={{ width: "100%", justifyContent: "center", padding: "8px" }} />
                  ) : waitlisted ? (
                    <Badge label="⏳ On Waitlist" variant="warning" style={{ width: "100%", justifyContent: "center", padding: "8px" }} />
                  ) : full ? (
                    <Btn variant="ghost" size="sm" onClick={(ev) => joinWaitlist(ev, e)} style={{ width: "100%", justifyContent: "center" }}>
                      Join Waitlist
                    </Btn>
                  ) : (
                    <Btn onClick={(ev) => { ev.stopPropagation(); setRegisterConfirm(e); }} style={{ width: "100%", justifyContent: "center" }} size="sm">
                      Register Now
                    </Btn>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)} title={selectedEvent?.name || ""} width={600}>
        {selectedEvent && (() => {
          const reg = isRegistered(selectedEvent.id);
          const count = getCount(selectedEvent.id);
          const full = count >= selectedEvent.capacity;
          return (
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <Badge label={selectedEvent.category} variant={categoryVariant(selectedEvent.category)} />
                <Badge label={selectedEvent.status} variant={statusVariant(selectedEvent.status)} />
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>{selectedEvent.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  { icon: <Calendar size={14}/>, label: "Date & Time", value: formatDateTime(selectedEvent.date) },
                  { icon: <Clock size={14}/>, label: "Duration", value: `${selectedEvent.duration} hours` },
                  { icon: <MapPin size={14}/>, label: "Venue", value: selectedEvent.venueName },
                  { icon: <Users size={14}/>, label: "Capacity", value: `${count}/${selectedEvent.capacity}` },
                ].map(item => (
                  <div key={item.label} style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", marginBottom: 4 }}>{item.icon}<span style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>{item.label}</span></div>
                    <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{item.value}</div>
                  </div>
                ))}
              </div>
              {selectedEvent.allowTeams && <div style={{ padding: "12px", background: "var(--accent-soft)", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "var(--accent)" }}>🏆 Teams allowed — max {selectedEvent.maxTeamSize} members</div>}
              {selectedEvent.tags.length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>{selectedEvent.tags.map(t => <span key={t} style={{ fontSize: 12, padding: "3px 10px", background: "var(--bg-secondary)", color: "var(--text-muted)", borderRadius: 10 }}>#{t}</span>)}</div>}
              <ProgressBar value={count} max={selectedEvent.capacity} style={{ marginBottom: 16 }} />
              <div style={{ display: "flex", gap: 10 }}>
                {selectedEvent.venueUrl && <a href={selectedEvent.venueUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}><ExternalLink size={14}/>View Location</a>}
                <div style={{ flex: 1 }} />
                {reg ? <Badge label="✓ Already Registered" variant="success" style={{ padding: "10px 16px" }} /> : <Btn disabled={full} onClick={() => setRegisterConfirm(selectedEvent)} style={{ minWidth: 140, justifyContent: "center" }}>{full ? "Event Full" : "Register Now"}</Btn>}
              </div>
            </div>
          );
        })()}
      </Modal>
      <ConfirmDialog open={!!registerConfirm} onClose={() => setRegisterConfirm(null)} onConfirm={() => handleRegister(registerConfirm)} title="Confirm Registration" message={`Register for "${registerConfirm?.name}"? You'll earn 50 points!`} />
    </div>
  );
}

// ============ PARTICIPANT: REGISTRATIONS ============
function ParticipantRegistrations() {
  const { currentUser, events, registrations, setRegistrations, teams, feedback, setFeedback, addPoints } = useApp();
  const toast = useToast();
  const [leaveConfirm, setLeaveConfirm] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [fbForm, setFbForm] = useState({ rating: 0, comment: "" });

  const myRegs = registrations.filter(r => r.userId === currentUser?.id).map(r => ({
    ...r, event: events.find(e => e.id === r.eventId), team: teams.find(t => t.eventId === r.eventId && t.members.includes(currentUser.id))
  })).filter(r => r.event).sort((a, b) => new Date(a.event.date) - new Date(b.event.date));

  const handleLeave = (reg) => {
    setRegistrations(prev => prev.filter(r => r.id !== reg.id));
    toast(`Left ${reg.event?.name}`, "info");
    setLeaveConfirm(null);
  };

  const submitFeedback = () => {
    if (fbForm.rating === 0) { toast("Please select a rating", "error"); return; }
    const fb = { id: `f${Date.now()}`, userId: currentUser.id, eventId: feedbackModal.event.id, rating: fbForm.rating, comment: fbForm.comment, createdAt: new Date().toISOString() };
    setFeedback(prev => [...prev, fb]);
    addPoints(currentUser.id, 20);
    toast("Feedback submitted! +20 pts", "success");
    setFeedbackModal(null);
    setFbForm({ rating: 0, comment: "" });
  };

  const hasFeedback = (eventId) => feedback.some(f => f.userId === currentUser?.id && f.eventId === eventId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="fade-in">
      {myRegs.length === 0 ? <EmptyState icon="📋" title="No registrations yet" message="Discover events and register to see them here." /> : (
        myRegs.map(r => {
          const past = new Date(r.event.date) < new Date();
          return (
            <Card key={r.id} hover style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ width: 80, height: 80, borderRadius: 10, background: r.event.category === "Hackathon" ? "linear-gradient(135deg, #2E5240, #4A7C59)" : r.event.category === "Workshop" ? "linear-gradient(135deg, #2F4A6B, #4A7C9A)" : r.event.category === "Talk" ? "linear-gradient(135deg, #6B4A2A, #9A7A4A)" : "linear-gradient(135deg, #6B2E2E, #9A5A5A)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>{r.event.name}</h3>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge label={r.event.category} variant={categoryVariant(r.event.category)} />
                    {r.checkedIn && <Badge label="✓ Checked In" variant="success" />}
                    {past && !r.checkedIn && <Badge label="Completed" variant="default" />}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)" }}><Calendar size={13}/>{formatDateTime(r.event.date)}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)" }}><MapPin size={13}/>{r.event.venueName}</span>
                </div>
                {r.team && <div style={{ fontSize: 12, color: "var(--accent)", marginBottom: 8 }}>🏆 Team: {r.team.name} {r.team.captainId === currentUser.id ? "(Captain)" : ""}</div>}
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  <Btn variant="subtle" size="sm" onClick={() => toast("Added to calendar!", "success")}>📅 Add to Calendar</Btn>
                  {!past && <Btn variant="danger" size="sm" onClick={() => setLeaveConfirm(r)}>Leave Event</Btn>}
                  {past && !hasFeedback(r.event.id) && (
                    <Btn variant="ghost" size="sm" icon={<Star size={13}/>} onClick={() => setFeedbackModal(r)}>Leave Feedback</Btn>
                  )}
                  {past && hasFeedback(r.event.id) && (
                    <Badge label="✓ Feedback Submitted" variant="success" />
                  )}
                </div>
              </div>
            </Card>
          );
        })
      )}

      <ConfirmDialog open={!!leaveConfirm} onClose={() => setLeaveConfirm(null)} onConfirm={() => handleLeave(leaveConfirm)} title="Leave Event" message={`Leave "${leaveConfirm?.event?.name}"?`} />

      <Modal open={!!feedbackModal} onClose={() => setFeedbackModal(null)} title={`Rate: ${feedbackModal?.event?.name}`} width={480}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 12 }}>Your Rating</label>
            <StarRating value={fbForm.rating} onChange={v => setFbForm(p => ({...p, rating: v}))} size={28} />
          </div>
          <Textarea label="Your Review (optional)" value={fbForm.comment} onChange={v => setFbForm(p => ({...p, comment: v}))} placeholder="What did you love? What could be improved?" rows={4} />
          <div style={{ padding: 12, background: "var(--accent-soft)", borderRadius: 8, fontSize: 12, color: "var(--accent)" }}>
            💡 Submit feedback to earn <strong>+20 points</strong>!
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setFeedbackModal(null)}>Cancel</Btn>
            <Btn onClick={submitFeedback}>Submit Feedback</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ============ PARTICIPANT: TEAMS WITH CHAT (NEW) ============
function ParticipantTeams() {
  const { currentUser, events, registrations, teams, setTeams, addNotification, addActivity, addPoints, users } = useApp();
  const toast = useToast();
  const [createOpen, setCreateOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(null);
  const [chatTeam, setChatTeam] = useState(null);
  const [disbandConfirm, setDisbandConfirm] = useState(null);
  const [leaveConfirm, setLeaveConfirm] = useState(null);
  const [form, setForm] = useState({ name: "", eventId: "", bio: "" });
  const [inviteEmail, setInviteEmail] = useState("");
  const [chatMsg, setChatMsg] = useState("");
  const [errors, setErrors] = useState({});
  const chatEndRef = useRef(null);

  const myTeams = teams.filter(t => t.members.includes(currentUser?.id));
  const myEvents = registrations.filter(r => r.userId === currentUser?.id).map(r => events.find(e => e.id === r.eventId)).filter(e => e?.allowTeams);
  const myTeamEventIds = myTeams.map(t => t.eventId);
  const eligibleEvents = myEvents.filter(e => !myTeamEventIds.includes(e.id));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatTeam?.messages?.length]);

  const handleCreate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Team name is required";
    if (!form.eventId) errs.eventId = "Please select an event";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const newTeam = { id: `t${Date.now()}`, name: form.name, eventId: form.eventId, captainId: currentUser.id, members: [currentUser.id], bio: form.bio, createdAt: new Date().toISOString(), messages: [] };
    setTeams(prev => [...prev, newTeam]);
    addActivity(`Team '${form.name}' created`, "team");
    toast(`Team "${form.name}" created!`, "success");
    setCreateOpen(false);
    setForm({ name: "", eventId: "", bio: "" });
  };

  const handleInvite = (team) => {
    const invitee = users.find(u => u.email === inviteEmail && u.role === "participant");
    if (!invitee) { toast("User not found", "error"); return; }
    if (team.members.includes(invitee.id)) { toast("Already a member", "error"); return; }
    if ((team.pendingInvites || []).includes(invitee.id)) { toast("Invite already pending", "error"); return; }
    const event = events.find(e => e.id === team.eventId);
    if (!registrations.some(r => r.userId === invitee.id && r.eventId === team.eventId)) { toast("User must be registered for this event first", "error"); return; }
    if (team.members.length >= (event?.maxTeamSize || 4)) { toast(`Team is full (max ${event?.maxTeamSize || 4})`, "error"); return; }
    setTeams(prev => prev.map(t => t.id === team.id ? { ...t, pendingInvites: [...(t.pendingInvites || []), invitee.id] } : t));
    addNotification(invitee.id, { type: "info", message: `You've been invited to join team "${team.name}" for ${event?.name}. Visit My Teams to accept or decline.` });
    toast(`Invite sent to ${invitee.name}!`, "success");
    setInviteOpen(null);
    setInviteEmail("");
  };

  const handleAcceptInvite = (teamId) => {
    setTeams(prev => prev.map(t => t.id === teamId
      ? { ...t, members: [...t.members, currentUser.id], pendingInvites: (t.pendingInvites || []).filter(id => id !== currentUser.id) }
      : t));
    const team = teams.find(t => t.id === teamId);
    if (team) {
      addNotification(currentUser.id, { type: "success", message: `You joined team "${team.name}"! Welcome aboard 🎉` });
      addPoints(currentUser.id, 40);
      addActivity(`${currentUser.name} joined team "${team.name}"`, "team");
    }
    toast("You joined the team!", "success");
  };

  const handleDeclineInvite = (teamId) => {
    setTeams(prev => prev.map(t => t.id === teamId
      ? { ...t, pendingInvites: (t.pendingInvites || []).filter(id => id !== currentUser.id) }
      : t));
    toast("Invite declined", "info");
  };

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    const msg = { id: `m${Date.now()}`, userId: currentUser.id, text: chatMsg, time: new Date().toISOString() };
    setTeams(prev => prev.map(t => t.id === chatTeam.id ? { ...t, messages: [...(t.messages || []), msg] } : t));
    setChatMsg("");
    // Update chatTeam ref
    setTimeout(() => {
      const updated = teams.find(t => t.id === chatTeam.id);
      if (updated) setChatTeam({ ...updated, messages: [...(updated.messages || []), msg] });
    }, 50);
  };

  // Update chatTeam when teams state changes
  const activeChatTeam = chatTeam ? teams.find(t => t.id === chatTeam.id) : null;

  return (
    <div style={{ display: "flex", gap: 20, height: "calc(100vh - 120px)" }} className="fade-in">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", flex: 1 }}>My Teams</h3>
          <Btn onClick={() => setCreateOpen(true)} icon={<Plus size={14}/>} size="sm">New Team</Btn>
        </div>

        {/* Pending Invites */}
        {(() => {
          const pendingForMe = teams.filter(t => (t.pendingInvites || []).includes(currentUser?.id));
          if (!pendingForMe.length) return null;
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>Pending Invites</span>
                <span style={{ fontSize: 11, background: "var(--info-bg)", color: "var(--info)", borderRadius: 20, padding: "2px 9px", fontWeight: 700 }}>{pendingForMe.length}</span>
              </div>
              {pendingForMe.map(team => {
                const event = events.find(e => e.id === team.eventId);
                const captain = users.find(u => u.id === team.captainId);
                return (
                  <div key={team.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "var(--info-bg)", border: "1px solid var(--info)", borderRadius: 12, flexWrap: "wrap" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🏆</div>
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{team.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{event?.name} · invited by {captain?.name} · {team.members.length} member{team.members.length !== 1 ? "s" : ""}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn onClick={() => handleAcceptInvite(team.id)} icon={<Check size={13}/>} size="sm">Accept</Btn>
                      <Btn variant="ghost" onClick={() => handleDeclineInvite(team.id)} icon={<X size={13}/>} size="sm">Decline</Btn>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {myTeams.length === 0 ? <EmptyState icon="👥" title="No teams yet" message="Create a team for an event you're registered in." action="Create Team" onAction={() => setCreateOpen(true)} /> : (
          myTeams.map(team => {
            const event = events.find(e => e.id === team.eventId);
            const members = team.members.map(id => users.find(u => u.id === id)).filter(Boolean);
            const isCaptain = team.captainId === currentUser.id;
            const isActive = activeChatTeam?.id === team.id;
            const unreadMsgs = (team.messages || []).length;
            return (
              <Card key={team.id} style={{ borderColor: isActive ? "var(--accent)" : "var(--border)", cursor: "pointer" }} onClick={() => setChatTeam(team)}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)" }}>{team.name}</h3>
                    {isCaptain && <Badge label="Captain" variant="accent" style={{ marginTop: 4 }} />}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {unreadMsgs > 0 && <Badge label={`${unreadMsgs} msgs`} variant="info" />}
                    <span style={{ fontSize: 20 }}>🏆</span>
                  </div>
                </div>
                {event && <Badge label={event.name} variant={categoryVariant(event.category)} style={{ marginBottom: 10 }} />}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {members.slice(0, 4).map((m, i) => <Avatar key={m.id} name={m.name} size={26} style={{ marginLeft: i > 0 ? -8 : 0, border: "2px solid var(--surface)" }} />)}
                    <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 10 }}>{members.length} member{members.length !== 1 ? "s" : ""}</span>
                  </div>
                  <Btn variant="subtle" size="sm" icon={<MessageSquare size={13}/>} onClick={e => { e.stopPropagation(); setChatTeam(team); }}>Chat</Btn>
                </div>
                {isCaptain && (
                  <div style={{ display: "flex", gap: 8, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                    <Btn variant="ghost" size="sm" icon={<UserPlus size={13}/>} onClick={(e) => { e.stopPropagation(); setInviteOpen(team); setInviteEmail(""); }}>Invite</Btn>
                    <Btn variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); setDisbandConfirm(team); }}>Disband</Btn>
                  </div>
                )}
                {!isCaptain && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                    <Btn variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); setLeaveConfirm(team); }}>Leave Team</Btn>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Team Chat Panel */}
      {activeChatTeam ? (
        <div style={{ width: 360, display: "flex", flexDirection: "column", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow)" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{activeChatTeam.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{activeChatTeam.members.length} members</div>
            </div>
            <button onClick={() => setChatTeam(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><X size={16}/></button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
            {(activeChatTeam.messages || []).length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)", fontSize: 13 }}>
                <MessageSquare size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
                <div>Start the conversation!</div>
              </div>
            ) : (
              (activeChatTeam.messages || []).map(msg => {
                const sender = users.find(u => u.id === msg.userId);
                const isMe = msg.userId === currentUser.id;
                return (
                  <div key={msg.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
                    {!isMe && <Avatar name={sender?.name} size={24} />}
                    <div style={{ maxWidth: "75%" }}>
                      {!isMe && <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 3, paddingLeft: 4 }}>{sender?.name}</div>}
                      <div style={{ padding: "8px 12px", borderRadius: isMe ? "12px 12px 3px 12px" : "12px 12px 12px 3px", background: isMe ? "var(--accent)" : "var(--bg-secondary)", color: isMe ? "var(--accent-text)" : "var(--text)", fontSize: 13, lineHeight: 1.5 }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3, textAlign: isMe ? "right" : "left", paddingLeft: isMe ? 0 : 4 }}>{timeAgo(msg.time)}</div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type a message..."
              style={{ flex: 1, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }} />
            <button onClick={sendMessage} style={{ background: "var(--accent)", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "var(--accent-text)", display: "flex", alignItems: "center" }}>
              <Send size={15}/>
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--surface)", border: "1px dashed var(--border)", borderRadius: 14, color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: 20 }}>
          <MessageSquare size={32} style={{ marginBottom: 8, opacity: 0.3 }} />
          Select a team to view the chat
        </div>
      )}

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create a Team">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Team Name" value={form.name} onChange={v => setForm(p => ({...p, name: v}))} placeholder="e.g. Syntax Rebels" required error={errors.name} />
          <Select label="Event" value={form.eventId} onChange={v => setForm(p => ({...p, eventId: v}))} options={[{value:"",label:"Select event..."}, ...eligibleEvents.map(e => ({value:e.id, label:e.name}))]} />
          {errors.eventId && <span style={{ fontSize: 11, color: "var(--error)" }}>{errors.eventId}</span>}
          <Textarea label="Team Bio (optional)" value={form.bio} onChange={v => setForm(p => ({...p, bio: v}))} placeholder="What's your team about?" rows={3} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Btn>
            <Btn onClick={handleCreate}>Create Team</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={!!inviteOpen} onClose={() => setInviteOpen(null)} title={`Invite to ${inviteOpen?.name}`} width={400}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>The person must be registered for the same event.</p>
          <Input label="Member Email" value={inviteEmail} onChange={setInviteEmail} type="email" placeholder="member@email.com" />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setInviteOpen(null)}>Cancel</Btn>
            <Btn onClick={() => handleInvite(inviteOpen)} icon={<UserPlus size={14}/>}>Send Invite</Btn>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!disbandConfirm} onClose={() => setDisbandConfirm(null)} onConfirm={() => { setTeams(prev => prev.filter(t => t.id !== disbandConfirm.id)); toast("Team disbanded", "info"); }} title="Disband Team" message={`Permanently disband "${disbandConfirm?.name}"?`} />
      <ConfirmDialog open={!!leaveConfirm} onClose={() => setLeaveConfirm(null)} onConfirm={() => { setTeams(prev => prev.map(t => t.id === leaveConfirm.id ? {...t, members: t.members.filter(m => m !== currentUser.id)} : t)); toast("Left the team", "info"); }} title="Leave Team" message={`Leave "${leaveConfirm?.name}"?`} />
    </div>
  );
}

// ============ PARTICIPANT: LEADERBOARD (NEW) ============
function ParticipantLeaderboard() {
  const { users, registrations, teams, feedback, currentUser } = useApp();
  const [period, setPeriod] = useState("all");

  const participants = users
    .filter(u => u.role === "participant")
    .map(u => {
      const regs = registrations.filter(r => r.userId === u.id).length;
      const checkedIn = registrations.filter(r => r.userId === u.id && r.checkedIn).length;
      const teamCount = teams.filter(t => t.members.includes(u.id)).length;
      const fbCount = feedback.filter(f => f.userId === u.id).length;
      const score = (u.points || 0) + regs * 50 + checkedIn * 30 + teamCount * 40 + fbCount * 20;
      return { ...u, regs, checkedIn, teamCount, fbCount, score };
    })
    .sort((a, b) => b.score - a.score);

  const medals = ["🥇", "🥈", "🥉"];
  const myRank = participants.findIndex(p => p.id === currentUser?.id) + 1;

  const getBadges = (p, rank) => {
    const badges = [];
    if (rank === 1) badges.push({ label: "🏆 Top Scorer", color: "#F5A623" });
    if (p.checkedIn >= 3) badges.push({ label: "⚡ Active", color: "var(--success)" });
    if (p.teamCount >= 2) badges.push({ label: "🤝 Team Player", color: "var(--info)" });
    if (p.fbCount >= 1) badges.push({ label: "💬 Reviewer", color: "var(--warning)" });
    if (p.regs >= 3) badges.push({ label: "🎯 Event Enthusiast", color: "var(--accent)" });
    return badges;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="fade-in">
      {myRank > 0 && (
        <Card style={{ background: "var(--accent-soft)", borderColor: "var(--accent)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: "var(--accent)" }}>#{myRank}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Your current rank</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{participants.find(p => p.id === currentUser?.id)?.score || 0} points</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {getBadges(participants.find(p => p.id === currentUser?.id) || {}, myRank).map((b, i) => (
                <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: `${b.color}22`, color: b.color, fontWeight: 600 }}>{b.label}</span>
              ))}
            </div>
          </div>
        </Card>
      )}

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
          <Trophy size={18} color="var(--accent)" />
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)" }}>Participant Rankings</h3>
        </div>
        <div>
          {participants.map((p, i) => {
            const isMe = p.id === currentUser?.id;
            const badges = getBadges(p, i + 1);
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderBottom: "1px solid var(--border)", background: isMe ? "var(--accent-soft)" : "transparent" }}>
                <div style={{ width: 32, textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: i < 3 ? 22 : 16, fontWeight: 700, color: i < 3 ? "var(--accent)" : "var(--text-muted)", flexShrink: 0 }}>
                  {i < 3 ? medals[i] : `#${i + 1}`}
                </div>
                <Avatar name={p.name} photoUrl={p.photoUrl} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{p.name}</span>
                    {isMe && <Badge label="You" variant="accent" />}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 3, flexWrap: "wrap" }}>
                    {badges.map((b, bi) => (
                      <span key={bi} style={{ fontSize: 10, color: b.color, fontWeight: 600 }}>{b.label}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Events</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{p.regs}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Check-ins</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{p.checkedIn}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Score</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "var(--accent)" }}>{p.score}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>How Points Are Earned</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
          {[
            { action: "Register for event", pts: "+50" },
            { action: "Check-in at event", pts: "+30" },
            { action: "Join/Create a team", pts: "+40" },
            { action: "Submit feedback", pts: "+20" },
          ].map(item => (
            <div key={item.action} style={{ padding: "12px 14px", background: "var(--bg-secondary)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{item.action}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>{item.pts}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============ PARTICIPANT: EVENT CALENDAR (NEW) ============
function ParticipantCalendar() {
  const { events, registrations, currentUser } = useApp();
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selectedDay, setSelectedDay] = useState(null);

  const { year, month } = currentMonth;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

  const myEventIds = registrations.filter(r => r.userId === currentUser?.id).map(r => r.eventId);

  const getEventsForDay = (day) => {
    const dayDate = new Date(year, month, day);
    return events.filter(e => {
      const eDate = new Date(e.date);
      return eDate.getFullYear() === year && eDate.getMonth() === month && eDate.getDate() === day;
    });
  };

  const today = new Date();
  const isToday = (day) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const catColors = { Hackathon: "#4A7C59", Workshop: "#4A7C9A", Talk: "#9A7A4A", Competition: "#9A5A5A" };

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }} className="fade-in">
      <div style={{ flex: 1 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "var(--text)" }}>{monthName}</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setCurrentMonth(p => { const d = new Date(p.year, p.month - 1); return { year: d.getFullYear(), month: d.getMonth() }; })} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "var(--text-secondary)", display: "flex" }}><ChevronLeft size={16}/></button>
              <button onClick={() => setCurrentMonth({ year: today.getFullYear(), month: today.getMonth() })} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: "var(--text-secondary)", fontSize: 12, fontFamily: "'Jost', sans-serif" }}>Today</button>
              <button onClick={() => setCurrentMonth(p => { const d = new Date(p.year, p.month + 1); return { year: d.getFullYear(), month: d.getMonth() }; })} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "var(--text-secondary)", display: "flex" }}><ChevronRight size={16}/></button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", padding: "6px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{d}</div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const hasMyEvents = dayEvents.some(e => myEventIds.includes(e.id));
              const isSelected = selectedDay === day;
              return (
                <button key={day} onClick={() => setSelectedDay(isSelected ? null : day)}
                  style={{ aspectRatio: "1", borderRadius: 8, border: isSelected ? "2px solid var(--accent)" : "1px solid transparent", background: isToday(day) ? "var(--accent-soft)" : isSelected ? "var(--bg-secondary)" : "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "6px 4px", gap: 2, transition: "all 0.15s" }}
                  onMouseEnter={e => { if (!isSelected && !isToday(day)) e.currentTarget.style.background = "var(--bg-secondary)"; }}
                  onMouseLeave={e => { if (!isSelected && !isToday(day)) e.currentTarget.style.background = "transparent"; }}>
                  <span style={{ fontSize: 13, fontWeight: isToday(day) ? 700 : 400, color: isToday(day) ? "var(--accent)" : "var(--text)" }}>{day}</span>
                  <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                    {dayEvents.slice(0, 3).map((e, ei) => (
                      <div key={ei} style={{ width: 6, height: 6, borderRadius: "50%", background: catColors[e.category] || "var(--accent)", opacity: myEventIds.includes(e.id) ? 1 : 0.4 }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", gap: 12, flexWrap: "wrap" }}>
            {Object.entries(catColors).map(([cat, color]) => (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />{cat}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: 0.4 }} />Not registered
            </div>
          </div>
        </Card>
      </div>

      <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 12 }}>
        <Card>
          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>
            {selectedDay ? `Events on ${selectedDay} ${new Date(year, month).toLocaleString("default", { month: "long" })}` : "Upcoming Events"}
          </h4>
          {(selectedDay ? selectedDayEvents : events.filter(e => new Date(e.date) > today).slice(0, 6)).length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0", color: "var(--text-muted)", fontSize: 13 }}>
              {selectedDay ? "No events this day" : "No upcoming events"}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(selectedDay ? selectedDayEvents : events.filter(e => new Date(e.date) > today).slice(0, 6)).map(e => {
                const isMyEvent = myEventIds.includes(e.id);
                return (
                  <div key={e.id} style={{ padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: 10, borderLeft: `3px solid ${catColors[e.category] || "var(--accent)"}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{e.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 5 }}>{formatDateTime(e.date)}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Badge label={e.category} variant={categoryVariant(e.category)} />
                      {isMyEvent && <Badge label="✓ Registered" variant="success" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card>
          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>My Events This Month</h4>
          {events.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === year && d.getMonth() === month && myEventIds.includes(e.id);
          }).length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>No events registered this month.</div>
          ) : (
            events.filter(e => {
              const d = new Date(e.date);
              return d.getFullYear() === year && d.getMonth() === month && myEventIds.includes(e.id);
            }).map(e => (
              <div key={e.id} style={{ padding: "8px 10px", background: "var(--accent-soft)", borderRadius: 8, marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>{e.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{new Date(e.date).getDate()} {new Date(year, month).toLocaleString("default", { month: "short" })}</div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}

// ============ PARTICIPANT: AI ASSISTANT (NEW) ============
function ParticipantAssistant() {
  const { currentUser, events, registrations, teams, users } = useApp();
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi ${currentUser?.name?.split(" ")[0]}! 👋 I'm your Nexus Events assistant. I can help you find events, check your registrations, team information, and answer any questions about the platform. What would you like to know?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("nexus_anthropic_key") || "");
  const [keyInput, setKeyInput] = useState("");
  const [showKeySetup, setShowKeySetup] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickActions = [
    "What events am I registered for?",
    "Show me upcoming hackathons",
    "Tell me about my teams",
    "How do I earn more points?",
  ];

  const buildContext = () => {
    const myRegs = registrations.filter(r => r.userId === currentUser?.id);
    const myTeams = teams.filter(t => t.members.includes(currentUser?.id));
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date());
    return `
You are a helpful assistant for Nexus Events, an event management platform.
Current user: ${currentUser?.name} (${currentUser?.email}), role: ${currentUser?.role}

Platform data:
- Total events: ${events.length}
- Upcoming events: ${upcomingEvents.map(e => `${e.name} (${e.category}, ${new Date(e.date).toLocaleDateString()}, ${e.venueName}, capacity: ${registrations.filter(r => r.eventId === e.id).length}/${e.capacity})`).join("; ")}
- User's registrations: ${myRegs.length > 0 ? myRegs.map(r => { const ev = events.find(e => e.id === r.eventId); return ev ? `${ev.name} (checked-in: ${r.checkedIn})` : r.eventId; }).join("; ") : "none"}
- User's teams: ${myTeams.length > 0 ? myTeams.map(t => { const ev = events.find(e => e.id === t.eventId); return `${t.name} for ${ev?.name || "unknown event"} (${t.members.length} members, captain: ${t.captainId === currentUser.id ? "you" : users.find(u => u.id === t.captainId)?.name})`; }).join("; ") : "none"}
- User's points: ${currentUser?.points || 0}

Respond helpfully, concisely, and in a friendly tone. Use emojis sparingly. Format responses clearly.
    `.trim();
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system: buildContext(),
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await res.json();

      const reply =
        data.content?.[0]?.text ||
        "Sorry, I couldn't process that.";

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Connection problem. Try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", maxWidth: 800, margin: "0 auto" }} className="fade-in">
      <Card style={{ marginBottom: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={18} color="white"/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>Nexus AI Assistant</div>
          <div style={{ fontSize: 11, color: apiKey ? "var(--success)" : "var(--warning)", display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: apiKey ? "var(--success)" : "var(--warning)" }}/>
            {apiKey ? "Online · Powered by Claude" : "API key required"}
          </div>
        </div>
        <button onClick={() => { setShowKeySetup(p => !p); setKeyInput(apiKey); }}
          style={{ fontSize: 11, padding: "5px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", color: "var(--text-secondary)", fontFamily: "'Jost', sans-serif" }}>
          {apiKey ? "Change Key" : "Set API Key"}
        </button>
      </Card>

      {showKeySetup && (
        <Card style={{ marginBottom: 12, borderColor: "var(--accent)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Anthropic API Key</div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.6 }}>
            Enter your key from <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>console.anthropic.com</a>. It's stored locally in your browser only.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={keyInput} onChange={e => setKeyInput(e.target.value)} type="password" placeholder="sk-ant-..."
              style={{ flex: 1, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"} />
            <Btn onClick={() => { localStorage.setItem("nexus_anthropic_key", keyInput); setApiKey(keyInput); setShowKeySetup(false); }}>Save</Btn>
            {apiKey && <Btn variant="danger" onClick={() => { localStorage.removeItem("nexus_anthropic_key"); setApiKey(""); setKeyInput(""); setShowKeySetup(false); }}>Remove</Btn>}
          </div>
        </Card>
      )}

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, padding: "4px 0", marginBottom: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: 10, alignItems: "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Zap size={14} color="white"/></div>
            )}
            <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: msg.role === "user" ? "16px 16px 3px 16px" : "16px 16px 16px 3px", background: msg.role === "user" ? "var(--accent)" : "var(--surface)", color: msg.role === "user" ? "var(--accent-text)" : "var(--text)", fontSize: 13, lineHeight: 1.6, boxShadow: "var(--shadow)", border: msg.role === "assistant" ? "1px solid var(--border)" : "none", whiteSpace: "pre-wrap" }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Zap size={14} color="white"/></div>
            <div style={{ padding: "12px 16px", background: "var(--surface)", borderRadius: "16px 16px 16px 3px", border: "1px solid var(--border)", display: "flex", gap: 5, alignItems: "center" }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", animation: "pulse 1.2s ease infinite", animationDelay: `${i * 0.2}s` }} />)}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {quickActions.map(q => (
          <button key={q} onClick={() => sendMessage(q)} style={{ fontSize: 11, padding: "5px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 20, cursor: "pointer", color: "var(--text-secondary)", fontFamily: "'Jost', sans-serif", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-soft)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
            {q}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !loading && apiKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder={apiKey ? "Ask me anything about events, teams, registrations..." : "Set your API key above to start chatting..."}
          disabled={!apiKey}
          style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif", boxShadow: "var(--shadow)", opacity: apiKey ? 1 : 0.5 }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"} />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading || !apiKey}
          style={{ background: "var(--accent)", border: "none", borderRadius: 12, padding: "12px 18px", cursor: input.trim() && !loading && apiKey ? "pointer" : "not-allowed", color: "var(--accent-text)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "'Jost', sans-serif", fontWeight: 500, opacity: !input.trim() || loading || !apiKey ? 0.5 : 1 }}>
          <Send size={15}/>Send
        </button>
      </div>
    </div>
  );
}

// ============ PARTICIPANT: NOTIFICATIONS ============
function ParticipantNotifications() {
  const { currentUser, notifications, setNotifications } = useApp();
  const myNotifs = notifications[currentUser?.id] || [];
  const unread = myNotifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => ({ ...prev, [currentUser.id]: (prev[currentUser.id] || []).map(n => ({...n, read: true})) }));
  const markRead = (id) => setNotifications(prev => ({ ...prev, [currentUser.id]: (prev[currentUser.id] || []).map(n => n.id === id ? {...n, read: true} : n) }));
  const deleteNotif = (id) => setNotifications(prev => ({ ...prev, [currentUser.id]: (prev[currentUser.id] || []).filter(n => n.id !== id) }));

  const icons = { success: <CheckCircle size={16}/>, info: <Info size={16}/>, warning: <AlertCircle size={16}/>, error: <AlertCircle size={16}/> };
  const colors = { success: "var(--success)", info: "var(--info)", warning: "var(--warning)", error: "var(--error)" };

  return (
    <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 16 }} className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{unread} unread</div>
        {unread > 0 && <Btn variant="ghost" size="sm" onClick={markAllRead}>Mark all as read</Btn>}
      </div>
      {myNotifs.length === 0 ? <EmptyState icon="🔔" title="No notifications" message="You're all caught up!" /> : (
        myNotifs.map(n => (
          <div key={n.id} onClick={() => markRead(n.id)} style={{ display: "flex", gap: 14, padding: "14px 16px", background: n.read ? "var(--surface)" : "var(--bg-secondary)", borderRadius: 12, border: `1px solid ${n.read ? "var(--border)" : colors[n.type]}22`, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = n.read ? "var(--surface)" : "var(--bg-secondary)"}>
            <span style={{ color: colors[n.type], marginTop: 2, flexShrink: 0 }}>{icons[n.type]}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, marginBottom: 4 }}>{n.message}</p>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{timeAgo(n.createdAt)}</span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[n.type], flexShrink: 0, marginTop: 6 }} />}
              <button onClick={e => { e.stopPropagation(); deleteNotif(n.id); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2, display: "flex", opacity: 0, transition: "opacity 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = "var(--error)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}>
                <X size={14}/>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ============ PARTICIPANT: PROFILE ============
function ParticipantProfile() {
  const { currentUser, setCurrentUser, users, setUsers } = useApp();
  const toast = useToast();
  const [form, setForm] = useState({ name: currentUser?.name || "", bio: currentUser?.bio || "", skills: currentUser?.skills || [], photo: currentUser?.photoUrl || "", banner: currentUser?.bannerUrl || "" });
  const [skillInput, setSkillInput] = useState("");
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const saveProfile = () => {
    const updated = { ...currentUser, ...form, photoUrl: form.photo, bannerUrl: form.banner };
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    setCurrentUser(updated);
    toast("Profile saved successfully", "success");
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      setForm(p => ({ ...p, skills: [...(p.skills || []), skillInput.trim()] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => setForm(p => ({ ...p, skills: p.skills.filter(s => s !== skill) }));

  const changePw = () => {
    const errs = {};
    if (pwForm.current !== currentUser.password) errs.current = "Incorrect current password";
    if (pwForm.newPw.length < 8) errs.newPw = "Min 8 characters";
    if (pwForm.newPw !== pwForm.confirm) errs.confirm = "Passwords don't match";
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, password: pwForm.newPw } : u));
    toast("Password changed successfully", "success");
    setPwForm({ current: "", newPw: "", confirm: "" });
  };

  const pts = users.find(u => u.id === currentUser?.id)?.points || 0;

  return (
    <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 24 }} className="fade-in">
      {/* Profile hero card */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        {/* Banner */}
        <div style={{ height: 120, position: "relative", background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)", overflow: "hidden" }}>
          <ImageUpload value={form.banner || ""} onChange={v => setForm(p => ({...p, banner: v}))} height={120}
            label="Upload banner" hint="Click or drag to add a banner photo" />
        </div>
        {/* Avatar row */}
        <div style={{ padding: "0 24px 20px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ marginTop: -36, position: "relative" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", border: "3px solid var(--surface)", overflow: "hidden", background: "var(--bg-secondary)" }}>
                <ImageUpload value={form.photo || ""} onChange={v => setForm(p => ({...p, photo: v}))} shape="circle" height={72} />
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "10px 18px", background: "var(--accent-soft)", borderRadius: 12, marginTop: 8 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "var(--accent)" }}>{pts}</div>
              <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Points</div>
            </div>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{form.name || currentUser?.name}</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>{currentUser?.email}</p>
          <Badge label={currentUser?.role} variant="accent" />
        </div>
      </Card>

      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 20 }}>Edit Profile</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Full Name" value={form.name} onChange={v => setForm(p => ({...p, name: v}))} />
          <Textarea label="Bio" value={form.bio} onChange={v => setForm(p => ({...p, bio: v}))} placeholder="Tell us about yourself..." rows={3} />
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Skills</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {(form.skills || []).map(s => (
                <span key={s} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, padding: "4px 10px", background: "var(--accent-soft)", color: "var(--accent)", borderRadius: 20 }}>
                  {s}<button onClick={() => removeSkill(s)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", padding: 0, display: "flex" }}><X size={12}/></button>
                </span>
              ))}
            </div>
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Type a skill and press Enter..." style={{ width: "100%", padding: "9px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, color: "var(--text)", outline: "none", fontFamily: "'Jost', sans-serif" }} />
          </div>
          <Btn onClick={saveProfile} style={{ alignSelf: "flex-start" }}>Save Profile</Btn>
        </div>
      </Card>

      <Card>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 20 }}>Change Password</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Current Password" value={pwForm.current} onChange={v => setPwForm(p => ({...p, current: v}))} type="password" error={pwErrors.current} />
          <Input label="New Password" value={pwForm.newPw} onChange={v => setPwForm(p => ({...p, newPw: v}))} type="password" error={pwErrors.newPw} />
          <Input label="Confirm Password" value={pwForm.confirm} onChange={v => setPwForm(p => ({...p, confirm: v}))} type="password" error={pwErrors.confirm} />
          <Btn onClick={changePw} style={{ alignSelf: "flex-start" }}>Update Password</Btn>
        </div>
      </Card>

      <Card style={{ borderColor: "var(--error)" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "var(--error)", marginBottom: 8 }}>Danger Zone</h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Permanently delete your account and all associated data.</p>
        <Btn variant="danger" onClick={() => setDeleteOpen(true)}>Delete Account</Btn>
      </Card>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Account" width={400}>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.7 }}>This action is permanent. Type <strong>DELETE</strong> to confirm.</p>
        <Input value={deleteInput} onChange={setDeleteInput} placeholder="Type DELETE to confirm" />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Btn>
          <Btn variant="danger" disabled={deleteInput !== "DELETE"} onClick={() => { toast("Account deleted (mock)", "info"); setDeleteOpen(false); }}>Delete Forever</Btn>
        </div>
      </Modal>
    </div>
  );
}