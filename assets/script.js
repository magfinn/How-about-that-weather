//variables
var searchBtn = $('#search-btn');
var searchResultsList = $('#search-history');
var todaysDate = $('#todays-date');
var todaysWeather = $('#todays-weather');
var forecastDiv = $('#forecast-weather');
var cityInput= $('#city-input');
var searchedCityName = $('#city-name');
var currentWeather = $('#current-weather-list');

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

var displaySearches = function(){
    searchResultsList.empty();

    // for loop to persit the search data into the search history
    for (var i=0; i<localStorage.length; i++) {
        var getCity = JSON.parse(localStorage.getItem(i));
        searchResultsList.append("<p id='clickItem' class='search-item mt-2 col-12'>" + getCity + "</p>");  
    }
};

$("#search-history").on("click", "p", (function() {
    var searchedCity = $(this).text().trim();

    //pass the city name to getWeatherData
    getWeather(searchedCity);
}));


var getWeather = function (city) {

    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial";
    console.log(currentWeatherUrl);
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial";
    console.log(forecastUrl);
    
    todaysWeather.empty();
    forecastDiv.empty();

    fetch(currentWeatherUrl)
    .then(response => {
        if(response.ok) {
            response.json()
            .then(function(data){
                displayWeather(data);
                console.log(data);
            });
        } else {
            alert('Please enter a valid city');
        }
    })
    .catch(function(error){
        alert('error alert');
    });
    fetch(forecastUrl)
    .then(response=> {
        if(response.ok) {
            response.json()
            .then(function(forecastData) {
                displayForecast(forecastData);
                console.log(forecastData);
            });
        } else {
            alert('Check spelling and try again');
            todaysWeather.removeClass();
        }
    })
    .catch(function(error) {
        alert('there is a technical glitch. Try again later!');
    });
};

function displayWeather (data) {
    localStorage.setItem(searchCount, JSON.stringify(data.name));
    searchCount = searchCount + 1;
    displaySearches();

    todaysWeather.append("<h2 class='city-name'>" + data.name + "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'></h2>");
    todaysWeather.append("<p class='displayMain'>Temp: " + data.main.temp + " °F");
    todaysWeather.append("<p class = displayMain'>High: " + data.main.temp_max + "°F");
    todaysWeather.append("<p class = 'displayMain'>Low: " + data.main.temp_min + "°F");
    todaysWeather.append("<p class='displayMain'>Wind: " + data.wind.speed + " MPH");
    todaysWeather.append("<p class='displayMain'>Humidity: " + data.main.humidity + " %");

    var uVIndexUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + APIkey;
    fetch(uVIndexUrl)
    .then(response => {
        response.json()
        .then(data => {
            if (data.current.uvi < 3) {
                todaysWeather.append("<p class='displayMain'>UV Index: " + "<span class = 'badge badge-success'>" + data.current.uvi + "</span>")
            } else if (data.current.uvi >= 3 && data.current.uvi < 6 ) {
                todaysWeather.append("<p class='displayMain'>UV Index: " + "<span class = 'badge badge-warning'>" + data.current.uvi + "</span>")
            } else if (data.current.uvi > 6) {
                todaysWeather.append("<p class='displayMain'>UV Index: " + "<span class = 'badge badge-danger'>" + data.current.uvi + "</span>");
            };
        });
    });
};

displayForecast = function(forecastData) {
    console.log(forecastData);

    var day1 = today.plus({ days: 1 }).toLocaleString();
    var day2 = today.plus({ days: 2 }).toLocaleString();
    var day3 = today.plus({ days: 3 }).toLocaleString();
    var day4 = today.plus({ days: 4 }).toLocaleString();
    var day5 = today.plus({ days: 5 }).toLocaleString();

    var forecastTitle = document.createElement('h3');
    forecastTitle.append("<h3 class = 'mb-1'>5-Day Forecast:</h3>"); 
    
    
    //day1
    forecastDiv.append("<div id='cardDiv' class='card'>" + 
    "<h4 class='mt-1'>" +  day1 + "</h4>" +
    "<img class = 'forecastIcon' src='https://openweathermap.org/img/wn/" + forecastData.list[0].weather[0].icon + "@2x.png'>" + 
    "<p class='forecastP'> Temp: " + forecastData.list[0].main.temp + " °F</p>" +
    "<p class='forecastP'> Wind: " + forecastData.list[0].wind.speed + " MPH</p>" +
    "<p class='forecastP'> Humidity: " + forecastData.list[0].main.humidity + " %</p>" +
    "</div>");   

    //day2
    forecastDiv.append("<div id='cardDiv' class='card'>" + 
    "<h4 class='mt-1'>" +  day2 + "</h4>" +
    "<img class = 'forecastIcon' src='https://openweathermap.org/img/wn/" + forecastData.list[1].weather[0].icon + "@2x.png'>" + 
    "<p class='forecastP'> Temp: " + forecastData.list[1].main.temp + " °F</p>" +
    "<p class='forecastP'> Wind: " + forecastData.list[1].wind.speed + " MPH</p>" +
    "<p class='forecastP'> Humidity: " + forecastData.list[1].main.humidity + " %</p>" +
    "</div>");   

    //day3
    forecastDiv.append("<div id='cardDiv' class='card'>" + 
    "<h4 class='mt-1'>" +  day3 + "</h4>" +
    "<img class = 'forecastIcon' src='https://openweathermap.org/img/wn/" + forecastData.list[2].weather[0].icon + "@2x.png'>" + 
    "<p class='forecastP'> Temp: " + forecastData.list[2].main.temp + " °F</p>" +
    "<p class='forecastP'> Wind: " + forecastData.list[2].wind.speed + " MPH</p>" +
    "<p class='forecastP'> Humidity: " + forecastData.list[2].main.humidity + " %</p>" +
    "</div>");   

    //day4
    forecastDiv.append("<div id='cardDiv' class='card'>" + 
    "<h4 class='mt-1'>" +  day4 + "</h4>" +
    "<img class = 'forecastIcon' src='https://openweathermap.org/img/wn/" + forecastData.list[3].weather[0].icon + "@2x.png'>" + 
    "<p class='forecastP'> Temp: " + forecastData.list[3].main.temp + " °F</p>" +
    "<p class='forecastP'> Wind: " + forecastData.list[3].wind.speed + " MPH</p>" +
    "<p class='forecastP'> Humidity: " + forecastData.list[3].main.humidity + " %</p>" +
    "</div>"); 

    //day5
    forecastDiv.append("<div id='cardDiv' class='card'>" + 
    "<h4 class='mt-1'>" +  day5 + "</h4>" +
    "<img class = 'forecastIcon' src='https://openweathermap.org/img/wn/" + forecastData.list[4].weather[0].icon + "@2x.png'>" + 
    "<p class='forecastP'> Temp: " + forecastData.list[4].main.temp + " °F</p>" +
    "<p class='forecastP'> Wind: " + forecastData.list[4].wind.speed + " MPH</p>" +
    "<p class='forecastP'> Humidity: " + forecastData.list[4].main.humidity + " %</p>" +
    "</div>"); 
};

//on click search button
searchBtn.on('click', function(event) {
    event.preventDefault();

    //get city name from input field
    var cityName = cityInput.val().trim();

    if(cityName) {
        getWeather(cityName);
    //TODO: Set city to local storage
    } else {
        alert("Please enter a city name");
    }
});


    timeTracker();
    displaySearches();

