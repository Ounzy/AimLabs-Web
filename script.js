// canvas variables
let c = document.querySelector('#myCanvas');
let ctx = c.getContext("2d");

// variables
let xRan;                                                                       // Random position x (0-300) 
let yRan;                                                                       // Random position y (0-150) 
let xPos;                                                                       // Mouse position x
let yPos;                                                                       // Mouse position y
let radius = 5;                                                                 // circle radius    
let body = document.querySelector('#body');                                     // body 
let styles;                                                                     // body styles
let width;                                                                      // body width
let height;                                                                     // body height
let cxPos;                                                                      // canvas x position of clicked yPos 
let cyPos;                                                                      // canvas y position of clicked xPos
let xyclicked;                                                                  // clicked x + y (cxPos + cyPos)
let xyRan;                                                                      // xRan + yRan 
let xyresult;                                                                   // result xyclicked - xyRan
let counter = 0;                                                                // counter for the hitted targets (score)
let missed = 0;                                                                 // counter for missed targets
let time = true;                                                                // if false you lost 
let seconds = 31;


function getStyles(){                                                           // get body width and heigth
    styles = window.getComputedStyle(body);                                     
    width = parseFloat(styles.width);
    height = parseFloat(styles.height);
}


c.addEventListener("click", (e) => {
    xPos = parseFloat(e.clientX);                                               // Mausposition x
    yPos = parseFloat(e.clientY);                                               // Mausposition y        
    cxPos = (xPos - (width - 1000) / 2 - 8.4) / 3.3333;                         // calculating into 300px * 150px          
    cyPos = (yPos - (height - 500) / 2 - 5.5) / 3.3333;                         // bc canvas is always 300px * 150px  
    clicked();
});


function draw() {
    if (seconds > 0) {
        xRan = Math.floor(Math.random() * 300);
        yRan = Math.floor(Math.random() * 150);
        ctx.beginPath();
        ctx.color = "black";
        ctx.fillStyle = "black";
        ctx.arc(xRan, yRan, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'grey';
        ctx.stroke();
        setTimeout(deleteDraw, 1000);  
    } else {
        ctx.font = "px Verdana";      // Font Style
        ctx.textAlign = "center";       // horizontal zentriert
        ctx.textBaseline = "middle";    // vertikal zentriert
        ctx.fillText("Round finished", 150, 75);  // Text, x, y
    }
}

function deleteDraw() {
    ctx.clearRect(0, 0, c.width, c.height);
    setTimeout(draw, 100);
}

function clicked() {
    xyclicked = cxPos + cyPos;
    xyRan = xRan + yRan;
    xyresult = xyclicked - xyRan;
    console.log(xyresult);
    hit();
}

function hit() {                                                                                // hit or no hit
    if (xyresult <= 5 && xyresult >= -5) {
        counter ++;
        document.querySelector("#score").innerHTML = "Your score:" + counter;
        ctx.clearRect(0, 0, c.width, c.height);
    } else {
        missed ++;
        console.log("Missed: " + missed);
    }
}

function timer() {
    if (seconds > 0) {
        seconds = seconds - 1;
        document.querySelector("#time").innerHTML = "Remaining time:" + seconds;
    } else {
        save();
        console.log(localStorage.getItem('highscore'))
    }
}

function save() {
    if (localStorage.getItem('highscore') < counter) {
        localStorage.setItem('highscore', counter);
    } 
}

draw();
setInterval(timer, 1000);
setInterval(getStyles, 2000);

