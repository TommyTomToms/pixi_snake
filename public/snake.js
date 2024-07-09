/*
resolution of 84 x 48 pixels
#c7f0d8, #43523d
#9bc700, #2b3f09
#879188, #1a1914
*/

// TODO: Mouse disappears into the borders (Look at Math random bounds)
// var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
// var randomnumber = Math.floor(Math.random() * (82 - 2 + 1)) + 2;

// var renderer = new PIXI.WebGLRenderer(800, 600, { view: myCanvas });
// let app = new PIXI.Application({width:683, height:455, antialias:true, view:myCanvas});
// document.getElementById("myCanvas").appendChild(app.view);
// <canvas id="myCanvas" width="683" height="455" style="border:8px solid #076e21; width:683; height:455;">

const lineColor = "#43523d";
const fillColor = "#c7f0d8";
const gridSize  = 8;

let snake = [ { x : 42, y : 24},
              { x : 43, y : 24},
              { x : 44, y : 24},
              { x : 45, y : 24}];

let speed = 100;

let key_down = "right";
let x_pos    = 45;
let y_pos    = 24;
let pause    = true; //Snake initialy paused

let x_mouse = Math.floor(Math.random() * (82 - 2 + 1)) + 2;
let y_mouse = Math.floor(Math.random() * (46 - 2 + 1)) + 2;

let graphics = new PIXI.Graphics();
let app = new PIXI.Application({ width: window.innerWidth , height: window.innerHeight});

//-----------------------------------------------------------------------------
// Initialize Graphics
//-----------------------------------------------------------------------------
function initialize() {

    graphics = new PIXI.Graphics();

    app.renderer.background.color = 0xFFFFFF; 

    document.body.appendChild(app.view);

    app.stage.addChild(graphics);

	//Initial Draw
	drawGrid();
	
	drawSnake(x_pos, y_pos);

	drawPixel(x_mouse,y_mouse);
}

//-----------------------------------------------------------------------------
// Draw Grid
//-----------------------------------------------------------------------------
function drawGrid() {

	graphics.clear();

	let x = 0;
	let y = 0;

	for (let i=0; i < 84; i++) {

		for(let j=0; j < 48; j++) {

			// Rectangle & Line Style
			graphics.lineStyle(1,lineColor, 1);
			graphics.beginFill(fillColor);
			graphics.drawRect(x, y, gridSize, gridSize);
			graphics.endFill();

			y = y + gridSize;

			//Draw Vertical Border 
			drawPixel(0, j);
			drawPixel(83, j);
		}

		y = 0;
		x = x + gridSize;

		//Draw Horizontal Border
		drawPixel(i,0);
		drawPixel(i,47);
	}
}

//-----------------------------------------------------------------------------
// Draw Pixel
//-----------------------------------------------------------------------------
function drawPixel(x,y) {

	x = x * gridSize;
	y = y * gridSize;

	graphics.beginFill(0x43523d);
	graphics.drawRect(x, y, gridSize, gridSize);
	graphics.endFill();
}

//-----------------------------------------------------------------------------
// Draw Snake
//-----------------------------------------------------------------------------
function drawSnake(x, y) {

	switch(key_down) {

		case "up":
			y_pos = y_pos-1;
			break;

		case "down":
			y_pos = y_pos+1;
			break;

		case "left":
			x_pos = x_pos-1;
			break;

		case "right":
			x_pos = x_pos+1;
			break;
	}

	// Check for collision with the border
	if (x_pos == 0 || y_pos == 0 || x_pos == 83 || y_pos == 47) {

		gameOver();
		return;
	}

	// Check for collision with itself
	for (var i =0; i < snake.length; i++) {

		if (x_pos == snake[i].x && y_pos == snake[i].y) {

			gameOver();
			return;
		}
	}
	
	// Check for collision with mouse
	if (x_mouse == x_pos && y_mouse == y_pos) {

		snake.push({ x : x_pos, y : y_pos});

		//New location
		x_mouse = Math.floor(Math.random() * (82 - 2 + 1)) + 2;
		y_mouse = Math.floor(Math.random() * (46 - 2 + 1)) + 2;
	}
	else {

		//Maintain Snake Size
		snake.shift();
		snake.push({ x : x_pos, y : y_pos});
	}

	for (var i=0; i < snake.length; i++) {

		drawPixel(snake[i].x, snake[i].y);
	}
}

//-----------------------------------------------------------------------------
// Game Over - Reset game
//-----------------------------------------------------------------------------
function gameOver() {

	alert("Game Over");

	//Reset Values
	snake = [ { x : 42, y : 24},
			  { x : 43, y : 24},
			  { x : 44, y : 24},
			  { x : 45, y : 24}];

	key_down = "right";
	x_pos    = 45;
	y_pos    = 24;

	x_mouse = Math.floor(Math.random() * (82 - 2 + 1)) + 2;
	y_mouse = Math.floor(Math.random() * (46 - 2 + 1)) + 2;
}

// Initialize Graphics
initialize();

//-----------------------------------------------------------------------------
// Game Loop
//-----------------------------------------------------------------------------
function gameLoop() {

	if (pause == false) {

		drawGrid();
	
		drawSnake(x_pos, y_pos);

		drawPixel(x_mouse,y_mouse);
	}
}

setInterval(gameLoop, speed);

//-----------------------------------------------------------------------------
// Key Down detection
//-----------------------------------------------------------------------------
document.onkeydown = function (e) {

	e = e || window.event;

	switch (e.key) {
	
		case "ArrowUp":

			if (key_down != "down") { key_down = "up";}

			break;

		case "ArrowDown":

			if (key_down != "up") { key_down = "down";}

			break;

		case "ArrowRight":

			if (key_down != "left") {key_down="right";}

			break;

		case "ArrowLeft":

			if(key_down != "right") {key_down="left";}

			break;

		//Pause
		case " ":

			if (pause == true) {

				pause = false;
			}
			else {

				pause = true;
			}

			break;
	}
};