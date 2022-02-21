/*
    Assignment #4
    Sanjay Anand
*/

$(function () {
    // your code here
    
    //global variable declarations
    var previousLatitude = localStorage.getItem('latitude');
    var previousLongitude = localStorage.getItem('longitude');
    var currentLatitude, currentLongitude;

    //Sequence of function calls is according to requirements.
    checkPreviousLocation();
    getCurrentLocation();
    
    getCurrentLocation();
        var myLocation = document.getElementById("locationhere");
        
        function getCurrentLocation() {
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(findPosition);
            }
            else {
                myLocation.innerHTML = "<h2> Geolocation is not supported by this browser. </h2>";
            }
        }

        function findPosition(position) {
            currentLatitude= position.coords.latitude;
            currentLongitude = position.coords.longitude;

            localStorage.setItem('latitude', currentLatitude);
            localStorage.setItem('longitude', currentLongitude);

            myLocation.innerHTML = "<h2> Latitude: " + currentLatitude + "<br/> Longitude: " + currentLongitude + " </h2>";

            var distance = document.getElementById("distance"); 
            var distanceMetres = calcDistanceBetweenPoints(currentLatitude, currentLongitude, previousLatitude, previousLongitude);

            if(distanceMetres == 0){
                distance.innerHTML = "<h4> You have not moved since last login </h4>"
            }
            else{
                distance.innerHTML = "<h4>Distance between your locations is " + Math.round(distanceMetres) +" Metres and " + Math.round(distanceMetres/1000) + " kms </h4>"
            }
        }

        function checkPreviousLocation() {

            var previousLocation = document.getElementById("previouslocation");    
            if(previousLatitude && previousLongitude){
                previousLocation.innerHTML = "<h1> Previous Latitude: " + previousLatitude + "<br/> Previous Longitude: " + previousLongitude + " </h1>";
                previousLocation.innerHTML += "<h3> Welcome back!! </h3>"
            }
            else{
                previousLocation.innerHTML += "<h3> Welcome for the first time!! </h3>"
            }
        }

       
       
    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


