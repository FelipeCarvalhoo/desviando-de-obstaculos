const gameContainer = document.getElementById('game-container');
const car = document.getElementById('car');

let isMovingLeft = false;
let isMovingRight = false;
let isGameOver = false;

let carLeft = 175;
let carBottom = 0;

let obstacleInterval;
let rotaryInterval;

function moveLeft() {
	isMovingLeft = true;
}

function moveRight() {
	isMovingRight = true;
}

function stopMoveLeft() {
	isMovingLeft = false;
}

function stopMoveRight() {
	isMovingRight = false;
}

function moveCar() {
	if (isMovingLeft && carLeft > 0) {
		carLeft -= 5;
	}

	if (isMovingRight && carLeft < 350) {
		carLeft += 5;
	}

	car.style.left = carLeft + 'px';
}

function createObstacle() {
	const obstacle = document.createElement('div');
	obstacle.classList.add('obstacle');
	obstacle.style.left = Math.random() * 350 + 'px';
	gameContainer.appendChild(obstacle);

	moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
	let obstacleBottom = 600;

	const obstacleInterval = setInterval(() => {
		if (isGameOver) {
			clearInterval(obstacleInterval);
			return;
		}

		obstacleBottom -= 5;
		obstacle.style.bottom = obstacleBottom + 'px';

		if (obstacleBottom <= 0) {
			clearInterval(obstacleInterval);
			gameContainer.removeChild(obstacle);
		} else if (
			obstacleBottom <= carBottom + 80 &&
			obstacleBottom >= carBottom &&
			obstacle.style.left >= carLeft &&
			obstacle.style.left <= carLeft + 50
		) {
			gameOver();
			clearInterval(obstacleInterval);
			return;
		}
	}, 20);
}

function createRotaries() {
	const rotary1 = document.createElement('div');
	rotary1.classList.add('rotary');
	rotary1.classList.add('rotary-1');
	gameContainer.appendChild(rotary1);

	const rotary2 = document.createElement('div');
	rotary2.classList.add('rotary');
	rotary2.classList.add('rotary-2');
	gameContainer.appendChild(rotary2);

	const rotary3 = document.createElement('div');
	rotary3.classList.add('rotary');
	rotary3.classList.add('rotary-3');
	gameContainer.appendChild(rotary3);

	moveRotaries(rotary1, rotary2, rotary3);
}

function moveRotaries(rotary1, rotary2, rotary3) {
	let degree = 0;

	const rotaryInterval = setInterval(() => {
		if (isGameOver) {
			clearInterval(rotaryInterval);
			return;
		}

		degree += 1;
		rotary1.style.transform = `rotate(${degree}deg)`;
		rotary2.style.transform = `rotate(${degree * -1}deg)`;
		rotary3.style.transform = `rotate(${degree}deg)`;
	}, 20);
}

function gameOver() {
	isGameOver = true;
	clearInterval(obstacleInterval);
	clearInterval(rotaryInterval);
	alert('Game Over!');
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowLeft') {
		moveLeft();
	} else if (event.key === 'ArrowRight') {
		moveRight();
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowLeft') {
		stopMoveLeft();
	} else if (event.key === 'ArrowRight') {
		stopMoveRight();
	}
});

createRotaries();
obstacleInterval = setInterval(createObstacle, 2000);
setInterval(moveCar, 20);