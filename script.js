"use strict";

/* ==========================================================================
   Internal standard preset library
   --------------------------------------------------------------------------
   Structure (per compound):
     {
       name:    Compound name (displayed in the dropdown)
       cas:     CAS number (string) or null if unknown/custom
       mw:      Molecular weight, g/mol (number) or null if unknown/custom
       nucleus: "1H" | "19F"   (which nucleus this compound is used for)
       signals: [
         { description: "human-readable signal (mult., shift)", nHF: <int|null> }
       ]
       isCustom: true for the free-input placeholder entries
     }

   To add a new internal standard: append one object to the array for the
   correct nucleus. If the compound has more than one usable signal, add
   multiple entries to its `signals` array — they will appear together in
   the "signal" dropdown once the compound is selected.
   ========================================================================== */
const INTERNAL_STANDARD_LIBRARY = {
  "1H": [
    {
      name: "1,3,5-トリメトキシベンゼン (TMB)",
      cas: "621-23-8",
      mw: 168.19,
      nucleus: "1H",
      signals: [
        { description: "OCH3 (9H, s, ~3.75 ppm)", nHF: 9 },
        { description: "ArH (3H, s, ~6.10 ppm)", nHF: 3 },
      ],
    },
    {
      name: "ジブロモメタン (CH2Br2)",
      cas: "74-95-3",
      mw: 173.83,
      nucleus: "1H",
      signals: [{ description: "CH2 (2H, s, ~4.90 ppm)", nHF: 2 }],
    },
    {
      name: "メシチレン (1,3,5-トリメチルベンゼン)",
      cas: "108-67-8",
      mw: 120.19,
      nucleus: "1H",
      signals: [
        { description: "ArH (3H, s, ~6.78 ppm)", nHF: 3 },
        { description: "CH3 (9H, s, ~2.25 ppm)", nHF: 9 },
      ],
    },
    {
      name: "1,4-ジニトロベンゼン",
      cas: "100-25-4",
      mw: 168.11,
      nucleus: "1H",
      signals: [{ description: "ArH (4H, s, ~8.42 ppm)", nHF: 4 }],
    },
    {
      name: "ジメチルスルホン",
      cas: "67-71-0",
      mw: 94.13,
      nucleus: "1H",
      signals: [{ description: "CH3 (6H, s, ~3.00 ppm)", nHF: 6 }],
    },
    {
      name: "ニトロメタン",
      cas: "75-52-5",
      mw: 61.04,
      nucleus: "1H",
      signals: [{ description: "CH3 (3H, s, ~4.30 ppm)", nHF: 3 }],
    },
    {
      name: "マレイン酸",
      cas: "110-16-7",
      mw: 116.07,
      nucleus: "1H",
      signals: [{ description: "CH=CH (2H, s, ~6.30 ppm)", nHF: 2 }],
    },
    {
      name: "1,4-ジメトキシベンゼン (1,4-Dimethoxybenzene)",
      cas: "150-78-7",
      mw: 138.17,
      nucleus: "1H",
      signals: [{ description: "OCH3 (6H, s)", nHF: 6 }],
    },
    {
      name: "デュレン (Durene, 1,2,4,5-テトラメチルベンゼン)",
      cas: "95-93-2",
      mw: 134.22,
      nucleus: "1H",
      signals: [{ description: "CH3 (12H, s)", nHF: 12 }],
    },
    {
      name: "エチルベンゼン (Ethylbenzene)",
      cas: "100-41-4",
      mw: 106.17,
      nucleus: "1H",
      signals: [
        { description: "CH3 (3H, t)", nHF: 3 },
        { description: "CH2 (2H, q)", nHF: 2 },
      ],
    },
    {
      name: "トルエン (Toluene)",
      cas: "108-88-3",
      mw: 92.14,
      nucleus: "1H",
      signals: [{ description: "CH3 (3H, s)", nHF: 3 }],
    },
    {
      name: "1,2-ジクロロエタン (1,2-Dichloroethane)",
      cas: "107-06-2",
      mw: 98.96,
      nucleus: "1H",
      signals: [{ description: "CH2 (4H, s)", nHF: 4 }],
    },
    {
      name: "アセトニトリル (Acetonitrile)",
      cas: "75-05-8",
      mw: 41.05,
      nucleus: "1H",
      signals: [{ description: "CH3 (3H, s)", nHF: 3 }],
    },
    {
      name: "1,2,4,5-テトラクロロベンゼン (1,2,4,5-Tetrachlorobenzene)",
      cas: "95-94-3",
      mw: 215.89,
      nucleus: "1H",
      signals: [{ description: "ArH (2H, s)", nHF: 2 }],
    },
    {
      // Note: this is 1,1,2,2-Tetrachloroethane (Cl2CH–CHCl2, C2H2Cl4, CAS 79-34-5).
      // NOT the 1,1,1,2-isomer (CAS 630-20-6), and NOT Tetrachloroethylene (C2Cl4).
      name: "1,1,2,2-テトラクロロエタン (1,1,2,2-Tetrachloroethane)",
      cas: "79-34-5",
      mw: 167.85,
      nucleus: "1H",
      signals: [{ description: "CHCl2 (2H, s, ~5.9 ppm)", nHF: 2 }],
    },
    {
      name: "その他 (カスタム入力)",
      cas: null,
      mw: null,
      nucleus: "1H",
      signals: [{ description: "手動でN_ISを入力", nHF: null }],
      isCustom: true,
    },
  ],
  "19F": [
    {
      name: "α,α,α-トリフルオロトルエン (PhCF3)",
      cas: "98-08-8",
      mw: 146.11,
      nucleus: "19F",
      signals: [{ description: "CF3 (3F, s, ~-63.7 ppm)", nHF: 3 }],
    },
    {
      name: "4-フルオロトルエン",
      cas: "352-32-9",
      mw: 110.13,
      nucleus: "19F",
      signals: [{ description: "Ar-F (1F, m, ~-118 ppm)", nHF: 1 }],
    },
    {
      name: "フルオロベンゼン",
      cas: "462-06-6",
      mw: 96.10,
      nucleus: "19F",
      signals: [{ description: "Ar-F (1F, m, ~-113.5 ppm)", nHF: 1 }],
    },
    {
      name: "トリフルオロ酢酸 (TFA)",
      cas: "76-05-1",
      mw: 114.02,
      nucleus: "19F",
      signals: [{ description: "CF3 (3F, s, ~-76 ppm)", nHF: 3 }],
    },
    {
      name: "1-フルオロナフタレン",
      cas: "321-38-0",
      mw: 146.15,
      nucleus: "19F",
      signals: [{ description: "Ar-F (1F, m, ~-124 ppm)", nHF: 1 }],
    },
    {
      name: "4,4′-ジフルオロビフェニル",
      cas: "398-23-2",
      mw: 190.20,
      nucleus: "19F",
      signals: [{ description: "Ar-F (2F, m, ~-115 ppm)", nHF: 2 }],
    },
    {
      name: "1,4-ジフルオロベンゼン (1,4-Difluorobenzene)",
      cas: "540-36-3",
      mw: 114.09,
      nucleus: "19F",
      signals: [{ description: "Ar-F (2F)", nHF: 2 }],
    },
    {
      name: "ヘキサフルオロベンゼン (Hexafluorobenzene)",
      cas: "392-56-3",
      mw: 186.06,
      nucleus: "19F",
      signals: [{ description: "Ar-F (6F)", nHF: 6 }],
    },
    {
      name: "1,3,5-トリフルオロベンゼン (1,3,5-Trifluorobenzene)",
      cas: "372-38-3",
      mw: 132.09,
      nucleus: "19F",
      signals: [{ description: "Ar-F (3F)", nHF: 3 }],
    },
    {
      name: "4-フルオロベンゾトリフルオリド (4-Fluorobenzotrifluoride)",
      cas: "402-44-8",
      mw: 164.10,
      nucleus: "19F",
      signals: [
        { description: "CF3 (3F, s, ~-63 ppm)", nHF: 3 },
        { description: "Ar-F (1F, m, ~-115 ppm)", nHF: 1 },
      ],
    },
    {
      name: "その他 (カスタム入力)",
      cas: null,
      mw: null,
      nucleus: "19F",
      signals: [{ description: "手動でN_ISを入力", nHF: null }],
      isCustom: true,
    },
  ],
};

