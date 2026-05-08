const cfg = JEOPARDY_CONFIG;
const completed = new Set();
let activeCat = null,
	activeVal = null;

// ── Audio instances (one per page, reused) ──
const audioQ = new Audio();
const audioA = new Audio();

// ── Helpers ──
function showPage(id) {
	document.querySelectorAll(".page").forEach((p) => p.classList.add("hidden"));
	document.getElementById(id).classList.remove("hidden");
}

function setImg(el, src) {
	if (src && src.trim()) {
		el.src = src.trim();
		el.style.display = "block";
	} else {
		el.style.display = "none";
		el.src = "";
	}
}

function fmtTime(s) {
	if (!isFinite(s)) return "0:00";
	const m = Math.floor(s / 60);
	const ss = String(Math.floor(s % 60)).padStart(2, "0");
	return `${m}:${ss}`;
}

// ── Build a player tied to an <audio> element ──
function buildPlayer(
	audio,
	playBtn,
	fillEl,
	progWrapEl,
	curEl,
	durEl,
	playerEl,
) {
	// Update progress bar
	audio.addEventListener("timeupdate", () => {
		if (!audio.duration) return;
		const pct = (audio.currentTime / audio.duration) * 100;
		fillEl.style.width = pct + "%";
		curEl.textContent = fmtTime(audio.currentTime);
	});

	// Duration ready
	audio.addEventListener("loadedmetadata", () => {
		durEl.textContent = fmtTime(audio.duration);
	});

	// Ended
	audio.addEventListener("ended", () => {
		playBtn.classList.remove("playing");
		playBtn.classList.add("ended");
		playerEl.classList.remove("playing");
	});

	// Play / Pause / Replay toggle
	playBtn.addEventListener("click", () => {
		if (audio.ended || (audio.paused && audio.currentTime === 0)) {
			audio.currentTime = 0;
			audio.play();
			playBtn.classList.remove("ended");
			playBtn.classList.add("playing");
			playerEl.classList.add("playing");
		} else if (audio.paused) {
			audio.play();
			playBtn.classList.add("playing");
			playerEl.classList.add("playing");
		} else {
			audio.pause();
			playBtn.classList.remove("playing");
			playerEl.classList.remove("playing");
		}
	});

	// Seek on progress bar click
	progWrapEl.addEventListener("click", (e) => {
		if (!audio.duration) return;
		const rect = progWrapEl.getBoundingClientRect();
		const ratio = (e.clientX - rect.left) / rect.width;
		audio.currentTime = ratio * audio.duration;
		if (audio.paused && !audio.ended) audio.play();
		playBtn.classList.remove("ended");
		playBtn.classList.add("playing");
		playerEl.classList.add("playing");
	});
}

// Wire up both players
buildPlayer(
	audioQ,
	document.getElementById("q-play-btn"),
	document.getElementById("q-prog-fill"),
	document.getElementById("q-prog-wrap"),
	document.getElementById("q-time-cur"),
	document.getElementById("q-time-dur"),
	document.getElementById("q-player"),
);
buildPlayer(
	audioA,
	document.getElementById("a-play-btn"),
	document.getElementById("a-prog-fill"),
	document.getElementById("a-prog-wrap"),
	document.getElementById("a-time-cur"),
	document.getElementById("a-time-dur"),
	document.getElementById("a-player"),
);

// Load & optionally autoplay audio
function setAudio(audio, playBtn, fillEl, curEl, durEl, playerEl, src) {
	// Reset UI
	audio.pause();
	audio.src = "";
	fillEl.style.width = "0%";
	curEl.textContent = "0:00";
	durEl.textContent = "0:00";
	playBtn.classList.remove("playing", "ended");
	playerEl.classList.remove("playing");

	if (src && src.trim()) {
		playerEl.style.display = "flex";
		audio.src = src.trim();
		audio.load();
		// Autoplay (browsers may block without prior user interaction)
		const playPromise = audio.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					playBtn.classList.add("playing");
					playerEl.classList.add("playing");
				})
				.catch(() => {
					// Autoplay blocked — user can press play manually
				});
		}
	} else {
		playerEl.style.display = "none";
	}
}

