var warning = 20;

var start = document.getElementById("startTimer");
start.addEventListener("click", function(){
    startCountdown()
}, false);
var mins = document.getElementById("minutes");
var secs = document.getElementById("seconds");
var stop = document.getElementById("stopButton");
stop.style.visibility = "hidden";
var body = document.getElementById("body");

var opacity = 0;
body.style.backgroundColor = "rgba(255,0,0," + opacity + ")";

document.getElementById("coverButton").addEventListener("click", function(){
    var stat = document.getElementById("cover").style.visibility;
    if(stat == "visible" || stat == ""){
        document.getElementById("cover").style.visibility = "hidden";
    }
    else{
        document.getElementById("cover").style.visibility = "visible";
    }
}, false)



function startCountdown(){
    console.log("here");

    
    var maxSec = document.getElementById("maxSeconds").value;
    var minSec = document.getElementById("minSeconds").value;
    
    if(maxSec == ""){
        console.log("RETURN");
        return;
    }
    if(minSec == ""){
        console.log("RETURN");
        return;
    }
    
    start.style.visibility = "hidden";
    stop.style.visibility = "visible";

    var maxSec = parseInt(maxSec);
    var minSec = parseInt(minSec);

    console.log(maxSec);
    var time = minSec + Math.floor(Math.random() * (maxSec-minSec + 1));

 
    console.log(time);
    var minutes = 0;
    var seconds = 0;
    while(time >= 60){
        minutes++;
        time = time - 60;
    }
    seconds = time;

    console.log(minutes);
    console.log(seconds);

    if(minutes < 10){
        minutes = "0" + minutes ;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    mins.innerHTML = minutes;
    secs.innerHTML = seconds;

    countdownMin();
}

var redFlash;

function countdownMin(){
    var red = false;
    var minute = parseInt(mins.innerText);
    var seconds = parseInt(secs.innerText);
    console.log("hello");
    var cont = true;

    var x = 
        setInterval(function(){
        if(seconds == 0){
            if(minute>0){
                red = false;
                opacity = 0;
                body.style.backgroundColor = "rgba(255,0,0,0)";
                clearInterval(redFlash);
                seconds = 59;
                secs.innerHTML = seconds;
                minute--;
                if(minute < 10){
                    minute = "0" + minute;                    
                }
                mins.innerText = minute;

            }
            else{
                red = false;
                clearInterval(x);
                clearInterval(redFlash);
                
                flashLights();
            }
        }
        else{
            if(!red && seconds < warning){
                red = true;
                opacity = 0;
                startColors();
            }
            
            seconds--; 
            if(seconds < 10){
                seconds = "0" + seconds;
            }
            secs.innerHTML = seconds;
            seconds = parseInt(seconds);
        }

    }, 1000); 

    stop.addEventListener("click", function(){
        clearInterval(x)
        clearInterval(redFlash);
        start.style.visibility = "visible";
        stop.style.visibility = "hidden";
        body.style.backgroundColor = "white";
    }, false)
}

function startColors(){

    var rand = Math.random()*4 + 5;
    // var howManyTimesRand = 1/rand;

    var opacityRate = 1/rand;
    var times = warning * 1000 *opacityRate;
    console.log(rand);
    console.log(opacityRate);
    console.log(times);
    // var time = Math.random()*(16);
    redFlash = setInterval( function(){
        opacity = opacity + opacityRate; 
        body.style.backgroundColor = "rgba(255,0,0," + opacity + ")";
    }, times);
    
}

function flashLights(){
    body.style.backgroundColor = "rgba(255,0,0,1)";
    stop.click();
    alert("TIMES UP");

}