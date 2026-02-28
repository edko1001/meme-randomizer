// ===============================
// OPTION A: HIER DATEINAMEN EINTRAGEN
// ===============================

const memes = [
"1.jpg",
"2.jpg",
"3.jpg",
"4.jpg",
"5.jpg",
"6.jpg",
"7.jpg",
"8.jpg",
"9.jpg",
"10.jpg",
"11.jpg",
"12.jpg",
"13.jpg",
"14.jpg",
"15.jpg",
"16.jpg",
"17.jpg",
"18.jpg",
"19.jpg",
"20.jpg",
"21.jpg",
"22.jpg",
"23.jpg",
"24.jpg",
"25.jpg",
"26.jpg",
"27.jpg",
"28.jpg",
"29.jpg",
"30.jpg",
"31.jpg",
"32.jpg",
"33.jpg",
"34.jpg",
"35.jpg",
"36.jpg",
"37.jpg",
"38.jpg",
"39.jpg",
"40.jpg",
"41.jpg",
"42.jpg",
"43.jpg",
"44.jpg",
"45.jpg",
"46.jpg",
"47.jpg",
"48.jpg",
"49.jpg",
"50.jpg",
"51.jpg",
"52.jpg",
"53.jpg",
"54.jpg",
"55.jpg",
"56.jpg",
"57.jpg",
"58.jpg",
"59.jpg",
"60.jpg",
"61.jpg",
"62.jpg",
"63.jpg",
"64.jpg",
"65.jpg",
"66.jpg",
"67.jpg",
"68.jpg",
"69.jpg",
"70.jpg",
"71.jpg",
"72.jpg",
"73.jpg",
"74.jpg",
"75.jpg",
"76.jpg",
"77.jpg",
"78.jpg",
"79.jpg",
"80.jpg",
"81.jpg",
"82.jpg",
"83.jpg",
"84.jpg",
"85.jpg",
"86.jpg",
"87.jpg",
"88.jpg",
"89.jpg",
"90.jpg",
"91.jpg",
"92.jpg",
"93.jpg",
"94.jpg",
"95.jpg",
"96.jpg",
"97.jpg",
"98.jpg",
"99.jpg",
"100.jpg",
"101.jpg",
"102.jpg",
"103.jpg",
"104.jpg",
"105.jpg",
"106.jpg",
"107.jpg",
"108.jpg",
"109.jpg",
"110.jpg",
"111.jpg",
"112.jpg",
"113.jpg",
"114.jpg",
"115.jpg",
"116.jpg",
"117.jpg",
"118.jpg",
"119.jpg",
"120.jpg",
"121.jpg",
"122.jpg",
"123.jpg",
"124.jpg",
"125.jpg",
"126.jpg",
"127.jpg",
"128.jpg",
"129.jpg",
"130.jpg",
"131.jpg",
"132.jpg",
"133.jpg",

];

// ===============================

const memeImage = document.getElementById("memeImage");
const newMemeBtn = document.getElementById("newMemeBtn");
const prevBtn = document.getElementById("prevBtn");
const metaText = document.getElementById("metaText");

// Settings
const COOLDOWN = 30; // erst nach 30 Klicks darf ein Meme wiederkommen

// State
let recent = [];          // letzte Indizes (Cooldown)
let history = [];         // echte Anzeige-History
let historyPos = -1;      // wo wir in der History stehen

function effectiveCooldown() {
  return Math.max(0, Math.min(COOLDOWN, memes.length - 1));
}

function pickNewIndex() {
  const n = memes.length;
  if (n === 0) return -1;

  const cd = effectiveCooldown();
  const blocked = new Set(recent.slice(-cd));

  // Kandidaten = alles was nicht in den letzten cd vorkam
  const candidates = [];
  for (let i = 0; i < n; i++) if (!blocked.has(i)) candidates.push(i);

  // Fallback (sollte bei n>cd eigentlich nie leer sein)
  const pool = candidates.length ? candidates : [...Array(n).keys()];
  return pool[Math.floor(Math.random() * pool.length)];
}

function updateUI() {
  const total = memes.length;
  const shown = historyPos + 1; // position ist 0-based
  prevBtn.disabled = historyPos <= 0;

  if (historyPos >= 0 && history[historyPos] != null) {
    const file = memes[history[historyPos]];
    metaText.textContent = `${shown}/${Math.max(shown, history.length)} • ${file}`;
  } else {
    metaText.textContent = `${total} Memes`;
  }
}

function showIndex(index) {
  if (index < 0) return;

  // Mini Shuffle Effekt
  memeImage.classList.remove("show");
  setTimeout(() => {
    memeImage.src = "memes/" + memes[index];
  }, 120);
}

function pushToHistory(index) {
  // Wenn wir zurückgegangen sind und dann ein neues Meme wählen:
  // -> "Zukunft" abschneiden
  if (historyPos < history.length - 1) {
    history = history.slice(0, historyPos + 1);
  }

  history.push(index);
  historyPos = history.length - 1;
}

function nextMeme() {
  const index = pickNewIndex();
  if (index === -1) return;

  // Cooldown-History updaten
  recent.push(index);
  if (recent.length > 5000) recent = recent.slice(-2000);

  pushToHistory(index);
  showIndex(index);
  updateUI();
}

function prevMeme() {
  if (historyPos <= 0) return;
  historyPos--;
  showIndex(history[historyPos]);
  updateUI();
}

// Wenn ein Bild nicht lädt: automatisch weiter
memeImage.addEventListener("error", () => {
  nextMeme();
});

// Wenn Bild geladen: einblenden
memeImage.addEventListener("load", () => {
  memeImage.classList.add("show");
});

// Buttons
newMemeBtn.addEventListener("click", nextMeme);
prevBtn.addEventListener("click", prevMeme);

// Start
nextMeme();
