// Ionic Starter App
//import modeTP from './buttonscripts.js'
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var Latitude = 0;
var Longitude = 0;
var watchID;
var marker;
var database;
var user;
var app = angular.module('tracker', ['ionic'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


  });
})

app.controller('MapController', function($scope, $ionicLoading) {
  google.maps.event.addDomListener(window, 'load', function() {
    user = prompt("Username");
    database = firebase.database();
    getMapLocation();

    $('#start').click(function(){
      console.log("Start");
      watchID = watchMapPosition();
    });
    $('#stop').click(function(){
      console.log("Attemping stop");
      if(typeof watchID !== "undefined"){
        console.log("Stopped");
        navigator.geolocation.clearWatch(watchID);
      };
    })
  })
});

// Get geo coordinates

function getMapLocation() {

  navigator.geolocation.getCurrentPosition
  (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

  Latitude = position.coords.latitude;
  Longitude = position.coords.longitude;

  getMap(Latitude, Longitude);

}

function getMap(latitude, longitude) {

  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);


  var latLong = new google.maps.LatLng(latitude, longitude);

  marker = new google.maps.Marker({
    position: latLong
  });

  marker.setMap(map);
  map.setCenter(marker.getPosition());
}


function watchMapPosition() {

  return navigator.geolocation.watchPosition
  (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });

}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {
  console.log('Latitude: '          + position.coords.latitude          + '\n' +
  'Longitude: '         + position.coords.longitude         + '\n' +
  'Altitude: '          + position.coords.altitude          + '\n' +
  'Accuracy: '          + position.coords.accuracy          + '\n' +
  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
  'Heading: '           + position.coords.heading           + '\n' +
  'Speed: '             + position.coords.speed             + '\n' +
  'Timestamp: '         + position.timestamp                + '\n');

  var updatedLatitude = position.coords.latitude;
  var updatedLongitude = position.coords.longitude;

  if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
    if(isNaN(position.coords.speed)){
      Speed = 0;
    }
    else{
      Speed = position.coords.speed;
    }
    database.ref(user + "/Transportation/" + modeTP + "/Timestamp/"+ position.timestamp).update({"Latitude":position.coords.latitude,
    "Longitude":position.coords.longitude});
    Latitude = updatedLatitude;
    Longitude = updatedLongitude;
    var latLong = new google.maps.LatLng(Latitude, Longitude);

    marker.setPosition(latLong);
    map.setCenter(marker.getPosition());
  }


}

// Error callback

function onMapError(error) {
  console.log('code: ' + error.code + '\n' +
  'message: ' + error.message + '\n');
}
