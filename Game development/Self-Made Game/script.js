const canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

//  Airplane height width and positions
const airplaneHeight = 50;
const airplaneWidth = 50;
let airPlaneX = canvas.width - 1095;
let airPlaneY = (canvas.height - airplaneHeight)/2;
let airPlaneImage;

let airplane = {
  x : airPlaneX,
  y : airPlaneY,
  width : airplaneWidth,
  height : airplaneHeight
}

//  the speed of airplane
let shiftAirPlane = airplaneHeight/2;

// Villan height and width
let villanArray = [];
let villanWidth = 50;
let villanHeight = 30;
let villanX = canvas.width/2;
let villanY = canvas.height/2;

let villanRow = 1;
let villanColums = 1;
let villanCount = 0;
let villanSpeed = 2;
let villanImg;

let score = 0;
let GameOver = false;



let bulletArray = [];
let bulletSpeed = 10;



window.onload = function(){
//  drawing the airplane on load of page
  airPlaneImage = new Image();
  airPlaneImage.src = "images/airplane.png";
  airPlaneImage.onload = function(){
    ctx.drawImage(airPlaneImage,airplane.x,airplane.y,airplane.width,airplane.height);
  }

 villanImg = new Image();
 villanImg.src = "images/villan.png"


// calling the create function 
createVillan();

  requestAnimationFrame(update);

   document.addEventListener('keydown',moveAirPlane);
   document.addEventListener('keyup',shootBullet)
}

function update(){
  
  if(GameOver){
    return;
  }

  // drawing the image of airplane
   ctx.clearRect(0,0,canvas.width,canvas.height);
   requestAnimationFrame(update);
   ctx.drawImage(airPlaneImage,airplane.x,airplane.y,airplane.width,airplane.height);


  //   creating villan
  for(let i=0;i<villanArray.length;i++){
    let villan = villanArray[i];
    if(villan.alive){
      villan.y += villanSpeed;
      // if villan touches the border
      if(villan.y + villanHeight >= canvas.height || villan.y <= 0){
        villanSpeed *= -1;
      //  moving villans
        for(let j=0;j<villanArray.length;j++){
             villanArray[j].x -= villanWidth;
        }
      }
      ctx.drawImage(villanImg,villan.x,villan.y,villan.width,villan.height);
      // ctx.drawImage(villanImg,villan.x+300,villan.y-20,villan.width,villan.height);
             
      if(villan.x <= airplane.x){
        GameOver = true;
        alert("game over Your score is :"+score);
      }

    }
  }

   // creating the bullet
    for(let i=0;i<bulletArray.length;i++){
    let bullet = bulletArray[i];
    bullet.x += bulletSpeed;
    ctx.fillStyle = "white";
    ctx.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);

  // collison of bullet and villan
    for(let j = 0;j<villanArray.length;j++){
      let villan = villanArray[j];
      if( bullet.used == false && villan.alive== true && collisionDetection(bullet,villan)){
        bullet.used = true;
        villan.alive = false;
        villanCount--;
        score +=  100;
      }
    }
  }

  //  creating more villan after villan are finished
  if(villanCount == 0){
    villanRow = Math.min(villanRow + 1,8); 
     villanColums = Math.min(villanColums + 1,4);
    bulletArray = [];
    villanArray = [];
    createVillan();
  }
//   score
  ctx.fillStyle = "white";
  ctx.font = "25px courier";
  ctx.fillText(score,1020,20);

}

function moveAirPlane(e){
  if(e.code == "ArrowUp" && airplane.y - shiftAirPlane >= 0){
    // alert('up key pressed');

     airplane.y -= shiftAirPlane;
  }
  else if(e.code == "ArrowDown" && airplane.y + shiftAirPlane + airplaneHeight <= canvas.height){
    // console.log(airPlaneY+airPlaneMove);
    // alert('down key pressssed');
    airplane.y += shiftAirPlane;
  }
}

function createVillan(){
  for(let i = 0;i<villanColums;i++){
    for(let j = 0;j<villanRow;j++){
      let villan = {
        x : villanX + i*villanWidth+40,
        y : villanY + j*villanHeight,
        width: villanWidth,
        height: villanHeight,
        alive: true
      }
      villanArray.push(villan);

    }

  }
  villanCount = villanArray.length;
  // console.log(villanCount);
}



function shootBullet(e){
      if(e.code == "Space"){
        // alert('space');
        let bullet ={
          x : airplane.x,
          y : airplane.y  + airplaneHeight*15/32,
          width : 15,
          height : 2,
          used : false
        }
        bulletArray.push(bullet);
        
      }
}

function collisionDetection(a,b){
  // alert('colision');
  return a.x < b.x + b.width && 
         a.x +  a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;

}




