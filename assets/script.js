//variables
var searchBtn = $('#search-btn');
var clearBtn = $('#clear-btn');
var searchResultsList = $('#search-history');
var todaysDate = $('#todays-date');
var todaysWeather = $('#todays-weather');
var forecastDiv = $('#forecast-weather');
var cityInput= $('#city-input');

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
for (i=0; i < localStorage.length; i++) {
    var getCity = localStorage.getItem(i);
    searchResultsList.append("<li class = 'search-item mt-2 col-12'> + getCity + '</li'");
    
};

//on click search button
searchBtn.on('click', function(event) {
    event.preventDefault();

    //get city name from input field
    var cityName = cityInput.val().trim();

    if(cityName) {
        getWeather(cityName);
        cityInput.value = "";
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

    fetch(currentWeatherUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data);
            console.log(data);
        });
    });
};

var displayWeather = function(data) {
    console.log(data);

    todaysWeather.append()

    todaysWeather.append("<h2 id='city-name'> + data.name + '("+ today +") " + "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'></h2>");

    var searchStorage = localStorage.setItem(searchCount, data.name);
    searchCount = searchCount +1;
};




timeTracker();

