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
    //if miles then convert kiloToMile
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
        distance = parseFloat(presetDist.value);
        console.log("preset:", distance)
    }
    else{
        distance = parseFloat(customDist.value);
        console.log("CustDist: ", distance)
    }
    console.log("FINAL DIST: ", distance);
 
    // GET PACE
    if(paceMin.value == ""){
        paceMin.value = 0;
    }
    if(paceSec.value == ""){
        paceSec.value = 0;
    }
    console.log("PaceMin: ", paceMin, "PaceSec: ", paceSec);
    var paceInSeconds = ((parseInt(paceMin.value) * 60) + parseInt(paceSec.value)); //sec/mile
    console.log("PaceSec:", paceInSeconds, "seconds per mile");

    // GET DURATION
    if(durHour.value == ""){
        durHour.value = 0;
    }
    if(durMin.value == ""){
        durMin.value = 0;
    }
    if(durSec.value == ""){
        durSec.value = 0;
    }
    console.log("Duration input:", durHour.value,":", durMin.value,":", durSec.value);
    var durInSec = durToSec(parseInt(durHour.value), parseInt(durMin.value), parseInt(durSec.value))
    console.log("Dur In Sec", durInSec);

    // Checking which fields have values to decide what operation to perform
    if(distance === 0 && durInSec != 0 && paceInSeconds != 0){
        console.log("DISTANCE 0 CASE")
        //calculate Distance based on Pace and Duration
        customDist.value = calcDistance(durInSec, paceInSeconds);
    }
    else if(durInSec == 0 && paceInSeconds !=0 && distance != 0){
        //Calculate total duration from pace and distance
        console.log("Calculate total duration from pace and distance")

        var totalSeconds = paceInSeconds * distance;
        console.log("totSec:", totalSeconds);
    
        var eHour = Math.floor(totalSeconds / 3600); //can make a function
        var eMin = Math.floor((totalSeconds % 3600) / 60);
        var eSec = Math.floor(totalSeconds % 60);
        console.log("Expected Duration: ", eHour, ":", eMin, ":", eSec )
        //sets the hr:mn:sec of duration in HTML
        setDuration(totalSeconds);
    }
    else if(paceInSeconds == 0 && durInSec != 0 && distance != 0){
        //Calculate pace from distance and duration
        console.log("Calculate pace from distance and duration")
        durToPace(durInSec, distance);
    }
    else{
        console.log("ELSE CASE ERROR: NOT ENOUGH INFO")
        document.getElementById("error").innerHTML = "ERROR: NOT ENOUGH INFO";
    }
}//End calc

function durToPace(duration, distance){
    var perMile = duration / distance;
    paceMin.value = Math.floor((perMile % 3600) / 60) ;
    paceSec.value = Math.floor(perMile % 60);
}

function calcDistance(duration, pace){
    console.log( "DISTANCE: " , duration/pace , "Miles") ;
    return duration/pace;
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
