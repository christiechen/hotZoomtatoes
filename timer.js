var warningDefault = 30;
var warning; 
var runOut = 0;
var count = 0;
var baseline = 5;
var imageWidthDefault = 70;
var imageWidth;


var banjo = document.getElementById("banjo");
banjo.volume = 0.3;
var mins = document.getElementById("minutes");
var secs = document.getElementById("seconds");
var pLeft = document.getElementById("potatoLeft");
var pRight = document.getElementById("potatoRight");
var stop = document.getElementById("stopButton");
stop.style.visibility = "hidden";
var body = document.getElementById("body");

var start = document.getElementById("startTimer");
start.addEventListener("click", function(){
    startCountdown();
}, false);

var opacity = 0;
// body.style.backgroundColor = "rgba(255,0,0," + opacity + ")";

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
    warning = warningDefault;    

   

    // console.log("here");
    
    var maxSec = document.getElementById("maxSeconds").value;
    var minSec = document.getElementById("minSeconds").value;
    body.style.backgroundColor = "white";

    // imageWidthDefault = 
    
    if(maxSec == ""){
        console.log("RETURN");
        stop.click();
        return;
    }
    if(minSec == ""){
        console.log("RETURN");
        stop.click();
        return;
    }


    // console.log("WARNNING" + warning);
    // console.log("MINSEC" + minSec);
    if(warning > minSec){
        warning = minSec;
    }

    //if minSec is 5 or something
    if(warning <= baseline){
        baseline = 0;
    }

    //randomize the warning level to be between the baseline and the warning level
    warning =  (Math.random() * (warning - baseline)) + baseline;

    console.log(warning);
    console.log(baseline);

    start.style.visibility = "hidden";
    stop.style.visibility = "visible";



    

    var maxSec = parseInt(maxSec);
    var minSec = parseInt(minSec);


    if(minSec > maxSec){
        console.log(minSec);
        console.log(maxSec);
        alert("Minimum seconds can not be greater than maximum seconds.");
        stop.click()
        return;
    }


    imageWidth = imageWidthDefault;
    pRight.style.width = imageWidth + "px";
    pLeft.style.width = imageWidth + "px";

    pRight.style.visibility = "visible";
    pLeft.style.visibility = "visible";



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

    banjo.play();
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
                // body.style.backgroundColor = "rgba(255,0,0,0)";
                clearInterval(redFlash);
                seconds = 59;
                secs.innerHTML = seconds;
                minute--;
                if(minute < 10){
                    minute = "0" + minute;                    
                }
                mins.innerText = minute;
                runOut = seconds;


            }
            else{
                // red = false;
                clearInterval(x);
                // clearInterval(redFlash); 
                flashLights();
            }
        }
        else{
            if(minute>0){
                red = false;
            }
            else if(!red && seconds < warning){
                console.log("starting red change")
                red = true;
                startColors();
            }
            
            seconds--; 
            if(seconds < 10){
                seconds = "0" + seconds;
            }
            secs.innerHTML = seconds;
            seconds = parseInt(seconds);
            runOut = seconds;
        }

    }, 1000); 

    stop.addEventListener("click", function(){
        clearInterval(x)
        clearInterval(redFlash);
        banjo.pause();
        start.style.visibility = "visible";
        stop.style.visibility = "hidden";
        body.style.backgroundColor = "white";
        imageWidth = imageWidthDefault;
        pRight.style.width = imageWidth + "px";
        pLeft.style.width = imageWidth + "px";
        pRight.style.visibility = "hidden";
        pLeft.style.visibility = "hidden";
    }, false)
}

function startColors(){

    // var rand = Math.random()*4 + 5;
    // var howManyTimesRand = 1/rand;

    // var opacityRate = 1/rand;
    // var times = warning * 1000 *opacityRate;
    // console.log(rand);
    // console.log(opacityRate);
    // console.log(times);
    // // var time = Math.random()*(16);
    // redFlash = setInterval( function(){
    //     opacity = opacity + opacityRate; 
    //     body.style.backgroundColor = "rgba(255,0,0," + opacity + ")";
    // }, times);
    opacity = 0;
    count = 0; 
    console.log(warning);
    var opacityChange = 0.01;
    var imageWidthChange = 10;
    redFlash = setInterval(function(){
        count++;
        opacity = opacity + opacityChange;
        imageWidth = imageWidth + imageWidthChange;

        pLeft.style.width = imageWidth + "px";
        pRight.style.width = imageWidth + "px";

        body.style.backgroundColor = "rgba(255,0,0,"+opacity+")";
        // console.log(body.style.backgroundColor);
    }, warning * opacityChange * 1000-10);
    // }, 50);
    
}

function flashLights(){
    body.style.backgroundColor = "rgba(255,0,0,1)";
    stop.click();
    alert("TIMES UP");
    // clearInterval(redFlash);
    console.log(count);

}