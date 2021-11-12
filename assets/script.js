//variables
var searchBtn = $('#search-btn');
var clearBtn = $('#clear-btn');
var searchResultsList = $('#search-history');
var todaysDate = $('#todays-date');
var todaysWeather = $('#todays-weather');
var forecastDiv = $('#forecast-weather');
var cityInput= $('#city-input');
var searchedCityName = $('#city-name');

//luxon date/time
let DateTime = luxon.DateTime;
let today = DateTime.local();
console.log(today);

function timeTracker() {
    todaysDate.text(today.toLocaleString());
    console.log(today.toLocaleString());
};

var APIkey= "4a86dc884cb9d21f0d6c42e65cb6a739";

//search count for searched city list
var searchCount = 0;

//store search data in searched city list
//TODO: fix local storage
for (i=0; i < localStorage.length; i++) {
    var cityName = localStorage.getItem(i);
    searchResultsList.append("<li class = 'search-item mt-2 col-12'> + cityName + '</li'");
    
};

//on click search button
searchBtn.on('click', function(event) {
    event.preventDefault();

    //get city name from input field
    var cityName = cityInput.val().trim();

    if(cityName) {
        getWeather(cityName);
        cityInput.value = "";
        cityName.localStorage.setItem(cityName)
    } else {
        alert("Please enter a city name");
    }
});

var displayWeather = function(data) {

    fetch(currentWeatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var cityName = data.name;
        var curHum = data.main.humidity;
        var curTemp = data.main.temp;
        var curMinTemp = data.main.temp_min;
        var curMaxTemp = data.main.temp_max;
        var curVis = data.sys.visibility;
        var curWind = data.wind.speed
        var curIcon = data.weather[0].icon;

//TODO: Append this data to current-weather-list

    });
};
var getWeather = function (city) {

    currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial";
    console.log(currentWeatherUrl);
    
    forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial";
    
    todaysWeather.empty();
    forecastDiv.empty();

    displayWeather();
};


        // response.json().then(function(data) {
        //     displayWeather(data);
        //     console.log(data);
        // });
    // });
    // var searchStorage = localStorage.setItem(searchCount, data.name);
    // searchCount = searchCount +1;


// var displayWeather = function(data) {
//     console.log(data.name);

//     // todaysWeather.append("<h2 id='city-name'> + data.name + '("+ today +") " + "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'></h2>");

//     var searchStorage = localStorage.setItem(searchCount, data.name);
//     searchCount = searchCount +1;
// };




timeTracker();

