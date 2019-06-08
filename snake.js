const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const ground = new Image();
ground.src = "img/ground.png";
const box = 32;
const foodImg = new Image();
foodImg.src = "img/food.png";
let dead = new Audio();
let down = new Audio();
let eat = new Audio();
let left = new Audio();
let right = new Audio();
let up = new Audio();
dead.src="audio/dead.mp3";
down.src="audio/down.mp3";
eat.src="audio/eat.mp3";
left.src="audio/left.mp3";
right.src="audio/right.mp3";
up.src="audio/up.mp3";

////
///
let snake= [];
snake[0]={
	x:9*box,
	y:10*box
} 

let food = {
	x : Math.floor(Math.random()*17+1)*box,
	y : Math.floor(Math.random()*15+3)*box
}
//
//
let score = 0;
let d;
//
document.addEventListener("keydown",direction);
function direction(event)
{

   if(event.keyCode== 65 && d!="RIGHT")
   {
      d="LEFT";
      left.play();
   }else  if(event.keyCode== 87 && d!="DOWN")
   {
    d="UP";
     up.play();
   }else  if(event.keyCode== 68 && d!="LEFT")
   {
      d="RIGHT";
       right.play();
   }else  if(event.keyCode== 83 && d!="UP")
   {
      d="DOWN";
       down.play();
   }
}


//
function draw()
{
  ctx.drawImage(ground,0,0);
  for (var i=0; i < snake.length; i++) {
  ctx.fillStyle = (i==0)?"pink":"blue";
  ctx.fillRect(snake[i].x,snake[i].y,box,box);
  ctx.strokeStyle = "red";
  ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }
  ctx.drawImage(foodImg,food.x,food.y);

//OLD 
let snakeX = snake[0].x;
let snakeY = snake[0].y;
//
//
//
if(d=="LEFT"){snakeX-= box;}
else if(d=="UP" ){snakeY-= box;}
else if(d=="RIGHT" ){snakeX+= box;}
else if(d=="DOWN"){snakeY+= box;}
//
if(snake[0].x==food.x && snake[0].y==food.y)
{
	
	score++;
	 eat.play();
	food= {
		x : Math.floor(Math.random()*17+1)*box,
	y : Math.floor(Math.random()*15+3)*box
	}
}
else
{
	snake.pop();
}
let newhead = {
	x:snakeX,
	y:snakeY
}

if(snakeX < box || snakeX > 17*box 
	|| snakeY < 3*box 
	|| snakeY > 17*box || collision(newhead,snake))
{
	clearInterval(game);
	 dead.play();
}

function collision(head,array) {
	// body...

for (var i = array.length - 1; i >= 0; i--) {
if(head.x==array[i].x && head.y==array[i].y)
{
return true;
}
}
return false;
}

snake.unshift(newhead);
//




//

ctx.fillStyle = "white";
ctx.font = "45px Changa one";
ctx.fillText(score,2*box,1.6*box);
}
//
//
let game = setInterval(draw,200);

