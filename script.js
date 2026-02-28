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

];

// ===============================

const memeImage = document.getElementById("memeImage");
const newMemeBtn = document.getElementById("newMemeBtn");

let lastIndex = -1;

function getRandomIndex() {
    if (memes.length === 0) return -1;

    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * memes.length);
    } while (memes.length > 1 && newIndex === lastIndex);

    lastIndex = newIndex;
    return newIndex;
}

function showRandomMeme() {
    const index = getRandomIndex();
    if (index === -1) return;

    // kleiner Shuffle-Effekt
    memeImage.style.opacity = 0;

    setTimeout(() => {
        memeImage.src = "memes/" + memes[index];
        memeImage.style.opacity = 1;
    }, 150);
}

newMemeBtn.addEventListener("click", showRandomMeme);

// Beim Laden direkt erstes Meme anzeigen
showRandomMeme();