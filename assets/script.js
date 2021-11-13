//variables
var searchBtn = $('#search-btn');
var clearBtn = $('#clear-btn');
var searchResultsList = $('#search-history');
var todaysDate = $('#todays-date');
var todaysWeather = $('#todays-weather');
var forecastDiv = $('#forecast-weather');
var cityInput= $('#city-input');
var searchedCityName = $('#city-name');
var currentWeather = $('#current-weather-list');

//empty array for weather conditions
var currentWeatherArr = [];

//key for weather api
var APIkey= "4a86dc884cb9d21f0d6c42e65cb6a739";

//search count for searched city list
var searchCount = 0;

//luxon date/time
let DateTime = luxon.DateTime;
let today = DateTime.local();
console.log(today);

function timeTracker() {
    todaysDate.text(today.toLocaleString());
    console.log(today.toLocaleString());
};


//store search data in searched city list
//TODO: fix local storage
// for (i=0; i < localStorage.length; i++) {
//     var cityName = localStorage.getItem(i);
//     searchResultsList.append("<li class = 'search-item mt-2 col-12'> + cityName + '</li'");

function displayCurrentWeather (data) {
        var cityName = ('Showing results for ' + data.name);
        var temp = ('Current Temperature: ' + data.main.temp);
        var wind = ('Wind Speeds: ' + data.wind.speed +' mph');
        var minTemp = ('Low Temperature: ' + data.main.temp_min + ' degrees');
        var maxTemp =  ('High Temperature: ' + data.main.temp_max + ' degrees');
        var vis = ('Visibility: ' +data.main.visibility + '%');
        var icon = data.weather[0].icon;
        var hum = ('Humidity: ' + data.main.humidity + '%');
        var currentWeatherArr= [cityName,temp,wind,minTemp,maxTemp,vis,icon,hum];
        currentWeatherArr.push(currentWeatherArr);
        currentWeatherDiv = document.createElement('div');
        currentWeatherDiv.append(currentWeatherArr);
        todaysWeather.append(currentWeatherDiv);
        console.log(currentWeatherArr);

//TODO: create 5 day forecast & display in new divs/cards
        };
//on click search button
searchBtn.on('click', function(event) {
    event.preventDefault();

    //get city name from input field
    var cityName = cityInput.val().trim();

    if(cityName) {
        getWeather(cityName);
        // cityInput.value = "";
    //TODO: Set city to local storage
    } else {
        alert("Please enter a city name");
    }
});


var getWeather = function (city) {

    currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial";
    console.log(currentWeatherUrl);
    
    forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial";
    
    todaysWeather.empty();
    forecastDiv.empty();

    fetch(currentWeatherUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayCurrentWeather(data);  
    });
};

timeTracker();