/* ==========================================================================
   Recently-used internal standards (localStorage)
   --------------------------------------------------------------------------
   Stores up to 5 CAS numbers, most-recently-used first. CAS number is used
   as the identifier (rather than the compound name) so that renaming a
   compound in the library above never breaks existing history. Custom
   ("その他") entries have no CAS number and are never recorded.
   ========================================================================== */
const HISTORY_STORAGE_KEY = "nmrYieldCalculator.recentInternalStandards";
const HISTORY_MAX_LENGTH = 5;

// Old (wrong) CAS → corrected CAS.
const CAS_CORRECTIONS = {
  "630-20-6": "79-34-5", // 1,1,2,2-Tetrachloroethane (was the 1,1,1,2-isomer's CAS)
};

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Migrate CAS numbers that were corrected in the library, so the
    // compound stays in "recently used" for existing users.
    const migrated = parsed.map((cas) => CAS_CORRECTIONS[cas] || cas);
    return migrated.filter((cas, i) => migrated.indexOf(cas) === i);
  } catch (e) {
    // localStorage unavailable (private browsing, disabled, corrupt data, etc).
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    // Fail silently — history is a convenience feature, not core function.
  }
}

// Moves `cas` to the front of the history (de-duplicating), capped at
// HISTORY_MAX_LENGTH entries. No-op for compounds without a CAS number.
function addToHistory(cas) {
  if (!cas) return;
  const history = loadHistory().filter((entry) => entry !== cas);
  history.unshift(cas);
  saveHistory(history.slice(0, HISTORY_MAX_LENGTH));
}

