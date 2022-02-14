const data = {

    gameOn: false,
    timeout: undefined,
    sounds: [],

    strict: false,
    playerCanPlay: false,
    score: 0,
    gameSequence: [],
    playerSequence: []

};

const gui = {
    pads: document.querySelector('.game__pad'),
    counter: document.querySelector('.gui__counter'),
    playGame: document.querySelector('.playgame'),
    on: document.querySelector('.play__btn'),
    led: document.querySelector('.gui__led'),
    strict: document.querySelector('.gui__btn--strict'),
    start: document.querySelector('.gui__btn--start'),


}


const soundUrls = [

    "audio/simonSound1.mp3",
    "audio/simonSound2.mp3",
    "audio/simonSound3.mp3",
    "audio/simonSound4.mp3"

];

soundUrls.forEach((sound) => {

    const audio = new Audio(sound);
    data.sounds.push(audio);

});


gui.playGame.addEventListener('click', () => {

    data.gameOn = gui.playGame.style.display = "none";
    gui.counter.classList.toggle("gui__counter--on");
    gui.counter.innertext = '--';

    data.strict = false;
    data.playerCanPlay = false;
    data.score = 0;
    data.gameSequence = [];
    data.playerSequence = [];


});


gui.strict.addEventListener('click', () => {

    gui.led.classList.toggle('gui__led--active');


});


gui.start.addEventListener('click', () => {

    startGame();

});



const startGame = () => {

    blick('--', () => {
        newColor();
        playSequence();
    })


}

const setScore = () => {

    const score = data.score.toString();
    const display = "00".substring(0, 2 - score.length);
    gui.counter.innerHTML = display;



}


const newColor = () => {

    data.gameSequence.push(Math.floor(Math.random() * 4));
    data.score++;
    setScore();
}

const playSequence = () => {
	let counter = 0,
		padOn = true;

	data.playerSequence = [];
	data.playerCanPlay = false;

	const interval = setInterval(() => {

		if (padOn) {
			if (counter === data.gameSequence.length) {
				clearInterval(interval);
				disablePads();
				data.playerCanPlay = true;
				return;
			}

			const sndId = data.gameSequence[counter];
			const pad = gui.pads[sndId];

			data.sounds[sndId].play();
			pad.classList.add("game__pad--active");
			counter++;
		}
		else {
			disablePads();
		}

		padOn = !padOn;
	}, 750);
}



const blick = (text, callback) => {

    let counter = 0;
    on = true;

    gui.counter.innerHTML = text;

    const interval = setInterval(() => {

        if (on) {

            gui.counter.classList.remove("gui__counter--on");

        } else {
            gui.counter.classList.add('gui__counter--on')

            if (++counter === 3) {
                clearInterval(interval);
                callback();
            }
        }
        on = !on;

    }, 250);


}


const disablePads = () => {
    gui.pads.forEach(pad => {
        pad.classList.remove(".game__pad--active");
    });
}