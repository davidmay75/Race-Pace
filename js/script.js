//add going from duration to pace(duration, distance)

const durHour = document.getElementById("input-dur-hours");
const durMin = document.getElementById("input-dur-minutes");
const durSec = document.getElementById("input-dur-seconds");

const paceMin = document.getElementById("input-pace-min");
const paceSec = document.getElementById("input-pace-sec");

const presetDist = document.getElementById("presetDists");
const customDist = document.getElementById("input-distance");

const form = document.getElementById('calc-form');
const errorElement = document.getElementById('error');

//changes the distance units when pace units change
document.getElementById('pace-unit').onchange = function(){
    document.getElementById('dis-unit').value = document.getElementById('pace-unit').value;
}
//changes the pace units when distance units change
document.getElementById('dis-unit').onchange = function(){
    document.getElementById('pace-unit').value = document.getElementById('dis-unit').value;
}
//change custom dist to same as preset dist
presetDist.onchange = function(){
    customDist.value = null;
}
//resets preset dropdown when custom dist input 
customDist.oninput = function(){
    presetDist.value = "";
}
//reset form
function resetForm(){
    document.getElementById('calc-form').reset();
}

document.getElementById('button-calculate').addEventListener('click', calc);


//Button pressed
function calc(){
    //setting distance based on presets and custom dist
    //REMEMBER presets are in kilometers
    var distance = 0.0;
    if(presetDist.value === "" && customDist.value === ''){
        distance = 0.0;
        console.log("Empty preset:", distance)
    }
    else if(customDist.value == null || customDist.value === ''){
        distance = presetDist.value;
        console.log("preset:", distance)
    }
    else{
        distance = customDist.value;
        console.log("CustDist: ", distance)
    }
    console.log("FINAL DIST: ", distance);

    console.log(paceSec);

    console.log("PaceMin: ", paceMin, "PaceSec: ", paceSec);
    var paceInSeconds = ((parseInt(paceMin.value) * 60) + parseInt(paceSec.value)); //sec/mile
    console.log("PaceSec:", paceInSeconds, "seconds per mile");
    

    console.log("Duration input:", durHour.value,":", durMin.value,":", durSec.value);
    console.log("Dur In Sec",durToSec(parseInt(durHour.value), parseInt(durMin.value), parseInt(durSec.value)));



    var totalSeconds = paceInSeconds * distance;
    console.log("totSec:", totalSeconds);

    var eHour = Math.floor(totalSeconds / 3600); //expected hour finish - refactor
    var eMin = Math.floor((totalSeconds % 3600) / 60);
    var eSec = Math.floor(totalSeconds % 60);
    console.log("Expected Duration: ", eHour, ":", eMin, ":", eSec )



    //sets the hr:mn:sec of duration in HTML
    setDuration(totalSeconds);

    var hr = parseInt(durHour.value);
    var mn = parseInt(durMin.value);
    var sc = parseInt(durSec.value);

    //durToPace(durToSec(durHour.value, durMin.value, durSec.value), distance);

}

function kiloToMile(kilometers){
    return kilometers * 0.621371;
}

function mileToKilo(miles){
    return miles / 0.621371;
}


function setDuration(seconds){
    durHour.value = Math.floor(seconds / 3600);
    durMin.value = Math.floor((seconds % 3600) / 60);
    durSec.value = Math.floor(seconds % 60);
}

//dur in sec doesnt work yet
function durToPace(duration, distance){
    var perMile = duration / distance;

    paceMin.value = Math.floor((perMile % 3600) / 60) ;
    paceSec.value = Math.floor(perMile % 60);

}

function durToSec(hour, minutes, seconds){

    var totalSeconds = (hour * 3600) + (minutes * 60) + seconds;

    return totalSeconds;
}

function secToMin(seconds){
    var minutes = seconds / 60;
    console.log(minutes)
    return minutes;
}

function secToHour(seconds){
    var hours = seconds / 60 / 60;
    console.log(hours)
    return hours;
}

function minToSec(minutes){
    var seconds = minutes * 60;
    //console.log(seconds)
    return seconds;
}

/*
form.addEventListener('submit', (e) => {

    console.log('Duration', durHour.value, durMin.value, durSec.value);

    let messages = []
    if (durHour.value == null || durHour.value === ''){
        messages.push('Hour is required')
        durHour.value = 0;
    }

    if (durMin.value == null || durMin.value === ''){
        messages.push('Min is required')
        durMin.value = 0;
    }

    if (durSec.value == null || durSec.value === ''){
        messages.push('Sec is required')
        durSec.value = 0;
    }

    if (messages.length > 0){

        e.preventDefault();
        errorElement.innerText = messages.join(', ')
    }else{
        console.log("ELSE")
    }
    
})*/