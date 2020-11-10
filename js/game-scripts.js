var squareBox = undefined;
var circleBox = undefined;
var intervalTimeObj = undefined;
var startGameIntervalTimeObj = undefined;
var timerIntervalTimeObj = undefined;

var oneMinuteInSeconds = 60;
var score = 0;

function createSquareBox(){
    var squareBox = document.createElement("div");
    squareBox.setAttribute("class", "squareBox");
    document.getElementById("playGround").appendChild(squareBox);
    
    squareBox = document.querySelectorAll('.squareBox');

    squareBox.forEach(
        function (squareBoxArg) {
            squareBoxArg.addEventListener('click', function () {
                this.style.display = 'none';
                ++score;
                if(score < 0){
                    stopGame();
                    alert("GAME OVER!");
                } else {
                    scoreWriter();
                } 
            });
        }
    );
}

function createCircleBox(){
    var circleBox = document.createElement("div");
    circleBox.setAttribute("class", "circleBox");
    document.getElementById("playGround").appendChild(circleBox);
    
    circleBox = document.querySelectorAll('.circleBox');

    circleBox.forEach(
        function (circleBoxArg) {
            circleBoxArg.addEventListener('click', function () {
                this.style.display = 'none';
                --score;
                if(score < 0){
                    stopGame();
                    alert("Game over!");
                } else {
                    scoreWriter();
                } 
            });
        }
    );
}

document.addEventListener('DOMContentLoaded', function () {
    scoreWriter();
    timerWriter("timer");
}, false);

function sequentialCreateSquareBoxes(){
    intervalTimeObj = window.setInterval(createSquareBox, 1 * 1000);
}

function stopSequentialCreateSquareBoxes(timeVariable){
    clearInterval(timeVariable);
}

function scoreWriter(){
    document.getElementById("scoreBoard").innerHTML = score;
}

function randomlySquarePicker(){
    childNodeCleaner("playGround");
    var picker = Math.floor(Math.random() * 2);
    switch(picker){
        case 0:
            createSquareBox();
            
            break;
        case 1:
            createCircleBox();
            
            break;
    }
    window.setTimeout(setTimeoutChildNodeCleanerCaller, 0.5 * 1000);
}

function startGame(){
    startGameIntervalTimeObj = window.setInterval(randomlySquarePicker, 1 * 1000);
    timerIntervalTimeObj = window.setInterval(timer, 1 * 1000);
}

function stopGame(){
    clearInterval(startGameIntervalTimeObj);
    clearInterval(timerIntervalTimeObj);
    resetGame();
}

function resetGame(){
    score = 0;
    oneMinuteInSeconds = 60;
    
    scoreWriter();
    timerWriter("timer");

    childNodeCleaner("playGround");
}

function childNodeCleaner(parentNodeId){
    var parentNode = document.getElementById(parentNodeId);
    while(document.getElementById(parentNodeId).hasChildNodes()){
        parentNode.removeChild(parentNode.childNodes[0]);    
    }
}

function setTimeoutChildNodeCleanerCaller(){
    childNodeCleaner("playGround");
}

function timer() {
    --oneMinuteInSeconds;
    timerWriter("timer");
    if(oneMinuteInSeconds == 0){
        alert("Time is up!\nYour score: " + score);
        stopGame();
    }
}

function secondsInTwoDigits(number){
    return (number > 9) ? ("" + number) : ("0" + number);
}

function timerWriter(timerId){
    document.getElementById(timerId).innerHTML = Math.trunc(oneMinuteInSeconds / 60) + ":" + secondsInTwoDigits(oneMinuteInSeconds % 60);
}