/* ==========================================================================
   Element references
   ========================================================================== */
const els = {
  nucleusBtns: document.querySelectorAll(".nucleus-btn"),
  isSelect: document.getElementById("is-select"),
  isCas: document.getElementById("is-cas"),
  isSignal: document.getElementById("is-signal"),
  isN: document.getElementById("is-n"),
  isIntegral: document.getElementById("is-integral"),
  iisMode: document.getElementById("iis-mode"),
  isMw: document.getElementById("is-mw"),
  isMass: document.getElementById("is-mass"),
  isMmol: document.getElementById("is-mmol"),
  productIntegral: document.getElementById("product-integral"),
  integralHint: document.getElementById("integral-hint"),
  productN: document.getElementById("product-n"),
  theoreticalMmol: document.getElementById("theoretical-mmol"),
  productMw: document.getElementById("product-mw"),
  resetBtn: document.getElementById("reset-btn"),
  yieldCopyBtn: document.getElementById("yield-copy-btn"),
  yieldValue: document.getElementById("yield-value"),
  copyFeedback: document.getElementById("copy-feedback"),
  calcSteps: document.getElementById("calc-steps"),
  readoutTag: document.getElementById("readout-nucleus-tag"),
  readoutStatus: document.getElementById("readout-status"),
  viz: document.getElementById("viz"),
  vizIs: document.getElementById("viz-is"),
  vizAn: document.getElementById("viz-an"),
  vizIsLabel: document.getElementById("viz-is-label"),
  vizAnLabel: document.getElementById("viz-an-label"),
  resultPanel: document.getElementById("result-panel"),
  mobileBar: document.getElementById("mobile-bar"),
  mobileTag: document.getElementById("mobile-tag"),
  mobileYield: document.getElementById("mobile-yield"),
  themeBtn: document.getElementById("theme-btn"),
  themeLabel: document.getElementById("theme-label"),
};

