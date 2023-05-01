// getting canvas and creating it
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

// initalling the score and lives variable
let score = 0;
let lives = 3;


//  defining the paddle height and paddle width
const paddleHeight = 20;
const paddleWidth = 90;
let paddleX = (canvas.width - paddleWidth) / 2;

//  defining and initialling the ball radius  and its moving variables 
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// setting the value of keyborad pressed to false
let rightPressed = false;
let leftPressed = false;

// creating and initialling the brick variables 
const brickRowCount = 7;
const brickColumnCount = 7;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 60;
const brickOffsetLeft = 200;

//  looping through row and columns and creating new bricks
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 ,status:1};
  }
}

// drawing the bricks
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if(bricks[c][r].status === 1){
      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#black";
      ctx.fill();
      ctx.closePath();
      }
    }
  }
}

// function for collision detection between ball and bricks
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score = score+2;
          if (score === (brickRowCount * brickColumnCount)*2) {
            alert("YOU WIN, CONGRATULATIONS! The score is:"+score);
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

// draw score function
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#black";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

// drawing the lives fun
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#black";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}




// adding events to  keydown and keyup
document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// function mousemove
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}


// function keydownhandler
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  // function keyuphandler
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }
  

// drawing the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    

}

// drawing the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#black";
    ctx.fill();
    ctx.closePath();
  }
  
  
// draw function which will call the ball() paddle() and bricks()
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
  collisionDetection();
  drawLives();
  x += dx;
  y += dy;
// changing the direction when ball  hits the wall
 if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
     dx = -dx;
 }
 if(y + dy < ballRadius){
    dy = -dy;
 }
//  changing the direction when ball hits the paddle
 else if(y + dy > canvas.height - ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
        dy = -dy;
    }else{
      lives--;
      if (!lives) {
        alert("GAME OVER!! YOUR SCORE IS:"+score);
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
      
    }
 }
//  moving the paddle on key board buttion right and left pressed
 if (rightPressed) {
    paddleX = Math.min(paddleX + 5,canvas.width-paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max( paddleX - 5,0);
  }
  
}
const intervel = setInterval(draw, 10);


