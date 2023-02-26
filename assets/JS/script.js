// My Api key for openweather
const apiKey = "dc37ad7de363e9178459137f5c3b5f84"

// function to get current weather for the city i choose
function getCurrentWeather(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) { // handle successful response
    const city = response.name;
    const country = response.sys.country;
    const date = moment().format('dddd, MMMM Do, YYYY');
    const temp = response.main.temp;
    const humidity = response.main.humidity;
    const windSpeed = response.wind.speed;
    const iconCode = response.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

    // update current weather section of HTML
    $('#today').empty();
    $('#today').append(`
      <div class="card">
        <div class="card-body">
          <h2>${city}, ${country} (${date}) <img src="${iconURL}" alt="${response.weather[0].description}"></h2>
          <p>Temperature: ${temp} °C</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
        </div>
      </div>
    `);

    // call function to get 5-day forecast for the same city
    getFiveDayForecast(city);
  }).catch(function(error) {
    // handle error
    console.log(error);
  });
}

// Define the addToSearchHistory function
function addToSearchHistory(query) {
  //add the search query to the search history goes here
  console.log(`Search query '${query}' has been added to the search history.`);
}

// function to get 5-day forecast for a city
function getFiveDayForecast(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    // handle successful response
    const forecasts = response.list.filter(forecast => forecast.dt_txt.includes('12:00:00')); // get only forecasts for noon
    $('#forecast').empty();
    for (let i = 0; i < forecasts.length; i++) {
      const date = moment(forecasts[i].dt_txt).format('MMM Do');
      const temp = forecasts[i].main.temp;
      const humidity = forecasts[i].main.humidity;
      const iconCode = forecasts[i].weather[0].icon;
      const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
      
      // add forecast to HTML
      $('#forecast').append(`
        <div class="col-sm">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <h5>${date} <img src="${iconURL}" alt="${forecasts[i].weather[0].description}"></h5>
              <p>Temp: ${temp} °C</p>
              <p>Humidity: ${humidity}%</p>
            </div>
          </div>
        </div>
      `);
    }
  }).catch(function(error) {
    // handle error
    console.log(error);
  });
}

function updateDefaultCities(cityName) {
  const cities = document.querySelectorAll('.city-btn');
  let isCityFound = false;
  
  // check if city already exists
  cities.forEach(city => {
  if (city.getAttribute('data-city') === cityName) {
  isCityFound = true;
  return;
  }
  });
  
  // if city not found, add to list
  if (!isCityFound) {
  // shift existing city names and data attributes down
  for (let i = cities.length - 1; i >= 1; i--) {
  const currentCity = cities[i];
  const prevCity = cities[i - 1];
  currentCity.innerText = prevCity.innerText;
  currentCity.setAttribute('data-city', prevCity.getAttribute('data-city'));
}

// add new city to first button
const firstCityBtn = cities[0];
firstCityBtn.innerText = cityName;
firstCityBtn.setAttribute('data-city', cityName.toLowerCase());
}
}

// function to handle click event on city buttons
function handleCityButtonClick(event) {
const cityName = event.target.getAttribute('data-city');
getCurrentWeather(cityName);
}

// add event listeners to city buttons
const cityButtons = document.querySelectorAll('.city-btn');
cityButtons.forEach(button => {
button.addEventListener('click', handleCityButtonClick);
});

// function to handle search form submission
function handleSearchFormSubmit(event) {
event.preventDefault();
const searchTerm = $('#search-input').val();
if (searchTerm) {
// add the search term to search history
addToSearchHistory(searchTerm);
// get current weather for the city
getCurrentWeather(searchTerm);
// update default cities list
updateDefaultCities(searchTerm);
}
}

// add an event listener to the search form
$('#search-form').on('submit', handleSearchFormSubmit);