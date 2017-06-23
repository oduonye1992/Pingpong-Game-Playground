var canvas;
var canvasContext;
var ballX = 50;
var ballY = 100;
var ballSpeedX = 5;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
window.onload = function(){
    canvas = document.getElementById('game-canvas');
    canvasContext = canvas.getContext('2d');
    var framePerSecond = 60;
    setInterval(callBoth, 1000/framePerSecond);
    canvas.addEventListener('mousemove', function(evt){
        var mousePosition= calculateMousePosition(evt);
        paddle1Y = mousePosition.y;
    })
};
function calculateMousePosition(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x : mouseX,
        y : mouseY
    }
}
function callBoth(){
    moveEverything();
    drawEverything();
}
function computerMovement(){
    var paddle2YCenter = paddle2Y +  PADDLE_HEIGHT/2;
    if (paddle2YCenter < ballY - 35){
        paddle2Y += 4;
    } else if(paddle2YCenter > ballY + 35) {
        paddle2Y -= 4 ;
    }
}
function moveEverything(){
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX >= canvas.width){
        if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballX <= 0) {
        if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballY >= canvas.height){
        ballSpeedY = -ballSpeedY;
    }
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }
}
function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    paddle1Y = 250;
    paddle2Y = 250;
}
function drawEverything(){
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawRect(0,paddle1Y-PADDLE_HEIGHT/2, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); // left player
    drawRect(canvas.width-PADDLE_THICKNESS,paddle2Y-PADDLE_HEIGHT/2, PADDLE_THICKNESS, PADDLE_HEIGHT, 'blue'); // right player
    // Draw the ball
    canvasContext.fillStyle = 'white';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    canvasContext.fill();
    canvasContext.fillText('Score Stuff');
}
function drawRect(leftX, topY, width, height, color ){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX,topY, width, height);
}