// Stop all audio
function stopAll() {
	audioQ.pause();
	audioA.pause();
	document.getElementById("q-play-btn").classList.remove("playing");
	document.getElementById("a-play-btn").classList.remove("playing");
	document.getElementById("q-player").classList.remove("playing");
	document.getElementById("a-player").classList.remove("playing");
}

// ── Build board ──
function buildBoard() {
	const board = document.getElementById("board");
	board.innerHTML = "";
	cfg.categories.forEach((cat) => {
		const c = document.createElement("div");
		c.className = "cell header";
		c.innerHTML = `<span>${cat}</span>`;
		board.appendChild(c);
	});
	cfg.values.forEach((val, vi) => {
		cfg.categories.forEach((_, ci) => {
			const key = `${ci}-${vi}`;
			const done = completed.has(key);
			const c = document.createElement("div");
			c.className = "cell value-cell" + (done ? " done" : "");
			c.innerHTML = `<span>$${val.toLocaleString()}</span>`;
			if (!done) c.addEventListener("click", () => openQuestion(ci, vi));
			board.appendChild(c);
		});
	});
}

// ── Open question page ──
function openQuestion(ci, vi) {
	activeCat = ci;
	activeVal = vi;
	const clue = cfg.clues[ci][vi];

	document.getElementById("q-cat").textContent = cfg.categories[ci];
	document.getElementById("q-val").textContent =
		`$${cfg.values[vi].toLocaleString()}`;
	document.getElementById("q-text").textContent = clue.question;

	setImg(document.getElementById("q-img"), clue.questionImg);
	setAudio(
		audioQ,
		document.getElementById("q-play-btn"),
		document.getElementById("q-prog-fill"),
		document.getElementById("q-time-cur"),
		document.getElementById("q-time-dur"),
		document.getElementById("q-player"),
		clue.questionAudio,
	);

	const t = document.getElementById("q-text");
	t.style.animation = "none";
	t.offsetHeight;
	t.style.animation = "";

	showPage("question-page");
}

// ── Open answer page ──
function openAnswer() {
	const clue = cfg.clues[activeCat][activeVal];

	document.getElementById("a-cat").textContent = cfg.categories[activeCat];
	document.getElementById("a-val").textContent =
		`$${cfg.values[activeVal].toLocaleString()}`;
	document.getElementById("a-text").textContent = clue.answer;

	setImg(document.getElementById("a-img"), clue.answerImg);
	setAudio(
		audioA,
		document.getElementById("a-play-btn"),
		document.getElementById("a-prog-fill"),
		document.getElementById("a-time-cur"),
		document.getElementById("a-time-dur"),
		document.getElementById("a-player"),
		clue.answerAudio,
	);

	// Stop question audio when going to answer
	audioQ.pause();
	document.getElementById("q-play-btn").classList.remove("playing");
	document.getElementById("q-player").classList.remove("playing");

	const t = document.getElementById("a-text");
	t.style.animation = "none";
	t.offsetHeight;
	t.style.animation = "";

	showPage("answer-page");
}

// ── Back from question (no cross) ──
function backFromQuestion() {
	stopAll();
	showPage("panel-page");
}

// ── Back from answer (mark done) ──
function backFromAnswer() {
	stopAll();
	completed.add(`${activeCat}-${activeVal}`);
	buildBoard();
	showPage("panel-page");
}

// ── Wire nav buttons ──
document
	.getElementById("q-back-btn")
	.addEventListener("click", backFromQuestion);
document.getElementById("q-reveal-btn").addEventListener("click", openAnswer);
document.getElementById("a-back-btn").addEventListener("click", backFromAnswer);

// ── Init ──
buildBoard();