/* ==========================================================================
   Theme (auto / light / dark) — stored per browser, purely cosmetic
   ========================================================================== */
const THEME_STORAGE_KEY = "nmrYieldCalculator.theme";
const THEME_ORDER = ["auto", "light", "dark"];
const THEME_LABELS = { auto: "自動", light: "ライト", dark: "ダーク" };

function currentTheme() {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : "auto";
}

function applyTheme(theme) {
  if (theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  els.themeLabel.textContent = THEME_LABELS[theme];
  els.themeBtn.setAttribute("aria-label", `表示テーマを切り替え（現在: ${THEME_LABELS[theme]}）`);
  try {
    if (theme === "auto") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    // Storage unavailable — the theme still applies for this visit.
  }
}

els.themeBtn.addEventListener("click", () => {
  const next = THEME_ORDER[(THEME_ORDER.indexOf(currentTheme()) + 1) % THEME_ORDER.length];
  applyTheme(next);
});

els.mobileBar.addEventListener("click", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  els.resultPanel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
});

let currentNucleus = "1H";
// Tracks which of mass / mmol the user edited most recently, so that field
// stays authoritative when the molecular weight changes (preset switch,
// manual MW edit, etc).
let lastEditedAmount = null; // "mass" | "mmol" | null
// While true, I_IS mirrors N_IS (e.g. TMB OCH3 → 9.00). Becomes false as
// soon as the user types into the I_IS field; selecting a new signal or
// resetting turns the linkage back on.
let iisFollowsN = true;
let copyFeedbackTimer = null;

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy command failed");
}

function showCopyFeedback(message) {
  clearTimeout(copyFeedbackTimer);
  els.copyFeedback.textContent = message;
  els.copyFeedback.classList.add("is-visible");
  copyFeedbackTimer = setTimeout(() => {
    els.copyFeedback.classList.remove("is-visible");
  }, 1600);
}

/* ==========================================================================
   Number formatting helpers
   ========================================================================== */
// For on-screen text (calculation trail) — allows thousands separators.
function fmt(value, digits = 4) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

// For writing back into <input type="number"> values — must be a plain
// numeric string (no thousands separators).
function plainNum(value, digits = 6) {
  if (!Number.isFinite(value)) return "";
  return parseFloat(value.toFixed(digits)).toString();
}

function readNumber(input) {
  const v = parseFloat(input.value);
  return Number.isFinite(v) && v >= 0 ? v : null;
}

/* ==========================================================================
   Populate internal-standard dropdowns
   ========================================================================== */
function currentCompound() {
  return INTERNAL_STANDARD_LIBRARY[currentNucleus][els.isSelect.value];
}

function populateStandardSelect() {
  const list = INTERNAL_STANDARD_LIBRARY[currentNucleus];
  const history = loadHistory();

  // Indices (into `list`) of compounds recently used for this nucleus,
  // most-recent-first. Custom entries are never part of history.
  const recentIndices = [];
  history.forEach((cas) => {
    const idx = list.findIndex((standard) => standard.cas === cas);
    if (idx !== -1 && !list[idx].isCustom && !recentIndices.includes(idx)) {
      recentIndices.push(idx);
    }
  });

  els.isSelect.innerHTML = "";

  if (recentIndices.length > 0) {
    const recentGroup = document.createElement("optgroup");
    recentGroup.label = "★ 最近使用した内部標準";
    recentIndices.forEach((index) => {
      const opt = document.createElement("option");
      opt.value = index;
      opt.textContent = list[index].name;
      recentGroup.appendChild(opt);
    });
    els.isSelect.appendChild(recentGroup);
  }

  const allGroup = document.createElement("optgroup");
  allGroup.label = recentIndices.length > 0 ? "すべての内部標準" : "内部標準";
  list.forEach((standard, index) => {
    if (recentIndices.includes(index)) return; // already shown above
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = standard.name;
    allGroup.appendChild(opt);
  });
  els.isSelect.appendChild(allGroup);

  // Default to the most recently used compound, falling back to the first
  // entry in the library (e.g. on first-ever run, with no history yet).
  els.isSelect.value = recentIndices.length > 0 ? String(recentIndices[0]) : "0";

  populateSignalSelect();
  applyCompoundMeta();
}

