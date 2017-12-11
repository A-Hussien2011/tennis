var canvas;
var canvasCon;
var x = 50;
var ballx,bally,racket1y,racket2y;
var speedx = 2;
var speedy = 0;
var speedR = 0;
var score1 = 0 , score2 = 0;
var centerR1,centerR2;
window.onload = function(){
    document.onmousemove = handlemove;
    canvas = document.getElementById("gameCanvas");
    canvasCon = canvas.getContext("2d");
    ballx = canvas.width/2;
    bally = canvas.height/2;
    racket1y = 250;
    racket2y = 250;
    increaseInY = 0;
    setInterval( game , 1000/200);
    
}

function handlemove(event){
    racket1y = event.clientY;
}

function game(){
    move();
    draw();
    
}

function reset(){
    racket1y = canvas.height/2 -50;
    racket2y = canvas.height/2 -50;
    speedy = 0;
    ballx = canvas.width/2;
    bally = canvas.height/2;
}

function move(){
//ball
    centerR1 = racket1y + 50 ; //center of racket1
    centerR2 = racket2y + 50 ; //center of racket1
    ballx = ballx + speedx;
    bally = bally + speedy;
    racket2y = racket2y + speedR;
    console.log(racket2y);
    if(ballx == 10){
        speedx = speedx * -1;
        if(bally < racket1y || bally > racket1y + 100 ){
            score2 ++;
            reset();
        }
        else{
            if(bally > centerR1){
                speedy = 2 + 2 * ( ( bally - centerR1 ) % 2 );
            } else {
                speedy = -2 - 2 * ( ( centerR1 - bally ) % 2 );
            }
        }
    }
    else if(ballx == canvas.width - 10 ){
        speedx = speedx * -1;
        if(bally < racket2y || bally > racket2y + 100 ){
            score1 ++;
            reset();
        }
    }
    if(bally == canvas.height || bally == 0){
        speedy *= -1;
    }

//computer racket
    if(bally > centerR2 ){
        speedR = 3;
    } else if(bally < centerR2){
        speedR = -3;
    } else{
        speedR = 0;
    }
}

function draw(){
//background
    canvasCon.fillStyle = "black";
    canvasCon.fillRect(0,0,800,600);
//score
    canvasCon.font = "30px arial"
    canvasCon.fillStyle = "green";
    canvasCon.fillText(score1 , canvas.width/2 -37 , 50);
    canvasCon.fillText(score2 , canvas.width/2 +20 , 50);
//rackets
    canvasCon.fillStyle = "blue";
    //racketmouse
    canvasCon.fillRect(0,racket1y,10,100);
    //racketcomp
    canvasCon.fillRect(canvas.width-10,racket2y,10,100);
//net
    canvasCon.beginPath();
    canvasCon.setLineDash([10,10]);
    canvasCon.moveTo(canvas.width/2, 0);
    canvasCon.lineTo(canvas.width/2, canvas.height);
    canvasCon.strokeStyle = "yellow";
    canvasCon.stroke();
//ball
    canvasCon.beginPath();
    canvasCon.ellipse(window.ballx, window.bally, 8, 8,   0, 0, 2 * Math.PI);
    canvasCon.fillStyle = "red";
    canvasCon.fill();
    
    
}