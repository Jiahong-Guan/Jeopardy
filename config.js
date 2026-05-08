const JEOPARDY_CONFIG = {
	categories: [
		"VIDEO GAME HISTORY",
		"PROGRAMMING",
		"NP GEOGUESSR",
		"MRT STATIONS",
		"ARTIST AND ARTISTES",
		"FAMOUS SOUNDS",
	],
	values: [200, 400, 600, 800, 1000],

	// Each clue supports these optional media fields:
	//
	//   answerImg    	– image shown on the ANSWER page  (path or URL, or omit/"" for none)
	//   answerAudio  	– audio played on the ANSWER page (path or URL, or omit/"" for none)
	//   questionImg  	– image shown on the QUESTION page
	//   questionAudio	– audio played on the QUESTION page
	//
	// Audio files: .mp3 / .ogg / .wav all work.
	// Example path:  "audio/theme.mp3"
	// Example URL:   "https://example.com/sound.mp3"
	//
	// Audio auto-plays when the page opens AND a custom player is shown
	// so contestants can replay it. Leave the field blank or omit it for no audio.

	clues: [
		// ── VIDEO GAMES ──────────────────────────────────────────────────────────
		[
			{
				answer: "Space Invaders",
				answerImg: "images/video_games/200_a.jpg",
				question:
					"This arcade game about shooting aliens was the first to introduce multiple lives and a high score system",
			},
			{
				answer: "Doom",
				answerImg: "images/video_games/400_a.jpg",
				question:
					"This computer game is widely known for popularizing the first-person shooter genre as well as being playable on any device with a screen and processor",
			},
			{
				answer: "Sonic the Hedgehog",
				answerImg: "images/video_games/600_a.jpg",
				question:
					"This game was created through a contest to come up with a flagship series and mascot that could compete with the bestselling game franchise in the world at the time",
			},
			{
				answer: "Solitaire",
				answerImg: "images/video_games/800_a.jpg",
				question:
					"In 1990, Microsoft added this card game to its Windows operating system to help soothe users who were intimidated by the operating system",
			},
			{
				answer: "Half-Life",
				answerImg: "images/video_games/1000_aa.jpg",
				question:
					"This critically acclaimed game series, famous for its lack of a third entry, was created by an ex-Microsoft employee"
			},
		],

		// ── PROGRAMMING ──────────────────────────────────────────────────────────
		[
			{
				answer: "Bug",
				answerImg: "images/programming/200_a.png",
				question:
					"The word to describe a defect in computer software, often needing to be squashed",
			},
			{
				answer: "Java",
				answerImg: "images/programming/400_a.png",
				question:
					"This popular programming language was developed at Sun Microsystems (now owned by Oracle Corporation) and was named after a type of coffee from Indonesia",
			},
			{
				answer: "Alan Turing",
				answerImg: "images/programming/600_a.jpg",
				question:
					"He played a big role in employing computer programming to decrypt the Nazi code machine Enigma during World War II",
			},
			{
				answer: "Monty Python’s Flying Circus",
				answerImg: "images/programming/800_a.jpg",
				question: 'This British comedy show inspired the language "Python"',
			},
			{
				answer: "Creeper",
				answerImg: "images/programming/1000_a.png",
				question:
					"This is the name of the First Computer Virus, discovered on ARPANET in the early 1970s, and shares the name of a Minecraft mob",
			},
		],

		// ── NP GEOGUESSR ─────────────────────────────────────────────────────────
		[
			{
				answer: "Food Club",
				question: "",
				questionImg: "images/np_geoguessr/200_q.jpeg",
			},
			{
				answer: "Behind ICT block",
				question: "",
				questionImg: "images/np_geoguessr/400_q.jpeg",
			},
			{
				answer: "Convention Centre",
				question: "",
				questionImg: "images/np_geoguessr/600_q.jpeg",
			},
			{
				answer: "Office of Immersion and Careers Office",
				answerImg: "images/np_geoguessr/800_a.jpeg",
				question: "",
				questionImg: "images/np_geoguessr/800_q.jpeg",
			},
			{
				answer: "Makers' Academy",
				question: "",
				questionImg: "images/np_geoguessr/1000_q.jpeg",
			},
		],

		// ── MRT STATIONS ─────────────────────────────────────────────────────────
		[
			{
				answer: "East-West Line",
				answerImg: "images/mrt_stations/200_a.png",
				question: "This MRT line is the longest among the eight lines",
			},
			{
				answer: "Redhill station",
				answerImg: "images/mrt_stations/400_a.png",
				question:
					"This MRT station is related to a tale about blood-stained soil",
			},
			{
				answer: "Marina South Pier station",
				answerImg: "images/mrt_stations/800_a.png",
				question:
					"This MRT station is the least used station and serves as a pier",
			},
			{
				answer: "Hume station",
				answerImg: "images/mrt_stations/600_a.png",
				question:
					"This MRT station is one of Singapore’s newest additions to the rail network",
				
			},
			{
				answer: "Bencoolen station",
				answerImg: "images/mrt_stations/1000_a.jpg",
				question: "This MRT station is the deepest in Singapore",
			},
		],

		// ── ARTIST ARTISTES ──────────────────────────────────────────────────────
		[
			{
				answer: "Leonardo da Vinci",
				answerImg: "images/artist_artists/200_a.png",
				question:
					"This Italian Renaissance polymath painted The Last Supper, depicting Jesus and his disciples during the moment he announces a betrayal",
			},
			{
				answer: "Vincent van Gogh",
				answerImg: "images/artist_artists/400_a.jpg",
				question:
					"A Dutch Post-Impressionist artist created The Starry Night while staying at an asylum in Saint-Rémy-de-Provence?",
				questionImg: "images/artist_artists/400_q.jpg",
			},
			{
				answer: "Banksy",
				answerImg: "images/artist_artists/600_a.jpeg",
				question:
					"The anonymous England-based street artist whose work Girl with Balloon famously self-destructed via a hidden shredder in the frame right after it was sold at auction for over $1 million?",
				questionImg: "images/artist_artists/600_q.jpeg",
			},
			{
				answer: "Salvador Dalí",
				answerImg: "images/artist_artists/800_a.jpg",
				question:
					"A Spanish surrealist known for his dreamlike paintings, melting clocks, and eccentric personality",
			},
			{
				answer: "Michelangelo",
				answerImg: "images/artist_artists/1000_a.jpg",
				question:
					"The Italian Renaissance sculptor and painter who created the Sistine Chapel ceiling and the statue of David",
			},
		],

		// ── AUDIO ─────────────────────────────────────────────────────────────────
		[
			{
				answer: "Clash Royale",
				answerImg: "images/audio/200_a.jpg",
				question: "This is a game's opening sound",
				questionAudio: "images/audio/200_q.mp3",
			},
			{
				answer: "Roblox's OOF",
				answerImg: "images/audio/400_a.jpg",
				question: "The sound from a game",
				questionAudio: "images/audio/400_q.mp3",
			},
			{
				answer: "Wilhelm scream",
				answerImg: "images/audio/600_a.jpg",
				question:
					"This is an iconic sound that is used in many films and TV shows",
				questionAudio: "images/audio/600_q.mp3",
			},
			{
				answer: "Undertale",
				answerImg: "images/audio/800_a.png",
				question:
					"This indie role-playing game, widely praised by critics, features a cast of distinctive characters in an underground setting",
				questionAudio: "images/audio/800_q.mp3",
			},
			{
				answer: "Hit to be Square",
				answerImg: "images/audio/1000_a.jpg",
				question:
					"This hit song by Huey Lewis and the News celebrates fitting in and embracing mainstream culture",
				questionAudio: "images/audio/1000_q.mp3",
			},
		],
	],
};