function populateSignalSelect() {
  const standard = currentCompound();
  els.isSignal.innerHTML = "";
  standard.signals.forEach((signal, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = displaySignal(signal.description);
    els.isSignal.appendChild(opt);
  });
  applySignalToNHF();
}

function applySignalToNHF() {
  const standard = currentCompound();
  const signal = standard.signals[els.isSignal.value];
  if (signal.nHF !== null && signal.nHF !== undefined) {
    els.isN.value = signal.nHF;
    els.isN.readOnly = true;
    els.isN.classList.add("is-locked");
  } else {
    els.isN.readOnly = false;
    els.isN.classList.remove("is-locked");
    els.isN.value = "";
  }
  // A new reference signal means a new normalisation → re-link I_IS to N_IS.
  iisFollowsN = true;
  syncIisToN();
}

// Copies N_IS into I_IS (as "9.00") while the linkage is on, then refreshes
// the mode label and the integral instruction.
function syncIisToN() {
  if (iisFollowsN) {
    const n = readNumber(els.isN);
    els.isIntegral.value = n !== null && n > 0 ? n.toFixed(2) : "";
  }
  els.iisMode.textContent = iisFollowsN ? "（H/F数に連動）" : "（手動入力）";
  updateIntegralHint();
}

// Tells the user which IS peak the I_IS value refers to, and that the
// product integral must be read from the same spectrum/normalisation.
function updateIntegralHint() {
  const standard = currentCompound();
  const signal = standard.signals[els.isSignal.value];
  const target = standard.isCustom
    ? "内部標準の基準シグナル"
    : `「${standard.name}：${displaySignal(signal.description)}」`;
  const iisRaw = els.isIntegral.value.trim();
  els.integralHint.textContent = iisRaw !== ""
    ? `解析ソフトで${target}の積分を ${iisRaw} に設定した状態で、生成物シグナルの積分値を入力してください。`
    : `${target}の積分値を内部標準の「積分値」欄に入力し、同じスペクトルでの生成物シグナルの積分値を入力してください。`;
}

// Display form of a signal description: "~3.75 ppm" → "δ 3.75",
// the way chemical shifts are written in a paper.
function displaySignal(description) {
  return description.replace(/~\s*(-?)([\d.]+)\s*ppm/g, (_, minus, num) =>
    `δ ${minus ? "−" : ""}${num}`
  );
}

// Fills in CAS number + molecular weight from the selected compound.
function applyCompoundMeta() {
  const standard = currentCompound();
  els.isCas.textContent = standard.cas || "—";
  els.isMw.value = standard.mw !== null && standard.mw !== undefined ? standard.mw : "";
  recomputeAmountLinkage();
}

/* ==========================================================================
   Mass <-> mmol linkage
   mmol = mass_mg / MW      mass_mg = mmol × MW
   Whichever field the user last edited stays authoritative; when MW
   changes (new preset, manual edit), the *other* field is recalculated
   from it.
   ========================================================================== */
function recomputeAmountLinkage() {
  const mw = readNumber(els.isMw);
  if (mw === null || mw <= 0) return; // can't convert without a valid MW

  if (lastEditedAmount === "mass") {
    const mass = readNumber(els.isMass);
    if (mass !== null) els.isMmol.value = plainNum(mass / mw);
  } else if (lastEditedAmount === "mmol") {
    const mmol = readNumber(els.isMmol);
    if (mmol !== null) els.isMass.value = plainNum(mmol * mw);
  }
}

/* ==========================================================================
   Nucleus toggle
   ========================================================================== */
