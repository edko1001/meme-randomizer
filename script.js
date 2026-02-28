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

// Wie viele Klicks zurück ein Bild NICHT nochmal kommen darf:
const COOLDOWN = 30;

// Merkt sich die letzten Indizes (History)
let recent = [];

function getRandomIndexWithCooldown() {
  const n = memes.length;
  if (n === 0) return -1;

  // Wenn zu wenig Bilder da sind: Cooldown automatisch kleiner machen
  const effectiveCooldown = Math.min(COOLDOWN, n - 1);

  // Set aus gesperrten Indizes (letzte X)
  const blocked = new Set(recent.slice(-effectiveCooldown));

  // Erlaubte Kandidaten sammeln
  const candidates = [];
  for (let i = 0; i < n; i++) {
    if (!blocked.has(i)) candidates.push(i);
  }

  // Falls (theoretisch) nichts übrig bleibt, fallback: alles erlauben
  if (candidates.length === 0) {
    return Math.floor(Math.random() * n);
  }

  // Zufällig aus den erlaubten auswählen
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  return pick;
}

function showRandomMeme() {
  const index = getRandomIndexWithCooldown();
  if (index === -1) return;

  // History updaten
  recent.push(index);

  // Optional: History nicht unendlich wachsen lassen
  if (recent.length > 5000) recent = recent.slice(-2000);

  // kleiner Shuffle/Fade
  memeImage.style.opacity = 0;

  setTimeout(() => {
    memeImage.src = "memes/" + memes[index];
    memeImage.style.opacity = 1;
  }, 150);
}

newMemeBtn.addEventListener("click", showRandomMeme);
showRandomMeme();
