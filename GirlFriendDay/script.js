/* ---------- DAY / NIGHT MODE ---------- */
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark")
    ? "🌙"
    : "☀️";
});

/* ---------- MUSIC ---------- */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let musicPlaying = false;
function toggleMusic(forcePlay) {
  if (forcePlay || !musicPlaying) {
    bgMusic.play().catch(() => {});
    musicPlaying = true;
    musicToggle.textContent = "🔊";
    document.getElementById("record").classList.add("playing");
  } else {
    bgMusic.pause();
    musicPlaying = false;
    musicToggle.textContent = "🎵";
    document.getElementById("record").classList.remove("playing");
  }
}
musicToggle.addEventListener("click", () => toggleMusic());
document.getElementById("playSong").addEventListener("click", () => {
  toggleMusic(!musicPlaying);
  document.getElementById("playSong").textContent = musicPlaying
    ? "⏸ Pause our song"
    : "▶ Play our song";
});
document.getElementById("startBtn").addEventListener("click", () => {
  toggleMusic(true);
  document
    .querySelector(".note-section")
    .scrollIntoView({ behavior: "smooth" });
});

/* ---------- TYPEWRITER HELPER ---------- */
function typeText(el, text, speed = 32) {
  return new Promise((resolve) => {
    let i = 0;
    el.textContent = "";
    const t = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(t);
        resolve();
      }
    }, speed);
  });
}

/* ✏️ Intro note text */
const introMessage = `I built you this little page because words in a text bubble never feel like enough for what you mean to me. So — happy Girlfriend's Day, Babe. Scroll through this at your own pace. It's just me, being honest about how much you make my life happier. Every video call, every silly fish face, every time we just sit and stare at each other and somehow that says more than words could. This is my way of saying it back, in navy blue and lilies, because that's very much "us."`;

const introObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeText(document.getElementById("introType"), introMessage, 22);
        introObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 },
);
introObserver.observe(document.querySelector(".note-section"));

/* ---------- GALLERY ---------- */
/* ✏️ Add / edit captions here. Images should be placed as assets/img1.png, img2.png ... */
const galleryItems = [
  { img: "img1.png", caption: "your hair-day" },
  { img: "img2.png", caption: "that video call face" },
  { img: "img3.png", caption: "us" },
  { img: "img4.png", caption: "the fish face 🐟" },
  { img: "img5.png", caption: "you in a saree 😍" },
  { img: "img6.png", caption: "elegant" },
  { img: "img7.png", caption: "don't hurt me" },
  { img: "img8.png", caption: "also your eyes 👀" },
];
const galleryGrid = document.getElementById("galleryGrid");
galleryItems.forEach((item, i) => {
  const style = i % 2 === 0 ? "polaroid" : "photobooth";
  const rot = (Math.random() * 10 - 5).toFixed(1);
  const fig = document.createElement("figure");
  fig.className = style;
  fig.style.setProperty("--rot", rot + "deg");
  fig.innerHTML = `<img src="assets/${item.img}" alt="${item.caption}" onerror="this.src='';this.style.background='linear-gradient(135deg,#F3AFC2,#1B2A4A)';this.alt='add assets/${item.img}';">
                    <figcaption>${item.caption}</figcaption>`;
  galleryGrid.appendChild(fig);
});

/* ---------- REASONS (clickable cards) ---------- */
/* ✏️ Feel free to edit/add/remove — aim for 50+ */
const reasons = [
  "I don't know",
  "I really don't know, babe",
  "I'm not sure, babe",
  "Hmm... I honestly don't know ❤️",
  "No idea, babe 😅",
  "I wish I knew, sweetheart",
  "That's a tough one... I don't know",
  "I'm clueless, darling 🥺",
  "Maybe... but I really don't know",
  "Sorry babe, I don't know 🤍",
  "Your guess is as good as mine ❤️",
  "But - I LOVE YOU",
];
const reasonsGrid = document.getElementById("reasonsGrid");
reasons.forEach((r, i) => {
  const card = document.createElement("div");
  card.className = "reason-card";
  card.innerHTML = `<span class="num">#${i + 1}</span> tap`;
  card.dataset.text = r;
  card.addEventListener("click", () => {
    if (!card.classList.contains("flipped")) {
      card.classList.add("flipped");
      card.innerHTML = `<span class="num">#${i + 1}</span> ${r}`;
    }
  });
  reasonsGrid.appendChild(card);
});

/* ---------- LOVE LETTER ---------- */
/* ✏️ Edit your letter here */
const loveLetter = `My Darling,

If you're reading this, you actually scrolled all the way here — thank you for that, and for every video call, every ordinary evening you turned into something I look forward to.

I don't have some grand, poetic way of saying it, so I'll just say it straight: you make me happy. Not in a small way — in the way where a bad day gets quietly fixed the second I hear your voice.

I think about all of it — Vellore to Navi Mumbai, screens instead of rooms, and somehow it's never once felt like distance when you're the one on the other end.

— always yours`;

const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");
let letterOpened = false;
envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
  if (!letterOpened) {
    letterOpened = true;
    letterPaper.classList.add("show");
    typeText(document.getElementById("letterType"), loveLetter, 18);
  } else {
    letterPaper.classList.toggle("show");
  }
});

