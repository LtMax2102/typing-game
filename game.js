console.log("Connected");



let canvas = document.createElement("canvas")
let ctx = canvas.getContext('2d');

canvas.style.background = 'black'
canvas.width = '1000';
canvas.height = '450';

// document.querySelector('body').appendChild(canvas);


const key_down_handler = (e) => {
	if (e.keyCode == 8) {
		kp = 'back';
	}
	else {
		kp = String.fromCharCode(e.keyCode).toLowerCase();
	}
}

document.addEventListener('keydown', key_down_handler);

const start_game = () => {
	document.querySelector('body').innerHTML = "";
	document.querySelector('body').appendChild(canvas);
	requestAnimationFrame(draw)
	started = true;
}

document.querySelector('button').addEventListener("click", start_game);

let kp; // key pressed
let word_list = ["cats", "dogs", "lights", "men"];
let words_beat = 0;
let scroll_speed = 2;
let cur_word;
let focus = 0;
let started = false;


class word {
	constructor(characters, x_pos, y_pos) {
		this.characters = characters;
		this.x_pos = x_pos;
		this.y_pos = y_pos;
		this.cor_char = 0;
		this.dead = false;
	}

	draw() {
		ctx.font = '20px Arial';
		let p;
		p = this.x_pos;

		if (!this.dead) {
			for (let i = 0; i < this.characters.length; i++) {
				if (i < this.cor_char) ctx.fillStyle = "green";
				else ctx.fillStyle = "white";
				ctx.fillText(this.characters[i], this.x_pos, this.y_pos);
				this.x_pos += ctx.measureText(this.characters[i]).width;
			}			
			this.x_pos = p;
		}
		else {
			this.x_pos = -50;
			this.y_pos = Math.random() * (canvas.height - 30) + 30;
			this.dead = false;
			this.cor_char = 0;
		}



		
		
	}

	handle_input(key) {
		console.log(key);

		console.log(this.cor_char, this.characters.length);

		if (this.cor_char == 0) {
			if (this.characters[0] == key) this.cor_char++;	
		} 
		else {
			console.log("COR", this.characters[this.cor_char])
			if (this.characters[this.cor_char] == key) this.cor_char++;
		}
	}
}


let words = []

const main_menu = () => {

	words.push(new word("Start", 499, 200));

	words.foreac
}




for (let i = 0; i < word_list.length; i++) { words.push(new word(word_list[i], -50, (Math.random() * (canvas.height - 30) + 30 ))) }

cur_word = words[focus].characters;

let p = 0;

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	if (started) {
		ctx.font = '20px Arial';
		ctx.fillStyle = "white";
		ctx.fillText("Words Beaten: " + words_beat, 5, 20);
		for (let i = 0; i < words.length; i++) {
			words[i].draw();
			words[i].x_pos += scroll_speed;
		}
	}

	if (kp) {
		words[focus].handle_input(kp);

		if (kp == ' ') {
			if (words[focus].cor_char == words[focus].characters.length) {
				words[focus].dead = true;
				words_beat++;
				focus++;

				// just for now
				if (focus == words.length) focus = 0;
			}
		}

		kp = null;
	}

	requestAnimationFrame(draw)
}

// main_menu();

// for (let x of words) {
// 	x.draw();
// 