function setNucleus(nucleus) {
  currentNucleus = nucleus;
  els.nucleusBtns.forEach((btn) => {
    const active = btn.dataset.nucleus === nucleus;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  document.documentElement.dataset.nucleus = nucleus;
  const symbol = nucleus === "1H" ? "¹H" : "¹⁹F";
  els.readoutTag.textContent = `${symbol} NMR 収率`;
  els.mobileTag.textContent = `${symbol} NMR 収率`;
  populateStandardSelect();
  runCalculation();
}

els.nucleusBtns.forEach((btn) => {
  btn.addEventListener("click", () => setNucleus(btn.dataset.nucleus));
});

els.isSelect.addEventListener("change", () => {
  const standard = currentCompound();
  if (standard.cas) {
    // Record this compound as most-recently-used, then re-render the
    // dropdown so the "recently used" group reflects the new order.
    // populateStandardSelect() re-selects this same compound (it becomes
    // the top recent entry) and refreshes the signal/MW fields itself.
    addToHistory(standard.cas);
    populateStandardSelect();
  } else {
    populateSignalSelect();
    applyCompoundMeta();
  }
  runCalculation();
});

els.isSignal.addEventListener("change", () => {
  applySignalToNHF();
  runCalculation();
});

els.isMw.addEventListener("input", () => {
  recomputeAmountLinkage();
  runCalculation();
});

els.isMass.addEventListener("input", () => {
  lastEditedAmount = "mass";
  recomputeAmountLinkage();
  runCalculation();
});

els.isMmol.addEventListener("input", () => {
  lastEditedAmount = "mmol";
  recomputeAmountLinkage();
  runCalculation();
});

/* ==========================================================================
   Missing / invalid inputs
   Red highlighting starts once the user has typed into any field, so a
   fresh page isn't covered in red. "入力をリセット" turns it off again.
   ========================================================================== */
let showErrors = false;

// Every field that can be highlighted.
const VALIDATED_INPUTS = [
  "isN", "isIntegral", "isMw", "isMass", "isMmol",
  "productIntegral", "productN", "theoreticalMmol", "productMw",
];

// True when the field holds text that isn't a usable number (e.g. negative).
function hasBadValue(input) {
  return input.value.trim() !== "" && readNumber(input) === null;
}

// Returns [{ els: [inputs to mark], label, optional }]
function findMissingFields() {
  const missing = [];
  const positive = (input) => {
    const v = readNumber(input);
    return v !== null && v > 0;
  };

  if (!positive(els.isN)) {
    missing.push({ els: [els.isN], label: "内部標準の H/F数" });
  }
  if (!positive(els.isIntegral)) {
    missing.push({ els: [els.isIntegral], label: "内部標準の積分値" });
  }
  if (!positive(els.isMmol)) {
    const mass = readNumber(els.isMass);
    if (mass !== null && mass > 0 && !positive(els.isMw)) {
      // Mass is there but can't be converted to mmol without a valid MW.
      missing.push({ els: [els.isMw], label: "内部標準の分子量（質量を mmol に換算するため）" });
    } else {
      missing.push({ els: [els.isMass, els.isMmol], label: "内部標準の質量または物質量" });
    }
  } else if (hasBadValue(els.isMw)) {
    missing.push({ els: [els.isMw], label: "内部標準の分子量", optional: true });
  }
  if (readNumber(els.productIntegral) === null) {
    missing.push({ els: [els.productIntegral], label: "生成物の積分値" });
  }
  if (!positive(els.productN)) {
    missing.push({ els: [els.productN], label: "生成物の H/F数" });
  }
  if (!positive(els.theoreticalMmol)) {
    missing.push({ els: [els.theoreticalMmol], label: "理論生成量" });
  }
  if (hasBadValue(els.productMw)) {
    missing.push({ els: [els.productMw], label: "生成物の分子量", optional: true });
  }
  return missing;
}

function markInvalidFields(missing) {
  const invalid = new Set();
  if (showErrors) missing.forEach((item) => item.els.forEach((el) => invalid.add(el)));

  VALIDATED_INPUTS.forEach((key) => {
    const input = els[key];
    const bad = invalid.has(input);
    input.classList.toggle("is-invalid", bad);
    input.closest(".field").classList.toggle("has-error", bad);
    if (bad) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  });
}

// Capture phase: runs before each field's own listener (which recalculates),
// so the very first keystroke already shows what is still missing.
document.querySelector(".form-panel").addEventListener(
  "input",
  (event) => {
    if (event.target.tagName === "INPUT") showErrors = true;
  },
  true
);

/* ==========================================================================
   Core calculation
   n_analyte = n_IS × (I_analyte / N_analyte) / (I_IS / N_IS)
   I_IS is user-editable (default 1.00)
   yield (%) = n_analyte / theoretical_mmol × 100
   mass_analyte (bonus) = n_analyte × MW_analyte   [if MW_analyte given]
   ========================================================================== */
function runCalculation() {
  const nIS = readNumber(els.isMmol);
  const NIS = readNumber(els.isN);
  const Ianalyte = readNumber(els.productIntegral);
  const Nanalyte = readNumber(els.productN);
  const theoretical = readNumber(els.theoreticalMmol);
  const productMw = readNumber(els.productMw);
  const IIS = readNumber(els.isIntegral);

  const missing = findMissingFields();
  markInvalidFields(missing);
  const haveAll = missing.every((item) => item.optional);

  if (!haveAll) {
    els.yieldValue.textContent = "—";
    els.yieldValue.classList.add("is-empty");
    els.mobileYield.textContent = "—";
    els.readoutStatus.classList.remove("is-live");
    els.yieldCopyBtn.disabled = true;
    const required = missing.filter((item) => !item.optional);
    els.calcSteps.innerHTML = showErrors
      ? `<div class="steps-missing">
           <p>次の項目を入力すると収率を計算します。</p>
           <ul>${required.map((item) => `<li>${item.label}</li>`).join("")}</ul>
         </div>`
      : `<p class="steps-placeholder">値を入力すると、ここに計算過程が表示されます。</p>`;
    setViz(null);
    return;
  }

  const analyteRatio = Ianalyte / Nanalyte;
  const isRatio = IIS / NIS;
  const nAnalyte = nIS * (analyteRatio / isRatio);
  const yieldPct = (nAnalyte / theoretical) * 100;

  els.yieldValue.classList.remove("is-empty");
  els.yieldValue.textContent = fmt(yieldPct, 1);
  els.mobileYield.textContent = fmt(yieldPct, 1);
  els.readoutStatus.classList.add("is-live");
  els.yieldCopyBtn.disabled = false;

  setViz({ isPerNucleus: isRatio, anPerNucleus: analyteRatio, nIS, nAnalyte });

  // Variables typeset like an equation in a paper: italic symbol + subscript.
  const v = (sym, sub) => `<i>${sym}</i><sub>${sub}</sub>`;
  const note = IIS === NIS
    ? `<div class="eq-note">※ ${v("I", "IS")} = ${v("N", "IS")}（基準シグナルを 1H/F あたり 1 に規格化）</div>`
    : IIS === 1
      ? `<div class="eq-note">※ ${v("I", "IS")} = 1（基準シグナル全体を 1 に規格化）</div>`
      : "";

  let stepsHtml = `
    <div class="eq eq-label">${v("n", "analyte")} = ${v("n", "IS")} × (${v("I", "analyte")} / ${v("N", "analyte")}) ÷ (${v("I", "IS")} / ${v("N", "IS")})</div>
    <div class="eq">= ${fmt(nIS)} × (${fmt(Ianalyte)} / ${fmt(Nanalyte, 0)}) ÷ (${fmt(IIS)} / ${fmt(NIS, 0)})</div>
    ${note}
    <div class="eq">= ${fmt(nIS)} × ${fmt(analyteRatio)} ÷ ${fmt(isRatio)}</div>
    <div class="eq eq-result">= ${fmt(nAnalyte)} mmol</div>

    <div class="eq eq-label">収率 = ${v("n", "analyte")} / ${v("n", "theo")} × 100</div>
    <div class="eq">= ${fmt(nAnalyte)} / ${fmt(theoretical)} × 100</div>
    <div class="eq eq-result">= ${fmt(yieldPct, 1)} %</div>
  `;

  if (productMw !== null && productMw > 0) {
    const massAnalyte = nAnalyte * productMw;
    stepsHtml += `
    <div class="eq eq-label">${v("m", "analyte")} = ${v("n", "analyte")} × ${v("M", "analyte")}</div>
    <div class="eq">= ${fmt(nAnalyte)} × ${fmt(productMw)}</div>
    <div class="eq eq-result">= ${fmt(massAnalyte)} mg</div>
    `;
  }

  els.calcSteps.innerHTML = stepsHtml;
}

/* ==========================================================================
   Peak figure
   Peak height ∝ integral per nucleus (I/N), i.e. proportional to the amount
   of each compound. The taller of the two is drawn at full height.
   ========================================================================== */
function setViz(data) {
  if (!data) {
    els.viz.classList.add("is-empty");
    els.vizIs.style.transform = "scaleY(0.45)";
    els.vizAn.style.transform = "scaleY(0.45)";
    els.vizIsLabel.textContent = "内部標準";
    els.vizAnLabel.textContent = "生成物";
    els.viz.setAttribute("aria-label", "内部標準と生成物の物質量比の図（未入力）");
    return;
  }

  const { isPerNucleus, anPerNucleus, nIS, nAnalyte } = data;
  const max = Math.max(isPerNucleus, anPerNucleus);
  const MIN = 0.02; // keep a visible sliver so a zero integral still reads as a peak position
  const scaleIs = max > 0 ? Math.max(isPerNucleus / max, MIN) : MIN;
  const scaleAn = max > 0 ? Math.max(anPerNucleus / max, MIN) : MIN;

  els.viz.classList.remove("is-empty");
  els.vizIs.style.transform = `scaleY(${scaleIs})`;
  els.vizAn.style.transform = `scaleY(${scaleAn})`;
  els.vizIsLabel.textContent = `内部標準 ${fmt(nIS)} mmol`;
  els.vizAnLabel.textContent = `生成物 ${fmt(nAnalyte)} mmol`;
  els.viz.setAttribute(
    "aria-label",
    `内部標準 ${fmt(nIS)} mmol、生成物 ${fmt(nAnalyte)} mmol`
  );
}

/* ==========================================================================
   Remaining input listeners
   ========================================================================== */
[els.productIntegral, els.productN, els.theoreticalMmol, els.productMw].forEach(
  (input) => input.addEventListener("input", runCalculation)
);

els.isIntegral.addEventListener("input", () => {
  iisFollowsN = false; // user override wins until the signal changes / reset
  syncIisToN();
  runCalculation();
});

// N_IS is only typed by hand for custom standards; keep I_IS linked to it.
els.isN.addEventListener("input", () => {
  syncIisToN();
  runCalculation();
});

els.yieldCopyBtn.addEventListener("click", async () => {
  if (els.yieldCopyBtn.disabled) return;
  try {
    await copyText(els.yieldValue.textContent);
    showCopyFeedback("コピーしました");
  } catch {
    showCopyFeedback("コピーできませんでした");
  }
});

els.resetBtn.addEventListener("click", () => {
  els.isMass.value = "";
  els.isMmol.value = "";
  els.productIntegral.value = "";
  els.productN.value = "";
  els.theoreticalMmol.value = "";
  els.productMw.value = "";
  lastEditedAmount = null;
  showErrors = false;
  // Use the underlying list index (0), not selectedIndex — the "recently
  // used" optgroup can reorder which <option> is visually first.
  els.isSelect.value = "0";
  populateSignalSelect();
  applyCompoundMeta();
  runCalculation();
});

/* ==========================================================================
   Init
   ========================================================================== */
applyTheme(currentTheme());
setNucleus("1H");