/* ---------- MEMORY GAME ---------- */
const symbols = ["🌸", "🦋", "🦚", "⛰️", "💙", "🌹"];
let deck = [...symbols, ...symbols]
  .map((s) => ({ s, id: Math.random() }))
  .sort(() => Math.random() - 0.5);

const memoryGrid = document.getElementById("memoryGrid");
const gameStatus = document.getElementById("gameStatus");
let flippedCards = [];
let matchedCount = 0;
let lock = false;

deck.forEach((cardData) => {
  const card = document.createElement("div");
  card.className = "mem-card";
  card.textContent = cardData.s;
  card.dataset.symbol = cardData.s;
  card.addEventListener("click", () => {
    if (
      lock ||
      card.classList.contains("flipped") ||
      card.classList.contains("matched")
    )
      return;
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      lock = true;
      const [a, b] = flippedCards;
      if (a.dataset.symbol === b.dataset.symbol) {
        a.classList.add("matched");
        b.classList.add("matched");
        matchedCount++;
        flippedCards = [];
        lock = false;
        if (matchedCount === symbols.length) {
          gameStatus.textContent = "you win, babe. obviously. 💙";
        }
      } else {
        setTimeout(() => {
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          flippedCards = [];
          lock = false;
        }, 700);
      }
    }
  });
  memoryGrid.appendChild(card);
});

/* ---------- SURPRISE + CONFETTI ---------- */
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseOverlay = document.getElementById("surpriseOverlay");
const closeSurprise = document.getElementById("closeSurprise");
const confettiCanvas = document.getElementById("confetti-canvas");
const cctx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiRunning = false;

function resizeCanvases() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  petalCanvas.width = window.innerWidth;
  petalCanvas.height = window.innerHeight;
}

function launchConfetti() {
  confettiCanvas.style.display = "block";
  confettiPieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -20 - Math.random() * confettiCanvas.height * 0.3,
    r: 4 + Math.random() * 6,
    c: ["#F3AFC2", "#1B2A4A", "#E3B857", "#3C7A73", "#FFFFFF"][
      Math.floor(Math.random() * 5)
    ],
    vy: 2 + Math.random() * 3,
    vx: -1.5 + Math.random() * 3,
    rot: Math.random() * 360,
    vr: -6 + Math.random() * 12,
  }));
  confettiRunning = true;
  let elapsed = 0;
  function frame() {
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate((p.rot * Math.PI) / 180);
      cctx.fillStyle = p.c;
      cctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      cctx.restore();
    });
    elapsed++;
    if (elapsed < 260 && confettiRunning) {
      requestAnimationFrame(frame);
    } else {
      confettiCanvas.style.display = "none";
      cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }
  frame();
}

surpriseBtn.addEventListener("click", () => {
  surpriseOverlay.classList.add("show");
  launchConfetti();
});
closeSurprise.addEventListener("click", () => {
  surpriseOverlay.classList.remove("show");
  confettiRunning = false;
});

/* ---------- FALLING PETALS (ambient canvas) ---------- */
const petalCanvas = document.getElementById("petal-canvas");
const pctx = petalCanvas.getContext("2d");
let petals = Array.from({ length: 22 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: 6 + Math.random() * 8,
  speedY: 0.4 + Math.random() * 0.8,
  speedX: Math.random() * 0.6 - 0.3,
  sway: Math.random() * 2 * Math.PI,
  emoji: Math.random() > 0.5 ? "🌸" : "🦋",
}));
function drawPetals() {
  pctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
  petals.forEach((p) => {
    p.y += p.speedY;
    p.sway += 0.02;
    p.x += p.speedX + Math.sin(p.sway) * 0.4;
    if (p.y > petalCanvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * petalCanvas.width;
    }
    if (p.x > petalCanvas.width + 20) p.x = -20;
    if (p.x < -20) p.x = petalCanvas.width + 20;
    pctx.font = `${p.r * 2}px serif`;
    pctx.globalAlpha = 0.55;
    pctx.fillText(p.emoji, p.x, p.y);
  });
  requestAnimationFrame(drawPetals);
}
resizeCanvases();
window.addEventListener("resize", resizeCanvases);
drawPetals();

/* ---------- CURSOR / TOUCH HEART TRAIL + SPARKLES ---------- */
const sparkleLayer = document.getElementById("sparkle-layer");
let lastTrail = 0;
function spawnTrailHeart(x, y) {
  const now = Date.now();
  if (now - lastTrail < 90) return;
  lastTrail = now;
  const el = document.createElement("div");
  el.className = "trail-heart";
  el.textContent = ["💙", "🌸", "🦋"][Math.floor(Math.random() * 3)];
  el.style.left = x + "px";
  el.style.top = y + "px";
  sparkleLayer.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}
window.addEventListener("mousemove", (e) =>
  spawnTrailHeart(e.clientX, e.clientY),
);
window.addEventListener(
  "touchmove",
  (e) => {
    const t = e.touches[0];
    if (t) spawnTrailHeart(t.clientX, t.clientY);
  },
  { passive: true },
);

function spawnSparkle(x, y) {
  const el = document.createElement("div");
  el.className = "sparkle";
  el.textContent = "✨";
  el.style.left = x + "px";
  el.style.top = y + "px";
  sparkleLayer.appendChild(el);
  setTimeout(() => el.remove(), 900);
}
window.addEventListener("click", (e) => spawnSparkle(e.clientX, e.clientY));
